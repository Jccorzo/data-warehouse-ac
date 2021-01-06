const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, index: { unique: true } },
    admin: Boolean,
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', UserSchema)