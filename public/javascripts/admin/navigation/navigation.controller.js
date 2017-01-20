/**
 * Created by kishore on 12/13/15.
 */
angular.module('admin').controller('navigationController', NavigationController);

NavigationController.$inject = ['$scope', '$http', '$state', '$stateParams','navigationService', 'workflowService', 'pageService'];

function NavigationController($scope, $http,$state, $stateParams ,navigationService, workflowService, pageService) {

    $scope.navigations;
    $scope.pages;
    $scope.workflows;
    $scope.fetchNavigations = fetchNavigations;
    $scope.deleteNavigation = deleteNavigation;
    $scope.saveNavigation = saveNavigation;
    $scope.findNavigation = findNavigation;
    $scope.addToMenu = addToMenu;
    $scope.addPagesToMenu = addPagesToMenu;
    $scope.removeFromMenu = removeFromMenu;

    if ($state.current.url == "/new" || $stateParams.navigationId) {
        if($stateParams.navigationId)
            $scope.findNavigation($stateParams.navigationId);
        fetchWorkflows();
        fetchPages();
        if($state.current.url == "/new")
        createNavTree();
    }else{
        fetchNavigations();
    }

    function fetchPages() {
        pageService.fetchPages().then(function (result) {
            $scope.pages = result.data;
        }, function (err) {

        });
    }

    function fetchWorkflows() {
        workflowService.fetchNavigationWorkflows().then(function (result) {
            $scope.workflows = result.data;
        }, function (err) {

        });
    }

    function createNavTree(menu){
        if(!menu){
            menu= [];
        }

        $('#menu-creator').tree({
            data: menu,
            autoOpen: true,
            dragAndDrop: true
        });
    }

    function addToMenu(){
        angular.forEach($scope.workflows, function(value,key){
            if(value.checked) {
                var parent_node = $("#menu-creator").tree('getNodeById', value._id);
                if(!parent_node){
                    $("#menu-creator").tree('appendNode', {label: value.name, id: value._id, contextPath: value.domSyntax, enabled: value.enabled, mobileEnabled: value.mobileEnabled, version: value.version});
                    $("#menu-creator").tree('reload');
                }

            }
        });
    }

    function addPagesToMenu(){
        angular.forEach($scope.pages, function(value,key){
            if(value.checked) {
                var parent_node = $("#menu-creator").tree('getNodeById', value._id);
                if(!parent_node){
                    $("#menu-creator").tree('appendNode', {label: value.name, id: value._id, contextPath: value.path, enabled: value.enabled, mobileEnabled: value.mobileEnabled, version: "1"});
                    $("#menu-creator").tree('reload');
                }

            }
        });
    }

    function removeFromMenu(){
        var node = $("#menu-creator").tree('getSelectedNode');
        $("#menu-creator").tree('removeNode', node);
    }

    function saveNavigation() {
        $scope.navigation.menu= angular.fromJson($("#menu-creator").tree('toJson'));
        navigationService.saveNavigation($scope.navigation).then(function (result) {
            $(".alert").removeClass("hidden");
            $(".alert").addClass("alert-success");
            $(".alert").text("Navigation is updated");
        }, function (err) {

        });
    }

    function findNavigation(navigationId) {
        navigationService.findNavigation(navigationId).then(function (result) {
            $scope.navigation= result.data;
            createNavTree($scope.navigation.menu);
        }, function (err) {

        })
    }

    function fetchNavigations() {
        navigationService.fetchNavigations().then(function (result) {
            $scope.navigations = result.data;
        }, function (err) {

        });
    }

    function deleteNavigation(navigationId){
        navigationService.deleteNavigation(navigationId).then(function (result) {
            fetchNavigations();
        }, function (err) {

        })
    }

}
