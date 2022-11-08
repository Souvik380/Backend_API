'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class aadharCardDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.hasOne(User, {foreignKey:'aadharId'})
    }

    toJSON(){
      return {...this.get(),updatedAt:undefined,createdAt:undefined}
    }

  }
  aadharCardDetails.init({

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
      allowNull: false,
    }

  }, {
    sequelize,
    tableName: 'aadharCardDetails',
    modelName: 'aadharCardDetails',
  });

  return aadharCardDetails;
};