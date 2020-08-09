const Sequelize = require('sequelize');
const { Model } = Sequelize
const bcrypt = require('bcryptjs');

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
            passwordAdm: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            adm_password: Sequelize.STRING,
            address: Sequelize.STRING,
            status: Sequelize.BOOLEAN,
            date_end: Sequelize.DATE,
            price: Sequelize.FLOAT,
            price_hour: Sequelize.FLOAT,
            companie_name: Sequelize.STRING
        },{
            sequelize,
        });

        this.addHook('beforeSave', async (companie) => {
            if(companie.password){
                companie.password_hash = await bcrypt.hash(companie.password, 8);
            }

            if(companie.passwordAdm){
                companie.adm_password = await bcrypt.hash(companie.passwordAdm, 8);
            }
        });

        return this;
    }

    checkPass(password){
        return bcrypt.compare(password, this.password_hash);
    }

    checkAdmPass(passwordAdm){
        return bcrypt.compare(passwordAdm, this.adm_password);
    }
}

module.exports = Companies;