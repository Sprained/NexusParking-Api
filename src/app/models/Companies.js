const Sequelize = require('sequelize');
const { Model } = Sequelize

class Companies extends Model{
    static init(sequelize){
        super.init({
            id_companies: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: Sequelize.STRING,
            cnpj: Sequelize.BIGINT,
            phone: Sequelize.BIGINT,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            address: Sequelize.STRING,
            status: Sequelize.BOOLEAN,
            date_end: Sequelize.DATE
        },{
            sequelize,
        });

        return this;
    }
}

module.exports = Companies;