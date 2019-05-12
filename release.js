const fs = require('fs')
const { execSync } = require('child_process')

function cmd(command) {
  try {
    const result = execSync(command)
    return result.toString()
  } catch (error) {
    throw error
  }
}

function getVersion() {
  try {
    let tag = cmd('git describe --exact-match --tags $(git rev-parse HEAD)')
    tag = tag.replace(/\r?\n|\r/g, '')
    if (/^v\d+.\d+.\d+$/.test(tag)) {
      return tag.slice(1)
    }

    return ''
  } catch (error) {
    return ''
  }
}

const packageInfo = JSON.parse(fs.readFileSync('package.json'))
const version = getVersion()
if (version !== packageInfo.version) {
  packageInfo.version = version
  fs.writeFileSync('package.json', JSON.stringify(packageInfo, null, 2) + '\r')
}
