const {resetValue} = require('../lib/src/reset-value')
const testRun = require('./test-run')

const postForm = {
  name: '',
  age: 0,
  _tag: 'private attr',
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

resetValue(postForm, false)

testRun([
  { name: '自动识别类型重置数据，浅重置', result: JSON.stringify(postForm), equals: '{"name":"","age":0,"_tag":"private attr","account":{}}' },
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
  { name: '自动识别类型重置数据，深重置', result: JSON.stringify(postForm), equals: '{"name":"","age":0,"_tag":"private attr","account":{"orderName":"","orderPay":0}}' },
])

///////////////////////////
postForm.name = 'awen'
postForm.age = 19
postForm.account = {
  orderName: 'dog',
  orderPay: 200
}

resetValue(postForm, ["account.orderName", "account.orderPay"])

testRun([
  { name: '手动配置重置数据1', result: JSON.stringify(postForm), equals: '{"name":"awen","age":19,"_tag":"private attr","account":{"orderName":"","orderPay":0}}' },
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
  { name: '手动配置重置数据2', result: JSON.stringify(postForm), equals: '{"name":"awen","age":19,"_tag":"private attr","account":{"orderName":"","orderPay":0}}' },
])


///////////////////////////

const postForm2 = {
  name: '', // 0
  age: 0,
  _tag: 'private attr',
  account: {  // 1
    orderName: '',
    orderPay: 0,
    history: {  // 2
      title: '',
      content: '',
      product: {  // 3
        title: '',
        money: ''
      }
    }
  }
}

postForm2.name = 'awen'
postForm2.age = 19
postForm2.account = {
  orderName: 'cat',
  orderPay: 200,
  history: {
    title: 'pay',
    content: 'pay order 2000',
    product: {
      title: 'it',
      money: 'dev'
    }
  }
}

resetValue(postForm2, true, 2, 0)

testRun([
  { name: '指定深度重置结束与起始1', result: JSON.stringify(postForm2), equals: '{"name":"","age":0,"_tag":"private attr","account":{"orderName":"","orderPay":0,"history":{"title":"pay","content":"pay order 2000","product":{"title":"it","money":"dev"}}}}' },
])


/////////////////////////////
postForm2.name = 'awen'
postForm2.age = 19
postForm2.account = {
  orderName: 'cat',
  orderPay: 200,
  history: {
    title: 'pay',
    content: 'pay order 2000',
    product: {
      title: 'it',
      money: 'dev',
      other: {
        msg: 'test'
      }
    }
  }
}

resetValue(postForm2, true, 3, 1)

testRun([
  { name: '指定深度重置结束与起始2', result: JSON.stringify(postForm2), equals: '{"name":"awen","age":19,"_tag":"private attr","account":{"orderName":"","orderPay":0,"history":{"title":"","content":"","product":{"title":"","money":"","other":{"msg":"test"}}}}}' },
])



/////////////////////////////
postForm2.name = 'awen'
postForm2.age = 19
postForm2.account = {
  orderName: 'cat',
  orderPay: 200,
  history: {
    title: 'pay',
    content: 'pay order 2000',
    product: {
      title: 'it',
      money: 'dev',
      other: {
        msg: 'test'
      }
    }
  }
}

resetValue(postForm2, true, 1, 2)

testRun([
  { name: '指定深度重置结束与起始3', result: JSON.stringify(postForm2), equals: '{"name":"awen","age":19,"_tag":"private attr","account":{"orderName":"cat","orderPay":200,"history":{"title":"","content":"","product":{"title":"it","money":"dev","other":{"msg":"test"}}}}}' },
])


/////////////////////////////
postForm2.name = 'awen'
postForm2.age = 19
postForm2.account = {
  orderName: 'cat',
  orderPay: 200,
  history: {
    title: 'pay',
    content: 'pay order 2000',
    product: {
      title: 'it',
      money: 'dev',
      other: {
        msg: 'test'
      }
    }
  }
}

resetValue(postForm2, true, 2, 3)

testRun([
  { name: '指定深度重置结束与起始4', result: JSON.stringify(postForm2), equals: '{"name":"awen","age":19,"_tag":"private attr","account":{"orderName":"cat","orderPay":200,"history":{"title":"pay","content":"pay order 2000","product":{"title":"","money":"","other":{"msg":""}}}}}' },
])



/////////////////////////////
postForm2.name = 'awen'
postForm2.age = 19
postForm2.account = {
  orderName: 'cat',
  orderPay: 200,
  history: {
    title: 'pay',
    content: 'pay order 2000',
    product: {
      title: 'it',
      money: 'dev',
      other: {
        msg: 'test',
        more: {
          val: 'more value'
        }
      }
    }
  }
}

resetValue(postForm2, true, 2, 2)

testRun([
  { name: '指定深度重置结束与起始5', result: JSON.stringify(postForm2), equals: '{"name":"awen","age":19,"_tag":"private attr","account":{"orderName":"cat","orderPay":200,"history":{"title":"","content":"","product":{"title":"","money":"","other":{"msg":"test","more":{"val":"more value"}}}}}}' },
])