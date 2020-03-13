// import other models
const Shows = require('./Shows');
const User = require('./User');

// connect (associate) models
User.hasMany(Shows, {
  onDelete: 'CASCADE'
});

// this will create a column in Shows table called 'UserId'
Shows.belongsTo(User);

module.exports = { Shows, User };