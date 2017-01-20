/**
 * Load index page
 */

var cheerio = require('cheerio');
var q = require('q');
var pathToRegexp = require('path-to-regexp');
module.exports = function (app, config, cache) {
    var mongoose = require('mongoose'),
        Workflow = mongoose.model('Workflow'),
        Navigation = mongoose.model('Navigation'),
        Page = mongoose.model('Page'),
        restify = require('restify');

    var routesMap = {};

    var templateEngine = require('../engine/templateEngine')(cache);

    var deviceDetective = require("device-detective");

    loadWorkflowsToCache(cache);

    loadPagesToCahe(cache);

    return {

        handleNavigation: function (req, res, next) {
            var tokens = req.path.split("/");
            var reqPath = "/";
            var finalPath = "";
            for (var index = 0; index < tokens.length; index++) {
                reqPath = reqPath + tokens[index + 1];
                if (routesMap[reqPath]) {
                    finalPath = reqPath.toString();
                }
                reqPath = reqPath + "/";
            }

            cache.hget("pages", finalPath, function (err, page) {
                if (err) {
                    next();
                }
                if (page) {
                    cache.hget("pageStatus", finalPath, function (err, status) {
                        if (err) {
                            next();
                        }
                        if (status != "false") {

                            cache.hget("pagePermissions", finalPath, function (err, pagePermissions) {
                                if (err) {
                                    next();
                                } else if (pagePermissions) {
                                    pagePermissions = JSON.parse(pagePermissions);
                                    cache.hget("users", req.principal.email, function (err, userString) {
                                        if (err) {
                                            res.redirect(config.noAccess);
                                        } else {
                                            var user = JSON.parse(userString);
                                            if (user) {
                                                var allowed = compareUserAndWorkflowPermissions(pagePermissions, user);
                                                if (allowed)
                                                    processPage(req, page, user, cache).then(function (result) {
                                                        loadPageWithNavigation(req, res, 'component/page', {
                                                            pageSource: result,
                                                            layout: "defaults/layout.ejs",
                                                            language:"en"
                                                        });
                                                    }, function (err) {
                                                        res.redirect(config.noAccessPath);
                                                    });
                                                else {
                                                    res.redirect(config.noAccessPath);
                                                }
                                            }
                                        }
                                    });

                                } else {
                                    res.redirect(config.noAccessPath);
                                }
                            });
                        }
                        else {
                            res.redirect(config.noAccessPath);
                        }
                    });

                } else {
                    next();
                }
            });

        },

        renderIndexPage: function (req, res) {

            var device = deviceDetective.detect(req);
            var deviceContextPath = getDevice(device);

            loadPageWithNavigation(req, res, "index", {layout: "defaults/layout.ejs",language:"en"});
        },

        getComponentByTag: function (req, res) {
            Workflow.findOne({domSyntax: req.params.tag}, function (err, workflow) {
                if (err) {
                    res.status(500).json({
                        "error": "could not load component"
                    });
                }
                res.json(workflow);
            });
        },

        renderWebComponent: function (req, res) {

            var device = deviceDetective.detect(req);
            var deviceContextPath = getDevice(device);

            var componentName = req.params.component;
            Workflow.findOne({path: componentName}, function (err, workflow) {
                if (err) {
                    res.status(500).json({
                        "error": "could not load component"
                    });
                }
                if (deviceContextPath == "phone") {
                    workflow.webSource = workflow.mWebSource;
                }
                if (workflow != null && workflow.enabled) {
                    cache.hget("users", req.principal.email, function (err, userString) {
                        if (err) {
                            res.redirect(config.noAccessPath);
                        } else {
                            var user = JSON.parse(userString);
                            if (user) {
                                var allowed = compareUserAndWorkflowPermissions(workflow, user);
                                if (allowed)
                                    loadPageWithNavigation(req, res, 'component/container', {
                                        workflow: workflow,
                                        //rootUrl: "http://localhost:3000/api"
                                        componentParams: req.query,
                                        rootUrl: "http://localhost:3000/demo",
                                        layout: "defaults/layout.ejs",
                                        language:"en"
                                    });
                                else {
                                    res.redirect(config.noAccessPath);
                                }
                            }
                        }
                    });

                } else {
                    res.redirect(config.noAccessPath);
                }
            });
        },

        handleAPICall: function (req, res) {

            var url = req.url.replace("/api/", "");
            var tempIndex = url.indexOf('/');
            var contextPath = (url.substring(0, tempIndex));
            cache.hget("api", contextPath, function (err, value) {
                var apiUrl = value;
                url = url.replace(contextPath, "");

                if (apiUrl) {
                    var client = restify.createJsonClient({
                        url: apiUrl,
                        headers: req.headers
                    });

                    var method = "get";
                    if (req.method.toLowerCase() == "delete") {
                        method = "del";
                    } else {
                        method = req.method.toLowerCase();
                    }

                    switch (method) {
                        case "get":
                        case "head":
                        case "del":
                            client[method](url, function (err, subReq, subRes, obj) {
                                if (err) {
                                    res.status(500).json({
                                        "error": "could not make api call for component"
                                    });
                                }
                                res.json(obj);
                            });
                            break;
                        case "post":
                        case "put":
                            client[method](url, req.body, function (err, subReq, subRes, obj) {
                                if (err) {
                                    res.status(500).json({
                                        "error": "could not make api call for component"
                                    });
                                }
                                res.json(obj);
                            });

                    }
                }
            });

        },

        handleResponseCall: function (req, res) {

            var url = req.url.replace("/demo/", "");
            var tempIndex = url.indexOf('/');
            var contextPath = (url.substring(0, tempIndex));
            cache.hget("api", contextPath, function (err, value) {
                var apiUrl = value;
                url = url.replace(contextPath, "");
                res.redirect(apiUrl + url);
            });

        },

        reloadWorkflowCache: function (req, res) {
            loadWorkflowsToCache(cache);
            loadPagesToCahe(cache);
            cache.del("navigations");
            res.end();
        },
    };

    function getDevice(device) {

        var deviceContext = "";

        if (device.phone) {
            var deviceContext = "phone";
        } else if (device.tablet) {
            var deviceContext = "tablet";
        } else if (device.desktop || device.crawler || device.lynx) {
            var deviceContext = "desktop";
        }

        return deviceContext;
    }

    function loadWorkflowsToCache(cache) {
        Workflow.find({}).exec(function (err, docs) {
            if (err) {
                console.log("Error fetching workflows")
            }
            docs.forEach(function (doc) {
                if (doc.apiUrl && doc.path) {
                    console.log(doc.path + " ----------- " + doc.apiUrl);
                    cache.hmset("api", doc.domSyntax, doc.apiUrl);
                }
                var permissions = {};
                permissions.groups = doc.groups;
                permissions.orgs = doc.orgs;
                permissions.regions = doc.regions;
                permissions.enabled = doc.enabled;
                permissions.domSyntax = doc.domSyntax;
                permissions.webSource = doc.webSource;
                permissions.mWebSource = doc.mWebSource;
                cache.hmset("permissions", doc.domSyntax, JSON.stringify(permissions));

            })
        });
    }

    function loadPagesToCahe(cache) {
        Page.find({}).exec(function (err, docs) {
            if (err) {
                console.log("Error fetching paths")
            }
            docs.forEach(function (doc) {
                if (doc.path) {
                    cache.hmset("pages", doc.path, doc.source);
                    cache.hmset("pageStatus", doc.path, doc.enabled);
                }
                var permissions = {};
                permissions.groups = doc.groups;
                permissions.orgs = doc.orgs;
                permissions.regions = doc.regions;
                permissions.enabled = doc.enabled;
                cache.hmset("pagePermissions", doc.path, JSON.stringify(permissions));

                routesMap[doc.path] = true;
            })
        });
    }

    function loadPageWithNavigation(req, res, pageToRender, data) {
        cache.hget("navigations", req.principal.email, function (err, navigation) {
            if (err) {
                res.status(500).json({
                    "error": "could not load component"
                });
            }
            if (navigation) {
                data.menu = JSON.parse(navigation);
                console.log("returned cached navigation");
                res.render(pageToRender, data);
            } else {
                Navigation.findOne({name: "Main Navigation"}, function (err, navigation) {
                    if (err) {
                        res.status(500).json({
                            "error": "could not load component"
                        });
                    }
                    var menu = navigation._doc.menu;
                    var finalMenu = [];
                    var counter = menu.length;
                    for (var index = 0; index < menu.length; index++) {
                        addWorkflowToNavigation(finalMenu, menu[index], index, req.principal.email).then(function (result) {
                            counter--;
                            if (counter == 0) {
                                cache.hmset("navigations", req.principal.email, JSON.stringify(finalMenu));
                                data.menu = finalMenu;
                                res.render(pageToRender, data);
                            }
                        }, function (err) {
                            counter--;
                            if (counter == 0) {
                                cache.hmset("navigations", req.principal.email, JSON.stringify(finalMenu));
                                data.menu = finalMenu;
                                res.render(pageToRender, data);
                            }
                        });

                    }

                });
            }
        });

    }

    function addWorkflowToNavigation(menu, menuItem, index, userEmail) {
        var deferred = q.defer();
        /*cache.hget("permissions", menuItem.contextPath, function (err, workflow) {
         if (err) {
         deferred.reject(new Error(err));
         } else if (workflow) {
         var workflowPermissions = JSON.parse(workflow);
         checkUserPermissionForNavigation(userEmail, menu, menuItem, index, workflowPermissions).then(function (result) {
         deferred.resolve(result);
         }, function (err) {
         deferred.reject(new Error(err));
         });
         } else {*/
        cache.hget("pagePermissions", menuItem.contextPath, function (err, page) {
            if (err) {
                deferred.reject(new Error(err));
            } else if (page) {
                var pagePermissions = JSON.parse(page);
                checkUserPermissionForNavigation(userEmail, menu, menuItem, index, pagePermissions).then(function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(new Error(err));
                });
            } else {
                menu.push(menuItem._doc);
                deferred.resolve({});
            }
        });
        /*}
         });*/
        return deferred.promise;
    }

    function checkUserPermissionForNavigation(userEmail, menu, menuItem, index, workflowPermissions) {
        var deferred = q.defer();
        cache.hget("users", userEmail, function (err, userString) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                var user = JSON.parse(userString);
                var allowed = false;
                if (workflowPermissions.enabled) {
                    allowed = true;
                }
                if (allowed) {
                    allowed = compareUserAndWorkflowPermissions(workflowPermissions, user);
                }
                if (allowed) {
                    menu.push(menuItem._doc);
                    //menu.splice(index, 1);
                }
                deferred.resolve({});
            }
        });
        return deferred.promise;
    }

    function processPage(req, source, user, cache) {
        var deferred = q.defer();
        $ = cheerio.load(source);

        templateEngine.processPermissions($, user);
        templateEngine.processRequestParams($, req);
        templateEngine.processPathParams($, req);
        var length = $('.fbd-component').length;
        if (length == 0) {
            deferred.resolve($.html());
        } else {
            $('.fbd-component').each(function (i, elem) {
                checkWorkflowPermissions(req, $, user, elem.name).then(function (result) {
                    length--;
                    if (length == 0) {
                        deferred.resolve($.html());
                    }
                }, function (err) {
                    length--;
                    deferred.reject(new Error(err));
                });
            });
        }
        return deferred.promise;
    }

    function checkWorkflowPermissions(req, $, user, workflowTag) {
        var deferred = q.defer();
        cache.hget("permissions", workflowTag, function (err, workflow) {
            if (err) {
                deferred.reject(new Error(err));
            }
            if (workflow) {
                var workflowPermissions = JSON.parse(workflow);
                if (!workflowPermissions.enabled) {
                    $(workflowTag).closest('.fbd-container').remove();
                    $(workflowTag).remove();
                    deferred.resolve($);
                } else {
                    var allowed = compareUserAndWorkflowPermissions(workflowPermissions, user);
                    if (!allowed) {
                        $(workflowTag).closest('.fbd-container').remove();
                        $(workflowTag).remove();
                    } else {
                        var device = deviceDetective.detect(req);
                        var deviceContextPath = getDevice(device);
                        if (deviceContextPath == "phone") {
                            $("link#" + workflowPermissions.domSyntax).attr("rel", "import").attr("href", workflowPermissions.mWebSource);
                        } else {
                            $("link#" + workflowPermissions.domSyntax).attr("rel", "import").attr("href", workflowPermissions.webSource);
                        }
                        if ($(workflowTag).attr("fbd-root-url") != undefined) {
                            $(workflowTag).attr("fbd-root-url", config.rootUrl);
                        }
                        if ($(workflowTag).attr("fbd-principal") != undefined) {
                            $(workflowTag).attr("fbd-principal", JSON.stringify(user));
                        }
                    }
                    deferred.resolve($);
                }
            }

        });
        return deferred.promise;
    }

    function compareUserAndWorkflowPermissions(workflowPermissions, user) {
        var allowed = false;
        for (index in user.regions) {
            for (wIndex in workflowPermissions.regions) {
                if (user.regions[index].id == workflowPermissions.regions[wIndex].id) {
                    allowed = true;
                    break;
                }
            }
        }
        if (allowed) {
            allowed = false;
            for (index in user.orgs) {
                for (wIndex in workflowPermissions.orgs) {
                    if (user.orgs[index].id == workflowPermissions.orgs[wIndex].id) {
                        allowed = true;
                        break;
                    }
                }
            }
        }
        if (allowed) {
            allowed = false;
            for (index in user.groups) {
                for (wIndex in workflowPermissions.groups) {
                    if (user.groups[index].id == workflowPermissions.groups[wIndex].id) {
                        allowed = true;
                        break;
                    }
                }
            }
        }
        return allowed
    }

};




