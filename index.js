const readline = require('readline-sync')
const robots = {
  text: require('./robots/text')
}

async function start () {
  const content = {}

  content.searchTerm = askAndReturnSearchhTerm()
  content.prefixs = askAndReturnPrefix()
  content.lang = askAndReturnLanguage()

  await robots.text(content)

  function askAndReturnSearchhTerm() {
    return readline.question('Type a Wikipedia search term: ')
  }

  function askAndReturnPrefix() {
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes)
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }

  function askAndReturnLanguage() {
    const language = ['pt', 'en']
    const selectedLangIndex = readline.keyInSelect(language, 'Choice Language: ')
    const selectedLangText = language[selectedLangIndex]
    
    return selectedLangText
  }

  console.log(content)
}

start()