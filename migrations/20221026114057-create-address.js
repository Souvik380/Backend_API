'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('addresses', {
      id: {
        type: DataTypes.UUID,
        //generates automatically
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
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
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('addresses');
  }
};