(function(app) {
    app.AppComponent =
        ng.core.Component({
                selector: 'location-list',
                templateUrl: 'http://localhost:3000/provider/getWebComponent/web_components/location-list/template.html',
                styles:['.locationName{color:#08C;}']
            })
            .Class({
                range : function(){
                    return function(input, total) {
                        total = parseInt(total);
                        for (var i=0; i<total; i++)
                            input.push(i);
                        return input;
                    };
                },
                constructor: function() {
                    this.http = ng.http.Http;
                    this.panelHeader = "Locations";
                    this.dataCenters = [{
                        locationName : "Silicon Valley",
                        locationAddress:[{
                            id : "SV1",
                            name : "Equinix SV1",
                            street : "11 Great Oaks Blvd",
                            locality : "San Jose",
                            state : "CA",
                            postalCode : "95119",
                            telephone : "(800) 322-9280"
                        },
                        {
                            id : "SV2",
                            name : "Equinix SV2",
                            street : "1350 Duane Ave",
                            locality : "Santa Clara",
                            state : "CA",
                            postalCode : "95054",
                            telephone : "(800) 322-9280"
                        },
                        {
                            id : "SV3",
                            name : "Equinix SV3",
                            street : "1735 Lundy Ave",
                            locality : "San Jose",
                            state : "CA",
                            postalCode : "95131",
                            telephone : "(800) 322-9280"
                        },
                        {
                            id : "SV4",
                            name : "Equinix SV4",
                            street : "255 Caspian Drive",
                            locality : "Sunnyvale",
                            state : "CA",
                            postalCode : "94089",
                            telephone : "(800) 322-9280"
                        },
                        {
                            id : "SV5",
                            name : "Equinix SV5",
                            street : "9 Great Oaks Blvd",
                            locality : "San Jose",
                            state : "CA",
                            postalCode : "95119",
                            telephone : "(800) 322-9280"
                        },
                        {
                            id : "SV6",
                            name : "Equinix SV6",
                            street : "444 Toyama Drive",
                            locality : "Sunnyvale",
                            state : "CA",
                            postalCode : "94089",
                            telephone : "(800) 322-9280"
                        },
                        {
                            id : "SV8",
                            name : "Equinix SV8",
                            street : "529 Bryant St",
                            locality : "Palo Alto",
                            state : "CA",
                            postalCode : "94301",
                            telephone : "(800) 322-9280"
                        }]
                    },
                    {
                        locationName : "London",
                        locationAddress:[
                            {
                            id : "LD1",
                            name : "Equinix LD1",
                            street : "101 Finsbury Pavement",
                            locality : "London",
                            state : "UK",
                            telephone : "845.373.2999"
                            },
                            {
                                id : "LD2",
                                name : "Equinix LD2",
                                street : "1350 Duane Ave",
                                locality : "London",
                                state : "UL",
                                postalCode : "95054",
                                telephone : "(800) 322-9280"
                            },
                            {
                                id : "LD3",
                                name : "Equinix LD3",
                                street : "1735 Lundy Ave",
                                locality : "London",
                                state : "UK",
                                postalCode : "95131",
                                telephone : "(800) 322-9280"
                            },
                            {
                                id : "LD4",
                                name : "Equinix LD4",
                                street : "255 Caspian Drive",
                                locality : "London",
                                state : "UK",
                                postalCode : "94089",
                                telephone : "(800) 322-9280"
                            }]

                    }
                    ]
                }
            });
})(window.app || (window.app = {}));