// models/favoritePost.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const FavoritePost = sequelize.define('FavoritePost', {
  favoritePost_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  property_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  room_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  other_details: {
    type: DataTypes.STRING,
  },
});

module.exports = FavoritePost;
