const foodModel = require('../../models/food.model');
const foodTypeModel = require('../../models/foodType.model');

class FoodController {
    //[GET] /
    home(req, res) {
        foodTypeModel.find({})
            .then((foodtype) => {
                foodtype = foodtype.map(foodtype => foodtype.toObject());
                res.render('home', {
                    foodtype,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

module.exports = new FoodController();