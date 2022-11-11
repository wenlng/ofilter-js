"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterValue = void 0;
const get_value_1 = require("./get-value");
const utils_1 = require("./utils");
/**
 * 过滤值
 * @param source
 * @param config
 * @returns {*}
 */
function filterValue(source, config) {
    source = source || {};
    config = config || {};
    let res = {};
    if (!(0, utils_1.isEmpty)(config) && (0, utils_1.isObject)(config)) {
        (0, utils_1.forEach)(config, (cnf, key) => {
            let val = '';
            if ((0, utils_1.isObject)(cnf)) {
                // key 值
                const sKey = (0, get_value_1.getValue)(cnf, 'key', '_key_').toString();
                // 默认值
                const sDv = (0, get_value_1.getValue)(cnf, 'default');
                // 直接设置值
                const sVal = (0, get_value_1.getValue)(cnf, 'value');
                // 是否把当前返回的结果合并到主体中
                const isMerge = (0, get_value_1.getValue)(cnf, 'merge');
                if (!(0, utils_1.isEmpty)(sVal)) {
                    res[key] = sVal;
                }
                else {
                    val = sKey ? (0, get_value_1.getValue)(source, sKey, sDv) : sDv;
                    // 过滤
                    if (cnf.filter) {
                        val = cnf.filter(val, source);
                    }
                    if (isMerge && (0, utils_1.isObject)(val)) {
                        res = (0, utils_1.mergeObj)(res, val);
                    }
                    else {
                        res[key] = val;
                    }
                }
            }
            else {
                val = (0, get_value_1.getValue)(source, cnf);
                res[key] = val;
            }
        });
    }
    // 追加额外属性与值 extra
    const args = utils_1.arraySlice.call(arguments);
    args.shift();
    args.shift();
    (0, utils_1.forEach)(args, (extra) => {
        if (!(0, utils_1.isEmpty)(extra) && (0, utils_1.isObject)(extra)) {
            (0, utils_1.forEach)(extra, (value, key) => {
                res[key] = value;
            });
        }
    });
    return res;
}
exports.filterValue = filterValue;
