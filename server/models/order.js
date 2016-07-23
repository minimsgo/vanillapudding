var app = require('../server')
module.exports = function (Order) {

  Order.createWithWorks = function (order, cb) {
    var newOrder = {
      customerTel: order.customerTel,
      customerName: order.customerName,
      amount: order.amount,
      orderDate: new Date()
    }

    var works = order.orderedWorks;

    Order.create(newOrder, function (err, createdOrder) {
      var orderId = createdOrder.id;
      works.map(function (work) {
        require('crypto').randomBytes(5, function (ex, buf) {

          //生成条形码
          var biguint = require('biguint-format');
          var barcode = biguint(buf, 'dec');

          //计算起始状态
          app.models.Work.findById(work.id, function (err, work) {
            app.models.Service.findById(work.serviceId, function (err, service) {
              var initState = service.flow[0]
              var wear = {
                orderId: orderId,
                workId: work.id,
                barcode: barcode,
                states: [{updateDate: new Date(), state: initState}]
              }
              app.models.Wear.create(wear, function (err, createdWear) {
              })
            })
          })
        });
      })
    })

    cb(null, 'created')
  }

  Order.remoteMethod(
    'createWithWorks',
    {
      accepts: {arg: 'order', type: 'object'},
      returns: {arg: 'status', type: 'string'}
    }
  );
};
