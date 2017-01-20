var portSummary = React.createClass({
    getInitialState: function(){
        this.getPortSummaryData();
        return ({header:[],portData:[]});
    },
    getPortSummaryData: function(){
        $.ajax(
            {
                url: "/getPortSummary",
                type: "GET",
                cache: false,
                success: function (response) {
                   console.log(response);
                    this.setState({header:response.header});
                    this.setState({portData:response.data});
                    this.forceUpdate();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(err);
                }
            });
        return false;
    },
    render: function() {
        console.log("Tag Children: "+this.props.children);
        var header=this.state.header;
        var portData=this.state.portData;
        console.log(header.length);

        var headerDisplay = header.map(function (headerTitle, index) {
            return (
                <th key={index}>{headerTitle}</th>
            )

        });

        var portDataDisplay = portData.map(function(eachPort,index){
            return(
                <tr key={index} id={index}>
                    <td>{eachPort.location}</td>
                    <td>{eachPort.port}</td>
                    <td>{eachPort.cIn}</td>
                    <td>{eachPort.cOut}</td>
                    <td>{eachPort.aIn}</td>
                    <td>{eachPort.aOut}</td>
                    <td>{eachPort.maxIn}</td>
                    <td>{eachPort.maxOut}</td>
                </tr>
            )

        });
        return (
            <div className="row mar-t-20">
                <div className="col-sm-12 col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h3>Port Summary</h3></div>
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            {(typeof headerDisplay !=undefined)?headerDisplay:""}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(typeof portDataDisplay !=undefined)?portDataDisplay:""}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

document.registerReact('port-summary', portSummary);