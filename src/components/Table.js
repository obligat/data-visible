import React, {Component} from 'react';
import THeader from './THeader';
import TBody from './TBody';
import {addRow, addColumnHeader, resetTable} from "../actions";
import {connect} from "react-redux";

class Table extends Component {
    constructor(props) {
        super(props);
    }

    handleBodyBlur(e) {
        e.currentTarget.blur();
    }

    render() {
        return (
            <div className="table-wrapper" onClick={(e) => this.handleBodyBlur(e)}>
                <THeader/>
                <TBody/>
            </div>

        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = ({addRow, addColumnHeader, resetTable});


export default connect(mapStateToProps, mapDispatchToProps)(Table);