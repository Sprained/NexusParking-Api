const { Op } = require('sequelize');

const Vehicles = require('../models/Vehicles');
const Companies = require('../models/Companies');
const { count } = require('../models/Vehicles');

module.exports = {
    async countVehicles(req, res){
        //requisitar veiculos estacionados
        const vehicles = await Vehicles.findAll({
            where:{
                companies_id: req.userId,
                paid: null
            },
            attributes: [
                'moto',
                'car'
            ]
        });

        //requisitar numero de vagas
        let { num_car, num_moto } = await Companies.findOne({ where: { id_companies: req.userId } });

        //foreach para calcular quantidade de vagas disponiveis
        vehicles.forEach(count);
        function count(value, index, array){
            if(array[index].dataValues.car){
                num_car -= 1;
            }
            if(array[index].dataValues.moto){
                num_moto -= 1;
            }
        }

        return res.json({num_car: num_car, num_moto: num_moto});
    }
}