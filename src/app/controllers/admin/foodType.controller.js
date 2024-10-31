const foodTypeModel = require('../../models/foodType.model');
class foodTypeController {
    showFoodType(req, res) {
        foodTypeModel.find({})
            .then((foodtype) => {
                foodtype = foodtype.map(foodtype => foodtype.toObject())
                res.render('foodtype/foodtypelist', {
                    foodtype,
                    layout: 'admain'
                })
            })
            .catch();
    }
}
module.exports = new foodTypeController()