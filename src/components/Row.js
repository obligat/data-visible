import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateRowName, updateRowData} from "../actions";

class Row extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocusName: false,
            curIndex: null,
            value: null
        };
    }

    handleUpdateRowData(e, index) {
        this.setState({
            curIndex: index,
            value: e.target.value,
        });
    }

    handleUpdateRowName(e, i) {
        this.setState({
            isFocusName: true,
            curIndex: null
        });

        this.props.updateRowName(i, e.target.value)
    }

    handleInputBlur(e, i, index) {

        const {value} = this.state;

        this.setState({
            isFocusName: false,
            curIndex: null,
            value: null
        });

        if (index >= 0) {
            this.props.updateRowData(i, index, parseFloat(value))
        }

    }

    render() {
        const {name, data, i} = this.props;
        const {isFocusName, curIndex, value} = this.state;

        return (<tr className="highed-dtable-body-selected-row">
            <td><input className={isFocusName ? 'highed-dtable-input' : 'highed-dtable-col-val'} value={name}
                       onChange={(e) => this.handleUpdateRowName(e, i)}
                       onBlur={() => this.handleInputBlur()}
            /></td>

            {
                data.map((item, index) => {
                    return <td key={index}>
                        <input className={curIndex === index ? 'highed-dtable-input' : 'highed-dtable-col-val'}
                               value={curIndex === index ? value : item}
                               onChange={(e) => this.handleUpdateRowData(e, index)}
                               onBlur={(e) => this.handleInputBlur(e, i, index)}
                        />
                    </td>
                })
            }

        </tr>)
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = ({updateRowName, updateRowData});


export default connect(mapStateToProps, mapDispatchToProps)(Row);