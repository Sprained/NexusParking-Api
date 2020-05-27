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
            password_hash: Sequelize.STRING,
            address: Sequelize.STRING,
            status: Sequelize.BOOLEAN,
            date_end: Sequelize.DATE
        },{
            sequelize,
        });

        this.addHook('beforeSave', async (companie) => {
            if(companie.password){
                companie.password_hash = await bcrypt.hash(companie.password, 8);
            }
        });

        return this;
    }

    checkPass(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

module.exports = Companies;