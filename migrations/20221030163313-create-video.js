'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('videos', {
      id: {
        type: DataTypes.UUID,
        //generates automatically
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false
      },
      url: {
        type:DataTypes.STRING,
        allowNull:false
      },
      duration:  {
        type:DataTypes.INTEGER,
        allowNull:false
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
    await queryInterface.dropTable('videos');
  }
};