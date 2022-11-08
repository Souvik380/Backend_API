'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, {foreignKey:'userId'})
    }

    toJSON(){
      return {...this.get(),updatedAt:undefined,createdAt:undefined}
    }

  }
  Address.init({
    id: {
      type: DataTypes.UUID,
      //generates automatically
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    street: {
      type: DataTypes.STRING,
      allowNull: false
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country:{
      type: DataTypes.STRING,
      allowNull: false
    },

    
  }, {
    sequelize,
    tableName:"addresses",
    modelName: 'Address',
  });
  return Address;
};