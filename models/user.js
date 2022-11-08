'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({aadharCardDetails,Address,UserRole}) {
      // define association here
      this.belongsTo(aadharCardDetails, {foreignKey : 'aadharId'})
      this.hasMany(Address, {foreignKey: 'userId'}),
      this.hasMany(UserRole,{foreignKey:'userId'})
    }

    toJSON(){
      return {...this.get(),updatedAt:undefined}
    }

  }
  User.init({
    id:{
      type: DataTypes.UUID,
      //generates automatically
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },

    fullName: {
      type:DataTypes.STRING,
      allowNull:false
    },

    countryCode: {
      type:DataTypes.INTEGER,
      allowNull:false
    },

    aadharId: {
      type: DataTypes.UUID,
      allowNull: true
    }

  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });

  return User;
};