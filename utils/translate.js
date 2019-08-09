const alfy = require('alfy')
// 彩云小译的token
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
    const patternToken = /headers\[\"X-Authorization\"\]=\"token\:(cy4fgbil24jucmh8jfr5)\"/
    const token = jsData.match(patternToken)[1]
    if (token) {
      alfy.cache.set('cyxy_token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000
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

const translate = async input => {
  const token = await getTsToken()
  const trans_type = detectLang(input)
  const fetchTransData = alfy.fetch(
    'https://api.interpreter.caiyunai.com/v1/translator',
    {
      method: 'post',
      body: {
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
        'X-Authorization': `token:${token}`
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
    result: [transData.target]
  }
}

module.exports = {
  translate
}
