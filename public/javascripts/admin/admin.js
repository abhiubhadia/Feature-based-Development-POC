angular.module('admin', ['ui.router', 'frapontillo.bootstrap-switch', 'ui.ace', 'ui.select']);

angular.module('admin').config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/workflows/list");
    //
    // Now set up the states
    $stateProvider
        .state('workflows', {
            url: "/workflows",
            templateUrl: "/javascripts/admin/admin-container.html",
            controller: "workflowController"
        })
        .state('workflows.new', {
            url: "/new",
            templateUrl: "/javascripts/admin/workflows/workflow-details.html",
            controller: "workflowDetailsController"
        }).state('workflows.permissions', {
        url: "/permissions/:workflowId",
        templateUrl: "/javascripts/admin/workflows/workflow-permissions.html",
        controller: "workflowDetailsController"
        }).state('workflows.edit', {
            url: "/edit/:workflowId",
            templateUrl: "/javascripts/admin/workflows/workflow-details.html",
            controller: "workflowDetailsController"
        })
        .state('workflows.list', {
            url: "/list",
            templateUrl: "/javascripts/admin/workflows/workflow-list.html",
            controller: "workflowController"
        }).state('workflowVersion', {
            url: "/workflow-version",
            templateUrl: "/javascripts/admin/admin-container.html"
        })
        .state('workflowVersion.new', {
            url: "/new/:workflowId",
            templateUrl: "/javascripts/admin/workflows/workflow-details.html",
            controller: "workflowDetailsController"
        }).state('workflowVersion.edit', {
            url: "/edit/:versionId",
            templateUrl: "/javascripts/admin/workflows/workflow-details.html",
            controller: "workflowDetailsController"
        })
        .state('workflowVersion.list', {
            url: "/list/:workflowId",
            templateUrl: "/javascripts/admin/workflows/workflow-version-list.html",
            controller: "workflowController"
        })
        //Navigation states for all urls
        .state('navigations', {
            url: "/navigations",
            templateUrl: "/javascripts/admin/admin-container.html"
        }).state('navigations.list', {
        url: "/list",
        templateUrl: "/javascripts/admin/navigation/navigation-list.html",
        controller: "navigationController"
    }).state('navigations.new', {
        url: "/new",
        templateUrl: "/javascripts/admin/navigation/navigation.html",
        controller: "navigationController"
    }).state('navigations.edit', {
            url: "/edit/:navigationId",
            templateUrl: "/javascripts/admin/navigation/navigation.html",
            controller: "navigationController"
        })

        //User states for all urls
        .state('users', {
            url: "/users",
            templateUrl: "/javascripts/admin/admin-container.html"
        }).state('users.list', {
            url: "/list",
            templateUrl: "/javascripts/admin/users/user-list.html",
            controller: "userController"
        }).state('users.new', {
            url: "/new",
            templateUrl: "/javascripts/admin/users/user.html",
            controller: "userController"
        }).state('users.edit', {
            url: "/edit/:userId",
            templateUrl: "/javascripts/admin/users/user.html",
            controller: "userController"
        })

        //Page states for all urls
        .state('pages', {
            url: "/pages",
            templateUrl: "/javascripts/admin/admin-container.html"
        }).state('pages.list', {
            url: "/list",
            templateUrl: "/javascripts/admin/pages/page-list.html",
            controller: "pageController"
        }).state('pages.new', {
            url: "/new",
            templateUrl: "/javascripts/admin/pages/page.html",
            controller: "pageController"
        }).state('pages.edit', {
            url: "/edit/:pageId",
            templateUrl: "/javascripts/admin/pages/page.html",
            controller: "pageController"
        }).state('pages.permissions', {
        url: "/permissions/:pageId",
        templateUrl: "/javascripts/admin/pages/page-permissions.html",
        controller: "pageController"
    });
});
