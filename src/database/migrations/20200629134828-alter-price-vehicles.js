'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'vehicles',
      'price',
      {
        type: Sequelize.FLOAT,
        allowNull: true
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('vehicles', 'price')
  }
};
