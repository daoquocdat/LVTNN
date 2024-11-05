const foodModel = require('../../models/food.model');
const foodTypeModel = require('../../models/foodType.model');

class FoodController {
    //[GET] /
    home(req, res) {
        Promise.all([
            foodTypeModel.find({}).lean(), // Sử dụng lean() để chuyển đổi trực tiếp sang Object
            foodModel.find({}).lean()
        ])
            .then(([foodtypes, foods]) => {
                // Thay thế ký tự xuống dòng trong mô tả thực phẩm
                foods = foods.map(food => {
                    return {
                        ...food,
                        description: food.description.replace(/\r\n/g, '<br/>'),
                    };
                });

                res.render('home', {
                    foodtypes, // Đổ dữ liệu foodtypes vào view
                    foods // Đổ dữ liệu foods vào view
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    showFoodDetail(req, res) {
        const slug = req.params.slug;
        foodModel.findOne({ slug })
            .then(food => {
                // Thay thế tất cả các ký tự \r\n trong description bằng thẻ <br/>
                // // food.description = food.description.replace(/\r\n/g, '<br/>').replaceAll('-', '');
                // const list = food.description.split('<br/>'); // Chia chuỗi thành từng dòng bằng thẻ <br/>

                res.render('food/detail', {
                    food,
                    // list
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    

}

module.exports = new FoodController();