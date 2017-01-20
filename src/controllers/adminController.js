/**
 * Created by kishore on 12/11/15.
 */

var mongoose = require('mongoose'),
    Workflow = mongoose.model('Workflow'),
    WorkflowVersion = mongoose.model('WorkflowVersion'),
    Navigation = mongoose.model('Navigation'),
    Page = mongoose.model('Page');
User = mongoose.model('User');
var q = require('q');
var http = require('http');
var fs = require('fs');
exports.renderAdminPage = function (req, res) {
    res.render('admin/admin', {
        title: "Uber Portal Admin",
        layout: "defaults/admin-layout.ejs"
    });
};

//---------------- Workflow management code ---------

exports.downloadComponentZip = function (req, res) {
    Workflow.findOne({"_id": req.params.workflowId}).exec(function (err, workflow) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot fetch the Workflow'
            });
        }
        var file = fs.createWriteStream("component.zip");
        var appSource = workflow.mobileAppSource;
        if (req.originalUrl.indexOf("ios") != -1) {
            appSource = workflow.mobileIOSAppSource;
        }
        var request = http.get(appSource, function (response) {
            response.pipe(file);
            res.setHeader('Content-disposition', 'attachment; filename=component.zip');
            res.setHeader('Content-type', 'application/octet-stream');
            response.pipe(res);
        });
        /*res.sendFile(workflow.mobileAppSource, function (err) {
         if (err) {
         console.log(err);
         res.status(err.status).end();
         }
         else {
         console.log('Sent:', fileName);
         }
         });*/
    });
};

exports.disableWorkflow = function (req, res) {
    Workflow.update({'path': req.params.contextPath}, {enabled: false}, function (err, workflow) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the workflow'
            });
        }
        res.json(req.body);
        updateNavigation(req.body);
    });
};

exports.updateWorkflow = function (req, res) {
    var workflowTemp;
    Workflow.update({'_id': req.body['_id']}, {$set: req.body}, function (err, workflow) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the workflow'
            });
        }
        workflowTemp = workflow;
        res.json(req.body);
        updateNavigation(req.body);
    });
};

exports.saveWorkflow = function (req, res) {
    var workflow = new Workflow(req.body);
    var workflowVersion = new WorkflowVersion(req.body);
    workflow.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        workflowVersion._doc.workflowId = workflow._doc._id;
        saveWorkflowVersion(workflowVersion, res);
        res.json(workflow);
    });
};

exports.fetchWorkflows = function (req, res) {
    Workflow.find({}).limit(100).exec(function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        res.json(docs);
    });
};

exports.fetchNavigationWorkflows = function (req, res) {
    Workflow.find({mobileEnabled: true}).limit(100).exec(function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        res.json(docs);
    });
};

exports.fetchMobileWorkflows = function (req, res) {
    Workflow.find({mobileEnabled: true}).limit(10).exec(function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        res.json(docs);
    });
};

exports.fetchActiveWorkflows = function (req, res) {
    Workflow.find({enabled: true}).exec(function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        res.json(docs);
    });
};

exports.deleteWorkflow = function (req, res) {
    Workflow.find({"_id": req.params.workflowId}).remove(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        WorkflowVersion.find({"workflowId": req.params.workflowId}).remove(function (err) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot save the article'
                });
            }
            return res.status(200).json({
                "data": "WOrkflow deleted successfully"
            });
        });

    });

};

exports.findWorkflow = function (req, res) {
    Workflow.findOne({"_id": req.params.workflowId}).exec(function (err, workflow) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot fetch the Workflow'
            });
        }
        return res.json(workflow);
    });
};

exports.saveWFVersion = function (req, res) {
    var workflowVersion = new WorkflowVersion(req.body);
    saveWorkflowVersion(workflowVersion, res, true);
};

function saveWorkflowVersion(workflowVersion, res, shouldReturn) {
    workflowVersion.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        if (shouldReturn) {
            res.json(workflowVersion);
        }
    });
}

exports.setCurrentWorkflowVersion = function (req, res) {
    WorkflowVersion.findOne({"_id": req.params.versionId}).exec(function (err, workflowVersion) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot fetch the Workflow Version'
            });
        }
        WorkflowVersion.update({'workflowId': workflowVersion.workflowId}, {"enabled": false}, {multi: true}, function (err) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot save the workflow version'
                });
            }
            workflowVersion.enabled = true;
            workflowVersion.save(function (err) {
                var workflowId = workflowVersion.workflowId;
                workflowVersion._id = workflowId;
                workflowVersion.workflowId = undefined;
                Workflow.update({'_id': workflowId}, {$set: workflowVersion._doc}, function (err, workflow) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot save the workflow'
                        });
                    }
                    workflowVersion._doc._id=workflowId;
                    updateNavigation(workflowVersion._doc);
                });
            });
        });

        return res.json(workflowVersion);
    });
};

exports.fetchWorkflowVersions = function (req, res) {
    WorkflowVersion.find({'workflowId': req.params.workflowId}).limit(10).exec(function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        res.json(docs);
    });
};

exports.findWorkflowVersion = function (req, res) {
    WorkflowVersion.findOne({"_id": req.params.versionId}).exec(function (err, workflowVersion) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot fetch the Workflow'
            });
        }
        return res.json(workflowVersion);
    });
};

exports.updateWorkflowVersion = function (req, res) {
    WorkflowVersion.update({'_id': req.body['_id']}, {$set: req.body}, function (err, workflow) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the workflow'
            });
        }

        res.json(req.body);

    });
};

