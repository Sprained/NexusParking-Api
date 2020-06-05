const jwt = require('jsonwebtoken');
const util = require('util');
const { promisify } = util;

const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json('Token não informado!');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;

        return next();
    } catch (error) {
        return res.status(401).json('Token invalido');
    }
}