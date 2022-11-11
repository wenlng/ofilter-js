const resetValue = require('../lib/reset-value')
const testRun = require('./test-run')

const postForm = {
  name: '',
  age: 0,
  account: {
    orderName: '',
    orderPay: 0
  }
}

console.log('---------------reset-value----------------')

postForm.name = 'awen'
postForm.age = 19
postForm.account = {
  orderName: 'cat',
  orderPay: 200
}

resetValue(postForm)

testRun([
  { name: '自动识别类型重置数据，浅重置', result: JSON.stringify(postForm), equals: '{"name":"","age":0,"account":{}}' },
])


///////////////////////////

postForm.name = 'awen'
postForm.age = 19
postForm.account = {
  orderName: 'cat',
  orderPay: 200
}

resetValue(postForm, true)

testRun([
  { name: '自动识别类型重置数据，深重置', result: JSON.stringify(postForm), equals: '{"name":"","age":0,"account":{"orderName":"","orderPay":0}}' },
])

///////////////////////////
postForm.name = 'awen'
postForm.age = 19
postForm.account = {
  orderName: 1000,
  orderPay: 200
}

resetValue(postForm, {
  "account.orderName": '',
  "account.orderPay": 0
})

testRun([
  { name: '手动配置重置数据', result: JSON.stringify(postForm), equals: '{"name":"awen","age":19,"account":{"orderName":"","orderPay":0}}' },
])