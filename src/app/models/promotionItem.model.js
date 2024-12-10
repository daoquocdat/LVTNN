const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionItemSchema = new Schema({
    foodid: { type: Schema.Types.ObjectId, ref: 'food', required: true },
    promotionid: { type: Schema.Types.ObjectId, ref: 'promotion', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PromotionItem', promotionItemSchema);