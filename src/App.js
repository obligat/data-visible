import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import './App.css';
import Table from './components/Table';
import {resetTable} from "./actions";
import {connect} from "react-redux";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '图表标题'
                },
                xAxis: {
                    categories: ['Column1', 'Column2', 'Column3'],
                    title: {
                        text: 'X 轴标题'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Y 轴标题'
                    }
                },
                series: [{
                    name: '',
                    data: [undefined, undefined, undefined]
                }]
            }
        };

        this.afterRender = this.afterRender.bind(this)
    }

    componentDidMount() {
        var dataset = [
            'Categories,Tokyo,New York,Berlin,London',
            'Jan,7,-0.2,-0.9,3.9',
            'Feb,6.9,0.8,0.6,4.2',
            'Mar,9.5,5.7,3.5,5.7',
            'Apr,14.5,11.3,8.4,8.5',
            'May,18.2,17,13.5,11.9',
            'Jun,21.5,22,17,15.2',
            'Jul,25.2,24.8,18.6,17',
            'Aug,26.5,24.1,17.9,16.6',
            'Sep,23.3,20.1,14.3,14.2',
            'Oct,18.3,14.1,9,10.3',
            'Nov,13.9,8.6,3.9,6.6',
            'Dec,9.6,2.5,1,4.8'
        ];

        // const {options} = this.props.tableData;
        // options.xAxis.categories = toData(dataset).categories;
        // // options.series = toData(dataset).series;
        // options.series = [{name: '', data: getEmptyArrByColumnLength(toData(dataset).categories.length)}];
        //
        // this.setState({
        //     options
        // });


    }

    afterRender(chart) {

    }

    render() {
        const {options} = this.props.tableData;
        // options.xAxis.categories = toData(dataset).categories;
        // // options.series = toData(dataset).series;
        // options.series = [{name: '', data: getEmptyArrByColumnLength(toData(dataset).categories.length)}];

        return (
            <div className="highed-vsplitter">
                <div className="panel bottom highed-scrollbar">
                    <Table/>
                </div>
                <div className="data-show-panel">
                    <ReactHighcharts config={options} callback={this.afterRender}/>
                </div>
            </div>
        );
    }
}

function toData(dataset) {
    let res = {
        categories: [],
        series: []
    };

    res.categories.push(...dataset[0].split(',').slice(1));
    let rows = dataset.slice(1);
    rows.map(item => {
        let arr = item.split(',');
        res.series.push({
            name: arr[0],
            data: arr.slice(1).map(parseFloat)
        })
    });

    return res;
}

function getEmptyArrByColumnLength(length) {
    return [...new Array(length)]
}


const mapStateToProps = state => state;
const mapDispatchToProps = ({resetTable});


export default connect(mapStateToProps, mapDispatchToProps)(App);