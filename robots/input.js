const readline = require('readline-sync')
const state = require('./state')

function robot() {
  const content = {
    maximumSentences: 7
  }

  content.searchTerm = askAndReturnSearchhTerm()
  content.prefixs = askAndReturnPrefix()
  content.lang = askAndReturnLanguage()
  state.save(content)

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
}

module.exports = robot
