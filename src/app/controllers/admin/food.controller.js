const foodModel = require('../../models/food.model');

class FoodController {
    //[GET] /admin/food
    getAll(req, res) {
        const foodGetAll = foodModel.find({})
        .then((foodGetAll) => {
            res.json(foodGetAll);
        })
        .catch(error => {
            console.log(error);
        });
    };

    //[GET] /admin/food/create
    create(req, res) {
        res.render('home');
    }
}

module.exports = new FoodController();