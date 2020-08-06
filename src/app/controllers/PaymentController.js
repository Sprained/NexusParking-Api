const moment = require('moment');
moment.locale('pt-br')

const Vehicles = require('../models/Vehicles');
const Companies = require('../models/Companies'); 
const PayMail = require('../jobs/PayMail');
const Queue = require('../../lib/Queue');

module.exports = {
    async index(req, res){
        const id = req.params.id;
        const userId = req.userId;

        const { companies_id, date_time, model, owner_phone } = await Vehicles.findOne({ where: { id_vechicles: id } });

        //verificar se veiculo pertene a empresa
        if(companies_id != userId){
            return res.status(400).json({ error: 'Veiculo não pertence a empresa!' });
        }

        const { price, price_hour } = await Companies.findOne({ where: { id_companies: userId } });

        const grossDate = new Date();
        const date = moment(grossDate).format('HH:mm');

        const date_time_format = moment(date_time).format('HH:mm');
        [hourV, ] = date_time_format.split(':');
        [hour, ] = date.split(':');

        const time =  hour - hourV;

        if(time < 1){
            const value = price;
            return res.json({
                start: date_time,
                end: grossDate,
                price,
                value,
                model,
                phone: owner_phone
            });
        }
        
        const value = price + (time * price_hour);

        return res.json({
            start: date_time,
            end: grossDate,
            price,
            value,
            model
        });
    },
    async pay(req, res){
        const id = req.params.id;
        const userId = req.userId;

        const { companies_id, date_time, owner_email, owner_name } = await Vehicles.findOne({ where: { id_vechicles: id } });

        //verificar se veiculo pertene a empresa
        if(companies_id != userId){
            return res.status(400).json({ error: 'Veiculo não pertence a empresa!' });
        }

        //informar que foi pago e valor pago para o bd
        const { price, name, price_hour } = await Companies.findOne({ where: { id_companies: userId } });

        const grossDate = new Date();
        const date = moment(grossDate).format('HH:mm');

        const date_time_format = moment(date_time).format('HH:mm');
        [hourV, ] = date_time_format.split(':');
        [hour, ] = date.split(':');

        const time =  hour - hourV;
        let value;

        if(time < 1){
            value = price;
        }
        else{
            value = price + (time * price_hour);
        }
        await Vehicles.update({ paid: true, price: value, date_time: grossDate }, { where: { id_vechicles: id } });

        //pegar dia formato brasileiro
        const day = moment(grossDate).format('LL');

        //enviar email para dono com preço pago
        await Queue.add(PayMail.key, {
            name: owner_name,
            email: owner_email,
            company: name,
            price: value,
            day
        })

        return res.json();
    }
}