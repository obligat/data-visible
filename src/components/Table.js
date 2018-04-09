import React, {Component} from 'react';
import THeader from './THeader';
import TBody from './TBody';
import {addRow} from "../actions";
import {connect} from "react-redux";

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="highed-box-size highed-toolbox-user-contents">
                <div className="highed-box-size highed-fill">
                    <div className="highed-dtable-container">
                        <div className="highed-dtable-table-frame highed-scrollbar">
                            <table className="highed-dtable-table">
                                <thead className="highed-dtable-head"></thead>
                                <TBody/>
                            </table>
                        </div>


                        <div className="highed-dtable-left-bar">
                            <div className="highed-dtable-left-bar-row"><input
                                className="highed-dtable-row-select-box" type="checkbox"/></div>
                        </div>
                        <THeader/>
                        <div className="highed-dtable-top-left-panel"><input type="checkbox"/></div>

                        <div className="highed-toolbar-right">
                            <div className="highed-ok-button highed-toolbar-button"
                                 onClick={() => this.props.addRow()}>ADD
                                ROW
                            </div>
                            <div className="highed-ok-button highed-toolbar-button">CLEAR
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
            </div>
        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = ({addRow});


export default connect(mapStateToProps, mapDispatchToProps)(Table);