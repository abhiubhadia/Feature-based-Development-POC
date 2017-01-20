/**
 * Created by aubhadia on 12/15/2015.
 */
var logger=require('../utils/loggerUtils');
var cages={
    Brazil: [
        {
            "id": 1,
            "name": "Brazil C-1",
            "country": "Brazil",
            "ip_address": "199.208.75.236"
        },
        {
            "id": 2,
            "name": "Brazil C-2",
            "country": "Brazil",
            "ip_address": "68.223.161.187"
        }],
    China: [
        {
            "id": 3,
            "name": "China C-1",
            "country": "China",
            "ip_address": "194.249.45.152"
        }],
    Greece: [
        {
            "id": 3,
            "name": "Greece C-1",
            "country": "Greece",
            "ip_address": "194.249.45.153"
        }],
    France: [
        {
            "id": 4,
            "name": "France C-1",
            "country": "France",
            "ip_address": "201.61.64.72"
        },
        {
            "id": 5,
            "name": "France C-5",
            "country": "France",
            "ip_address": "120.60.191.123"
        }]
};

exports.renderIndexPage = function (req, res) {
    res.render('index');
};

exports.getIbxList = function(req,res){
    var ibxList=[{
        "id": 1,
        "name": "PEANUT",
        "about": "Injury oculomotor nerve",
        "active": false,
        "country": "Brazil",
        "ip_address": "199.208.75.236"
    }, {
        "id": 2,
        "name": "ELF SPF 45 Sunscreen UVA/UVB Protection",
        "about": "Prim thrombocytopen NEC",
        "active": false,
        "country": "China",
        "ip_address": "68.223.161.187"
    }, {
        "id": 3,
        "name": "CEFOTAXIME",
        "about": "Screen for condition NOS",
        "active": true,
        "country": "France",
        "ip_address": "194.249.45.153"
    }, {
        "id": 4,
        "name": "Flu-Cold",
        "about": "Ot VD chlm trch prtoneum",
        "active": false,
        "country": "Greece",
        "ip_address": "201.61.64.72"
    }];
    res.send(ibxList)
};

exports.getDescription=function(req,res){
    var sample={
        name: 'Lorem Ipsum',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    };
    res.send(sample);
};
var workVisitList = [{
    "id": 1,
    "ibxname": "Brazil",
    "cage":"Brazil C-1",
    "start_date" : "12/15/2015",
    "end_date":"12/16/2015",
    "Name":"Smith",
    "message": "Equipment installation"
}, {
    "id": 2,
    "ibxname": "China",
    "cage":"China C-1",
    "start_date" : "12/15/2015",
    "end_date":"12/16/2015",
    "Name":"Smith",
    "message": "Normal visit"
}, {
    "id": 3,
    "ibxname": "France",
    "cage":"France C-1",
    "start_date" : "12/15/2015",
    "end_date":"12/16/2015",
    "Name":"Smith",
    "message": "Inspection"
}, {
    "id": 4,
    "ibxname": "Brazil",
    "cage":"Brazil C-1",
    "start_date" : "12/15/2015",
    "end_date":"12/16/2015",
    "Name":"Smith",
    "message": "Equipment installation"
}, {
    "id": 5,
    "ibxname": "Greece",
    "cage":"Greece C-1",
    "start_date" : "12/15/2015",
    "end_date":"12/16/2015",
    "Name":"Smith",
    "message": "Check status"
}];

var donutData=[{"type":"ECX","count":24},{"type":"ECP","count":5},{"type":"IBX","count":8}];

exports.getWorkVisitList = function(req,res) {
    res.send(workVisitList);
};

exports.getCages=function(req,res){
    var response=cages[req.query.ibx];
    console.log(response);

    res.send(response);
};

exports.getWorkVisitById=function(req,res){
    var visitId=req.query.workVisitId;
    if(visitId>=workVisitList.length){
        var resp=workVisitList[length-1];
    }else{
        var resp=workVisitList[visitId-1];
    }
    res.send(resp);
};

