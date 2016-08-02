const randomstring = require('randomstring')

function genBarcode() {
  return randomstring.generate({
    length: '8',
    charset: '0123456789'
  })
}

module.exports = genBarcode
