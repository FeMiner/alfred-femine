/**
 * 短划线命名
 */
const alfy = require('alfy')
const { translate } = require('../utils/translate')
const { isValidArr } = require('../utils/helper')
const { input } = alfy
;(async () => {
  const { result } = await translate(input)
  if (isValidArr(result)) {
    alfy.output(
      result.map(item => {
        // 移除特殊字符, 保留空格
        const str = item
          .replace(/[^a-zA-Z\s]/g, '')
          .toLowerCase()
          .split(/\s/)
          .join('-')
        return {
          title: str,
          subtitle: '短横线命名',
          arg: str
        }
      })
    )
  }
})()
