'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        //generates automatically
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false
      },

      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      countryCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      aadharId: {
        type: DataTypes.UUID,
        allowNull: true
      }, 

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }

    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};