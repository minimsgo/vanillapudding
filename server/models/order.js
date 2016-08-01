var app = require('../server')
var lodash = require('lodash')

var genBarcode = require('../utils/genBarcode')

module.exports = function (Order) {

  Order.createNew = function (customerName, customerTel, wears, callback) {
    var amount = wears.map(wear => wear.service.price).reduce(
      lodash.add, 0
    )

    var order = {
      customerName: customerName,
      customerTel: customerTel,
      amount: amount,
      orderDate: new Date(),
    }

    Order.create(order, (err, createdOrder) => {
      wears.map(wear => {
        const condition = {
          where: {
            and: [
              {state: '可用'},
              {type: wear.service.type}
            ]
          }
        }
        app.models.Holder.findOne(condition, function (err, holder) {
          const barcode = genBarcode()
          var newWear = {
            orderId: createdOrder.id,
            serviceId: wear.service.id,
            holderId: holder.id,
            barcode: barcode,
            hasStains: wear.hasStains,
            steps: [{step: 0, updateDate: new Date()}]
          }
          app.models.Wear.create(newWear, (err, createdWear) => {
            console.log(createdWear)
          })
          holder.updateAttributes({state: '已用'}, function (err, updated) {
            console.log(updated)
          })
        })
      })

      Order.findById(createdOrder.id,
        {
          include: {
            relation: 'wears',
            scope: {
              include: {
                relation: 'service'
              }
            }
          }
        }, (err, order) => {
          callback(null, order)
        })
    })
  }

  Order.findNested = function (id, callback) {
    Order.findById(id,
      {
        include: {
          relation: 'wears',
          scope: {
            include: ['service', 'holder']
          }
        }
      }, (err, order) => {
        callback(null, order)
      })
  }

  Order.remoteMethod(
    'createNew',
    {
      accepts: [
        {arg: 'customerName', type: 'string'},
        {arg: 'customerTel', type: 'string'},
        {arg: 'wears', type: 'array'},
      ],
      returns: {arg: 'createdOrder', type: 'object'}
    }
  );

  Order.remoteMethod('findNested', {
      accepts: {arg: 'id', type: 'number'},
      http: {path: '/:id/findNested', verb: 'get'},
      returns: {arg: 'order', type: 'object'}
    }
  )
};
