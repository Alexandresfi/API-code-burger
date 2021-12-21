'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.addColumn('products', 'offer', { 
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
    
  },  don: async (queryInterface, Sequelize) => {
      
    await queryInterface.removeColumn('products', 'offer');
    
  }};