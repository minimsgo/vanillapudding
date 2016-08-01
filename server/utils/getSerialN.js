var lodash = require('lodash')

function isSerial(arr) {
  var length = arr.length
  if (length === 1) return true
  var serialSum = (arr[0] + arr[length - 1]) * length / 2
  return serialSum === arr.reduce(lodash.add, 0)
}

function getSerialN(arr, n) {
  if (arr.length < n) return null
  var result = lodash.take(arr, n)
  if (isSerial(result)) return result

  arr.shift()
  return getSerialN(arr, n)
}

module.exports = getSerialN
