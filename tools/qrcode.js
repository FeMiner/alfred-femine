const alfy = require('alfy')
const QRCode = require('qrcode')

QRCode.toFile(
  'assets/qrcode.png',
  alfy.input,
  {
    width: 400
  },
  function(err) {
    if (err) throw err

    const output = [
      {
        title: alfy.input,
        subtitle: '二维码已生成',
        // 不能为空串
        arg: alfy.input
      }
    ]
    alfy.output(output)
  }
)
