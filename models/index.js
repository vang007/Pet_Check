const User = require('./member');
const Post = require('./Post');
const Vote = require('./Vote');

module.exports = { User, Post };

// create associations 
member.hasMany(pets, {
  foreignKey: 'user_id'
});

pets.belongsTo(member, {
  foreignKey: 'user_id',
});



member.belongsToMany(pets, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote };