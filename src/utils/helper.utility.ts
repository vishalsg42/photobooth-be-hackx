import _ from 'lodash'
import moment from 'moment';
import dateFormat = require('dateformat');
import CONSTANTS from '../constants/appConstants';
const dateTime = require('date-and-time');


export const dateFormatter = (datapoint: any, datapoint_format: any, format: any) => {
    if (!datapoint) return null;
    if (datapoint == CONSTANTS.CURRENT_TIMESTAMP) {
        datapoint = new Date();
    }
    datapoint_format = datapoint_format || CONSTANTS.DEFAULT_DATE_FORMAT;
    datapoint = (typeof datapoint == 'object') ? datapoint : dateTime.parse(datapoint, datapoint_format.toUpperCase());
    return dateFormat(datapoint, format.toLowerCase());

};
export const timeStamp = () => {
    return moment().unix();
};
export const now = () => {
    return moment(new Date()).format('YYYY-MM-DD H:mm:ss');
};
export const timeStampToDateTime = (timestamp: any) => {
    try {
        return new Date(parseInt(timestamp)).toISOString();
    } catch (err) {
        return moment(new Date()).format('YYYY-MM-DD H:mm:ss');
    }
};
export const map = (arr: [], key: any) => {
    try {
        return _.map(arr, key);
    } catch (err) {
        return null
    }
};
export const length = (arr1: []) => {
    try {//used for eligibility
        return arr1.length;
    } catch (err) {
        return 1
    }
};
export const intersection = (arr1: [], arr2: []) => {
    try {
        return _.intersection(arr1, arr2);
    } catch (err) {
        return [true]
    }
};
export const difference = (arr1: [], arr2: []) => {
    try {
        return _.difference(arr1, arr2);
    } catch (err) {
        return [true];
    }
};
export const dateToNumberFormatter = (format: any, datapoint: any, datapoint_format: any) => {
    if (!datapoint) return null;
    datapoint_format = datapoint_format || CONSTANTS.DEFAULT_DATE_FORMAT;
    datapoint = dateTime.parse(datapoint, datapoint_format);
    format = format || "years";
    let now = new Date();
    let a = moment(now);
    let b = moment(datapoint);
    let diff = a.diff(b, format);
    return diff || 0;
};
export const timestamp = () => {
    return new Date().getTime();
};
export const splitName = (fullName: string) => {
    let firstName = '';
    let middleName = '';
    let lastName = '';
    if (!fullName) {
        return ({ firstName, middleName, lastName });
    }
    fullName = fullName.trim();
    firstName = fullName.split(' ').slice(0, 1).join(' ');
    middleName = fullName.split(' ').slice(1, -1).join(' ');
    lastName = fullName.split(' ').slice(-1).join(' ');
    lastName = (firstName == lastName) ? "" : lastName;
    return ({ firstName, middleName, lastName });
};
export const _splitName = (fullName: string, root: any) => {
    let firstName = '';
    let middleName = '';
    let lastName = '';
    if (!fullName) {
        return ({ firstName, middleName, lastName });
    }
    fullName = _.get(root, fullName);
    if (!fullName) {
        return ({ firstName, middleName, lastName });
    }
    fullName = fullName.trim();
    firstName = fullName.split(' ').slice(0, 1).join(' ');
    middleName = fullName.split(' ').slice(1, -1).join(' ');
    lastName = fullName.split(' ').slice(-1).join(' ');
    lastName = (firstName == lastName) ? "" : lastName;
    return ({ firstName, middleName, lastName });
}
export const split = (str: string) => {
    try {
        return str.split(',');
    } catch (err) {
        return [];
    }
};
export const json_parse = (data: any) => {
    return JSON.parse(data);
};
export const json_stringify = (data: any) => {
    if (!data) {
        return null;
    }
    return JSON.stringify(data);
};
export const to_string = (data: any) => {
    if (!data) {
        return null;
    }
    return data.toString();
};
export const clean = (root: any, data: any) => {
    try {
        return _.get(root, data, null);
    } catch (err) {
        return null;
    }

};
export const split_address = (...param: any) => {
    try {
        let str = param[0] || param[1];
        let pos = param[2];
        let len = str.length;
        let splice = Math.ceil(len / 3);
        let arr = str.match(new RegExp(`.{1,${splice}}`, 'g'));
        return arr[pos];
    } catch (err) {
        return null;
    }
};
export const substring = (str: string, start: number, end: number) => {
    try {
        return str.substring(start, end);
    } catch (err) {
        return null
    }

};
export const clip = (data: any, precesion: number) => {
    try {
        let num = parseFloat(data).toFixed(precesion);
        return (num != 'NaN') ? parseFloat(num) : null;
    } catch (err) {
        return null;
    }
};
export const string_func = (str: any, func: any) => {
    try {
        return str[func]();
    } catch (err) {
        return null;
    }
};
export const string_concat = (...str: any) => {
    try {
        var str1 = str.filter(function (el: any) { return !['', ' ', 'null', null, undefined].includes(el) });
        return str1.join(' ');
    } catch (err) {
        return str.join(' ');
    }

};
// export const _ = _;

export const uniqid = (prefix: any, length: any) => {
    if (prefix === undefined) {
        prefix = 'D';
    }
    if (length === undefined) {
        length = 15;
    }
    const ts = Math.round((new Date()).getTime() / 1000);
    // the below line generates 11 chars random string.
    let code = ts.toString(16).substring(0, 8);

    if (length <= code.length) {
        return code.substring(code.length - length);
    }

    const extraLength = length - code.length;
    // generating random two chars.
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < extraLength; i++) { code += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return `${prefix}${code}`;
};
export const convertLocalDateFormat = (date: string) => {
    let parts: Array<any> = date.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]);
};
export const getMonthDiff = (pastDate: any) => {
    let months;
    let currentDate = new Date();
    months = (currentDate.getFullYear() - pastDate.getFullYear()) * 12;
    months -= pastDate.getMonth();
    months += currentDate.getMonth();
    return months <= 0 ? 0 : months;
};
export function generateUniqCode(length?: number): string {
    if (!length) {
        length = 13;
    }
    const ts = Math.round((new Date()).getTime() / 1000);
    // the below line generates 11 chars random string.
    let code = ts.toString(16).substring(0, 8);

    if (length <= code.length) {
        return code.substring(code.length - length);
    }

    const extraLength = length - code.length;
    // generating random two chars.
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < extraLength; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return code;
}
export const isMimeTypeValid = (type: string): Boolean => {
    if (!type) {
        return false;
    }
    return (type.indexOf('image') > -1 || type.indexOf('pdf') > -1 || type.indexOf('form') > -1 || type.indexOf('octet-stream') > -1);
}

export const getFileExtension = (name: string) => {
    try {
        const parts = name.split('.');
        if (parts.length > 0) {
            return `.${parts[parts.length - 1]}`;
        }
        return '';
    } catch (error) {
        return '';
    }
}

export default {
    dateFormatter,
    timeStamp,
    now,
    timeStampToDateTime,
    map,
    length,
    intersection,
    dateToNumberFormatter,
    splitName,
    _splitName,
    split,
    json_parse,
    json_stringify,
    clean,
    split_address,
    to_string,
    clip,
    string_func,
    string_concat,
    uniqid,
    convertLocalDateFormat,
    generateUniqCode,
    isMimeTypeValid,
    getFileExtension
}