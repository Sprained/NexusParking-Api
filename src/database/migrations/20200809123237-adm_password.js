'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'companies',
      'adm_password',
      {
        type: Sequelize.STRING,
        allouNull: false
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('companies', 'adm_password')
  }
};
