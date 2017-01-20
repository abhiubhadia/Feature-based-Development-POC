/** Created by aubhadia on 12/10/2015. */

// Define the module.
define(["jquery", "text!components/faq.html"], function( $, faqHtml ){

        // I provide access to the FAQ modal window.
        function FAQ(){

            // Cache DOM references.
            this.dom = {};

            // When creating the detached node for the module, filter
            // out all the whitspace, text nodes, and comments that
            // come with the module.
            this.dom.target = $( faqHtml ).filter( "div.m-faq" );
            this.dom.close = this.dom.target.find( "a.close" );

            // Bind to the close link.
            this.dom.close.click( $.proxy( this, "_handleCloseClick" ) );

        }

        // Define the class methods.
        FAQ.prototype = {

            // I close the module's modal window.
            close: function(){

                // Detach the modal window - we are using detach vs.
                // remove so that we KEEP the event bindings.
                this.dom.target.detach();

            },


            // I response to internal click events on the close link.
            _handleCloseClick: function( event ){

                // Cancel the default event - not a real link.
                event.preventDefault();

                // Close the window.
                this.close();

            },


            // I open the modal window, attaching the module to the
            // given parent.
            open: function( parent ){

                parent.append( this.dom.target );

            }

        };


        // -------------------------------------------------- //
        // -------------------------------------------------- //


        // Return the module constructor.
        return( FAQ );


    }
);

