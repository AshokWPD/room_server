// models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Create a Sequelize instance with your database configuration.

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: DataTypes.STRING,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
});

module.exports = User;
