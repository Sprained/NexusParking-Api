const Companies = require('../models/Companies');

module.exports = async (req, res, next) => {
    const authAdmin = req.headers.admin;

    //verificar se a senha foi passada nos headers
    if(!authAdmin){
        return res.status(401).json('Senha administrativa não informada!');
    }

    const companie = await Companies.findOne({ where: { id_companies: req.userId } });

    try {
        await companie.checkAdmPass(authAdmin);

        return next();
    } catch (error) {
        return res.status(401).json('Senha invalida!');
    }
}