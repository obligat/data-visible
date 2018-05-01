import {combineReducers} from 'redux';
import * as types from '../actions/constants';
import XLSX from 'xlsx';


const initialState = {
    columns: [{type: 'Column1', checked: true}, {type: 'Column2', checked: true}],
    rows: [],
    colName: '',
    options: {
        chart: {
            type: 'line'
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
    const {options, columns, rows, colName} = state;
    let newColumns, newRows = [];
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
            if ('originValue' in rows[action.i].data[action.j]) {
                rows[action.i].data[action.j].originValue = rows[action.i].data[action.j].value;
            }
            options.series = getSeries(rows);

            return {...state};

        case types.CHOOSE_TYPE:
            options.chart.type = action.payload;
            return {...state, curType: action.payload};

        case types.IMPORT_FILE:
            if (!action.payload[0]) {
                return {...state};
            }
            const newColName = action.payload[0].shift();
            let newCols = action.payload.shift();
            newCols = mapColumns(newCols);
            let rawRows = action.payload;
            rawRows.forEach(item => {
                newRows.push(mapRow(item, newCols));
            });

            options.xAxis.categories = getCategories(newCols);
            options.series = getSeries(newRows);

            return {...state, colName: newColName, columns: newCols, rows: newRows};

        case types.EXPORT_FILE:
            let data = [];

            const cols = toDataCol(columns);
            cols.unshift(colName);

            data.push(cols);
            data = data.concat(toDataRow(rows));

            handleExportFile(data);

            return {...state};

        case types.CHOOSE_ALL_COLUMNS:
            newColumns = columns.map(item => {
                item.checked = true;
                return item;
            });
            rows.forEach(row => row.data.forEach(item => item.checked = true));
            options.xAxis.categories = getCategories(newColumns);
            options.series = getSeries(rows);
            return {...state, columns: newColumns};

        case types.CANCEL_ALL_COLUMNS:
            newColumns = columns.map(item => {
                item.checked = false;
                return item;
            });
            rows.forEach(row => row.data.forEach(item => item.checked = false));
            options.xAxis.categories = getCategories(newColumns);
            options.series = getSeries(rows);

            return {...state, columns: newColumns};

        case types.CHOOSE_ALL_ROWS:
            rows.forEach(row => row.checked = true);
            options.series = getSeries(rows);
            return {...state};

        case types.CANCEL_ALL_ROWS:
            rows.forEach(row => row.checked = false);
            options.series = getSeries(rows);
            return {...state};

        case types.SWITCH_WORD_AND_NUMBER:
            const hash = switchHash(getColArr(rows, action.payload));
            newRows = mapColArr(rows, action.payload, hash);
            options.series = getSeries(newRows);

            return {...state, rows: newRows};
        default:
            return state;
    }
};

function mapColumns(arr) {
    return arr.map(item => {
        return {type: item, checked: false}
    })
}


function mapRow(rowArr, columns) {
    const copyCols = JSON.parse(JSON.stringify(columns));
    const row = {
        name: rowArr.shift(),
        checked: false,
        data: []
    };

    row.data = copyCols.map((item, index) => {
        item.value = rowArr[index];
        return {...item};
    });

    return row;
}

function toDataCol(cols) {
    return cols.map(item => item.type);
}

function toDataRow(rows) {
    const data = [];
    rows.forEach(row => {
        const t = [];
        t.push(row.name);
        row.data.forEach(item => {
            t.push(item.value);
        });

        data.push(t);
    });
    return data;
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
            const value = parseFloat(item.value);
            return isNaN(value) ? 0 : value;
        });
        return row;
    });
    return copy;
}


function getCategories(columns) {
    return filterChecked(columns).map(item => item.type);
}


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

function fixNaN(num) {
    return num === num ? num : undefined;
}


function handleExportFile(data) {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx")
}

/**
 * 将一个数组里的值按照出现次数转为 hash 对象
 * @param arr  eg：['男','女','男','男','女']
 * @returns {{}} eg：{1:'男', 2:'女', '男':1, '女':2 }
 */
function switchHash(arr) {
    const arrSet = [...new Set(arr)];
    const hash = {};
    arrSet.forEach((item, index) => {
        hash[item] = index + 1;
        hash[index + 1] = item;
    });

    return hash;
}


/**
 * 得到每一列的数组
 * @param rows
 * @param index
 * @returns {Array}
 */
function getColArr(rows, index) {
    const copyRows = JSON.parse(JSON.stringify(rows));
    const result = [];

    copyRows.forEach(row => {
        row.data.forEach((item, j) => {
            if (j === index) {
                const value = 'originValue' in item ? item.originValue : item.value;
                result.push(value);
            }
        })
    });

    return result;
}

/**
 * 将要转换的列的每个 row map 一下，添加 originValue 属性
 * @param rows
 * @param index
 * @param hash
 * @returns {any}
 */
function mapColArr(rows, index, hash) {
    const copyRows = JSON.parse(JSON.stringify(rows));
    copyRows.forEach(row => {
        row.data.forEach((item, j) => {
            if (j === index) {
                if ('originValue' in item) {
                    item.value = hash[item.value];
                } else {
                    item.originValue = item.value;
                    item.value = hash[item.value];
                }
            }
        })
    });

    return copyRows;
}

export default combineReducers({tableData})
