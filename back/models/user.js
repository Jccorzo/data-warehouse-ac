const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    lastname: { type: String, required: true },
    admin: { type: Boolean, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', UserSchema)