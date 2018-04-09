import * as types from '../actions/constants';

const initialState = {
    xAxis: {
        categories: ['Column1', 'Column2', 'Column3'],
        title: {
            text: 'X 轴标题'
        }
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_COLUMN_HEADER:
            const preCategories = state.xAxis.categories;
            state.xAxis.categories.push('Column' + preCategories.length)

    }
}
