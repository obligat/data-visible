import * as types from './constants';

export function resetTable() {
    return {
        type: types.RESET_TABLE
    }
}

export function addColumnHeader() {
    return {
        type: types.ADD_COLUMN_HEADER
    }
}

export function addRow() {
    return {
        type: types.ADD_ROW
    }
}

export function updateColumnHeader(index, text) {
    return {
        type: types.UPDATE_COLUMN_HEADER,
        payload: text,
        index
    }
}

export function changeColumn(index) {
    return {
        type: types.CHANGE_COLUMN,
        payload: index
    }
}

export function updateRowName(index, name) {
    return {
        type: types.UPDATE_ROW_NAME,
        payload: name,
        index
    }
}

export function updateRowData(i, j, text) {
    return {
        type: types.UPDATE_ROW_DATA,
        payload: text,
        i,
        j
    }
}

export function changeRow(index) {
    return {
        type: types.CHANGE_ROW,
        payload: index
    }
}

export function chooseType(value) {
    return {
        type: types.CHOOSE_TYPE,
        payload: value
    }
}

export function importFile(data) {
    return {
        type: types.IMPORT_FILE,
        payload: data
    }
}

export function exportFile() {
    return {
        type: types.EXPORT_FILE
    }
}

export function chooseAllColumns() {
    return {
        type: types.CHOOSE_ALL_COLUMNS
    }
}

export function cancelAllColumns() {
    return {
        type: types.CANCEL_ALL_COLUMNS
    }
}


export function chooseAllRows() {
    return {
        type: types.CHOOSE_ALL_ROWS
    }
}

export function cancelAllRows() {
    return {
        type: types.CANCEL_ALL_ROWS
    }
}