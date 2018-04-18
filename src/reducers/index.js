import {combineReducers} from 'redux';
import * as types from '../actions/constants';

const initialState = {
    columns: [{type: 'Column1', checked: true}, {type: 'Column2', checked: true}],
    rows: [],
    options: {
        chart: {
            type: 'bar'
        },
        title: {
            text: '图表标题'
        },
        xAxis: {
            categories: [],
            title: {
                text: 'X 轴标题'
            }
        },
        yAxis: {
            title: {
                text: 'Y 轴标题'
            }
        },
        series: []
    },
    chartTypes: ['line', 'bar', 'pie', 'area', 'scatter'],
    curType: 'line'
};


const tableData = (state = initialState, action) => {
    const {options, columns, rows, curType} = state;
    let newColumns, newRows;
    switch (action.type) {
        case types.RESET_TABLE:
            initialState.rows = [];
            initialState.rows.push(addRow(initialState.columns, initialState.rows.length + 1));
            options.xAxis.categories = getCategories(columns);
            options.series = getSeries(initialState.rows);

            return {...initialState, options, rows: initialState.rows};

        case types.ADD_COLUMN_HEADER:
            newColumns = columns.concat({type: `Column${columns.length + 1}`, checked: false});
            rows.forEach(item => item.data = item.data.concat({
                type: `Column${columns.length + 1}`,
                checked: false,
                value: undefined
            }));
            options.xAxis.categories = getCategories(newColumns);
            options.series = getSeries(rows);

            return {...state, columns: newColumns, rows};

        case types.ADD_ROW:
            rows.push(addRow(columns, rows.length + 1));
            options.series = getSeries(rows);

            return {...state, options, rows};

        case types.CHANGE_COLUMN:

            [newColumns, newRows] = changeColumn(columns, rows, action.payload);
            options.xAxis.categories = getCategories(newColumns);
            options.series = getSeries(newRows);

            return {...state, columns: newColumns, rows: newRows};

        case types.CHANGE_ROW:
            rows[action.payload].checked = !rows[action.payload].checked;
            options.series = getSeries(rows);
            return {...state, rows, options};

        case types.UPDATE_COLUMN_HEADER:
            columns[action.index].type = action.payload;
            options.xAxis.categories = getCategories(columns);

            return {...state};

        case types.UPDATE_ROW_NAME:
            rows[action.index].name = action.payload;
            options.series = getSeries(rows);

            return {...state};

        case types.UPDATE_ROW_DATA:
            rows[action.i].data[action.j].value = fixNaN(action.payload);
            options.series = getSeries(rows);

            return {...state};

        case types.CHOOSE_TYPE:
            options.chart.type = action.payload;
            return {...state, curType: action.payload};
        default:
            return state;
    }
};

function mapColumns(arr) {
    return arr.map(item => {
        return {type: item, checked: true}
    })
}

function addRow(columns, length) {
    const copyCols = JSON.parse(JSON.stringify(columns));
    const row = {
        name: `row_${length}`,
        checked: true,
        data: []
    };
    row.data = copyCols.map(item => {
        item.value = undefined;
        return {...item};
    });
    return row;
}

function getSeries(rows) {
    let copy = JSON.parse(JSON.stringify(rows));
    copy = filterChecked(copy).map(row => {
        row.data = filterChecked(row.data).map(item => {
            return isNaN(item.value) ? 0 : item.value;
        });
        return row;
    });
    return copy;
}


function getCategories(columns) {
    return filterChecked(columns).map(item => item.type);
}

/*
function getSeries(rows) {
    const checkedRows = filterChecked(rows);
    const seriesData = checkedRows.map(item => {

        return item.data.filter(item => {
            return item.checked === true;
        }).map(item => item.value);
    });

    return seriesData;
}*/

function changeColumn(columns, rows, index) {
    const copyCols = JSON.parse(JSON.stringify(columns));
    const copyRows = JSON.parse(JSON.stringify(rows));
    copyCols[index].checked = !copyCols[index].checked;

    copyRows.forEach((row, i) => {
        row.data.forEach((item, j) => {
            if (j === index) {
                item.checked = !item.checked;
            }
        })
    });

    return [copyCols, copyRows];
}

function filterChecked(arr) {
    return arr.filter(item => item.checked === true);
}

function updateRowsChecked(rows, index) {
    const copy = JSON.parse(JSON.stringify(rows));
    copy.forEach((item, id) => {
        if (id === index) {
            item.checked = !item.checked;
        }
    });
    return copy;
}

function fixNaN(num) {
    return num === num ? num : undefined;
}

function getEmptyArrLength(length) {
    return [...new Array(length)]
}

export default combineReducers({tableData})
