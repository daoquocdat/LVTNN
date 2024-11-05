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
}

module.exports = new FoodController();