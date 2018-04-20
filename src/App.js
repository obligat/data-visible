import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Table from './components/Table';
import {
    resetTable,
    addRow,
    addColumnHeader,
    changeRow,
    chooseType,
    importFile,
    exportFile,
    chooseAllColumns,
    chooseAllRows,
    cancelAllColumns,
    cancelAllRows
} from "./actions";
import {connect} from "react-redux";
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import XLSX from 'xlsx';

import HighchartsExporting from 'highcharts-exporting';

HighchartsExporting(ReactHighcharts.Highcharts);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: null
        };

        this.afterRender = this.afterRender.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        this.props.resetTable();
        ReactHighcharts.Highcharts.getOptions();
    }

    componentDidUpdate() {
    }

    afterRender(chart) {

    }

    handleFile(file) {
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
            this.props.importFile(data);
        };
        if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    };

    handleFileUpload(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    render() {
        const {options, columns, rows, chartTypes, curType} = this.props.tableData;

        let isCheckedAllCols, isCheckedAllRows;
        isCheckedAllCols = columns.every(item => item.checked === true);
        isCheckedAllRows = rows.every(item => item.checked === true);

        return (
            <div className="highed-vsplitter">

                <ReactIScroll iScroll={iScroll} className="table-container">
                    <div className="choose-all-checkbox">
                        <input type="checkbox" checked={isCheckedAllCols}
                               onChange={isCheckedAllCols ? () => this.props.cancelAllColumns() : () => this.props.chooseAllColumns()}/>
                        <input type="checkbox" checked={isCheckedAllRows}
                               onChange={isCheckedAllRows ? () => this.props.cancelAllRows() : () => this.props.chooseAllRows()}/>
                    </div>
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
                    <DragDropFile handleFile={this.handleFile}>

                    </DragDropFile>

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
                        <div className="highed-ok-button highed-toolbar-button"
                             onClick={() => this.props.exportFile()}>导出数据
                        </div>
                    </div>
                </div>
            </div>
        );
    }
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
            <div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress} className="drag-container">
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


const optionOfType = {
    'line': '折线图',
    'bar': '条形图',
    'pie': '饼图',
    'area': '面积图',
    'scatter': '散点图'
};


const mapStateToProps = state => state;
const mapDispatchToProps = ({
    resetTable,
    addRow,
    addColumnHeader,
    changeRow,
    chooseType,
    importFile,
    exportFile,
    chooseAllColumns,
    chooseAllRows,
    cancelAllColumns,
    cancelAllRows
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
