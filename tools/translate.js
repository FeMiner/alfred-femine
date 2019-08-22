const alfy = require('alfy')
const { translate } = require('../utils/translate')
const { isValidArr } = require('../utils/helper')
const { input } = alfy
;(async () => {
  const { dict, result } = await translate(input)
  const res = [...dict, ...result]
  if (isValidArr(res)) {
    alfy.output(
      res.map(item => {
        return {
          title: item,
          subtitle: '简明释义',
          arg: item
        }
      })
    )
  }
})()
