const orderModel = require("../../models/order.model");
const canceledOrderModel = require("../../models/canceledOrder.model");
class OrderController {
    confirmOrder(req, res) {
        const id = req.body.id;
        orderModel
            .updateOne({ _id: id }, { status: "inProgress" })
            .then((order) => {
                res.json(order);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    complete(req, res) {
        const id = req.body.id;
        orderModel
            .updateOne({ _id: id }, { status: "completed" })
            .then((order) => {
                res.json(order);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //[POST] /oder/cancel/:id
    cancel(req, res) {
        try{
            const id = req.body.id;
            const reason = req.body.reason;
            if (!reason) {
                return res.status(400).json({ msg: "Không thể huỷ đơn hàng khi chưa nhập lý do" });
            }
            orderModel.updateOne({ _id: id }, { status: "cancel" })
                .then((order) => {
                    canceledOrderModel.create({ orderId: id, reason: reason })
                        .then((canceledOrder) => {
                        res.json(canceledOrder);
                    })
                })
                .catch((error) => {
                    console.log('không thể huỷ đơn hàng', error);
                });
        } catch (error) {
            console.log('không thể huỷ đơn hàng', error);
        }
    }
}
module.exports = new OrderController();
