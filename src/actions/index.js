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
