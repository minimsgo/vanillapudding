var lodash = require('lodash')

function next(current) {
  return current !== 3 ? current + 1 : null
}

module.exports = function (Wear) {

  Wear.nextStep = function (id, callback) {
    Wear.findById(id, function (err, wear) {
      var currentStep = lodash.max(wear.steps.map(step => step.step))
      var nextStep = next(currentStep)
      if (nextStep) {
        var newSteps = lodash.concat(wear.steps, {
          updateDate: new Date(),
          step: nextStep
        })
        wear.updateAttributes(
          {
            'steps': newSteps
          },
          function (err, updatedWear) {
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
