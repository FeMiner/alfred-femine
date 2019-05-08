/**
 * RGB颜色转16进制颜色
 */
const alfy = require('alfy')
const rgbHex = require('rgb-hex')

const rgba = alfy.input
  .split(',')
  .filter(Boolean)
  .map(c => Number(c))

let hex = ''
try {
  hex = '#' + rgbHex(...rgba)
} catch (e) {
  alfy.log(e)
}
if (hex) {
  alfy.output([
    {
      title: '十六进制颜色',
      subtitle: hex,
      arg: hex
    }
  ])
} else {
  alfy.output([
    {
      title: 'waitting....',
      subtitle: alfy.input
    }
  ])
}
