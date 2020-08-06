'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'companies',
      'price_hour',
      {
        type: Sequelize.FLOAT,
        allouNull: true,
        defaultValue: 6
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('companies', 'price_hour')
  }
};
