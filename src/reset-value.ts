import { isEmpty, isObject, isArray, forEach, isString, isBoolean, isFunction } from './utils'
import {isNumber} from "./utils"

/**
 * 深度解析key重置对应value
 * @param source  源数据对象
 * @param keys    key数组
 * @param value   值
 * @param isAuto  是否自动赋值
 * @private
 */
function _deepResetValue(source:any, keys:Array<any>, value:any, isAuto:boolean) {
  if (keys.length <= 0) return

  const curKey = keys.shift()
  if (isEmpty(curKey)) return

  if (keys.length <= 0) {
    if (typeof source[curKey] !== 'undefined') {
      isAuto && _autoRestValue(source, curKey, source[curKey])
      !isAuto && (source[curKey] = value)
    }
    return
  }

  if (!isEmpty(source[curKey])) _deepResetValue(source[curKey], keys, value, isAuto)
}

/**
 * 自动识别类型重置类型的默认值
 * @param source  源数据对象
 * @param key     key
 * @param value   值
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
  } else if (isString(value))  {
    source[key] = ''
  } else if (isFunction(value))  {
    source[key] = function(){}
  } else {
    source[key] = undefined
  }
}

/**
 * 重置数据对象值，可以自动根据值类型重置，也可以手动配置指定重置
 * @param source  源数据对象, 注意：如果是以 "_" 前缀的为私有属性，不会自动重置，请使用手动配置重置
 * @param arg     参数： true | false 表示是否深度重置，false为第一层重置
 *                            当为true时深度重置，也可以传递重置的深度值控制，false默认的深度值为1
 *                            如：resetValue(source, true, 1, 0), 深度从0开始，深度为1的范围，
 *                      ['user.info.name', 'user.info.account'] 重置的点式字段名
 *                      {'user.info.name': 'ofilterjs', 'user.info.account': 0}
 * @param args     args[0]深度层数，默认值为0、args[1]起始值，默认值为0
 * @returns {*}
 */
export function resetValue(source:any, arg?:any, ...args:any):boolean {
  source = source || {}
  const config = arg || false
  const deep = isBoolean(config) ? config : false
  let start = args?.[1] || 0
  let length = args?.[0] || 0

  if (isEmpty(source) || !isObject(source)) return false

  if (!isEmpty(config) && isArray(config)) {
    forEach(config, (value:any, key:string) => {
      let keys = value.split('.')
      _deepResetValue(source, keys, value, true)
    })
  } else if (!isEmpty(config) && isObject(config)) {
    forEach(config, (value:any, key:string) => {
      let keys = key.split('.')
      _deepResetValue(source, keys, value, false)
    })
  } else {
    if (!deep) {
      start = 0
      length = 1
    }

    forEach(source, (value:any, key:string) => {
      if (deep && isObject(value)) {
        if (start === 0 && length === 0) {
          resetValue(source[key], arg, ...args)
        } else {
          _deepResetValueRange(source[key], 1, start, length)
        }
      } else if (key.toString().substring(0, 1) != '_' && start <= 0){
        _autoRestValue(source, key, value)
      }
    })
  }

  return true
}

/**
 * 深度范围重围
 * @param source  源数据对象
 * @param level   当前层级
 * @param start   重置开始层
 * @param length  重置的深度
 */
function _deepResetValueRange(source:any, level:number, start:number, length:number) {
  level = level || 1
  if (isEmpty(source) || !isObject(source)) return false

  if (start < 0 || length <= 0) {
    return false
  }

  if (level >= (start + length)) {
    return false
  }

  forEach(source, (value:any, key:string) => {
    if (isObject(value)) {
      _deepResetValueRange(source[key], ++level, start, length)
    } else if (key.toString().substring(0, 1) != '_' && level >= start && level < (start + length)){
      _autoRestValue(source, key, value)
    }
  })
}
