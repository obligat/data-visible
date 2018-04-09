import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addColumnHeader, updateColumnHeader} from '../actions';

class Theader extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {xAxis} = this.props.tableData.options;

        return (
            <div className="highed-dtable-top-bar">
                <span className="highed-dtable-top-bar-col" style={{width: 140}}>
                       <div className="">Categories</div>
                 </span>
                {
                    xAxis.categories.map((item, index) => {
                        return (<span key={index} className="highed-dtable-top-bar-col" style={{width: 140}}>
                            <input className="highed-dtable-input highed-dtable-input-header"
                                   onChange={(e) => this.props.updateColumnHeader(index, e.target.value)}
                                   value={item}/>
                         </span>)
                    })
                }
                <a className="highed-dtable-top-bar-col" style={{border: 'none'}}>
                    <i className="fa fa-plus-circle fa-2x" onClick={() => this.props.addColumnHeader()}></i>
                </a>
            </div>
        )
    }

}

const mapStateToProps = state => state;
const mapDispatchToProps = ({addColumnHeader, updateColumnHeader});


export default connect(mapStateToProps, mapDispatchToProps)(Theader);