exports.deleteWorkflowVersion = function (req, res) {
    WorkflowVersion.find({"_id": req.params.versionId}).remove(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        return res.status(200).json({
            "data": "WOrkflow deleted successfully"
        });
    });
};

//----------------- Navigation Urls--------------------------

exports.updateNavigation = function (req, res) {
    Navigation.update({'_id': req.body['_id']}, {$set: req.body}, function (err, navigation) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the navigation'
            });
        }

        res.json(req.body);
    });
};

exports.saveNavigation = function (req, res) {
    var navigation = new Navigation(req.body);

    navigation.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }

        res.json(navigation);
    });
};

exports.fetchNavigations = function (req, res) {
    Navigation.find({}).limit(10).exec(function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        res.json(docs);
    });
};

exports.deleteNavigation = function (req, res) {
    Navigation.find({"_id": req.params.navigationId}).remove(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        return res.status(200).json({
            "data": "navigation deleted successfully"
        });
    });

};

exports.findNavigation = function (req, res) {
    Navigation.findOne({"_id": req.params.navigationId}).exec(function (err, navigation) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot fetch the navigation'
            });
        }
        return res.json(navigation);
    });
};

exports.findMobileNavigation = function (req, res) {
    Navigation.findOne({"type": "mobile"}).limit(1).exec(function (err, navigation) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot fetch the navigation'
            });
        }
        return res.json(navigation);
    });
};

function updateNavigation(workflow) {
    try {
        if (workflow) {
            Navigation.find({}).exec(function (err, navigations) {
                navigations.forEach(function (navigation) {
                    navigation.menu.forEach(function (menu, index) {
                        if (menu.id == workflow._id.toString()) {
                            menu.enabled = workflow.enabled;
                            menu.version = workflow.version;
                            navigation.markModified("menu[" + index + "].enabled");
                            navigation.markModified("menu[" + index + "].version");
                        }
                        if (menu.children) {
                            menu.children.forEach(function (child, subIndex) {
                                if (child.id == workflow._id) {
                                    child.enabled = workflow.enabled;
                                    menu.version = workflow.version;
                                    navigation.markModified("menu[" + index + "].children[" + subIndex + "].enabled");
                                }
                            });
                        }
                    });
                    navigation.save();
                });
            });
        }
    } catch (e) {

    }
}

//----------------- Page Urls--------------------------

exports.updatePage = function (req, res) {
    Page.update({'_id': req.body['_id']}, {$set: req.body}, function (err, page) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the navigation'
            });
        }
        updateNavigation(req.body);
        res.json(req.body);
    });
};

exports.savePage = function (req, res) {
    var page = new Page(req.body);
    if (page.editorModel) {
        page.designMode = true;
    }
    page.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }

        res.json(page);
    });
};

exports.fetchPages = function (req, res) {
    Page.find({}).select("name path _id designMode enabled").limit(10).exec(function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        res.json(docs);
    });
};

exports.deletePage = function (req, res) {
    Page.find({"_id": req.params.pageId}).remove(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        return res.status(200).json({
            "data": "page deleted successfully"
        });
    });

};

exports.findPage = function (req, res) {
    Page.findOne({"_id": req.params.pageId}).exec(function (err, page) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot fetch the navigation'
            });
        }
        return res.json(page);
    });
};

exports.loadEditor = function (req, res) {
    if (req.params.pageId && req.params.pageId != "new") {
        Page.findOne({"_id": req.params.pageId}).exec(function (err, page) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot open editor'
                });
            }
            var source = "";
            if (page.editorModel) {
                source = page.editorModel;
            }
            fetchActiveWorkflows().then(function (workflows) {
                var result = [];
                workflows.forEach(function (workflow) {
                    result.push(workflow.toJSON());
                });
                res.render('admin/editor', {
                    title: "Uber Portal Admin",
                    layout: "defaults/editor-layout.ejs",
                    workflows: result,
                    pageId: req.params.pageId,
                    pageName: page.name,
                    pagePath: page.path,
                    pageSource: source
                });
            }, function (err) {
                return res.status(500).json({
                    error: 'Cannot open editor'
                });
            });

        });
    } else {
        fetchActiveWorkflows().then(function (workflows) {
            var result = [];
            workflows.forEach(function (workflow) {
                result.push(workflow.toJSON());
            });
            res.render('admin/editor', {
                title: "Uber Portal Admin",
                layout: "defaults/editor-layout.ejs",
                workflows: result,
                pageId: "",
                pageName: "",
                pagePath: "",
                pageSource: ""
            });
        }, function (err) {
            return res.status(500).json({
                error: 'Cannot open editor'
            });
        });
    }
};

function fetchActiveWorkflows() {
    var deferred = q.defer();
    Workflow.find({enabled: true}).exec(function (err, docs) {
        if (err) {
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}


/*-------------------- User Urls ---------------------- */
exports.updateUser = function (req, res) {
    User.update({'_id': req.body['_id']}, {$set: req.body}, function (err, user) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the user'
            });
        }
        res.json(req.body);

    });
};

exports.saveUser = function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the user'
            });
        }
        res.json(user);
    });
};

exports.fetchUsers = function (req, res) {
    User.find({}).limit(100).exec(function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the user'
            });
        }
        res.json(docs);
    });
};

exports.deleteUser = function (req, res) {
    User.find({"_id": req.params.userId}).remove(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot delete the user'
            });
        }
        return res.status(200).json({
            "data": "User deleted successfully"
        });
    });

};

exports.findUser = function (req, res) {
    User.findOne({"_id": req.params.userId}).exec(function (err, user) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot fetch the user'
            });
        }
        return res.json(user);
    });
};