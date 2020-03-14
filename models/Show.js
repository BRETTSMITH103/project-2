const { Model, DataTypes } = require('sequelize');
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
      allowNull: false,
      default: false
    },
    watching: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    }
  },
  {
    sequelize
  }
);

module.exports = Show;
