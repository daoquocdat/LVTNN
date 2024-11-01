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

    //[GET] admin/foodtype/create
    create(req, res) {
        res.render('foodtype/create', {
            layout: 'admain'
        })
    }
}
module.exports = new foodTypeController()