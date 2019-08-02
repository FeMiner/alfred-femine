const { baidu, youdao, google } = require('translation.js')
const translate = async input => {
  // const bd = baidu.translate(input)
  // const yd = youdao.translate(input)
  const gg = google.translate(input)
  const ret = await Promise.race([gg])
  return ret
}

module.exports = {
  translate
}
