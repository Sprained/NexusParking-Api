const Sequelize = require('sequelize');
const { Model } = Sequelize;

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
            plate: Sequelize.STRING,
            moto: Sequelize.BOOLEAN,
            car: Sequelize.BOOLEAN,
            owner_name: Sequelize.STRING,
            owner_cpf: Sequelize.BIGINT,
            owner_ddd: Sequelize.INTEGER,
            owner_phone: Sequelize.BIGINT,
            owner_email: Sequelize.STRING,
            price: Sequelize.FLOAT,
            date_time: Sequelize.DATE,
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