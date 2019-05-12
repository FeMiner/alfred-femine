/**
 * Caniuse查询
 */
const alfy = require('alfy')

const browserVersion = browser => {
  let version = 0
  let support = ''
  Object.entries(browser).forEach(([key, value]) => {
    key = parseFloat(key)
    if (version < key && value === 'y') {
      support = key + '+'
    } else if (version < key && value.indexOf('y x') > -1) {
      version = key
      support = key + '-px-'
    } else if (version < key && value.indexOf('a') > -1) {
      version = key
      support = key + '!pa.'
    } else if (version < key && value.indexOf('p') > -1) {
      version = key
      support = key + 'w/pl'
    }
  }, '')
  return support || 'n/a'
}

const getCaniuseData = async () => {
  let data = alfy.cache.get('caniuse')
  if (data) {
    return JSON.parse(data)
  }

  const { data: res } = await alfy.fetch(
    'https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json'
  )
  data = Object.entries(res).map(([key, value]) => {
    const { title, description, keywords, stats } = value
    const statsVersion = Object.entries(stats).reduce((acc, [key, value]) => {
      if (['ie', 'firefox', 'chrome', 'safari'].indexOf(key) > -1) {
        acc[key] = browserVersion(value)
      }

      return acc
    }, {})
    return {
      title: title.toLowerCase(),
      url: `http://caniuse.com/#feat=${key}`,
      description: description.toLowerCase(),
      keywords: keywords.toLowerCase(),
      name: key.toLowerCase(),
      stats: `[IE:${statsVersion.ie}, FF:${statsVersion.firefox}, GC:${
        statsVersion.chrome
      }, S:${statsVersion.safari}]`
    }
  })

  alfy.cache.set('caniuse', JSON.stringify(data), {
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  return data
}

const formatResult = ({ title, url, description, stats }) => {
  return {
    title: `${title} ${stats}`,
    subtitle: description,
    arg: url
  }
}

;(async () => {
  const data = await getCaniuseData()
  const query = alfy.input.toLowerCase()
  const output = data.reduce((acc, cur) => {
    const { title, description, name, keywords } = cur
    if (
      title.indexOf(query) > -1 ||
      name.indexOf(query) > -1 ||
      keywords.indexOf(query) > -1 ||
      description.indexOf(query) > -1
    ) {
      acc.push(formatResult(cur))
    }

    return acc
  }, [])
  alfy.output(output)
})()
