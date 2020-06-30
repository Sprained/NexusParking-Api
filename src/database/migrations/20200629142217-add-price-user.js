'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'companies',
      'price',
      {
        type: Sequelize.FLOAT,
        allouNull: true,
        defaultValue: 6
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('companies', 'price')
  }
};
