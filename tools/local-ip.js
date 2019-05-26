/**
 * 获取本机ip
 */
const os = require('os')
const alfy = require('alfy')

const ifaces = os.networkInterfaces()
const ips = Object.keys(ifaces).reduce((acc, cur) => {
  ifaces[cur].forEach(iface => {
    if (iface.family !== 'IPv4' || iface.internal !== false) {
      return
    }

    acc.push(iface.address)
  })
  return acc
}, [])

if (ips.length > 0) {
  const address = ips.join('; ')
  alfy.output([
    {
      title: address,
      subtitle: '本机ip地址',
      arg: address
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
