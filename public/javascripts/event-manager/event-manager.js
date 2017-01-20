/**
 * Created by kishore on 12/15/15.
 */


$("body").on("open-component", ".fbd-component", function (event) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000" + "/rest/getComponentDetails/" + event.originalEvent.detail.tag,
        data: {},
        success: function (result) {
            var queryParams = "?";
            var data = event.originalEvent.detail.data;
            for (attr in data) {
                queryParams = queryParams + attr + "=" + data[attr] + "&";
            }
            queryParams = queryParams.substring(0, queryParams.length - 1);
            window.location.href = window.location.origin + "/app/" + result.path + queryParams;

        },
        error: function (err) {
            console.log("could not open component");
        }
    });
});

$("body").on("send-data", ".fbd-component", function (event) {
    var detail = event.originalEvent.detail;
    if (detail) {
        for (attr in detail.data) {
            $(detail.tag).attr(attr, detail.data[attr]);
        }
        if(detail.callback){
            detail.callback();
        }
    }
});

