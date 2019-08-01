const alfy = require('alfy')
const { translate } = require('../utils/translate')
const { isValidArr } = require('../utils/helper')
const { input } = alfy
;(async () => {
  const { dict } = await translate(input)
  if (isValidArr(dict)) {
    alfy.output(
      dict.map(item => {
        return {
          title: item,
          subtitle: '简明释义',
          arg: item
        }
      })
    )
  }
})()
