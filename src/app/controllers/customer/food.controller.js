const foodModel = require('../../models/food.model');

class FoodController {
    //[GET] /
    home(req, res) {
        res.render('home');
    }
}

module.exports = new FoodController();