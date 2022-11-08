'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comment}) {
      this.hasMany(Comment,{
        foreignKey:'commentableId',
        constraints:false,
        scope:{
          commentableType:'video'
        }
      })
    }
  }
  Video.init({
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
  }, {
    sequelize,
    tableName:'videos',
    modelName: 'Video',
  });
  return Video;
};