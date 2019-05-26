const alfy = require('alfy')
const { isValidArr } = require('../utils/helper')

const mdnApi = 'https://developer.mozilla.org/en-US/search'
const { input } = alfy
;(async () => {
  const data = await alfy.fetch(`${mdnApi}.json?q=${input}`)
  if (data && isValidArr(data.documents)) {
    alfy.output(
      data.documents.map(({ title, excerpt, url }) => {
        return {
          title,
          subtitle: excerpt.replace(/<[^>]+>/g, ''),
          arg: url
        }
      })
    )
  }
})()
