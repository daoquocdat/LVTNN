const foodModel = require('../../models/food.model');
const foodTypeModel = require('../../models/foodType.model');

const { multipleMongooseToOject } = require('../../../util/mongoose');

class FoodController {
    //[GET] /admin/food
    getAll(req, res) {
        const foodGetAll = foodModel.find({})
            .then((food) => {
                res.render('food/index', {
                    food,
                    layout: 'admain'
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

    //[GET] /admin/food/create
    create(req, res, next) {
        foodTypeModel.find({})
            .then((foodType) =>
                res.render('food/create', {
                    foodtype: multipleMongooseToOject(foodType),
                    layout: 'admain'
                })
            )
            .catch(next);
    }

    //[GET] /admin/food/delete
    delete(req, res) {
        res.send('xóa môn ăn');
    }

    //[GET] /admin/food/update
    update(req, res) {
        res.send('cap nhật môn ăn');
    }
}

module.exports = new FoodController();