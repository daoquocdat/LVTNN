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
        try {
            const foodGetAll = await foodModel.find({})
                .populate('foodtypeid')
                .populate('promotionid') // Thêm phần populate promotionId
                .lean();

            res.render('food/index', {
                food: foodGetAll,
                layout: 'admain'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

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
        const id = req.params.id;
        foodModel.findByIdAndDelete(id)
            .then(() => res.redirect('/admin/food/index'))
            .catch(error => {
                console.log(error);
            })
    }
    //[GET] /admin/food/update
    edit(req, res) {
        const id = req.params.id;
        foodModel.findById(id)
            .then((food) => {
                res.render('food/edit', {
                    food,
                    layout: 'admain'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    //[PUT] /admin/food/:id
    async update(req, res) {
        const slug = `${slugify(req.body.name)}-${Date.now()}`;
        let body = {
            ...req.body,
            slug
        };
        if (req?.file?.filename) {
            body.image = req.file.filename;
        }
        const food = await foodModel.updateOne({ _id: req.params.id }, body)
            .then(() => res.redirect('/admin/food/index'))
            .catch(error => {
                console.log(error);
            })
    }
    search(req, res) {
        const search = req.query.keyword;
        console.log(search, "search")
        foodModel.find({ name: { $regex: search, $options: 'i' } })
            .then((food) => {
                console.log(food, "food")
                res.json({ data: food, domain: process.env.DOMAIN });
            })
            .catch(error => {
                console.log(error);
            })
    }
}

module.exports = new FoodController();