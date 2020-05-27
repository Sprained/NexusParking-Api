const Yup = require('yup');

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

        const { name, cnpj, email, phone } =  await Companies.create(req.body);

        await Mail.sendMail({
            to: `${name} <${email}>`,
            subject: 'Requisição de registro',
            template: 'register',
            context: {
                user: name,
                email: email,
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
                phone: phone
            }
        })

        return res.json({ name, cnpj, email, phone });
    }
}