/**
 * Created by kishore on 12/11/15.
 */
angular.module("admin").factory("workflowService", WorkflowService);

WorkflowService.$inject = [ "$http" ];

function WorkflowService($http) {
    var workflowService = {
        saveWorkflow : saveWorkflow,
        fetchWorkflows : fetchWorkflows,
        findWorkflow : findWorkflow,
        deleteWorkflow: deleteWorkflow,
        saveWorkflowVersion : saveWorkflowVersion,
        fetchWorkflowVersions : fetchWorkflowVersions,
        fetchNavigationWorkflows: fetchNavigationWorkflows,
        findWorkflowVersion : findWorkflowVersion,
        deleteWorkflowVersion: deleteWorkflowVersion,
        setAsCurrentVersion : setAsCurrentVersion
    }

    return workflowService;

    function saveWorkflow(workflow) {
        if(workflow['_id']){
            return $http.put("/admin/workflow/"+workflow['_id'], workflow);
        }else
            return  $http.post("/admin/workflow/save", workflow);
    }
    function fetchWorkflows() {
        return  $http.get("/admin/workflow/list");
    }
    function fetchNavigationWorkflows() {
        return  $http.get("/admin/workflow/navigation/list");
    }
    function findWorkflow(workflowId){
        return $http.get("/admin/workflow/"+workflowId);
    }
    function deleteWorkflow(workflowId) {
        return $http.delete("/admin/workflow/"+workflowId);
    }

    function saveWorkflowVersion(workflowVersion) {
        if(workflowVersion['_id']){
            return $http.put("/admin/workflow-version/"+workflowVersion['_id'], workflowVersion);
        }else
            return  $http.post("/admin/workflow-version/save", workflowVersion);
    }
    function fetchWorkflowVersions(workflowId) {
        return  $http.get("/admin/workflow-version/list/"+workflowId);
    }
    function findWorkflowVersion(versionId){
        return $http.get("/admin/workflow-version/"+versionId);
    }
    function deleteWorkflowVersion(versionId) {
        return $http.delete("/admin/workflow-version/"+versionId);
    }

    function setAsCurrentVersion(versionId) {
        return $http.put("/admin/workflow-version/setCurrent/"+versionId);
    }
}