// import other models
const Show = require('./Show');
const User = require('./User');

// connect (associate) models
User.hasMany(Show, {
  onDelete: 'CASCADE'
});

// this will create a column in Shows table called 'UserId'
Show.belongsTo(User);

module.exports = { Show, User };
