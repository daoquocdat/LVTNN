const orderModel = require('../../models/order.model');
const moment = require('moment');

class orderController {
    getAll(req, res) {
        orderModel.find({}).populate('idAddress').lean()
            .then((orders) => {
                const formattedOrders = orders.map(order => {
                    return {
                        ...order,
                        createdAtFormatted: moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss')
                    };
                });
                res.render('order/index', {
                    orders: formattedOrders,
                    layout: 'admain'
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal Server Error');
            });
    }
}

module.exports = new orderController()