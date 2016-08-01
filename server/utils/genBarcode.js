const randomstring = require('randomstring')

function genBarcode() {
  return randomstring.generate({
    length: '12',
    charset: '0123456789'
  })
}

module.exports = genBarcode
