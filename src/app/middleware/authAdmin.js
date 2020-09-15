const jwt = require('jsonwebtoken');
const util = require('util');
const { promisify } = util;

const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
    const role = req.headers.role;

    
    if(!role){
        return res.status(401).json({ error: 'Usuario sem permissão administrativa!' });
    }

    try {
        const decoded = await promisify(jwt.verify)(role, authConfig.secret);

        if(decoded.role === 'adm'){
            return next();
        }

    } catch (error) {
        return res.status(401).json({ error: 'Usuario sem permissão administrativa!' });
    }
}