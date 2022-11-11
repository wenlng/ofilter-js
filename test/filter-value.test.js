const filterValue = require('../lib/filter-value')
const testRun = require('./test-run')

const testBasicData = {
  name: 'awen',
  ageValue: 18
}

const test1 = filterValue(testBasicData, {
  name: 'name',
  age: 'ageValue'
})

console.log('---------------filter-value----------------')
testRun([
  { name: '过滤第一层值', result: JSON.stringify(test1), equals: '{"name":"awen","age":18}' },
])

////////////////////////////////

const testListData = {
  list: [
    { value: 'golang', key: 'go' },
    { value: 'typescript', key: 'ts' },
    { value: 'javascript', key: 'js' },
    { value: 'objective-c', key: 'oc' },
    { value: 'python', key: 'py' },
    { value: 'php', key: 'php' }
  ]
}

const test2 = filterValue(testListData, {
  langs: {
    key: 'list',
    default: [],
    filter: (val = [], source) =>{
      return val.map((item) => {
        return filterValue(item, {
          key: 'key',
          name: {
            key: 'value',
            filter: (val) => {
              return `${val} 语言`
            }
          },
        })
      })
    }
  }
})

testRun([
  { name: '过滤列表', result: JSON.stringify(test2), equals: '{"langs":[{"key":"go","name":"golang 语言"},{"key":"ts","name":"typescript 语言"},{"key":"js","name":"javascript 语言"},{"key":"oc","name":"objective-c 语言"},{"key":"py","name":"python 语言"},{"key":"php","name":"php 语言"}]}' },
])

////////////////////////////////

const testJsonData = {
  info: {
    'name': 'awen',
    'age': '18',
    'height' : '172'
  }
}

const test3 = filterValue(testJsonData, {
  name: 'info.name',
  height: 'info.height'
})

testRun([
  { name: '过滤二层值', result: JSON.stringify(test3), equals: '{"name":"awen","height":"172"}' },
])

////////////////////////////////

const testValData = {
  info: {
    'name': 'awen',
    'age': '18'
  }
}

const test4 = filterValue(testValData, {
  name: 'info.name',
  gender: {
    value: 'man',
  }
})

testRun([
  { name: '直接设置某一个字段的值', result: JSON.stringify(test4), equals: '{"name":"awen","gender":"man"}' },
])


////////////////////////////////

const testMergeData = {
  "info": {
    'name': 'awen',
    'age': '18'
  }
}

const test5 = filterValue(testMergeData, {
  name: 'info.name',
  _: {
    merge: true,
    filter: (_, source) => {
      if (source.info.name === 'awen') {
        return {
          'account': 1000,
          'payOrder': 20
        }
      }
      return {}
    }
  }
})

testRun([
  { name: '从filter的返回的结果合并到结果集中', result: JSON.stringify(test5), equals: '{"name":"awen","account":1000,"payOrder":20}' },
])


////////////////////////////////

const testExtraData = {
  "info": {
    'name': 'awen',
    'age': '18'
  }
}

const test6 = filterValue(testExtraData, {
  name: 'info.name',
  age: 'info.age'
}, {
  account: 1000,
  payOrder: 10
})

testRun([
  { name: '增加额外数据合并到结果集中', result: JSON.stringify(test6), equals: '{"name":"awen","age":"18","account":1000,"payOrder":10}' },
])
