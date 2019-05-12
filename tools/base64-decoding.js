/**
 * Base64解码
 */
const btoa = require('atob')
const alfy = require('alfy')

const bin = btoa(alfy.input)

if (bin) {
  alfy.output([
    {
      title: 'base64解码结果',
      subtitle: bin,
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