exports.getCabins=function(req,res){
var cabins=[{
    "id": 1,
    "name": "011"
}, {
    "id": 2,
    "name": "012"
}, {
    "id": 3,
    "name": "021"
}, {
    "id": 4,
    "name": "022"
}, {
    "id": 5,
    "name": "031"
}]
    res.send(cabins)
};
exports.submitIbxForm=function(req,res){
    console.log("Inside ibx form: "+JSON.stringify(req.body));
    workVisitList.push(req.body);
    res.send(workVisitList);
};

var smartHandsList=[];
exports.submitSmartHandRequest=function(req,res){
    console.log(req.body);
    smartHandsList.push(req.body);
    res.send(smartHandsList);
};

exports.getOrderData=function(req,res){
    console.log("inside the get order data");
    res.send(donutData);
};
exports.getMetroList = function(req,res){
    var metroList=[{
        "id": 1,
        "name": "Ashburn"
    }, {
        "id": 2,
        "name": "Hong Kong"
    }, {
        "id": 3,
        "name": "London"
    }, {
        "id": 4,
        "name": "paris"
    }, {
        "id": 5,
        "name": "Silicon Valley"
    }, {
        "id": 6,
        "name": "Singapore"
    }, {
        "id": 7,
        "name": "Zurich"
    }];
    res.send(metroList)
};

exports.getServicesByMetro = function(req,res){
    var serviceList={
        1: [
            {
                "value":2,
                "name":"AWS Direct Connect",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":1,
                "name":"Azure ExpressRoute",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },{
                "value":838,
                "name":"Azure Gov",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            }
        ],
        2: [
            {
                "value":1,
                "name":"Azure ExpressRoute",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            }
        ],
        3: [
            {
                "value":2,
                "name":"AWS Direct Connect",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":1,
                "name":"Azure ExpressRoute",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },{
                "value":492,
                "name":"Sandbox CSP Layer 2 SV LD SG",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            }
        ],
        4: [],
        5: [
            {
                "value":2,
                "name":"AWS Direct Connect",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":786,
                "name":"AWS-Layer3-SF",
                "service_type_layer":"L3",
                "availability_state":"AVAILABLE",
                "csp_description":"<p>Linke<br/></p>"
            },
            {
                "value":1,
                "name":"Azure ExpressRoute",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":494,
                "name":"GoogleLayer3profile",
                "service_type_layer":"L3",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":496,
                "name":"L3Google3",
                "service_type_layer":"L3",
                "availability_state":"AVAILABLE",
                "csp_description":"<p><a href=\"http://www.equinix.com\" target=\"_blank\">http://www.equinix.com</a><br/></p>"
            },
            {
                "value":493,
                "name":"SB Layer 2 Service profile for SV alone",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":492,
                "name":"Sandbox CSP Layer 2 SV LD SG",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":497,
                "name":"Test Gen CSP",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":836,
                "name":"Testing Profile ECX API 1",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":837,
                "name":"Testing Profile ECX API 2",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":835,
                "name":"Testing Profile PSD 2.7",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":495,
                "name":"goolelayer3profile2",
                "service_type_layer":"L3",
                "availability_state":"AVAILABLE",
                "csp_description":"<p>tyy<a href=\"http://www.equinix.com\" target=\"_blank\">http://www.equinix.com</a></p>"
            }
        ],
        6 : [
            {
                "value":2,
                "name":"AWS Direct Connect",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":1,
                "name":"Azure ExpressRoute",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            },
            {
                "value":492,
                "name":"Sandbox CSP Layer 2 SV LD SG",
                "service_type_layer":"L2",
                "availability_state":"AVAILABLE",
                "csp_description":null
            }
        ],
        7 : []
    };

    var response=serviceList[req.query.metro];
    res.send(response);
};

