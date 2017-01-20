/**
 * Created by kishore on 12/13/15.
 */
angular.module('admin').controller('pageController', PageController);

PageController.$inject = ['$scope', '$http', '$state', '$stateParams', 'pageService'];

function PageController($scope, $http, $state, $stateParams, pageService) {

    $scope.pagesList;
    $scope.page;
    $scope.fetchPages = fetchPages;
    $scope.deletePage = deletePage;
    $scope.savePage = savePage;
    $scope.findPage = findPage;
    $scope.updatePageStatus = updatePageStatus;

    $scope.aceLoaded = function (_editor) {
        // Options
        $scope.editor = _editor;
    };

    $scope.aceChanged = function (e) {
        //
    };

    if ($state.current.url == "/new" || $stateParams.pageId) {
        if ($stateParams.pageId)
            $scope.findPage($stateParams.pageId);
    } else {
        fetchPages();
    }

    function updatePageStatus(pageId) {
        angular.forEach($scope.pagesList, function (value, key) {
            if (value._id == pageId) {
                pageService.savePage(value).then(function (result) {
                    $(".alert").addClass("alert-success");
                    $(".alert").removeClass("hidden");
                    $(".alert").text("page is updated successfully");
                }, function (err) {

                });
            }
        });
    }

    function savePage() {
        if ($state.current.name != "pages.permissions") {
            $scope.page.source = $scope.editor.getValue();
        }

        pageService.savePage($scope.page).then(function (result) {
            $(".alert").removeClass("hidden");
            $(".alert").addClass("alert-success");
            $(".alert").text("Page is updated");
        }, function (err) {

        });
    }

    function findPage(pageId) {
        pageService.findPage(pageId).then(function (result) {
            $scope.page = result.data;
            if ($state.current.name != "pages.permissions") {
                $scope.editor.setValue($scope.page.source);
            }
        }, function (err) {

        })
    }

    function fetchPages() {
        pageService.fetchPages().then(function (result) {
            $scope.pagesList = result.data;
        }, function (err) {

        });
    }

    function deletePage(pageId) {
        pageService.deletePage(pageId).then(function (result) {
            fetchPages();
        }, function (err) {

        })
    }

    initializeDemoPermissionData();

    function initializeDemoPermissionData() {

        $scope.groups = [
            {name: 'Admin', id: '001'},
            {name: 'Users', id: '002'},
            {name: 'Finance', id: '003'},
            {name: 'Maintenance', id: '004'},
            {name: 'Service', id: '005'},
            {name: 'Operations', id: '006'},
            {name: 'Infrastructure', id: '007'}
        ];

        $scope.orgs = [
            {name: 'Equinix', id: '001'},
            {name: 'LinkedIn', id: '002'},
            {name: 'Google', id: '003'},
            {name: 'Amazon', id: '004'},
            {name: 'Facebook', id: '005'},
            {name: 'Twitter', id: '006'},
            {name: 'Box', id: '007'}
        ];

        $scope.regions = [
            {name: 'EMEA', id: '001'},
            {name: 'AMER', id: '002'},
            {name: 'GLOBAL', id: '003'}
        ];
    }

}
