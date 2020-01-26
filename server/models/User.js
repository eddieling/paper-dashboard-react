const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {type: String, required: true},
    email: {type: String},
    address: {type: String},
    phone: {type: String},
    role: {type: String},
    birthdate: {type: String},
    address1: {type: String},
    address2: {type: String},
    city: {type: String},
    state: {type: String},
    postal: {type: String},
    country: {type: String},
    registered: {type: Date, default: Date.now}
});
const User = module.exports = mongoose.model('User', UserSchema);