import { isEmpty, isObject, isArray, forEach, isBoolean } from './utils'
import {isNumber} from "./utils"

/**
 * 深度解析key重置对应value
 * @param source
 * @param keys
 * @param value
 * @private
 */
function _deepResetValue(source:any, keys:Array<any>, value:any) {
  if (keys.length <= 0) return

  const curKey = keys.shift()
  if (isEmpty(curKey)) return

  if (keys.length <= 0) {
    if (typeof source[curKey] !== 'undefined') {
      _autoRestValue(source, curKey, value)
    }
    return
  }

  if (!isEmpty(source[curKey])) _deepResetValue(source[curKey], keys, value)
}

/**
 * 自动识别类型重置类型的默认值
 * @param source
 * @param key
 * @param value
 * @private
 */
function _autoRestValue(source:any, key:string, value:any) {
  if (isArray(value)) {
    source[key] = []
  } else if (isObject(value)) {
    source[key] = {}
  } else if (isNumber(value)) {
    source[key] = 0
  } else if(isBoolean(value)) {
    source[key] = false
  } else  {
    source[key] = ''
  }
}

/**
 * 重置值
 * @param source
 * @param arg
 * @returns {*}
 */
export function resetValue(source:any, arg?:any):boolean {
  source = source || {}
  const deep = arg = arg || false

  if (!isEmpty(arg) && isObject(arg)) {
    forEach(arg, (value:any, key:string) => {
      let keys = key.split('.')
      _deepResetValue(source, keys, value)
    })
  } else {
    forEach(source, (value:any, key:string) => {
      if (deep && isObject(value)) {
        return resetValue(source[key], arg)
      }
      _autoRestValue(source, key, value)
    })
  }

  return true
}