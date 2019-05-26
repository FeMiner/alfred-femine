const alfy = require('alfy')
const { youdao, baidu, google } = require('translation.js')
const { isValidArr } = require('../utils/helper')

const { input } = alfy
const yd = youdao.translate(input)
const ge = google.translate(input)
const bd = baidu.translate(input)
;(async () => {
  const { dict } = await Promise.race([yd, ge, bd])
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
