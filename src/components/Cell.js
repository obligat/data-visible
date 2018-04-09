import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addColumnHeader, updateColumnHeader} from "../actions";


class Cell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<td></td>)
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = ({addColumnHeader, updateColumnHeader});


export default connect(mapStateToProps, mapDispatchToProps)(Cell);