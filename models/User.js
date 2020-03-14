const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

<<<<<<< HEAD
// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
=======

class User extends Model {
  
>>>>>>> f7718e4d3c6f89397151667bf7513d696807ae4d
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

<<<<<<< HEAD
// create fields/columns for User model
=======

>>>>>>> f7718e4d3c6f89397151667bf7513d696807ae4d
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        const hashedPw = await bcrypt.hash(newUserData.password, 10);
        newUserData.password = hashedPw;
        return newUserData;
      }
    },
    sequelize
  }
);

module.exports = User;