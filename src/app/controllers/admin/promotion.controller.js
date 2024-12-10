const { disconnect } = require('mongoose');
const promotionModel = require('../../models/promotion.model');
const foodModel = require('../../models/food.model');
const promotionItemModel = require('../../models/promotionItem.model');

class promotionController {
    index(req, res) {
        promotionModel.find({}).lean()
            .then(promotions => {
                res.render('promotion/index', {
                    promotions,
                    layout: 'admain'
                })
            })
    }

    create(req, res) {
        // Lấy danh sách các food_id trong bảng promotionItem
        promotionItemModel.find().select('foodid').lean()
            .then(promotionItems => {
                console.log(promotionItems);
                const promotedFoodIds = promotionItems.map(item => item.foodid);
                // Truy vấn lấy các món ăn không nằm trong danh sách promotedFoodIds
                return foodModel.find({ _id: { $nin: promotedFoodIds } }).lean();
            })
            .then(foods => {
                res.render('promotion/create', {
                    foods,
                    layout: 'admain'
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });
    }


    store(req, res) {
        try {
            // luu lai khuyen mai
            const promotion = new promotionModel({
                name: req.body.name,
                discount: req.body.discount,
            });
            promotion.save();

            // luu lai chi tiet khuyen mai
            const promotionItems = req.body.promotionItems.map(item => {
                return {
                    foodid: item.id,
                    promotionid: promotion._id
                }
            });
            promotionItemModel.insertMany(promotionItems);
            res.json(promotion);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new promotionController();