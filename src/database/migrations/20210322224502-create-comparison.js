'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comparisons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      comparison_id: {
        type: Sequelize.UUID,
        required: true,
        allowNull: false
      },

      first_student_name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },

      first_student_text: {
        type: Sequelize.TEXT,
        required: true,
        allowNull: false
      },

      second_student_name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },

      second_student_text: {
        type: Sequelize.TEXT,
        required: true,
        allowNull: false
      },

      similarity: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },

      link: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comparisons');
  }
};