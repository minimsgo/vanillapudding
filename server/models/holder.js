var lodash = require('lodash');

var defaultState = '可用';

module.exports = function (Holder) {
  Holder.createMany = function (rangeEnd, callback) {
    var codes = lodash.range(1, rangeEnd);

    Holder.find({fields: {code: true}}, function (err, holderCodes) {
      var existedCodes = holderCodes.map(function (holderCode) {
        return holderCode.code;
      });
      var newCodes = lodash.difference(codes, existedCodes);
      newCodes.map(function (code) {
        Holder.create(
          {code: code, state: defaultState},
          function (err, createdHolder) {});
      });
      callback(null, newCodes.length)
    })
  }

  Holder.remoteMethod('createMany', {
    accepts: {arg: 'rangeEnd', type: 'number'},
    returns: {arg: 'numCreatedHolders', type: 'number'}
  })
};
