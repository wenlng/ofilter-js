"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetValue = void 0;
const utils_1 = require("./utils");
const utils_2 = require("./utils");
/**
 * 深度解析key重置对应value
 * @param source
 * @param keys
 * @param value
 * @private
 */
function _deepResetValue(source, keys, value) {
    if (keys.length <= 0)
        return;
    const curKey = keys.shift();
    if ((0, utils_1.isEmpty)(curKey))
        return;
    if (keys.length <= 0) {
        if (typeof source[curKey] !== 'undefined') {
            _autoRestValue(source, curKey, value);
        }
        return;
    }
    if (!(0, utils_1.isEmpty)(source[curKey]))
        _deepResetValue(source[curKey], keys, value);
}
/**
 * 自动识别类型重置类型的默认值
 * @param source
 * @param key
 * @param value
 * @private
 */
function _autoRestValue(source, key, value) {
    if ((0, utils_1.isArray)(value)) {
        source[key] = [];
    }
    else if ((0, utils_1.isObject)(value)) {
        source[key] = {};
    }
    else if ((0, utils_2.isNumber)(value)) {
        source[key] = 0;
    }
    else if ((0, utils_1.isBoolean)(value)) {
        source[key] = false;
    }
    else if ((0, utils_1.isString)(value)) {
        source[key] = '';
    }
    else {
        source[key] = undefined;
    }
}
/**
 * 重置值
 * @param source
 * @param arg
 * @returns {*}
 */
function resetValue(source, arg) {
    source = source || {};
    const deep = arg = arg || false;
    if (!(0, utils_1.isEmpty)(arg) && (0, utils_1.isObject)(arg)) {
        (0, utils_1.forEach)(arg, (value, key) => {
            let keys = key.split('.');
            _deepResetValue(source, keys, value);
        });
    }
    else {
        (0, utils_1.forEach)(source, (value, key) => {
            if (deep && (0, utils_1.isObject)(value)) {
                return resetValue(source[key], arg);
            }
            _autoRestValue(source, key, value);
        });
    }
    return true;
}
exports.resetValue = resetValue;
