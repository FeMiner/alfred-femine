/**
 * 获取本机ip
 */
const os = require('os')
const alfy = require('alfy')
const cheerio = require('cheerio')

;(async () => {
  // 计算内网ip
  const ifaces = os.networkInterfaces()
  const iIp = Object.keys(ifaces).reduce((acc, cur) => {
    ifaces[cur].forEach(iface => {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        return
      }
      acc.push(iface.address)
    })
    return acc
  }, [])[0]

  let eIp = '',
    geo = ''
  try {
    // 爬取外网ip
    const html = await alfy.fetch('https://www.ip.cn/', {
      json: false
    })
    const $ = cheerio.load(html)
    eIp = $('.well>p:first-child>code').text()
    geo = $('.well>p:nth-child(2)>code').text()
  } catch (error) {}

  const output = []

  if (iIp) {
    output.push({
      title: iIp,
      subtitle: `内网ip`,
      arg: iIp
    })
  }
  if (eIp) {
    output.push({
      title: eIp,
      subtitle: `外网ip,归属地:${geo}`,
      arg: eIp
    })
  }

  if (output.length) {
    alfy.output(output)
    return
  }

  alfy.output([
    {
      title: 'waitting....',
      subtitle: alfy.input
    }
  ])
})()
