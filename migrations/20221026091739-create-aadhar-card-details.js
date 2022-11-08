'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('aadharCardDetails', {
      id: {
        type: DataTypes.UUID,
        //generates automatically
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      aadharNumber: {
         type: DataTypes.STRING,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
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
    await queryInterface.dropTable('aadharCardDetails');
  }
};