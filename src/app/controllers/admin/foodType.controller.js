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
    createForm(req, res) {
        res.render('foodtype/create', {
            layout: 'admain'
        })
    }

    //[POST] admin/foodtype/store
    store(req, res) {
        const foodtype = new foodTypeModel({
            nameType: req.body.nameType
        })
        foodtype.save()
            .then(() => res.redirect('/admin/foodType/index'))
            .catch(error => {
                console.log(error);
            })
    }
}
module.exports = new foodTypeController()