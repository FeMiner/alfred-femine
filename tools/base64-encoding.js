/**
 * Base64编码
 */
const btoa = require('btoa')
const alfy = require('alfy')

const b64 = btoa(alfy.input)
if (b64) {
  alfy.output([
    {
      title: b64,
      subtitle: 'base64编码结果',
      arg: b64
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
