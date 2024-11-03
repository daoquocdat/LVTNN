const foodModel = require('../../models/food.model');
const foodTypeModel = require('../../models/foodType.model');

const { multipleMongooseToOject } = require('../../../util/mongoose');
// tạ slug thủ công
const slugify = (text) => {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/&/g, '-and-') // Thay thế & bằng 'and'
        .replace(/[^\w\-]+/g, '') // Xóa bỏ ký tự không phải là chữ cái, số, gạch ngang, gạch dưới
        .replace(/\-\-+/g, '-'); // Thay thế nhiều dấu gạch ngang bằng một dấu
};

class FoodController {
    //[GET] /admin/food
    async getAll(req, res) {
        const foodGetAll = await foodModel.find({}).populate('foodtypeid')
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

    //[POST] /admin/food/store
    async store(req, res) {
        try {
            const slug = slugify(req.body.name) + '-' + Date.now();
            const food = new foodModel({
                name: req.body.name,
                foodtypeid: req.body.foodtypeid,
                description: req.body.description,
                image: req.file.filename,
                price: req.body.price,
                slug: slug
            });
            await food.save();
            res.redirect('/admin/food/index');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error saving food item');
        }
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