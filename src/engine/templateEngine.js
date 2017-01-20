/**
 * Created by durgavineela on 1/11/16.
 */
var pathToRegexp = require('path-to-regexp');
module.exports = function (cache) {
    return {
        processPrincipal: function () {

        },

        processPermissions: function ($, user) {
            processPermissionAttribute($, user, "regions", 'fbd-region');
            processPermissionAttribute($, user, "orgs", 'fbd-org');
            processPermissionAttribute($, user, "groups", 'fbd-group');
            processPermissionAttribute($, user, "role", 'fbd-role');
        },

        processRequestParams: function ($, req) {
            $("[fbd-req-params]").each(function (i, elem) {
                $(elem).attr("fbd-req-params", JSON.stringify(req.query));
            });
        },
        processPathParams: function ($, req) {
            $("[fbd-path-pattern]").each(function (i, elem) {
                var keys = [];
                var pattern = $(elem).attr("fbd-path-pattern");
                $(elem).removeAttr("fbd-path-pattern");
                var re = pathToRegexp(pattern, keys);
                var result = re.exec(req.path);
                if (result != null)
                    for (index in keys) {
                        $(elem).attr(keys[index].name, result[parseInt(index) + 1]);
                    }

            });
        },
        processCustomProperties: function () {

        }
    };

    function checkPermissionValue(userValues, elemValue) {
        for (index in userValues) {
            try {
                if (userValues[index].name.toLowerCase() == elemValue) {
                    return true;
                }
            } catch (e) {
                return false;
            }
        }
        return false;
    }

    function processPermissionAttribute($, user, userPermissionAttribute, uiAttribute) {
        $('[' + uiAttribute + ']').each(function (i, elem) {
            var allowed = checkPermissionValue(user[userPermissionAttribute], $(elem).attr(uiAttribute).toLowerCase());
            if (!allowed) {
                $(elem).remove();
            }
        });
    }
};