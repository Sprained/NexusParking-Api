'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vehicles', {
      id_vechicles: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      plate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      moto: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      car: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      owner_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      owner_cpf: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      owner_ddd: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      owner_phone: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      owner_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      date_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('vehicles')
  }
};
