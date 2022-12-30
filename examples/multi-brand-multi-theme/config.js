const fs = require('fs')
const StyleDictionary = require('style-dictionary')

// Will return array of folders or files from a folder
function getFilesArray(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)
    const array = files.map(function (file) {
      return file.replace(/\.[^/.]+$/, '')
    })
    return array
  } else {
    return false
  }
}

function styleDictionaryConfig(brand, theme) {
  return {
    source: ['./src/default/theme.json', `./src/brands/${brand}/${theme}.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: `./dist/${brand}/${theme}/`,
        files: [
          {
            destination: 'variables.css',
            format: 'css/variables'
          }
        ]
      }
    }
  }
}

// Get array of brands
const brands = getFilesArray('./src/brands/')

console.log('\nBuild started...')
console.log('==============================================')

brands.map((brand) => {
  // Get array of themes from each brand
  const themes = getFilesArray(`./src/brands/${brand}`)

  themes.map((theme) => {
    console.log(`\nCreating: ${brand} - ${theme}`)
    const styleDictionaryExtend = StyleDictionary.extend(
      styleDictionaryConfig(brand, theme)
    )
    styleDictionaryExtend.buildPlatform('css')
  })
})

console.log('==============================================')
console.log('Build completed!')
