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
            .catch(error => {
                console.log(error);
            })
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

    //[DELETE] admin/foodtype/:id
    delete(req, res) {
        const id = req.params.id;
        foodTypeModel.findByIdAndDelete(id)
            .then(() => res.redirect("/admin/foodType/index"))
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] admin/foodtype/:id/update
    updateForm(req, res) {
        const id = req.params.id;
        foodTypeModel.findById(id)
            .then((foodtype) => {
                res.render('foodtype/update', {
                    foodtype,
                    layout: 'admain'
                })
            })
            .catch(error => {   
                console.log(error);
            })
    }

    //[PUT] admin/foodtype/:id
    update(req, res) {
        const id = req.params.id;
        foodTypeModel.findByIdAndUpdate(id, {
            nameType: req.body.nameType
        })
            .then(() => res.redirect('/admin/foodType/index'))
            .catch(error => {
                console.log(error);
            })
    }
}
module.exports = new foodTypeController()