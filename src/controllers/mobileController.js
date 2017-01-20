/**
 * Created by kishore on 12/30/15.
 */
var restify = require('restify');
module.exports = function (app, config, cache) {
    return {
        sendPushMessage: function(req, res){
            var client = restify.createJsonClient({
                url: "https://go.urbanairship.com",
                accept: "application/vnd.urbanairship+json; version=3;",
                headers: req.headers
            });
            client.basicAuth("NUo_2vWlRFKZ9AKejFUAWw", "xMM2IjjLQFy_IAF1AXHYfg");

            client.post("/api/push",req.body, function (err, subReq, subRes, obj) {
                if (err) {
                    res.status(500).json({
                        "error": "could not make api call for component"
                    });
                }else{
                    console.log(obj);
                    res.json(obj);
                }

            });
        }
    }
};