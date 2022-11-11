/**
 * 判断是否为空
 * @param value
 * @return {boolean}
 */
export declare function isEmpty(value: any): boolean;
/**
 * 是否是干将的Object对象
 * @param obj
 * @returns {boolean|boolean}
 */
export declare function isPlainObject(obj: any): boolean;
/**
 * 判断是否是对象
 * @param value
 * @return {boolean}
 */
export declare function isObject(value: any): boolean;
/**
 * 判断是否是字符串
 * @param value
 * @return {boolean}
 */
export declare function isString(value: any): boolean;
/**
 * 判断是否是数字
 * @param value
 * @return {boolean}
 */
export declare function isNumber(value: any): boolean;
/**
 * 判断是否是方法
 * @param value
 * @return {boolean}
 */
export declare function isFunction(value: any): boolean;
/**
 * 判断是否是布尔值
 * @param value
 * @return {boolean}
 */
export declare function isBoolean(value: any): boolean;
/**
 * 是否是类数组对象
 * @param value
 * @returns {false|*}
 */
export declare function isArrayLike(value: any): boolean;
/**
 * 是否有长度
 * @param value
 * @returns {boolean}
 */
export declare function isLength(value: any): boolean;
/**
 * 判断是否是数组
 * @param value
 * @return {Function}
 */
export declare const isArray: (arg: any) => arg is any[];
/**
 * 数组切片
 * @param value
 * @return {Function}
 */
export declare const arraySlice: (start?: number | undefined, end?: number | undefined) => any[];
/**
 * 合并对象
 * @param target
 * @param other
 * @returns {*}
 */
export declare function mergeObj(target: any, other: any): any;
/**
 * 对象与数组遍历
 * @param collection
 * @param iteratee
 * @returns {*}
 */
export declare function forEach(collection: any, iteratee: Function): any;
