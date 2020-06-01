const Yup = require('yup');
const jwt = require('jsonwebtoken');

const Companies = require('../models/Companies');
const authConfig = require('../../config/auth');

module.exports = {
    async store(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        });

        //validação se campos estão preenchidos
        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!');
        }

        const { email, password } = req.body;

        const companie = await Companies.findOne({ where: { email } });

        //verificação se usuario existe
        if(!companie){
            return res.status(401).json('Usuario não cadastrado!');
        }

        //verificação password
        if(!(await companie.checkPass(password))){
            return res.status(401).json('Password informado com erro');
        }
        
        const { id, name } = companie;

        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}