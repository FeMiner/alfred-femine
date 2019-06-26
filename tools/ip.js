/**
 * 获取本机ip
 */
const os = require('os')
const { exec } = require('child_process')
const alfy = require('alfy')

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
    let ep = await getEIp()
    if (ep) {
      ep = ep.split(/\r\n/).filter(Boolean)
      ;[eIp, geo] = [ep[0].split(':')[1].trim(), ep[1].split(':')[1].trim()]
    }
  } catch (error) {
    alfy.log(error)
  }

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

function getEIp() {
  return new Promise((resolve, reject) => {
    exec('curl -L tool.lu/ip', (err, stdout) => {
      if (err) {
        reject()
      }
      resolve(stdout)
    })
  })
}
