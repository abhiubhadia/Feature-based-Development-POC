/**
 * Created by kishore on 12/11/15.
 */
angular.module('admin').controller('workflowDetailsController', WorkflowDetailsController);

WorkflowDetailsController.$inject = ['$scope', '$http', '$state', '$stateParams', 'workflowService'];

function WorkflowDetailsController($scope, $http, $state, $stateParams, workflowService) {

    $scope.workflow = {mobileEnabled: true};

    $scope.saveWorkflow = saveWorkflow;

    $scope.findWorkflow = findWorkflow;

    if ($state.current.name == "workflows.edit" || $state.current.name == "workflows.permissions") {
        $scope.findWorkflow($stateParams.workflowId);
    }
    if ($state.current.name == "workflowVersion.new") {
        findWorkflow($stateParams.workflowId, true);
    }
    if ($stateParams.versionId) {
        findWorkflowVersion($stateParams.versionId);
    }

    function saveWorkflow() {
        if ($scope.workflow.workflowId) {
            workflowService.saveWorkflowVersion($scope.workflow).then(function (result) {
                $(".alert").removeClass("hidden");
                $(".alert").addClass("alert-success");
                $(".alert").text("Component version is updated");
            }, function (err) {

            });
        } else {
            workflowService.saveWorkflow($scope.workflow).then(function (result) {
                $(".alert").removeClass("hidden");
                $(".alert").addClass("alert-success");
                $(".alert").text("Component is updated");
            }, function (err) {

            });
        }

    }

    function findWorkflow(workflowId, reset) {
        workflowService.findWorkflow(workflowId).then(function (result) {
            $scope.workflow = result.data;
            if (reset) {
                $scope.workflow._id = undefined;
                $scope.workflow.version = "";
                $scope.workflow.enabled = false;
                $scope.workflow.workflowId = $stateParams.workflowId;
            }
        }, function (err) {

        })
    }


    function findWorkflowVersion(versionId) {
        workflowService.findWorkflowVersion(versionId).then(function (result) {
            $scope.workflow = result.data;

        }, function (err) {

        })
    }

    initializeDemoPermissionData();

    function initializeDemoPermissionData() {

        $scope.groups = [
            {name: 'Admin', id: '001'},
            {name: 'Users',id: '002'},
            {name: 'Finance', id: '003'},
            {name: 'Maintenance', id: '004'},
            {name: 'Service', id: '005'},
            {name: 'Operations', id: '006'},
            {name: 'Infrastructure', id: '007'}
        ];

        $scope.orgs = [
            {name: 'Equinix', id: '001'},
            {name: 'LinkedIn',id: '002'},
            {name: 'Google', id: '003'},
            {name: 'Amazon', id: '004'},
            {name: 'Facebook', id: '005'},
            {name: 'Twitter', id: '006'},
            {name: 'Box', id: '007'}
        ];

        $scope.regions = [
            {name: 'EMEA', id: '001'},
            {name: 'AMER',id: '002'},
            {name: 'GLOBAL', id: '003'}
        ];
    }

}