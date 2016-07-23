var lodash = require('lodash')

function next(current) {
  switch (current) {
    case '开始':
      return '就绪';
    case '就绪':
      return '结束';
    case '结束':
      return null;
    default:
      break;
  }
}

module.exports = function (Wear) {

  Wear.toNextState = function (id, callback) {
    Wear.findById(id, function (err, wear) {
      var currentState = wear.currentState
      var nextState = next(currentState)
      if (nextState) {
        var newStates = lodash.concat(wear.states, {
          updateDate: new Date(),
          state: nextState
        })
        wear.updateAttributes(
          {
            'currentState': nextState,
            'states': newStates
          },
          function (err, updatedWear) {
          })
      }
    })
    callback(null, true)
  }

  Wear.remoteMethod('toNextState', {
    accepts: {arg: 'id', type: 'number'},
    http: {path: '/:id/toNextState', verb: 'get'},
    returns: {arg: 'toNextState', type: 'bool'}
  })

};
