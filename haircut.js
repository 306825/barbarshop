var mongoose = require('mongoose');

var haircutSchema = {
    stylename: {type: String, required: true},
    personCut : {
        firstname: {type: String, required: true},
        lastname: {type: String, required:true}
    },
    date : {type: Date, required: true, defualt: Date.now()},
    price: {type: Number, required: true},
    discount: {type: Number, default:0}
}

module.exports = new mongoose.Schema(haircutSchema);
module.exports.haircutSchema = haircutSchema;