'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('produtcs', { 
      id:{ 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true, //O próprio sequelize vai incrementando o id, lembrando que o id neste caso é um número inteiro
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      price:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      path:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
     
  },

  down: async (queryInterface) => {
    
     await queryInterface.dropTable('produtcs');
    
  }
};
