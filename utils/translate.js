const alfy = require('alfy')
const Base64 = require('js-base64').Base64
const getTsToken = async () => {
  let token = alfy.cache.get('cyxy_token')
  if (token) {
    return Promise.resolve(token)
  }
  try {
    const htmlData = await alfy.fetch('https://fanyi.caiyunapp.com/#/', {
      json: false,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    const patternJs = /<script type=text\/javascript src=\/static\/js\/app\.(.+)\.js><\/script>/
    const jsData = await alfy.fetch(
      `https://fanyi.caiyunapp.com/static/js/app.${
        htmlData.match(patternJs)[1]
      }.js`,
      {
        json: false,
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    )
    const patternToken = /headers\[\"X-Authorization\"\]=\"token\:(\w+)\"/
    const token = jsData.match(patternToken)[1]
    if (token) {
      // 缓存10分钟
      alfy.cache.set('cyxy_token', token, {
        maxAge: 10 * 60 * 1000
      })
      return token
    }
  } catch (e) {}
  return ''
}

// 检测翻译语言方向
const detectLang = input => {
  const ratio = (input.match(/[\u4e00-\u9fa5]/g) || []).length / input.length
  if (ratio > 0.1) {
    return 'zh2en'
  }
  return 'en2zh'
}

const decode = str => {
  console.log(str)
  try {
    const func = str =>
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(str)
    return Base64.decode(
      str
        .split('')
        .map(c => {
          return func(c) > -1
            ? 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'[func(c)]
            : c
        })
        .join('')
    )
  } catch (e) {}
  return ''
}

const translate = async input => {
  const token = await getTsToken()
  const trans_type = detectLang(input)

  const { jwt } = await alfy.fetch(
    'https://api.interpreter.caiyunai.com/v1/user/jwt/generate',
    {
      method: 'post',
      body: {
        browser_id: 'd3d5a9330d3c9b8fe227a4cb8d2a6a88'
      },
      headers: {
        'X-Authorization': `token:${token}`
      }
    }
  )

  const fetchTransData = alfy.fetch(
    'https://api.interpreter.caiyunai.com/v1/translator',
    {
      method: 'post',
      body: {
        browser_id: 'd3d5a9330d3c9b8fe227a4cb8d2a6a88',
        cached: true,
        dict: true,
        media: 'text',
        os_type: 'web',
        replaced: true,
        request_id: 'web_fanyi',
        source: input,
        trans_type
      },
      headers: {
        'X-Authorization': `token:${token}`,
        'T-Authorization': jwt
      }
    }
  )
  const fetchDictData = alfy.fetch(
    'https://api.interpreter.caiyunai.com/v1/dict',
    {
      method: 'post',
      body: {
        source: input,
        trans_type
      },
      headers: {
        'X-Authorization': `token:${token}`
      }
    }
  )

  const [transData, dictData] = await Promise.all([
    fetchTransData,
    fetchDictData
  ])

  return {
    dict: dictData.dictionary.explanations || [],
    result: [decode(transData && transData.target)].filter(Boolean)
  }
}

// ;(async () => {
//   console.log(await translate('test'))
// })()

module.exports = {
  translate
}
