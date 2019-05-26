/**
 * Base64解码
 */
const btoa = require('atob')
const alfy = require('alfy')

const bin = btoa(alfy.input)

if (bin) {
  alfy.output([
    {
      title: bin,
      subtitle: 'base64解码结果',
      arg: bin
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
