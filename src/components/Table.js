import React, {Component} from 'react';
import THeader from './THeader';
import TBody from './TBody';
import {addRow, addColumnHeader, resetTable} from "../actions";
import {connect} from "react-redux";

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="table-wrapper">
                <THeader/>
                <TBody/>
            </div>

        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = ({addRow, addColumnHeader, resetTable});


export default connect(mapStateToProps, mapDispatchToProps)(Table);