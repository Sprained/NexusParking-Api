'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'companies',
      'companie_name',
      {
        type: Sequelize.STRING,
        allouNull: true
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('companies', 'price')
  }
};
