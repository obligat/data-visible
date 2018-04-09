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


/*

const addColumnHeader = () => (dispatch, getState) => {
    const {options} = getState();
    dispatch({
        type: ...,
        payload: {
            ...state,
            a: j,
            b: s
        }
    })
}

export {
    addColumnHeader
}*/
