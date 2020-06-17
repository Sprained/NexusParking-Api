const Yup = require('yup');
const fns = require('date-fns');
const { startOfDay, endOfDay, format, getHours, getMinutes } = fns;
const sequelize = require('sequelize');
const { Op } = sequelize;

const Vehicles = require('../models/Vehicles');

module.exports = {
    async index(req, res){
        const date = new Date();
        const vehicles = await Vehicles.findAll({ 
            where:{ 
                companies_id: req.userId,
                date_time:{
                    [Op.between]: [
                        startOfDay(date),
                        endOfDay(date)
                    ]
                }
            }
        })
        
        return res.json(vehicles)
    },
    async store(req, res){
        const schema = Yup.object().shape({
            color: Yup.string().required(),
            model: Yup.string().required(),
            plate: Yup.string().required(),
            owner_name: Yup.string().required(),
            owner_cpf: Yup.number().required(),
            owner_ddd: Yup.number().required(),
            owner_phone: Yup.number().required(),
            owner_email: Yup.string().email().required()
        });

        //verificação dos campos preenchidos
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Compos invalidos' });
        }

        const { color, model, plate, moto, car, owner_name, owner_cpf, owner_ddd, owner_phone, owner_email } = req.body;

        //valor padrão de teste
        const price = 12.73;

        //pegando data de entrada
        const date_time = new Date();

        const vehicle = await Vehicles.create({ color, model, plate, moto, car, owner_name, owner_cpf, owner_ddd, owner_phone, owner_email, price, date_time, companies_id: req.userId })

        return res.json(vehicle);
    }
}