const {getValue} = require('../lib/src/get-value')
const testRun = require('./test-run')

const testObjData = {
  'a1': {
    'b2': {
      'c3': 'c31',
      'c4': 'c41'
    }
  }
}

const testArrayData = {
  'a1': ['b2', 'c3'],
  'a2': [['b11', 'b21'], ['c11', 'c21']]
}

console.log('---------------get-value----------------')
testRun([
  { name: '获取对象一层的值', result: JSON.stringify(getValue(testObjData, 'a1')), equals: '{"b2":{"c3":"c31","c4":"c41"}}' },
  { name: '获取对象二层的值', result: JSON.stringify(getValue(testObjData, 'a1.b2')), equals: '{"c3":"c31","c4":"c41"}' },
  { name: '获取对象二层不存在的值', result: getValue(testObjData, 'a1.a2'), equals: '' },
  { name: '获取对象不存在的值,返回默认值', result: getValue(testObjData, 'a1.a2', 'a0'), equals: 'a0' },
  { name: '以"|"符号从对象获取优先存在的值', result: getValue(testObjData, 'a1.b2.c0|a1.b2.c3'), equals: 'c31' },

  { name: '获取数组索引值', result: getValue(testArrayData, 'a1.0'), equals: 'b2' },
  { name: '获取数组值中不存在的索引值', result: getValue(testArrayData, 'a1.0.2'), equals: '' },
  { name: '获取数组值不存在的索引值，返回默认值', result: getValue(testArrayData, 'a1.0.2', 'no'), equals: 'no' }
])