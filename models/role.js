'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserRole}) {
      // define association here
      this.hasMany(UserRole,{foreignKey:'roleId'})
    }
  }
  Role.init({
    id:{
      type: DataTypes.UUID,
      //generates automatically
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },

    name: {
      type:DataTypes.STRING,
      allowNull:true
    }

  }, {
    sequelize,
    tableName:'roles',
    timestamps:false,
    modelName: 'Role',
  });
  return Role;
};