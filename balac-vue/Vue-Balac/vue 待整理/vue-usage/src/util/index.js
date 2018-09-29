const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key);
};

export function noop () {};

function extend (to, _form) {
    for (let key in _form) {
        to[key] = _form[key];
    }

    return to;
}

export function toObject (arr) {
    var res = {};

    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }

    return res;
};