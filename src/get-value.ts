import { isEmpty, isString, isObject, isNumber, isArray } from './utils'

/**
 * 递归获取属性
 * @param params      数据对象
 * @param nameArr     key数组
 * @param defaultVal  默认值
 * @return {*}
 */
function _deepGetAttr(params:any, nameArr:Array<any>, defaultVal?:any):any {
  try {
    nameArr = (isArray(nameArr) ? nameArr : [nameArr])

    if (!isEmpty(params) && nameArr.length > 0 && !isObject(params) && !isArray(params)) return defaultVal

    if (isEmpty(params) || !isObject(params) || nameArr.length <= 0) return params

    const curKey:string = nameArr.shift()
    if (isEmpty(curKey)) {
      return params
    }

    const curParams = params[curKey]
    if (nameArr.length > 0) {
      return _deepGetAttr(curParams, nameArr, defaultVal)
    }
    return curParams
  } catch (e) {
    return defaultVal
  }
}

/**
 * 递归key获取
 * @param params      数据对象
 * @param _nameStr    key名称 ['a.b', 'b.c.d', ...]
 * @param _nameList   名称列表 [['a.b', 'b.c.d', ...], ['a.b', 'b.c.d', ...], ...]
 * @param _defaultVal 默认值
 * @return {*}
 */
function _deepGet(params:any, _nameStr:string, _nameList:Array<any>, _defaultVal?:any):any {
  const nameArr = _nameStr.toString().split('.')
  const res = _deepGetAttr(params, nameArr, _defaultVal)
  if (isEmpty(res) && _nameList.length > 0) {
    return _deepGet(params, _nameList.shift(), _nameList, _defaultVal)
  }
  return res
}

/**
 * getValue 获取属性，不存在则取默认值，支持多个值优先获取
 * @param source      源数据对象
 * @param name        名称  'a.b.c' 或 'a.b.c|a.b.d'
 * @param defaultVal  默认值
 * @return {*}
 */
export function getValue(source:any, name:string, defaultVal?:any): any {
  const _dv = !isEmpty(defaultVal) ? defaultVal : ''
  source = isObject(source) ? source : {}

  if ( isEmpty(name) || (!isEmpty(name) && !isString(name) && !isNumber(name)) ) {
    return _dv
  }

  const nameList = name.toString().split('|')
  const nameStr:any = nameList.shift()

  const res = _deepGet(source, nameStr, nameList, _dv)

  if (isEmpty(res)) return _dv

  return res
}