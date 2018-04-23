import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateColumnHeader, changeColumn} from '../actions';

class Theader extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {columns, colName} = this.props.tableData;

        return (
            <div className="row-header">
                <div className="row-header-th"><input
                    className="row-header-th-input"
                    value={colName} readOnly/></div>
                {
                    columns.map((item, index) => {
                        return (<div key={index} className="row-header-th">
                            <i className="fa fas fa-bolt icon-bolt icon-bolt-focus"></i>
                            <input type="text" className="row-header-th-input"
                                   onChange={(e) => this.props.updateColumnHeader(index, e.target.value)}
                                   value={item.type}/>
                            <input type="checkbox" className="row-header-th-checkbox" checked={item.checked}
                                   onChange={() => this.props.changeColumn(index)}/>
                        </div>)
                    })
                }
            </div>
        )
    }

}

const mapStateToProps = state => state;
const mapDispatchToProps = ({updateColumnHeader, changeColumn});


export default connect(mapStateToProps, mapDispatchToProps)(Theader);