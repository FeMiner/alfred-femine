const alfy = require('alfy')

;(async () => {
  const data = await alfy.fetch('https://api.npms.io/v2/search', {
    query: {
      q: alfy.input,
      size: 20
    }
  })
  const output = data.results
    .filter(result => result.package.name.length > 1)
    .map(result => {
      const pkg = result.package
      return {
        title: pkg.name,
        subtitle: pkg.description,
        arg: pkg.links.repository || pkg.links.npm,
        mods: {
          alt: {
            arg: pkg.links.npm,
            subtitle: '打开 npm 页面'
          }
        },
        quicklookurl: pkg.links.repository && `${pkg.links.repository}#readme`
      }
    })
  alfy.output(output)
})()
