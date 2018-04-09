import React, {Component} from 'react';
import Row from './Row';
import {addRow} from "../actions";
import {connect} from "react-redux";

class TBody extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {series} = this.props.tableData.options;
        return (<tbody className="highed-dtable-body">
            {
                series.map((item, index) => <Row key={index} {...item} i={index}/>)
            }
            </tbody>
        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = ({addRow});


export default connect(mapStateToProps, mapDispatchToProps)(TBody);