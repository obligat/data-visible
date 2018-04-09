var samples = {};
var rows = [], gcolumns = [];
var myDataSet = {};

function merge(a, b, ignoreEmpty, excludeMap) {
    if (!a || !b) return a || b;

    if (ignoreEmpty && Object.keys(b).length === 0) {
        return;
    }

    Object.keys(b).forEach(function (bk) {
        if (excludeMap && excludeMap[bk]) {
        } else if (isNull(b[bk]) || isBasic(b[bk])) {
            a[bk] = b[bk];
        } else if (isArr(b[bk])) {
            a[bk] = [];

            b[bk].forEach(function (i) {
                if (isNull(i) || isBasic(i)) {
                    a[bk].push(i);
                } else {
                    a[bk].push(merge(isArr(i) ? [] : {}, i));
                }
            });
        } else if (
            b[bk].tagName &&
            b[bk].appendChild &&
            b[bk].removeChild &&
            b[bk].style
        ) {
            a[bk] = b[bk];
        } else {
            if (ignoreEmpty && Object.keys(b[bk]).length === 0) {
                return;
            }

            a[bk] = a[bk] || {};
            merge(a[bk], b[bk]);
        }
    });
    return a;
}

function isNull(what) {
    return typeof what === 'undefined' || what === null;
}

/** Check if something is a string
 *  @namespace highed
 *  @param {anything} what - the value to check
 *  @return {bool} - true if string
 */
function isStr(what) {
    return typeof what === 'string' || what instanceof String;
}

/** Check if something is a number
 * @namespace highed
 *  @param {anything} what - the value to check
 *  @return {bool} - true if number
 */
function isNum(what) {
    return !isNaN(parseFloat(what)) && isFinite(what);
}

/** Check if a value is a function
 * @namespace highed
 * @param {anything} what - the value to check
 * @return {bool} - true if function
 */
function isFn(what) {
    return (what && typeof what === 'function') || what instanceof Function;
}

/** Check if a value is an array
 * @namespace highed
 * @param {anything} what - the value to check
 * @return {bool} - true if array
 */
function isArr(what) {
    return (
        !isNull(what) && what.constructor.toString().indexOf('Array') > -1
    );
}

/** Check if a value is a boolean
 * @namespace highed
 * @param {anything} what - the value to check
 * @return {bool} - true if bool
 */
function isBool(what) {
    return what === true || what === false;
}

/** Check if a value is a basic type
 * A basic type is either a bool, string, or a number
 * @namespace highed
 * @param {anything} what - the value to check
 * @return {bool} - true if basic
 */
function isBasic(what) {
    return (
        !isArr(what) &&
        (isStr(what) ||
            isNum(what) ||
            isBool(what) ||
            isFn(what))
    );
}

function add(sample) {
    var options = merge(
        {
            title: 'Untitled Sample',
            description: 'Untitled Sample',
            dataset: [],
            suitableSeries: false,
            products: false
        },
        sample
    );

    console.log(options.dataset);
    myDataSet = options.dataset;
    if (options.id && !samples[options.id]) {
        samples[options.id] = options;
        return true;
    }

    return false;
}

function getSample(id) {
    return samples[id] || false;
}

add({
    id: 'line-series-four-series',
    title: 'Categorized, four series',
    description: '',
    type: 'csv',
    dataset: [
        'Categories,Tokyo,New York,Berlin,London',
        'Jan,7,-0.2,-0.9,3.9',
        'Feb,6.9,0.8,0.6,4.2',
        'Mar,9.5,5.7,3.5,5.7',
        'Apr,14.5,11.3,8.4,8.5',
        'May,18.2,17,13.5,11.9',
        'Jun,21.5,22,17,15.2',
        'Jul,25.2,24.8,18.6,17',
        'Aug,26.5,24.1,17.9,16.6',
        'Sep,23.3,20.1,14.3,14.2',
        'Oct,18.3,14.1,9,10.3',
        'Nov,13.9,8.6,3.9,6.6',
        'Dec,9.6,2.5,1,4.8'
    ]
});


function toData(dataset) {
    let res = {
        categories: [],
        series: []
    };

    res.categories.push(dataset[0]);
    let rows = dataset.slice(1);
    rows.map(item => {
        let arr = item.split(',');
        res.series.push({
            name:arr[0],
            data:arr.slice(1)
        })
    });

    return res;
}

