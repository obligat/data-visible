import React, {Component} from 'react';


export default class DataTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="highed-transition highed-toolbox highed-box-size">
                <div className="highed-toolbox-bar highed-box-size">
                    <div className="highed-box-size highed-toolbox-bar-icon fa fa-table highed-toolbox-bar-icon-sel"></div>
                    <div className="highed-box-size highed-toolbox-bar-icon fa fa-bar-chart"></div>
                    <div className="highed-box-size highed-toolbox-bar-icon fa fa-sliders"></div>
                    <div className="highed-box-size highed-toolbox-bar-icon fa fa-download"></div>
                </div>
                <div className="highed-toolbox-body highed-box-size highed-transition"
                     style={{width: 800, opacity: 1}}>
                    <div className="highed-box-size highed-toolbox-inner-body" style={{width: 800, height: 796}}>
                        <div className="highed-toolbox-body-title">Chart Data
                            <div className="highed-toolbox-help highed-icon fa fa-question-circle"
                                 style={{display: "block"}}></div>
                        </div>
                        <div className="highed-box-size highed-toolbox-user-contents">
                            <div className="highed-box-size highed-fill">
                                <div className="highed-box-size highed-dtable-gsheet-frame">
                                    <div className="highed-box-size highed-prettyscroll highed-dtable-gsheet">
                                        <div className="highed-dtable-gsheet-heading">Google Spreadsheet</div>
                                        <div className="highed-dtable-gsheet-inner">
                                            <div className="highed-dtable-gsheet-label">Google Spreadsheet ID</div>
                                            <div><input className="highed-box-size highed-dtable-gsheet-id"
                                                        placeholder="Spreadsheet ID"/></div>
                                            <div className="highed-dtable-gsheet-label">Worksheet</div>
                                            <div><input className="highed-box-size highed-dtable-gsheet-id"
                                                        placeholder="Worksheet (leave blank for first)"/></div>
                                            <table className="highed-stretch">
                                                <tr>
                                                    <td className="highed-dtable-gsheet-label">Start Row</td>
                                                    <td className="highed-dtable-gsheet-label">End Row</td>
                                                </tr>
                                                <tr>
                                                    <td className=""><input
                                                        className="highed-box-size highed-dtable-gsheet-id"/>
                                                    </td>
                                                    <td className=""><input
                                                        className="highed-box-size highed-dtable-gsheet-id"/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="highed-dtable-gsheet-label">Start Column</td>
                                                    <td className="highed-dtable-gsheet-label">End Column</td>
                                                </tr>
                                                <tr>
                                                    <td className=""><input
                                                        className="highed-box-size highed-dtable-gsheet-id"/>
                                                    </td>
                                                    <td className=""><input
                                                        className="highed-box-size highed-dtable-gsheet-id"/>
                                                    </td>
                                                </tr>
                                            </table>
                                            <div>
                                                <button className="highed-ok-button highed-dtable-gsheet-button">Load
                                                    Spreadsheet
                                                </button>
                                                <button className="highed-ok-button highed-dtable-gsheet-button">Detach
                                                    Sheet From Chart
                                                </button>
                                            </div>
                                            {/*<div className="">When using Google Spreadsheet, Highcharts references the*/}
                                            {/*sheet*/}
                                            {/*directly.<br><br> This means that the published chart always loads the*/}
                                            {/*latest version of the sheet.<br><br> For more information on how to*/}
                                            {/*set up your spreadsheet, visit <a target="_blank"*/}
                                            {/*href="https://www.highcharts.com/cloud/import-data/how-to-set-up-a-google-spreadsheet-file">the*/}
                                            {/*documentation</a>.*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="highed-dtable-container">
                                    <div className="highed-dtable-table-frame highed-scrollbar"
                                         style={{height: 676, width: 740}}>
                                        <table className="highed-dtable-table" cellpadding="0" cellspacing="0"
                                               style={{width: 740}}>
                                            <colgroup>
                                                <col width="140" style={{width: 140}}/>
                                                <col width="140" style={{width: 140}}/>
                                                <col/>
                                            </colgroup>
                                            <thead className="highed-dtable-head"></thead>
                                            <tbody className="highed-dtable-body">
                                            <tr className="highed-dtable-body-selected-row">
                                                <td>
                                                    <div className="highed-dtable-col-val"></div>
                                                    <textarea className="highed-dtable-input"></textarea></td>
                                                <td>
                                                    <div className="highed-dtable-col-val"></div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div className="highed-dtable-table-tail">Only the first 500 rows are shown.
                                        </div>
                                        {/* <div className="highed-dtable-drop-zone highed-transition"
                                             style="opacity: 1;">DROP
                                            CSV FILES HERE OR ON THE TABLE!<br><span
                                                className="highed-dtable-drop-zone-small">...you can also paste CSV or Excel data into any cell</span>
                                        </div>*/}
                                    </div>
                                    <div className="highed-dtable-left-bar">
                                        <div className="highed-dtable-left-bar-row"><input
                                            className="highed-dtable-row-select-box" type="checkbox"/></div>
                                    </div>
                                    <div className="highed-dtable-top-bar"><span className="highed-dtable-top-bar-col"
                                                                                 style={{width: 140}}><div
                                        className="">Column 1</div><div
                                        className="highed-dtable-top-bar-col-options fa fa-chevron-down"></div><div
                                        className="highed-dtable-resize-handle"></div></span><span
                                        className="highed-dtable-top-bar-col" style={{width: 140}}><div
                                        className="">Column 2</div><div
                                        className="highed-dtable-top-bar-col-options fa fa-chevron-down"></div><div
                                        className="highed-dtable-resize-handle"></div></span></div>
                                    <div className="highed-dtable-top-left-panel"><input type="checkbox"/></div>
                                    <div className="highed-toolbar highed-dtable-toolbar">
                                        <div className="highed-toolbar-left">
                                            <div className="highed-dtable-toolbar-label">With Selection:</div>
                                            <div className="icon highed-icon fa fa-trash" title="Delete row(s)"></div>
                                        </div>
                                        <div className="highed-toolbar-center"></div>
                                        <div className="highed-toolbar-right">
                                            <div className="highed-ok-button highed-toolbar-button" title="Add row">ADD
                                                ROW
                                            </div>
                                            <div className="highed-ok-button highed-toolbar-button" title="Reset">CLEAR
                                                DATA
                                            </div>
                                            <div className="highed-ok-button highed-toolbar-button"
                                                 title="Import Google Spreadsheet">Google Sheet
                                            </div>
                                            <div className="highed-ok-button highed-toolbar-button"
                                                 title="Download data">EXPORT DATA
                                            </div>
                                            <div className="highed-ok-button highed-toolbar-button"
                                                 title="undefined">IMPORT
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="highed-dtable-weird-data highed-box-size highed-errobar-body">
                                    <div className="highed-dtable-weird-data-body">Uh-oh! It looks like our data
                                        importer
                                        may have had some issues processing your data. Usually this means that we were
                                        unable to deduce how the columns are separated.
                                    </div>
                                    <button className="highed-ok-button">No, this looks right</button>
                                    <button className="highed-ok-button">Yeah, this looks wrong</button>
                                </div>
                                <div className="highed-dtable-load-indicator">Loading Data...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}