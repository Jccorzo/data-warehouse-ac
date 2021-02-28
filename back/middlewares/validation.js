const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.headers = (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
}

module.exports.validateLogin = (req, res, next) => {
    if (req.baseUrl === '/user/login') next()
    else {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verificarToken = jwt.verify(token, config.jwt)
            if (verificarToken) {
                req.usuario = verificarToken;
                return next()
            }
        } catch (e) {
            res.status(401).json({ mensaje: 'error de autenticacion' })
        }
    }
}

module.exports.validateAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const verificarAdmin = jwt.decode(token, config.jwt)
    if (verificarAdmin.administrador) {
        return next()
    } else res.status(401).json({ mensaje: 'falta de permisos' })
}