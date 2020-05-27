const Yup = require('yup');
const crypto = require('crypto');
const fns = require('date-fns');
const { addDays } = fns;

const Companies = require('../models/Companies');
const Mail = require('../../lib/Mail');

module.exports = {
    async register(req, res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
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

        const date_end = addDays(new Date(), 30);

        const { name, cnpj, email, phone } = req.body

        const companie = await Companies.create({ name, cnpj, email, phone, password, address:'', date_end });

        await Mail.sendMail({
            to: `${name} <${email}>`,
            subject: 'Requisição de registro',
            template: 'register',
            context: {
                user: name,
                email: email,
                password: password,
                phone: phone
            }
        })

        await Mail.sendMail({
            to: `Equipe Nexus <${process.env.USE_EMAIL}>`,
            subject: 'Requisição de registro',
            template: 'register',
            context: {
                user: name,
                email: email,
                password: password,
                phone: phone
            }
        })

        return res.json(companie);
    }
}