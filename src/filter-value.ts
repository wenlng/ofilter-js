import { getValue } from './get-value'
import { isEmpty, arraySlice, isObject, mergeObj, forEach }  from './utils'

/**
 * 过滤值
 * @param source
 * @param config
 * @returns {*}
 */
export function filterValue(source:object, config:object):any {
  source = source || {}
  config = config || {}
  let res:any = {}

  if (!isEmpty(config) && isObject(config)) {

    forEach(config,  (cnf:any, key:string) => {
      let val = ''
      if (isObject(cnf)) {
        // key 值
        const sKey = getValue(cnf, 'key', '_key_').toString()
        // 默认值
        const sDv = getValue(cnf, 'default')
        // 直接设置值
        const sVal = getValue(cnf, 'value')
        // 是否把当前返回的结果合并到主体中
        const isMerge = getValue(cnf, 'merge')

        if (!isEmpty(sVal)) {
          res[key] = sVal
        } else {
          val = sKey ? getValue(source, sKey, sDv) : sDv

          // 过滤
          if (cnf.filter) {
            val = cnf.filter(val, source)
          }

          if (isMerge && isObject(val)) {
            res = mergeObj(res, val)
          } else {
            res[key] = val
          }
        }
      } else {
        val = getValue(source, cnf)
        res[key] = val
      }
    })
  }

  // 追加额外属性与值 extra
  const args = arraySlice.call(arguments)
  args.shift()
  args.shift()

  forEach(args, (extra:object) => {
    if (!isEmpty(extra) && isObject(extra)) {
      forEach(extra, (value:any, key:string) => {
        res[key] = value
      })
    }
  })

  return res
}