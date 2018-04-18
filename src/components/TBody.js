import React, {Component} from 'react';
import Row from './Row';
import {addRow} from "../actions";
import {connect} from "react-redux";

class TBody extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {rows} = this.props.tableData;
        return (<div className="row-body">
                {
                    rows.map((item, index) => <Row key={index} {...item} i={index}/>)
                }
            </div>
        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = ({addRow});


export default connect(mapStateToProps, mapDispatchToProps)(TBody);