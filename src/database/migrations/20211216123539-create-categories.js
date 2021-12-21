'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('categories',{
    id:{ 
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true, //A categoria sequelize vai incrementando o id, lembrando que o id neste caso é um número inteiro
      primaryKey: true,
    },
    name:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    created_at:{
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at:{
      type: Sequelize.DATE,
      allowNull: false,
    },
   })
  },

  down: async (queryInterface) => {
  
    await queryInterface.dropTable('categories');
  }
};
