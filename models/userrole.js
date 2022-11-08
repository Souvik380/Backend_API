'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Role}) {
      this.belongsTo(User,{foreignKey:'userId'}),
      this.belongsTo(Role,{foreignKey:'roleId'})
    }
  }
  UserRole.init({
    id:{
      type: DataTypes.UUID,
      //generates automatically
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },

    roleId: {
      type:DataTypes.UUID,
      allowNull:true
    },

    userId:  {
      type:DataTypes.UUID,
      allowNull:true
    }

  }, {
    sequelize,
    tableName:'userroles',
    modelName: 'UserRole',
  });
  return UserRole;
};