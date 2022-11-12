import { getValue } from './get-value'
import { isEmpty, arraySlice, isObject, mergeObj, forEach }  from './utils'

/**
 * 过滤/组装数据对象值
 * @param source  源数据对象
 * @param config  配置
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
        const sKey = getValue(cnf, 'key', '_key_').toString()
        const sDv = getValue(cnf, 'default')
        const sVal = getValue(cnf, 'value')
        const isMerge = getValue(cnf, 'merge')

        if (!isEmpty(sVal)) {
          res[key] = sVal
        } else {
          val = sKey ? getValue(source, sKey, sDv) : sDv

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