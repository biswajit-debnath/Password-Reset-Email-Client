'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.addColumn(
      'Users',
      'product_ids',
     {
      type: Sequelize.INTEGER,
      references: {
        model: "Products",
        key: "id",
        as: "product_ids"
      }
     }
    );


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.removeColumn(
      'Users',
      'product_ids'
    );

  }
};
