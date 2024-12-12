const promotionModel = require('../../models/promotion.model');
const foodModel = require('../../models/food.model');

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
        foodModel.find({ promotionid: null }).lean()
            .then(foods => {
                res.render('promotion/create', {
                    foods,
                    layout: 'admain'
                });
            })
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
                foodModel.findById(item.id)
                    .then((food) => {
                        food.promotionid = promotion._id;
                        food.save();
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    });
                return {
                    foodid: item.id,
                    promotionid: promotion._id,
                };
            });
            res.json(promotionItems);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res) {
        Promise.all([
            promotionModel.findByIdAndDelete(req.params.id),
            foodModel.updateMany({ promotionid: req.params.id }, { promotionid: null })
        ])
            .then(() => res.redirect('/admin/promotion/index'))
            .catch(error => {
                console.log(error);
            })
    }

    async edit(req, res) {
        Promise.all([
            promotionModel.findById(req.params.id).lean(),
        ])
            .then(([promotion, foods, otherFoods]) => {
                res.render('promotion/edit', {
                    promotion,
                    layout: 'admain'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    getPromotionFoods(req, res) {
        foodModel.find({ promotionid: req.params.id }).lean()
            .then(foods => {
                res.json(foods);
            })
            .catch(error => {
                console.log(error);
            })

    }

    getNotPromotionFoods(req, res) {
        foodModel.find({ promotionid: null }).lean()
            .then(foods => {
                res.json(foods);
            })
            .catch(error => {
                console.log(error);
            })
    }
}

module.exports = new promotionController();