const hasOwnProperty = Object.prototype.hasOwnProperty
const MAX_SAFE_INTEGER = 9007199254740991

/**
 * 判断是否为空
 * @param value
 * @return {boolean}
 */
export function isEmpty(value:any) {
  if (value == null) {
    return true
  }
  if (isArrayLike(value)) {
    return !value.length
  } else if (isPlainObject(value)) {
    for (let key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false
      }
    }
  }
  return false
}

/**
 * 是否是干将的Object对象
 * @param obj
 * @returns {boolean|boolean}
 */
export function isPlainObject(obj:any){
  if(!obj || !isObject(obj) || obj.nodeType){
    return false
  }

  try{
    if(obj.constructor && ! hasOwnProperty.call(obj, 'constructor')
      && !hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')){
      return false
    }
  } catch(e) {
    return false
  }
  let key
  for(key in obj){}
  return key === undefined || hasOwnProperty.call(obj, key)
}

/**
 * 判断是否是对象
 * @param value
 * @return {boolean}
 */
export function isObject(value:any) {
  let type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

/**
 * 判断是否是字符串
 * @param value
 * @return {boolean}
 */
export function isString(value:any) {
  return typeof value === 'string'
}

/**
 * 判断是否是数字
 * @param value
 * @return {boolean}
 */
export function isNumber(value:any) {
  return typeof value === 'number'
}

/**
 * 判断是否是方法
 * @param value
 * @return {boolean}
 */
export function isFunction(value:any) {
  return typeof value === 'function'
}

/**
 * 判断是否是布尔值
 * @param value
 * @return {boolean}
 */
export function isBoolean(value:any) {
  return typeof value === 'boolean'
}

/**
 * 是否是类数组对象
 * @param value
 * @returns {false|*}
 */
export function isArrayLike(value:any) {
  return value != null && !isFunction(value) && isLength(value.length)
}

/**
 * 是否有长度
 * @param value
 * @returns {boolean}
 */
export function isLength(value:any) {
  return typeof value === 'number' &&
    value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER
}

/**
 * 判断是否是数组
 * @param value
 * @return {Function}
 */
export const isArray = Array.isArray

/**
 * 数组切片
 * @param value
 * @return {Function}
 */
export const arraySlice = Array.prototype.slice

/**
 * 合并对象
 * @param target
 * @param other
 * @returns {*}
 */
export function mergeObj(target:any, other:any) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (!isEmpty(value)) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

/**
 * 对象与数组遍历
 * @param collection
 * @param iteratee
 * @returns {*}
 */
export  function forEach(collection:any, iteratee:Function) {
  if (!isFunction(iteratee)) {
    console.error('forEach: Please pass the callback function')
    return
  }

  const func = isArray(collection) ? _arrayEach : _baseEach
  return func(collection, iteratee)
}

/**
 * _arrayEach
 * @param array
 * @param iteratee
 * @returns {*}
 * @private
 */
function _arrayEach(array:Array<any>, iteratee:Function) {
  let index = -1
  const length = array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break
    }
  }
  return array
}

/**
 * _baseEach
 * @param collection
 * @param iteratee
 * @private
 */
function _baseEach(collection:any, iteratee:Function) {
  if (isEmpty(collection)) {
    return collection
  }

  if (!isArrayLike(collection)) {
    return _baseForOwn(collection, iteratee)
  }

  const length = collection.length
  const iterable = Object(collection)
  let index = -1
  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break
    }
  }

  return collection
}

/**
 * baseForOwn
 * @param object
 * @param iteratee
 * @returns {*}
 */
function _baseForOwn(object:any, iteratee:Function) {
  return object && _baseFor(object, iteratee, function (object:any){
    return isArrayLike(object)
      ? _arrayLikeKeys(object)
      : Object.keys(Object(object))
  })
}

/**
 * 是否是索引值
 * @param value
 * @param length
 * @returns {boolean}
 * @private
 */
function _isIndex(value:any, length:any) {
  const type = typeof value
  length = length == null ? MAX_SAFE_INTEGER : length
  return !!length &&
    (type === 'number' ||
      (type !== 'symbol' && /^(?:0|[1-9]\d*)$/.test(value))) &&
    (value > -1 && value % 1 === 0 && value < length)
}

/**
 * 获取数组对象中的keys
 * @param value
 * @returns {any[]}
 * @private
 */
function _arrayLikeKeys(value:any) {
  const length = value.length || 0
  const result = new Array(length)
  let index = length ? -1 : length

  while (++index < length) {
    result[index] = `${index}`
  }

  for (const key in value) {
    if (
      (hasOwnProperty.call(value, key)) &&
      !(length && (key === 'length' || _isIndex(key, length)))
    ) {
      result.push(key)
    }
  }

  return result
}

/**
 * 基本循环
 * @param object
 * @param iteratee
 * @param keysFunc
 * @returns {*}
 * @private
 */
function _baseFor(object:any, iteratee:Function, keysFunc:Function) {
  const iterable = Object(object)
  const props = keysFunc(object)
  let { length } = props
  let index = -1

  while (length--) {
    const key = props[++index]
    if (iteratee(iterable[key], key, iterable) === false) {
      break
    }
  }

  return object
}
