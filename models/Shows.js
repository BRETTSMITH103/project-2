const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    toWatch: {
    type: boolean,
    default: false
}, 
    watching: {
    type: boolean,
    default: false
},
    completed: {
    type: boolean,
    default: true
}
    sequelize
  }
);

module.exports = Shows;
