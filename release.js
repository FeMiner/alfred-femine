const fs = require('fs')
const { execSync } = require('child_process')

function cmd(command) {
  try {
    const output = execSync(command)
    return output.toString()
  } catch (error) {
    return ''
  }
}

function getVersion() {
  try {
    const tag = cmd('git describe --tags')
      .split('-')
      .filter(Boolean)[0]
    if (tag && /^v\d+.\d+.\d+$/.test(tag)) {
      return tag.slice(1)
    }

    return ''
  } catch (error) {
    return ''
  }
}

const packageInfo = JSON.parse(fs.readFileSync('package.json'))
const version = getVersion()
if (version && version !== packageInfo.version) {
  packageInfo.version = version
  fs.writeFileSync('package.json', JSON.stringify(packageInfo, null, 2) + '\r')
}