exports.getPortsByMetro = function(req,res) {
    var ports = [{
        "value": "100130310",
        "name": "SB-LD1-CX-LAYER3-0",
        "speed": 10000000000,
        "buyOutPortFlag": "Y",
        "encapsulation": "Dot1q",
        "aggSpeed": 10000000000,
        "switch_name": "SB2.LD1",
        "ibx_name": "LD1",
        "layer3": true
    }, {
        "value": "100130311",
        "name": "SB-LD1-CX-LAYER3-1",
        "speed": 1000000000,
        "buyOutPortFlag": "Y",
        "encapsulation": "Dot1q",
        "aggSpeed": 1000000000,
        "switch_name": "SB1.LD1",
        "ibx_name": "LD1",
        "layer3": true
    }, {
        "value": "100130312",
        "name": "SB-LD1-CX-LAYER3-2",
        "speed": 10000000000,
        "buyOutPortFlag": "Y",
        "encapsulation": "Qinq",
        "aggSpeed": 10000000000,
        "switch_name": "SB2.LD1",
        "ibx_name": "LD1",
        "layer3": false
    }, {
        "value": "100130313",
        "name": "SB-LD1-CX-LAYER3-3",
        "speed": 1000000000,
        "buyOutPortFlag": "Y",
        "encapsulation": "Qinq",
        "aggSpeed": 1000000000,
        "switch_name": "SB1.LD1",
        "ibx_name": "LD1",
        "layer3": false
    }, {
        "value": "100130324",
        "name": "SB-LD1-CX-LAYER2-4",
        "speed": 10000000000,
        "buyOutPortFlag": "N",
        "encapsulation": "Dot1q",
        "aggSpeed": 10000000000,
        "switch_name": "SB1.LD1",
        "ibx_name": "LD1",
        "layer3": false
    }, {
        "value": "100130325",
        "name": "SB-LD1-CX-LAYER2-5",
        "speed": 1000000000,
        "buyOutPortFlag": "N",
        "encapsulation": "Dot1q",
        "aggSpeed": 1000000000,
        "switch_name": "SB1.LD1",
        "ibx_name": "LD1",
        "layer3": false
    }, {
        "value": "100130326",
        "name": "SB-LD1-CX-LAYER2-6",
        "speed": 10000000000,
        "buyOutPortFlag": "N",
        "encapsulation": "Qinq",
        "aggSpeed": 10000000000,
        "switch_name": "SB1.LD1",
        "ibx_name": "LD1",
        "layer3": false
    }, {
        "value": "100130327",
        "name": "SB-LD1-CX-LAYER2-7",
        "speed": 1000000000,
        "buyOutPortFlag": "N",
        "encapsulation": "Qinq",
        "aggSpeed": 1000000000,
        "switch_name": "SB1.LD1",
        "ibx_name": "LD1",
        "layer3": false
    }];

    res.send(ports);
};

var vcList = [{
    "serviceType": "Azure ExpressRoute (Layer 2 Virtual Circuit)",
    "metro":"Ashburn",
    "primaryServiceName" : "first service",
    "primaryASidePort":"SB-LD1-CX-LAYER2-7",
    "primaryAsideId":"VLANID",
    "secondryServiceName": "second service",
    "secondryASidePort": "SB-LD1-CX-LAYER2-6",
    "serviceKeyZside": "XATY1231WERESD",
    "virtualCircuitSpeed": "Up to 200 Mbps",
    "email": "a@equinix.com"
    },
    {
        "serviceType": "Azure ExpressRoute (Layer 2 Virtual Circuit)",
        "metro":"Ashburn",
        "primaryServiceName" : "first service",
        "primaryASidePort":"SB-LD1-CX-LAYER2-7",
        "primaryAsideId":"VLANID",
        "secondryServiceName": "second service",
        "secondryASidePort": "SB-LD1-CX-LAYER2-6",
        "serviceKeyZside": "XATY1231WERESD",
        "virtualCircuitSpeed": "Up to 200 Mbps",
        "email": "a@equinix.com"
    }];

exports.getVcList = function(req,res) {
    res.send(vcList);
};

exports.createVirtualCircuit = function(req,res){
    console.log(JSON.stringify(req.body));
    vcList.push(req.body);
    res.send(vcList);
};

