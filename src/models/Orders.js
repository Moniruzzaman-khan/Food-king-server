const  mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    email:{type:String,unique:true},
    order_data:{type:Array},
}, {versionKey:false});
const Orders = mongoose.model('orders',DataSchema);
module.exports = Orders;