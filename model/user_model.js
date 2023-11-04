// model
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Create a Sequelize instance with your database configuration.
const uuid = require('uuid');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: () => uuid.v4(), // Generates a new UUID for each user
        primaryKey: true,
      },
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
  mobile:DataTypes.STRING,
  type: DataTypes.STRING,
  address:DataTypes.STRING,
  city:DataTypes.STRING,
  pincode:DataTypes.STRING,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
});

module.exports = User;
