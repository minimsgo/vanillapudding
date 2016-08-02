var app = require('../server')
var lodash = require('lodash')

function next(current) {
  switch(current) {
    case '开始':
      return '处理'
    case '处理':
      return '就绪'
    case '就绪':
      return '结束'
    default:
      return null
  }
}

function min(steps) {
  if (lodash.includes(steps, '开始')) { return '开始' }
  else if (lodash.includes(steps, '处理')) {return '处理'}
  else if (lodash.includes(steps, '就绪')) {return '就绪'}
  else if (lodash.includes(steps, '结束')) {return '结束'}
}

function updateOrderStep(id) {
  app.models.Order.findById(id, {include: 'wears'}, function (err, order) {
    var wears = order.wears()
    var steps = wears.map(wear => wear.currentStep)
    var currentStep = min(steps)

    order.updateAttributes({'currentStep': currentStep}, (err, updated) => {
      console.log(updated)
    })
  })
}

module.exports = function (Wear) {

  Wear.nextStep = function (id, callback) {
    Wear.findById(id, {include: 'order'}, function (err, wear) {
      var nextStep = next(wear.currentStep)
      if (nextStep) {
        wear.updateAttributes(
          { 'currentStep': nextStep },
          function (err, updatedWear) {
            updateOrderStep(wear.order().id)
            callback(null, updatedWear)
          })
      } else {
        callback(null, null)
      }
    })
  }

  Wear.remoteMethod('nextStep', {
    accepts: {arg: 'id', type: 'number'},
    http: {path: '/:id/nextStep', verb: 'get'},
    returns: {arg: 'updatedWear', type: 'object'}
  })
};
