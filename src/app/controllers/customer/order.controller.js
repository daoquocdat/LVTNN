const Address = require('../../models/address.model'); // Đảm bảo bạn đã tạo mô hình Address
const Order = require('../../models/order.model'); // Đảm bảo bạn đã tạo mô hình Order
const OrderDetails = require('../../models/orderDetail.model'); // Đảm bảo bạn đã tạo mô hình OrderDetails

const crypto = require('crypto');
const axios = require('axios');

const partnerCode = 'MOMOT5BZ20231213_TEST'; // Mã đối tác giả lập
const accessKey = 'ACCESS_KEY'; // Khóa truy cập giả lập
const secretKey = 'SECRET_KEY'; // Khóa bí mật giả lập
const redirectUrl = 'http://localhost:3000/result'; // URL chuyển hướng giả lập
const ipnUrl = 'http://localhost:3000/ipn'; // URL nhận thông báo giả lập

class OrderController {
    //[GET] /address
    async placeOrder(req, res) {
        res.render('order/placeOrder', {
            layout: 'main'
        })
    }

    //[POST] /submitOrder
    async submitOrder(req, res) {
        try {
            // Lưu lại địa chỉ
            const address = await Address.create({
                fullName: req.body.fullName,
                phone: req.body.phone,
                city: req.body.city,
                district: req.body.district,
                wards: req.body.wards,
                address: req.body.address
            });

            // Lưu lại đơn hàng
            const order = new Order({
                idAddress: address._id,
                status: 'new',
                moneyTotal: req.body.items.reduce((total, item) => total + item.amount * item.price, 0),
                payment: req.body.paymentMethod,
                shippingFee: 15,
                finalMoney: req.body.items.reduce((total, item) => total + item.amount * item.price, 0) + 15
            });

            // Lưu lại chi tiết đơn hàng
            const orderDetailsPromises = req.body.items.map(item => {
                return OrderDetails.create({
                    foodid: item.id,
                    orderid: order._id,
                    name: item.name,
                    amount: item.amount,
                    price: item.price
                });
            });

            // Chờ tất cả các chi tiết đơn hàng được lưu
            await Promise.all(orderDetailsPromises);

            // Cập nhật số lượng chi tiết đơn hàng trong đơn hàng
            order.amount = req.body.items.length;
            await order.save();

            res.status(201).json({ message: 'Đặt hàng thành công!', order });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Đặt hàng thất bại!' });
        }
    }

    //[GET] /confirmation
    confirmation(req, res) {
        res.redirect('/');
        // res.render('order/confirmation', {
        //     layout: 'main'
        // })
    }

    //[GET] /api/orders
    async getOrders(req, res) {
        try {
            const orders = await Order.find({}).lean();
            res.json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Lấy danh sách đơn hàng thất bại!' });
        }
    }

    payment(req, res) {
        res.render('order/payment', {
            layout: 'main'
        })
    }

    async paymentMomo(req, res) {
        const { amount, orderId, orderInfo } = req.body;

        const requestId = partnerCode + new Date().getTime();
        const rawSignature = `accessKey=${encodeURIComponent(accessKey)}&amount=${encodeURIComponent(amount)}&extraData=${encodeURIComponent('')}&ipnUrl=${encodeURIComponent(ipnUrl)}&orderId=${encodeURIComponent(orderId)}&orderInfo=${encodeURIComponent(orderInfo)}&partnerCode=${encodeURIComponent(partnerCode)}&redirectUrl=${encodeURIComponent(redirectUrl)}&requestId=${encodeURIComponent(requestId)}&requestType=${encodeURIComponent('captureWallet')}`;

        console.log('rawSignature:', rawSignature);

        const signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        console.log('signature:', signature);

        const requestBody = {
            partnerCode,
            accessKey,
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            extraData: '',
            requestType: 'captureWallet',
            signature,
        };

        try {
            const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody);
            console.log(response.data);
            res.json(response.data);
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
module.exports = new OrderController();