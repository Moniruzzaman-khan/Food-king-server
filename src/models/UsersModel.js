const  mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    location:{type:String},
    password:{type:String},
    date:{type:Date,default:Date.now()}
}, {versionKey:false});
const UsersModel = mongoose.model('users',DataSchema);
module.exports = UsersModel;
