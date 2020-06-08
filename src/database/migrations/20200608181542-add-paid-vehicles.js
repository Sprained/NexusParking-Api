'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'vehicles',
      'paid',
      {
        type: Sequelize.BOOLEAN,
        allouNull: true
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('vehicles', 'paid')
  }
};
