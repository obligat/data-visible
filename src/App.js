import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Table from './components/Table';
import {resetTable, addRow, addColumnHeader, changeRow, chooseType, importFile} from "./actions";
import {connect} from "react-redux";
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import axios, {post} from 'axios';
import XLSX from 'xlsx';

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

        this.afterRender = this.afterRender.bind(this);
        this.handleFile = this.handleFile.bind(this);
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

    handleFile(file/*:File*/) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type: rABS ? 'binary' : 'array'});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, {header: 1});
            /* Update state */
            this.props.importFile(data);
        };
        if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    };

    exportFile() {
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(this.state.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "sheetjs.xlsx")
    };


    handleFileUpload(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    /*  fileUpload(file) {
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
      }*/


    /* to_csv(workbook) {
         let result = [];
         workbook.SheetNames.forEach(function (sheetName) {
             let csv = XLSX.utils.make_csv(workbook.Sheets[sheetName]);
             console.log(csv);
             csv =csv.split('\n');
             if (csv.length > 0) {
                 result.push(sheetName);
                 result.push(csv);
             }
         });
         return result;
     }*/

    /*    to_csv(workbook) {
           let result = [];
           workbook.SheetNames.forEach(function(sheetName) {
               let csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
               if(csv.length > 0){
                   result.push("SHEET: " + sheetName);
                   result.push("");
                   result.push(csv);
               }
           });
           return result.join("\n");
       }
   */

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
                    <DragDropFile handleFile={this.handleFile}>

                    </DragDropFile>

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

                    <div className="highed-toolbar-right">
                        <div className="highed-ok-button highed-toolbar-button" onClick={() => this.props.addRow()}>添加行
                        </div>
                        <div className="highed-ok-button highed-toolbar-button"
                             onClick={() => this.props.addColumnHeader()}>添加列
                        </div>
                        <div className="highed-ok-button highed-toolbar-button"
                             onClick={() => this.props.resetTable()}>清空数据
                        </div>
                        <div className="highed-ok-button highed-toolbar-button"><DataInput
                            handleFile={this.handleFile}/>
                        </div>
                        <div className="highed-ok-button highed-toolbar-button">导出数据</div>
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

class DragDropFile extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    };

    suppress(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    };

    onDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const files = evt.dataTransfer.files;
        if (files && files[0]) this.props.handleFile(files[0]);
    };

    render() {
        return (
            <div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}  className="drag-container">
                {this.props.children}
            </div>
        );
    };
}

class DataInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.props.handleFile(files[0]);
    };

    render() {
        return (
            <div className="label-container">
                <label htmlFor="file">导入数据</label>
                <input type="file" className="btn-import" id="file" accept={SheetJSFT}
                       onChange={this.handleChange}/>
            </div>
        );
    };
}


const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123",
    "wb*", "wq*", "html", "htm"
].map(function (x) {
    return "." + x;
}).join(",");


const mapStateToProps = state => state;
const mapDispatchToProps = ({resetTable, addRow, addColumnHeader, changeRow, chooseType, importFile});


export default connect(mapStateToProps, mapDispatchToProps)(App);
