const User = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.create = (user) => {
    const securePass = crypto.createHash('md5').update(user.password).digest('hex');
    await new User({...user, password: securePass}).save()
}

exports.listAll = () => User.find()

exports.update = (user) => User.findByIdAndUpdate(user._id, user)


exports.remove = (userId) => {
    return User.findByIdAndDelete(userId)
}

exports.getUserByEmail = async (user) => {
    const users = await User.where({ email: user.email })
    if (users.length > 0) {
        const securePass = crypto.createHash('md5').update(user.password).digest('hex');
        if(securePass === users[0].password){
            const userToken = jwt.sign({
                user: user.email,
                admin: users[0].admin
            }, config.jwt, {
                algorithm: "HS512",
            });
            return userToken
        } else {
            throw new Error('Usuario o contraseña incorrecto')
        }
    } else {
        throw new Error('Usuario o contraseña incorrecto')
    }
}