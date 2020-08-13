'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'companies',
      'num_moto',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('companies', 'num_moto')
  }
};
