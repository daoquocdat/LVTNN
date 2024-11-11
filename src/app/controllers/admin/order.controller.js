const orderModel = require('../../models/order.model')
class orderController {

    getAll(req, res) {
        orderModel.find({})
            .then((orders) => {
                res.render('order/index', {
                    orders,
                    layout: 'admain'
                })
        })
    }
}

module.exports = new orderController()