import {combineReducers} from 'redux';
import * as types from '../actions/constants';

const initialState = {
    columns: [{type: 'Column1', checked: true}, {type: 'Column2', checked: true}, {type: 'Column3', checked: true}],
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
    }
};


const tableData = (state = initialState, action) => {
    const {options, columns, rows} = state;
    let newColumns, newRows;
    switch (action.type) {
        case types.RESET_TABLE:
            console.log('in reset table');
            initialState.rows = [];
            initialState.rows.push(addRow(initialState.columns));
            options.xAxis.categories = getCategories(columns);
            options.series = getSeries(initialState.rows);

            console.log({...initialState, options, rows: initialState.rows});
            return {...initialState, options, rows: initialState.rows};
        // case types.ADD_COLUMN_HEADER:
        //     options.xAxis.categories = [...xAxis.categories, `Column${xAxis.categories.length + 1}`];
        //     series.map(item => item.data.push(...getEmptyArrLength(1)));
        //     return {...state};
        // case types.ADD_ROW:
        //     options.series.push({name: '', data: getEmptyArrLength(xAxis.categories.length)});
        //     return {...state};
        // case types.UPDATE_COLUMN_HEADER:
        //     options.xAxis.categories[action.index] = action.payload;
        //     return {...state};
        // case types.UPDATE_ROW_NAME:
        //     options.series[action.index].name = action.payload;
        //     return {...state};
        // case types.UPDATE_ROW_DATA:
        //     series[action.i].data[action.j] = fixNaN(action.payload);
        //     return {...state};

        case types.ADD_COLUMN_HEADER:
            console.log('in add column');
            newColumns = columns.concat({type: `Column${columns.length + 1}`, checked: false});
            rows.forEach(item => item.data = item.data.concat({
                type: `Column${columns.length + 1}`,
                checked: false,
                value: undefined
            }));
            options.xAxis.categories = getCategories(newColumns);
            options.series = getSeries(rows);

            console.log({...state, columns: newColumns, rows});
            return {...state, columns: newColumns, rows};

        case types.ADD_ROW:
            console.log('in add row');
            rows.push(addRow(columns));
            options.series = getSeries(rows);

            return {...state, options, rows};

        case types.CHANGE_COLUMN:
            console.log('in change column');

            [newColumns, newRows] = changeColumn(columns, rows, action.payload);
            options.xAxis.categories = getCategories(newColumns);
            options.series = getSeries(newRows);

            console.log({...state, columns: newColumns, rows: newRows});
            return {...state, columns: newColumns, rows: newRows};

        case types.CHANGE_ROW:


            return {...state, rows: newRows};


        default:
            return state;
    }
};

function mapColumns(arr) {
    return arr.map(item => {
        return {type: item, checked: true}
    })
}

function addRow(columns) {
    const copyCols = JSON.parse(JSON.stringify(columns));
    const row = {
        name: '',
        checked: true,
        data: []
    };
    row.data = copyCols.map(item => {
        item.value = undefined;
        return {...item};
    });
    console.log(columns);

    return row;
}

function getSeries(rows) {
    let copy = JSON.parse(JSON.stringify(rows));
    copy = filterChecked(copy).map(row => {
        row.data = filterChecked(row.data).map(item => {
            return item.value;
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
