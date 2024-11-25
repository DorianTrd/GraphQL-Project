const sequelize = require('../config/db'); 
const Post = require('./Post');
const Comment = require('./Comment');


Post.hasMany(Comment, {
  foreignKey: 'postId',  
  as: 'comments',        
  onDelete: 'CASCADE',  
});

Comment.belongsTo(Post, { 
  foreignKey: 'postId'  
});


module.exports = { Post, Comment, sequelize };
