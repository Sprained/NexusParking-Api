const Yup = require('yup');
const crypto = require('crypto');
const fns = require('date-fns');
const { addDays } = fns;

const Companies = require('../models/Companies');
const RegisterMail = require('../jobs/RegisterMail');
const Queue = require('../../lib/Queue');

module.exports = {
    async register(req, res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            companie_name: Yup.string().required(),
            cnpj: Yup.number().required().min(11),
            email: Yup.string().email().required(),
            phone: Yup.number().required(),
        });

        //Verificando se campos preenchidos
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Compos invalidos' });
        }

        const userExists = await Companies.findOne({ where: { email: req.body.email } });
        
        //verificar se usuario ja foi cadastrado
        if(userExists){
            return res.status(400).json({ error: 'Usuario ja cadastrado.' });
        }

        //senha temporaria
        const password = crypto.randomBytes(6).toString('HEX');

        //date_end temporaria
        const date_end = addDays(new Date(), 30);

        const { name, cnpj, email, phone, companie_name } = req.body

        const companie = await Companies.create({ name, cnpj, email, phone, password, address:'', date_end, companie_name });

        await Queue.add(RegisterMail.key, {
            name,
            companie_name,
            email,
            password,
            phone
        })

        return res.json(companie);
    },
    async update(req, res){
        const schema = Yup.object().shape({
            oldPassword: Yup.string(),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => 
                oldPassword ? field.require() : field
            ),
            confirmPassword : Yup.string().when('password', (password, field) => 
                password ? field.require().oneOf([Yup.ref('password')]) : field
            )
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Campos invalidos' });
        }

        const { oldPassword } = req.body;

        const user = await Companies.findByPk(req.userId);

        if(oldPassword && !(await user.checkPass(oldPassword))){
            return res.status(401).json({ error: 'Senha não confere' });
        }

        await user.update(req.body);

        return res.json()
    }
}