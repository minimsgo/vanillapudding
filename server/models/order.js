var crypto = require('crypto')
var biguint = require('biguint-format')
var app = require('../server')
module.exports = function (Order) {

  Order.createWithServices = function (customerName,
                                       customerTel,
                                       amount,
                                       orderedServices,
                                       callback) {

    var order = {
      customerName: customerName,
      customerTel: customerTel,
      amount: amount,
      orderDate: new Date()
    }

    var orderedServices = [
      {
        name: '干洗',
        wearType: '羽绒服',
        price: 30,
        id: 0
      }
    ]

    Order.create(order, function (err, createdOrder) {
      orderedServices.map(function (service) {
        crypto.randomBytes(5, function (ex, buf) {
          var barcode = biguint(buf, 'dec')
          var initState = '开始'
          var newWear = {
            orderId: createdOrder.id,
            serviceId: service.id,
            barcode: barcode,
            type: service.wearType,
            serviceName: service.name,
            currentState: initState,
            states: [{
              updateDate: new Date(),
              state: initState
            }]
          }
          app.models.Wear.create(newWear, function (err, createdWear) {
          })
        })
      })

      Order.findById(
        createdOrder.id,
        {include: 'wears'},
        function (err, orderWithWears) {
          callback(null, orderWithWears)
      })
    })
  }

  Order.remoteMethod(
    'createWithServices',
    {
      accepts: [
        {arg: 'customerName', type: 'string'},
        {arg: 'customerTel', type: 'string'},
        {arg: 'amount', type: 'number'},
        {arg: 'orderedServices', type: 'array'},
      ],
      returns: {arg: 'createdOrder', type: 'object'}
    }
  );
};
