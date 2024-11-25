const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Post = require('./Post'); 

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,  
            key: 'id',
        },
    },
});


module.exports = Comment;
