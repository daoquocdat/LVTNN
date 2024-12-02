const addressModel = require('../../models/address.model');

class addressController {
    customerAddressList(req, res) {
        addressModel.find({}).lean()
            .then(addresses => {
                res.render('address/customerAddressList', { 
                    addresses,
                    layout: 'main' });
            })
    }
}

module.exports = new addressController();