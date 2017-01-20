/**
 * Created by aubhadia on 1/7/2016.
 */

// This will initialize the plugin
// and show two dialog boxes: one with the text "Olá World"
// and other with the text "Good morning John!"
/*jQuery.i18n.properties({
    name:'Messages',
    path:'/javascripts/resources/',
    mode:'both',
    language:'pt_PT'
});*/

var translations;
$(document).ready(function(){
    if($.urlParam('locale') && $.urlParam('locale')=="es"){
        $('span.locale-text').text("Mexico – Spanish");
    }
    $(".locale").click(function(){
        var locale = $(this).attr('data');
        var localeText=$(this).text();
        $('span.header-text').text(localeText);
        //loadJSON('/javascripts/resources/messages_'+ locale +'.json');
        //var domain = window.location.protocol + window.location.port + "//" + window.location.hostname;
        window.location.search = '&locale=' + locale;
    });
});

function loadJSON(url){
    var jqxhr = $.getJSON(url, function() {
            console.log( "success" );
        })
        .done(function(data) {
            translations = data.app;
        })
        .fail(function() {
            loadJSON('/javascripts/resources/messages.json');
        });

}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
}

if($.urlParam('locale')){
    var finalLocale = $.urlParam('locale');
    loadJSON('/javascripts/resources/messages_'+ finalLocale +'.json');
}else{
    loadJSON('/javascripts/resources/messages.json');
}


var i18nMixin = {
    i18n: function(key) {
        // Access the injected translations here based on this.nodeName

        return translations[key];
    }
};



/*var jqxhr = $.getJSON( "/javascripts/resources/messages_spn.json", function() {
 console.log( "success" );
 })
 .done(function(data) {
 translations = data.app;
 })
 .fail(function() {
 var jqxhr = $.getJSON( "/javascripts/resources/messages.json", function() {
 console.log( "success" );
 })
 .done(function(data) {
 translations = data.app;
 })
 .fail(function() {

 });

 });*/