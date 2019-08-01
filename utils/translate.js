const { baidu, google } = require('translation.js')
const translate = async input => {
  const bd = baidu.translate(input)
  const gg = google.translate(input)
  const ret = await Promise.race([bd, gg])
  return ret
}

module.exports = {
  translate
}
