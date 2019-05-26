const alfy = require('alfy')

const ms = Date.now()
const s = ~~(ms / 1000)
alfy.output([
  {
    title: ms,
    subtitle: '当前时间戳(毫秒)',
    arg: ms
  },
  {
    title: s,
    subtitle: '当前时间戳(秒)',
    arg: s
  }
])
