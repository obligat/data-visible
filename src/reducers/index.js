import {combineReducers} from 'redux';
import * as types from '../actions/constants';

const initialState = {
    options: {
        chart: {
            type: 'bar'
        },
        title: {
            text: '图表标题'
        },
        xAxis: {
            categories: ['Column1', 'Column2', 'Column3'],
            title: {
                text: 'X 轴标题'
            }
        },
        yAxis: {
            title: {
                text: 'Y 轴标题'
            }
        },
        series: [{
            name: '',
            data: [undefined, undefined, undefined]
        }]
    }
};


const tableData = (state = initialState, action) => {
    const {xAxis, series} = state.options;

    switch (action.type) {
        case types.RESET_TABLE:
            return initialState;
        case types.ADD_COLUMN_HEADER:
            xAxis.categories = [...xAxis.categories, `Column${xAxis.categories.length + 1}`];
            series.map(item => item.data.push(...getEmptyArrLength(1)));
            return {...state};
        case types.ADD_ROW:
            series.push({name: '', data: getEmptyArrLength(xAxis.categories.length)});
            return {...state};
        case types.UPDATE_COLUMN_HEADER:
            xAxis.categories[action.index] = action.payload;
            return {...state};
        case types.UPDATE_ROW_NAME:
            series[action.index].name = action.payload;
            return {...state};
        case types.UPDATE_ROW_DATA:
            series[action.i].data[action.j] = fixNaN(action.payload);
            return {...state};
        default:
            return state;
    }
};


function fixNaN(num) {
    return num === num ? num : undefined;
}

function getEmptyArrLength(length) {
    return [...new Array(length)]
}

export default combineReducers({tableData})
