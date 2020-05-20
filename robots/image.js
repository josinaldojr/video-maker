const imageDownloader = require('image-downloader')
const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const state = require('./state')

const googleSearchCredentials = require('../credentials/google-search.json')

const imageUrlBlackList = require('../content/blackList.json').imageUrlBlackList

async function robot() {
  const content = state.load()

  await fetchImageOfAllSentences(content)

  await downloadAllImages(content)

  state.save(content)

  async function fetchImageOfAllSentences(content) {
    for(const sentence of content.sentences) {
      const query = `${content.searchTerm} ${sentence.keywords[0]}`
      sentence.images = await fetchGoogleAndReturnImagesLinks(query)

      sentence.googleSearchQuery = query 
    }
  }
  async function fetchGoogleAndReturnImagesLinks(query) {
    const response = await customSearch.cse.list({
      auth: googleSearchCredentials.apiKey,
      cx: googleSearchCredentials.searchEnginedId,
      q: query,
      searchType: 'image',
      num: 2
    })

    const imageUrl = response.data.items.map((item) => {
      return item.link
    })

    return imageUrl
  }

  async function downloadAllImages(content) {
    content.downloadedImages = []

    for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
      const images = content.sentences[sentenceIndex].images

      for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        const imageUrl = images[imageIndex]

        try {
          if(content.downloadedImages.includes(imageUrl)) {
            throw new Error('Image has already been lowered')
          }
          if(imageUrlBlackList.includes(imageUrl)) {
            throw new Error('Image in black list')
          }
          await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`)
          content.downloadedImages.push(imageUrl)
          console.log(`>[robo-image] [${sentenceIndex}] [${imageIndex}] Image successfully downloaded: ${imageUrl}`)
          break
        } catch(error) {
          console.log(`> [robo-image] [${sentenceIndex}] [${imageIndex}] Download error (${imageUrl}): ${error}`)
        }
      }
    }
  }

  async function downloadAndSave(url, fileName) {
    return imageDownloader.image({
      url: url,
      dest: `./content/${fileName}`
    })
  }
}

module.exports = robot