var portSummary={
    'header':['Location','Port','Cu.In','Cu.Out','Avg.In','Avg.Out','Max.In','Max.Out'],
    'data':[{
        'location':'Ashburn',
        'port':'Equinix-EU-DC2-IX-01',
        'cIn':'9 Mbps',
        'cOut':'70 Mbps',
        'aOut':'45 Mbps',
        'aIn':'63 Mbps',
        'maxIn':'284 Mbps',
        'maxOut':'126 Mbps'
    },{
        'location':'Chicago',
        'port':'YourOrg-EU-DC2-IX-01',
        'cIn':'90 Mbps',
        'cOut':'170 Mbps',
        'aOut':'45 Mbps',
        'aIn':'63 Mbps',
        'maxIn':'28 Mbps',
        'maxOut':'12 Mbps'
    },{
        'location':'Ashburn',
        'port':'Equinix-EU-DC2-IX-01',
        'cIn':'0 Mbps',
        'cOut':'0 Mbps',
        'aOut':'45 Mbps',
        'aIn':'63 Mbps',
        'maxIn':'284 Mbps',
        'maxOut':'126 Mbps'
    },{
        'location':'San Jose',
        'port':'Equinix-EU-IX-01',
        'cIn':'90 Mbps',
        'cOut':'700 Mbps',
        'aOut':'458 Mbps',
        'aIn':'631 Mbps',
        'maxIn':'284 Mbps',
        'maxOut':'126 Mbps'
    },{
        'location':'San Francisco',
        'port':'YourOrg-EU-DC2-20',
        'cIn':'90 Mbps',
        'cOut':'170 Mbps',
        'aOut':'45 Mbps',
        'aIn':'63 Mbps',
        'maxIn':'28 Mbps',
        'maxOut':'12 Mbps'
    },{
        'location':'New York',
        'port':'Equinix-NY-DC2-IX-01',
        'cIn':'0 Mbps',
        'cOut':'0 Mbps',
        'aOut':'45 Mbps',
        'aIn':'63 Mbps',
        'maxIn':'284 Mbps',
        'maxOut':'126 Mbps'
    }]
};

exports.getPortSummary = function(req,res){
res.send(portSummary)
};

exports.getAreaChart=function(req,res){
var data=[
    { y: '2009', a: 75,  b: 65 , c:100 },
    { y: '2010', a: 50,  b: 40 , c:80 },
    { y: '2011', a: 75,  b: 65 , c: 60},
    { y: '2012', a: 100, b: 90 , c: 120},
    { y: '2013', a: 100, b: 90 , c:200},
    { y: '2014', a: 75,  b: 65 , c: 160},
    { y: '2015', a: 50,  b: 40 , c: 180}
];
    res.send(data);
};

exports.getBarChart=function(req,res){
    var data=[
        { y: '2009', a: 75,  b: 65 },
        { y: '2010', a: 50,  b: 40 },
        { y: '2011', a: 75,  b: 65 },
        { y: '2012', a: 100, b: 90 },
        { y: '2013', a: 100, b: 90 },
        { y: '2014', a: 75,  b: 65 },
        { y: '2015', a: 50,  b: 40 }
    ];
    res.send(data);
};

exports.getDonutChart=function(req,res){
    var data=[
        {label: "Asia Sales", value: 50},
        {label: "Europe Sales", value: 25},
        {label: "North America Sales", value: 5},
        {label: "South America Sales", value: 10}
    ];
    res.send(data);
};

exports.getLineChart=function(req,res){
    var data=[
        { y: '2006', a: 130, b: 90 , c: 110},
        { y: '2007', a: 95,  b: 65 , c: 115},
        { y: '2008', a: 70,  b: 40 , c: 90},
        { y: '2009', a: 75,  b: 65 , c: 145},
        { y: '2010', a: 20,  b: 40 , c: 60},
        { y: '2011', a: 75,  b: 65 , c: 10},
        { y: '2012', a: 10, b: 90 , c: 100}
    ];
    res.send(data);
};

var portSummaryData=[{
    name: 'Maximum Outbound',
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
}, {
    name: 'Maximum Inbound',
    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
}, {
    name: 'Average Outbound',
    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
}, {
    name: 'Average Inbound',
    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
}]

exports.getPortChartData=function(req,res){
    res.send(portSummaryData);
};

exports.getHighAreaChart=function(req,res){
    var data = [{
        name: 'North America',
        data: [75,50,75,100,100,75,50]
    }, {
        name: 'Europe',
        data: [65,40,64,90,90,65,40]
    }, {
        name: 'Asia',
        data: [100,80,60,120,200,165,140]
    }]
    res.send(data);
};

exports.getLocationList =function(req,res){
    var locationList = [{
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

    res.send(locationList);
};