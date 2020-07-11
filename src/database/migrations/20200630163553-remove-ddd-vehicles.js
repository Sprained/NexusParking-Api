'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('vehicles', 'owner_ddd')
  }
};
