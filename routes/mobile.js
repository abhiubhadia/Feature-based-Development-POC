/**
 * Created by kishore on 1/12/16.
 */
module.exports = function (app, config,cache) {
    var mobileRouter = require('../src/controllers/mobileController')(app,config,cache);

    app.post('/mobile/push',mobileRouter.sendPushMessage);
}
