
function testRun(tests) {
  if (!Array.isArray(tests)) {
    console.error('请传递测试用例数组列表')
    return
  }

  for (const testsKey in tests) {
    const test = tests[testsKey]
    if (test.result.toString() === test.equals.toString()) {
      console.warn('done ++++++++', test.name)
    } else {
      console.error('fail -------', test.name)
      console.error('>>>> ', 'result:', test.result, 'equals:', test.equals.toString())
    }
  }
}

module.exports = testRun
module.exports.default = testRun