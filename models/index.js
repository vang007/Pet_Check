const animals = require("./animals");
const user = require("./user");

user.hasMany(animals, {
  foreignKey: 'user_id'
});

animals.belongsTo(user, {
  foreignKey: 'user_id',
})

module.exports = { user, animals };