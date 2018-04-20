import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateRowName, updateRowData, changeRow} from "../actions";

class Row extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocusName: false,
            curIndex: undefined,
            value: undefined
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
            curIndex: undefined
        });

        this.props.updateRowName(i, e.target.value)
    }

    handleFocus(index) {
        this.setState({
            curIndex: index
        });
    }

    handleInputBlur(e, i, index) {

        const {value} = this.state;

        this.setState({
            isFocusName: false,
            curIndex: undefined,
            value: undefined
        });

        if (index >= 0) {
            try {
                this.props.updateRowData(i, index, parseFloat(value))
            } catch (err) {
                console.log(err);
            }
        }
    }

    handleKeyPress(e) {
        if (e.keyCode === 13) {
            e.currentTarget.blur()
        }
    }

    render() {
        const {name, data, i} = this.props;
        const {isFocusName, curIndex, value} = this.state;

        return (<div className="row-body-tr">
            <div className="row-body-td">
                <input className={isFocusName ? 'row-body-input-focus' : 'row-body-input-normal'}
                       value={name}
                       onChange={(e) => this.handleUpdateRowName(e, i)}
                       onBlur={() => this.handleInputBlur()}
                />
            </div>
            {
                data.map((item, index) => {
                    return <div key={index} className="row-body-td">
                        <input className={curIndex === index ? 'row-body-input-focus' : 'row-body-input-normal'}
                               value={curIndex === index ? value : item.value}
                               onChange={(e) => this.handleUpdateRowData(e, index)}
                               onFocus={() => this.handleFocus(index)}
                               onBlur={(e) => this.handleInputBlur(e, i, index)}
                               onKeyDown={(e) => this.handleKeyPress(e)}
                        />
                    </div>
                })
            }
        </div>)
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = ({updateRowName, updateRowData, changeRow});


export default connect(mapStateToProps, mapDispatchToProps)(Row);