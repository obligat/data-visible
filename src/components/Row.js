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

    handleFocus(e, index) {
        this.setState({
            curIndex: index,
            value: e.target.value
        });
    }

    handleInputBlur(e, i, index) {

        const {value} = this.state;
        if (index >= 0) {
            try {
                this.props.updateRowData(i, index, value)
            } catch (err) {
                console.log(err);
            }
        }

        this.setState({
            isFocusName: false,
            curIndex: undefined,
            value: undefined
        });
    }

    handleKeyPress(e) {
        if (e.keyCode === 13) {
            this.setState({
                value: e.target.value
            });
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
                               onFocus={(e) => this.handleFocus(e, index)}
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