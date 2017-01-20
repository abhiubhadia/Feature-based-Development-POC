var portSummaryChart = React.createClass({
    getInitialState: function(){
        this.getChartData();
        return null;
    },
    getChartData: function(){
        $.ajax(
            {
                url: "/getPortChartData",
                type: "GET",
                cache: false,
                success: function (response) {
                    this.renderChart(response);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(err);
                }
            });
        return false;
    },
    renderChart:function(data){
        $('.chart-container').highcharts({
            title: {
                text: 'Monthly Average Traffic',
                x: -20 //center
            },
            subtitle: {
                text: 'Year - 2015',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Speed (GBPS)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'GBPS',
                shared: true
            },
            series: data
        });
    },
    render: function() {
        return (
            <div className="row mar-t-20">
                <div className="col-sm-12 col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h3>Port Summary</h3></div>
                        <div className="panel-body">
                            <div className="chart-container"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

document.registerReact('port-summary-chart', portSummaryChart);