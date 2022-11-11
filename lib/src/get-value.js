"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = void 0;
const utils_1 = require("./utils");
/**
 * 递归获取属性
 * @param params  参数包
 * @param nameArr key数组
 * @param defaultVal 默认值
 * @return {*}
 */
function _deepGetAttr(params, nameArr, defaultVal) {
    try {
        nameArr = ((0, utils_1.isArray)(nameArr) ? nameArr : [nameArr]);
        if (!(0, utils_1.isEmpty)(params) && nameArr.length > 0 && !(0, utils_1.isObject)(params) && !(0, utils_1.isArray)(params))
            return defaultVal;
        if ((0, utils_1.isEmpty)(params) || !(0, utils_1.isObject)(params) || nameArr.length <= 0)
            return params;
        const curKey = nameArr.shift();
        if ((0, utils_1.isEmpty)(curKey)) {
            return params;
        }
        const curParams = params[curKey];
        if (nameArr.length > 0) {
            return _deepGetAttr(curParams, nameArr, defaultVal);
        }
        return curParams;
    }
    catch (e) {
        return defaultVal;
    }
}
/**
 * 递归key获取
 * @param params
 * @param _nameStr
 * @param _nameList
 * @param _defaultVal
 * @return {*}
 */
function _deepGet(params, _nameStr, _nameList, _defaultVal) {
    const nameArr = _nameStr.toString().split('.');
    const res = _deepGetAttr(params, nameArr, _defaultVal);
    if ((0, utils_1.isEmpty)(res) && _nameList.length > 0) {
        return _deepGet(params, _nameList.shift(), _nameList, _defaultVal);
    }
    return res;
}
/**
 * getFilterValue 获取属性，不存在取默认值
 * @param source
 * @param name
 * @param defaultVal
 * @return {*}
 */
function getValue(source, name, defaultVal) {
    const _dv = !(0, utils_1.isEmpty)(defaultVal) ? defaultVal : '';
    source = (0, utils_1.isObject)(source) ? source : {};
    if ((0, utils_1.isEmpty)(name) || (!(0, utils_1.isEmpty)(name) && !(0, utils_1.isString)(name) && !(0, utils_1.isNumber)(name))) {
        return _dv;
    }
    // name 允许多个值
    const nameList = name.toString().split('|');
    const nameStr = nameList.shift();
    // 深度递归读取
    const res = _deepGet(source, nameStr, nameList, _dv);
    if ((0, utils_1.isEmpty)(res))
        return _dv;
    return res;
}
exports.getValue = getValue;
