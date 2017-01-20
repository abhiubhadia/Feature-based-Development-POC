/**
 * Created by kishore on 12/11/15.
 */
angular.module('admin').controller('workflowController', WorkflowController);

WorkflowController.$inject = ['$scope', '$http', '$state', '$stateParams','workflowService'];

function WorkflowController($scope, $http,$state, $stateParams ,workflowService) {

    $scope.workflows;
    $scope.workflowVersions;
    $scope.workflowId;
    $scope.fetchWorkflows = fetchWorkflows;
    $scope.deleteWorkflow = deleteWorkflow;
    $scope.deleteWorkflowVersion = deleteWorkflowVersion;
    $scope.versionChanged = versionChanged;
    $scope.setCurrentVersion = setCurrentVersion;
    $scope.updateWorkflowStatus = updateWorkflowStatus;

    if ($state.current.name == "workflows.list")
        fetchWorkflows();
    if ($state.current.name == "workflowVersion.list"){
        fetchWorkflowVersions();
        $scope.workflowId = $stateParams.workflowId;
    }

    function fetchWorkflows() {
        workflowService.fetchWorkflows().then(function (result) {
            $scope.workflows = result.data;
        }, function (err) {

        });
    }

    function updateWorkflowStatus(workflowId){
        angular.forEach($scope.workflows, function(value,key){
            if(value._id==workflowId){
                workflowService.saveWorkflow(value).then(function(result){
                    $(".alert").removeClass("hidden");
                    $(".alert").addClass("alert-success");
                    $(".alert").text("Workflow is updated successfully");
                },function(err){

                });
            }
        });
    }

    function versionChanged(versionId){
        angular.forEach($scope.workflowVersions, function(value,key){
           if(value._id!=versionId){
               value.enabled = false;
           }
        });
    }

    function setCurrentVersion(){
        angular.forEach($scope.workflowVersions, function(value,key){
            if(value.enabled){
                workflowService.setAsCurrentVersion(value._id).then(function(result){
                    $(".alert").removeClass("hidden");
                    $(".alert").addClass("alert-success");
                    $(".alert").text("Current version is updated");
                }, function(err){

                });
            }
        });
    }

    function deleteWorkflow(workflowId){
        workflowService.deleteWorkflow(workflowId).then(function (result) {
            fetchWorkflows();
        }, function (err) {

        })
    }

    function deleteWorkflowVersion(workflowId){
        workflowService.deleteWorkflowVersion(workflowId).then(function (result) {
            fetchWorkflowVersions();
        }, function (err) {

        })
    }

    function fetchWorkflowVersions(){
        workflowService.fetchWorkflowVersions($stateParams.workflowId).then(function (result) {
            $scope.workflowVersions = result.data;
        }, function (err) {

        });
    }

}
