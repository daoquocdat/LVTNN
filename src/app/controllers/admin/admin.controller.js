const bcrypt = require('bcrypt');

const adminModel = require('../../models/admin.model');
const { generateToken } = require('../../common/generateToken');
class AdminController{
    // [GET] /admin
    index(req, res) {
        res.render('admin/admin', {layout: 'admain'});
    }
    getOne(req, res) {
        const id = req.params.id;

        adminModel.findOne({id, isDeleted: false })
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        });
    }

    async create(req, res) {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        const admin = new adminModel({
            username: req.body.username,
            password: passwordHash,
            name: req.body.name,
            isDeleted: false 
        });
        admin.save()
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        });
    }

    delete(req, res) {
        const id = req.params.id;
        adminModel.findByIdAndDelete(id)
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        });
    }

    update(req, res) {
        const id = req.params.id;
        adminModel.findByIdAndUpdate(id, {
            name: req.body.name
        })
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        });
    }

    softDelete(req, res) {
        const id = req.params.id;
        adminModel.findByIdAndUpdate(id, { isDeleted: true })
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    restore(req, res) {
        const id = req.params.id;
        adminModel.findByIdAndUpdate(id, { isDeleted: false })
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        });
    }

    // admin/login
    loginform(req, res) {
        res.render('admin/login', { layout: 'admain' });
    }

    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        adminModel.findOne({ username })
        .then(async admin => {
            if(!admin){
                return res.json("Tai khoan khong ton tai");
            }
            const passwordCompare = bcrypt.compare(password, admin.password);
            if(!passwordCompare) {
                return res.json("Sai mat khau");
            }   
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

            const accessToken = await generateToken(
                { id: admin._id },
                accessTokenSecret,
            );

            res.cookie('adminAccessToken', accessToken, { maxAge: 900000, httpOnly: true });
            res.redirect('/admin');
        })
        .catch(error => {
            console.log(error);
        });
    }

    logout(req, res) {
        res.clearCookie('admin');
        res.json("Dang xuat thanh cong");
    }
}

module.exports = new AdminController();