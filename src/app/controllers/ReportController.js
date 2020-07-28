const { startOfDay, endOfDay, parseISO } = require('date-fns');
const Yup = require('yup');
const { Op } = require('sequelize');
const fs = require('fs');
const stringify = require('csv-stringify')

const Vehicles = require('../models/Vehicles');
const Files = require('../jobs/Files');
const Queue = require('../../lib/Queue');

module.exports = {
    async index(req, res){
        const schema = Yup.object().shape({
            start: Yup.date().required(),
            end: Yup.date().required()
        });

        //validação se campos estão preenchidos
        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!');
        }

        const { start, end } = req.body;

        console.log(start, end)

        //requisição infos banco de dados
        const vehicles = await Vehicles.findAll({
            where:{ 
                companies_id: req.userId,
                date_time:{
                    [Op.between]: [
                        startOfDay(parseISO(start)),
                        endOfDay(parseISO(end))
                    ]
                },
            },
            attributes: [
                'model',
                'plate',
                'color',
                'price',
                'owner_name',
                'owner_cpf',
                'owner_phone',
                'owner_email',
            ]
        });

        //conversão para json
        const json = JSON.stringify(vehicles);

        //tratamento json para array
        const info = JSON.parse(json);

        //tratamento headers array
        const data = [{
            modelo: info[0].model,
            placa: info[0].plate, 
            cor: info[0].color,
            valor: info[0].price,
            nome: info[0].owner_name,
            cpf: info[0].owner_cpf,
            telefone: info[0].owner_phone,
            email: info[0].owner_email
        }]

        //criação headers
        const columns = {
            modelo: 'Modelo',
            placa: 'Placa',
            cor: 'Cor',
            valor: 'Valor',
            nome: 'Nome',
            cpf: 'CPF',
            telefone: 'Telefone',
            email: 'Email',
        }

        //criação documento
        stringify(data, { header: true, columns: columns }, (err, output) => {
            fs.writeFile(`temp/${req.userId}.csv`, output, (err) => {
                if (err) throw err;
              });
        });

        //job para deletar arquivo
        await Queue.add(Files.key, {
            name: req.userId
        })

        return res.json(`${process.env.APP_URL}/files/${req.userId}.csv`);
    }
}