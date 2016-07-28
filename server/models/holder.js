var lodash = require('lodash');

var defaultState = '可用';

module.exports = function (Holder) {
  Holder.createMany = function (codeRangeEnd, type, callback) {
    var codes = lodash.range(1, codeRangeEnd + 1);

    Holder.find(
      {
        fields: {code: true},
        where: {type: type}
      },
      function (err, holderCodes) {
        var existedCodes = holderCodes.map(function (holderCode) {
          return holderCode.code;
        });
        var newCodes = lodash.difference(codes, existedCodes);
        newCodes.map(function (code) {
          Holder.create(
            {code: code, state: defaultState, type: type},
            function (err, createdHolder) {
            });
        });
        callback(null, newCodes.length)
      })
  }

  Holder.remoteMethod('createMany', {
    accepts: [
      {arg: 'codeRangeEnd', type: 'number'},
      {arg: 'type', type: 'string'}
    ],
    returns: {arg: 'numCreatedHolders', type: 'number'}
  })
};
