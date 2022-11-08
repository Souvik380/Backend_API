'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Image,Video}) {
      this.belongsTo(Image, { foreignKey: 'commentableId', constraints: false });
      this.belongsTo(Video, { foreignKey: 'commentableId', constraints: false });
    }
  }
  Comment.init({
    id: {
      type: DataTypes.UUID,
      //generates automatically
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    text:  {
      type:DataTypes.STRING,
      allowNull:false
    },
    commentableType:  {
      type:DataTypes.STRING,
      allowNull:false
    },
    commentableId:{
      type:DataTypes.UUID,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'comments',
    modelName: 'Comment',
  });
  return Comment;
};