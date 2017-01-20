/**
 * Created by aubhadia on 12/10/2015.
 */

// Set up the paths for the application.
//var chartColors = ['#e5412d', '#f0ad4e', '#444', '#888','#555','#999','#bbb','#ccc','#eee'];
requirejs.config({
    paths: {
        "webcomponentjs": "bower_components/webcomponentsjs/webcomponents",
        "jquery": "bower_components/jquery/dist/jquery.min",
        "bootstrap": "bower_components/bootstrap/dist/js/bootstrap",
        "bootstrapSelect":"bower_components/bootstrap-select/dist/js/bootstrap-select",
        "bootstrapDatePicker":"bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker",
        "domReady": "bower_components/requirejs/domReady",
        "bootstrapMaterial": "bower_components/bootstrap-material-design/dist/js/material.min",
        "bootstrapMaterialRipple": "bower_components/bootstrap-material-design/dist/js/ripples.min",
        "d3": "bower_components/d3/d3.min",
        "components": "../components",
        "text": "bower_components/requirejs/text",
        "raphael":"http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min",
        "morris":"https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris",
        "charts":"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min",
        "views": "views"
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'bootstrapSelect': {
            deps: ['bootstrap'],
            exports: 'bootstrap-select'
        },
        'bootstrapMaterialRipple' :{
            deps: ['bootstrapMaterial'],
            exports: 'ripples'
        },
        'bootstrapMaterial' :{
            deps: ['bootstrap'],
            exports: 'material'
        },
        morris:{
            deps:['jquery','raphael'],
            exports:'Morris'
        },
        charts:{
           exports:"Chart"
        }
    }

});

// Run the scripts when the DOM-READY event has fired.
require(
    [
        "webcomponentjs",
        "jquery",
        "bootstrap",
        "bootstrapSelect",
        "bootstrapDatePicker",
        "domReady!",
        "bootstrapMaterialRipple",
        "bootstrapMaterial",
        "d3",
        "raphael",
        "morris"
    ],
    function(webcomponentjs,$,bootstrap,bootstrapSelect,bootstrapDatePicker, bootstrapMaterial, bootstrapMaterialRipple,d3){

        // Since the Help / FAQ module is probably going to be rarely
        // used by the user, I don't want to bother loading it as
        // part of the initial page load. As such, I'll lazy-load it
        // when the "launch" link is clicked.
        (function(){

            // Our FAQ module will start out as null until loaded.
            // And, it's not loaded until it's first needed.
            var faq = null;
            var body = $( "body" );
            var launchFaq = $( "p.m-help a" );
            var divTag = $("#faq");
            // I load the FAQ module the first time it is needed.
            var handleClick = function( event ){

                event.preventDefault();

                // Check to see if the FAQ module is currently being
                // lazily loaded.
                if (faq === "loading"){

                    // Ignore this click - when the module finallly
                    // loads, it will open the module.
                    return;

                }

                // Check to see if the module has been loaded.
                if (faq !== null){

                    // Open the FAQ module for a subsequent time.
                    faq.open( divTag );

                    // The module is unloaded and unrequested. Let's load
                    // it for the first time and then open it.
                } else {

                    // Set an intermediary value to the faq module so
                    // that subsequent requests don't try to launch
                    // the module more than once.
                    faq = "loading";

                    // Load the FAQ module.
                    require([ "views/faq" ], function( FAQ ){

                            // Create and cache an instance of the
                            // FAQ module.
                            faq = new FAQ();

                            // Open the FAQ module for the FIRST time.
                            faq.open( divTag );

                        }
                    );

                }

            };

            // Bind the click-handler for the help link.
            launchFaq.click( handleClick );

            //Initialising material design
            $.material.init();
        })();


    }
);

