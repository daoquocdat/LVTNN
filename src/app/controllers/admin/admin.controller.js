const adminModel = require('../../models/admin.model');
const bcrypt = require('bcrypt');
class AdminController{
    getAll(req, res) {
        adminModel.find({ isDeleted: false })
        .then(admins => {
            res.json(admins);
        })
        .catch(error => {
            console.log(error);
        });
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
            res.cookie('admin', admin, { maxAge: 900000, httpOnly: true });

            res.json("Dang nhap thanh cong ");
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