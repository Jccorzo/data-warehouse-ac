const User = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.create = async (user) => {
    const securePass = crypto.createHash('md5').update(user.password).digest('hex');
    return await User.create({ ...user, password: securePass })
}

exports.listAll = () => User.find()

exports.update = async (user) => {
    const securePass = crypto.createHash('md5').update(user.password).digest('hex');
    await User.findByIdAndUpdate(user._id, { ...user, password: securePass })
}



exports.remove = (userId) => {
    return User.findByIdAndDelete(userId)
}

exports.getUserByEmail = async (user) => {
    const users = await User.find({ email: user.email })
    if (users.length > 0) {
        const securePass = crypto.createHash('md5').update(user.password).digest('hex');
        if (securePass === users[0].password) {
            const userToken = jwt.sign({
                user: user.email,
                admin: users[0].admin
            }, config.jwt, {
                algorithm: "HS512",
            });
            return { token: userToken, email: users[0].email, admin: users[0].admin }
        } else {
            throw new Error('Usuario o contraseña incorrecto')
        }
    } else {
        throw new Error('Usuario o contraseña incorrecto')
    }
}