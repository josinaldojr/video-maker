const fs = require('fs')
const contentFilePAth = './content.json'

function save(content) {
  const contenString = JSON.stringify(content)
  
  return fs.writeFileSync(contentFilePAth, contenString)
}

function load() {
  const fileBuffer = fs.readFileSync(contentFilePAth, 'utf-8')
  const contentJson = JSON.parse(fileBuffer)
  
  return contentJson
}

module.exports = {
  save,
  load
}