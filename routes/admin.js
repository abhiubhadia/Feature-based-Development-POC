module.exports = function(app) {

    var rootUrl="/admin";

    var adminRouter = require('../src/controllers/adminController');
    app.get(rootUrl, adminRouter.renderAdminPage);

    //----------- User Url Mappings-----------------

    app.post(rootUrl+'/user/save', adminRouter.saveUser);
    app.get(rootUrl+'/user/list', adminRouter.fetchUsers);
    app.get(rootUrl+"/user/:userId", adminRouter.findUser);
    app.put(rootUrl+"/user/:userId", adminRouter.updateUser);
    app.delete(rootUrl+"/user/:workflowId", adminRouter.deleteUser);

    //----------- Workflow Url Mappings-----------------

    app.post(rootUrl+'/workflow/save', adminRouter.saveWorkflow);
    app.get(rootUrl+'/workflow/list', adminRouter.fetchWorkflows);
    app.get(rootUrl+'/workflow/mobile/list', adminRouter.fetchMobileWorkflows);
    app.get(rootUrl+'/workflow/navigation/list', adminRouter.fetchNavigationWorkflows);
    app.get(rootUrl+"/workflow/:workflowId", adminRouter.findWorkflow);
    app.put(rootUrl+"/workflow/:workflowId", adminRouter.updateWorkflow);
    app.delete(rootUrl+"/workflow/:workflowId", adminRouter.deleteWorkflow);
    app.get(rootUrl+"/workflow/download/:workflowId", adminRouter.downloadComponentZip);
    app.get(rootUrl+"/workflow/iosdownload/:workflowId", adminRouter.downloadComponentZip);
    app.get(rootUrl+"/workflow/disable/:contextPath", adminRouter.disableWorkflow);

    //------------ Workflow Versions mapping

    app.post(rootUrl+'/workflow-version/save', adminRouter.saveWFVersion);
    app.get(rootUrl+'/workflow-version/list/:workflowId', adminRouter.fetchWorkflowVersions);
    app.get(rootUrl+"/workflow-version/:versionId", adminRouter.findWorkflowVersion);
    app.put(rootUrl+"/workflow-version/:versionId", adminRouter.updateWorkflowVersion);
    app.put(rootUrl+"/workflow-version/setCurrent/:versionId", adminRouter.setCurrentWorkflowVersion);
    app.delete(rootUrl+"/workflow-version/:versionId", adminRouter.deleteWorkflowVersion);

    // --- Download zip file for mobile
    app.get(rootUrl+"/workflow/getApp", adminRouter.downloadComponentZip)

    //----------- Navigation Url Mappings-----------------

    app.post(rootUrl+'/navigation/save', adminRouter.saveNavigation);
    app.get(rootUrl+'/navigation/list', adminRouter.fetchNavigations);
    app.get(rootUrl+'/navigation/mobile', adminRouter.findMobileNavigation);
    app.get(rootUrl+"/navigation/:navigationId", adminRouter.findNavigation);
    app.put(rootUrl+"/navigation/:navigationId", adminRouter.updateNavigation);
    app.delete(rootUrl+"/navigation/:navigationId", adminRouter.deleteNavigation);

    //----------- Page Url Mappings-----------------

    app.post(rootUrl+'/page/save', adminRouter.savePage);
    app.get(rootUrl+'/page/list', adminRouter.fetchPages);
    app.get(rootUrl+"/page/:pageId", adminRouter.findPage);
    app.put(rootUrl+"/page/:pageId", adminRouter.updatePage);
    app.delete(rootUrl+"/page/:pageId", adminRouter.deletePage);

    //----------- Page editor mapping-----------------
    app.get(rootUrl+'/page/editor/:pageId', adminRouter.loadEditor);
    app.get(rootUrl+'/page/editor/new', adminRouter.loadEditor);
};

