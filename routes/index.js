module.exports = function (app, config,cache) {
    var tokenUtils = require('../src/utils/tokenUtils')(config);
    //which ever method require authentication include this
    function requireAuthentication(req, res, next) {
        if(req.cookies.token !=null && req.cookies.token !='undefined'){
            console.log(req.cookies.token);
            tokenUtils.validateToken(req.cookies.token, function(err, principal){
                if(err){
                    res.status(500).json({
                        "error": "Error authenticating the user"
                    });
                }
                console.log("require authentication in validate token callback: ");
                req.principal = (principal);
                next();
            });
        }else{
            next();
        }

    }

    var loginRouter = require('../src/controllers/loginController')(app,config,cache);

    app.get('/',loginRouter.renderLoginPage);

    app.post('/',loginRouter.postLoginCall);

    app.post('/login/mobile',loginRouter.postLoginCall);

    var indexRouter = require('../src/controllers/indexController')(app,config, cache);


    app.get("/**", requireAuthentication, indexRouter.handleNavigation);

    app.get('/home', indexRouter.renderIndexPage);

    app.get('/app/:component', requireAuthentication, indexRouter.renderWebComponent);

    app.get('/rest/getComponentDetails/:tag', indexRouter.getComponentByTag);

    app.all('/api/**', requireAuthentication,indexRouter.handleAPICall);
    app.all('/demo/**',indexRouter.handleResponseCall);

    app.get('/util/reloadWorkflowCache', indexRouter.reloadWorkflowCache);

    var userRouter = require('../src/controllers/userController')(app,cache);

    app.all('/settings/:userId',indexRouter.handleResponseCall);

    var serviceRouter = require('../src/controllers/serviceController');

    app.get('/getIbxList',requireAuthentication,serviceRouter.getIbxList);
    app.get('/getDescription',requireAuthentication,serviceRouter.getDescription);

    app.get('/getWorkVisitList',requireAuthentication,serviceRouter.getWorkVisitList);

    app.get('/getCages',requireAuthentication,serviceRouter.getCages);
    app.get('/getCabins',requireAuthentication,serviceRouter.getCabins);
    app.post('/submitIbxForm',requireAuthentication,serviceRouter.submitIbxForm);
    app.get('/getOrderData',requireAuthentication,serviceRouter.getOrderData);
    app.post('/submitSmartHandRequest',requireAuthentication,serviceRouter.submitSmartHandRequest);
    app.get('/getWorkVisitById',requireAuthentication,serviceRouter.getWorkVisitById);


    app.get('/getVcList',requireAuthentication,serviceRouter.getVcList);
    app.get('/getMetroList',requireAuthentication,serviceRouter.getMetroList);
    app.get('/getServicesByMetro',requireAuthentication,serviceRouter.getServicesByMetro);
    app.get('/getPortsByMetro',requireAuthentication,serviceRouter.getPortsByMetro);
    app.post('/createVirtualCircuit',requireAuthentication,serviceRouter.createVirtualCircuit);
    app.get('/getPortSummary',requireAuthentication,serviceRouter.getPortSummary);
    app.get('/getAreaChart',requireAuthentication,serviceRouter.getAreaChart);
    app.get('/getBarChart',requireAuthentication,serviceRouter.getBarChart);
    app.get('/getDonutChart',requireAuthentication,serviceRouter.getDonutChart);
    app.get('/getLineChart',requireAuthentication,serviceRouter.getLineChart);
    app.get('/getPortChartData',requireAuthentication,serviceRouter.getPortChartData);
    app.get('/getLocationList',serviceRouter.getLocationList);
    app.get('/getHighAreaChart',requireAuthentication,serviceRouter.getHighAreaChart);
};
