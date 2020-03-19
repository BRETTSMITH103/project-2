const { Model, DataTypes, QueryTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Show extends Model { }

// create fields/columns for Post model
Show.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    toWatch: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    watching: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    tvMazeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize
  }
);

module.exports = Show;
