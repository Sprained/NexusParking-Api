const Sequelize = require('sequelize');
const { Model } = Sequelize;
const moment = require('moment')

class Vehicles extends Model{
    static init(sequelize){
        super.init({
            id_vechicles: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            color: Sequelize.STRING,
            model: Sequelize.STRING,
            plate: {
                type: Sequelize.STRING,
            },
            moto: Sequelize.BOOLEAN,
            car: Sequelize.BOOLEAN,
            owner_name: Sequelize.STRING,
            owner_cpf: Sequelize.BIGINT,
            owner_phone: Sequelize.BIGINT,
            owner_email: Sequelize.STRING,
            price: Sequelize.FLOAT,
            date_time: {
                type: Sequelize.DATE,
                get(){
                    return moment.tz(this.getDataValue('date_time'), "America/Sao_Paulo").format('HH:mm')
                }
            },
            paid: Sequelize.BOOLEAN
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.Companies, { foreignKey: 'companies_id', as: 'companies' });
    }
}

module.exports = Vehicles;