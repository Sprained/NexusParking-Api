'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'vehicles',
      'companies_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'companies', key: 'id_companies' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('vehicles', 'companies_id')
  }
};
