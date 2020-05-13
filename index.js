const readline = require('readline-sync')

function start () {
  const content = {}

  content.searchTerm = askAndReturnSearchhTerm()
  content.prefixs = askAndReturnPrefix()

  function askAndReturnSearchhTerm() {
    return readline.question('Type a Wikipedia search term: ')
  }

  function askAndReturnPrefix() {
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes)
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }

  console.log(content)
}

start()