import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Table from './components/Table';
import {resetTable, addRow, addColumnHeader, changeRow, chooseType} from "./actions";
import {connect} from "react-redux";
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import axios, {post} from 'axios';

import HighchartsExporting from 'highcharts-exporting';
import FileUpload from 'react-fileupload';

HighchartsExporting(ReactHighcharts.Highcharts);

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
            },
            uploadOptions: {
                baseUrl: 'http://127.0.0.1',
                param: {
                    fid: 0
                }
            },
            file: null
        };

        this.afterRender = this.afterRender.bind(this)
    }

    componentDidMount() {
        // var dataset = [
        //     'Categories,Tokyo,New York,Berlin,London',
        //     'Jan,7,-0.2,-0.9,3.9',
        //     'Feb,6.9,0.8,0.6,4.2',
        //     'Mar,9.5,5.7,3.5,5.7',
        //     'Apr,14.5,11.3,8.4,8.5',
        //     'May,18.2,17,13.5,11.9',
        //     'Jun,21.5,22,17,15.2',
        //     'Jul,25.2,24.8,18.6,17',
        //     'Aug,26.5,24.1,17.9,16.6',
        //     'Sep,23.3,20.1,14.3,14.2',
        //     'Oct,18.3,14.1,9,10.3',
        //     'Nov,13.9,8.6,3.9,6.6',
        //     'Dec,9.6,2.5,1,4.8'
        // ];

        // const {options} = this.props.tableData;
        // options.xAxis.categories = toData(dataset).categories;
        // // options.series = toData(dataset).series;
        // options.series = [{name: '', data: getEmptyArrByColumnLength(toData(dataset).categories.length)}];
        //
        // this.setState({
        //     options
        // });

        this.props.resetTable();
        ReactHighcharts.Highcharts.getOptions();
    }

    componentDidUpdate() {
        // this.refs['fileUpload'].filesToUpload([this.state.file])
    }

    afterRender(chart) {

    }

    handleFileUpload(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    handleClickUpload() {
        this.fileUpload(this.state.file).then((response) => {
            console.log('in response');
            console.log(response);
        })
    }

    fileUpload(file) {
        const url = 'http://127.0.0.1:3000/upload';
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        console.log(formData);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return post(url, formData, config)
    }

    render() {
        const {options, rows, chartTypes, curType} = this.props.tableData;
        // options.xAxis.categories = toData(dataset).categories;
        // // options.series = toData(dataset).series;
        // options.series = [{name: '', data: getEmptyArrByColumnLength(toData(dataset).categories.length)}];

        return (
            <div className="highed-vsplitter">

                <ReactIScroll iScroll={iScroll} className="table-container">
                    <div className="checkbox-wrapper">
                        {
                            rows.map((item, index) => <div className="checkbox-item" key={index}>
                                    <input type="checkbox"
                                           onChange={() => this.props.changeRow(index)} checked={item.checked}/>
                                </div>
                            )
                        }
                    </div>
                    <Table/>
                    <div className="highed-toolbar-right">
                        <div className="highed-ok-button highed-toolbar-button" onClick={() => this.props.addRow()}>添加行
                        </div>
                        <div className="highed-ok-button highed-toolbar-button"
                             onClick={() => this.props.addColumnHeader()}>添加列
                        </div>
                        <div className="highed-ok-button highed-toolbar-button"
                             onClick={() => this.props.resetTable()}>清空数据
                        </div>
                        {/*<div className="highed-ok-button highed-toolbar-button"
                         title="Import Google Spreadsheet">Google Sheet
                    </div>*/}
                        <div className="highed-ok-button highed-toolbar-button">
                            <input type="file" name="file" onChange={(e) => this.handleFileUpload(e)}/>
                            <button onClick={() => this.handleClickUpload()}>upload</button>
                            {/* <FileUpload options={this.state.uploadOptions} ref={(el) => this.fileUpload = el}>
                                <button ref={(el) => {
                                    this.uploadBtn = el;
                                }}>upload
                                </button>
                            </FileUpload>*/}


                        </div>

                        <div className="highed-ok-button highed-toolbar-button">导出数据</div>
                    </div>
                </ReactIScroll>

                <div className="data-show-panel">
                    <ReactHighcharts config={options} callback={this.afterRender}/>
                    <div className="chart-selection">
                        <select name="chart-type" id="type" className="highed-ok-button highed-toolbar-button"
                                value={curType} onChange={(e) => this.props.chooseType(e.target.value)}>
                            {
                                chartTypes.map((item, index) => <option value={item}
                                                                        key={index}>{optionOfType[item]}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

const optionOfType = {
    'line': '折线图',
    'bar': '条形图',
    'pie': '饼图',
    'area': '面积图',
    'scatter': '散点图'
};

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
const mapDispatchToProps = ({resetTable, addRow, addColumnHeader, changeRow, chooseType});


export default connect(mapStateToProps, mapDispatchToProps)(App);
