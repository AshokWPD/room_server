const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Booking = sequelize.define('Booking', {
  booking_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  subvendor_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vendor_id: { // Add vendor_id field
    type: DataTypes.STRING,
    allowNull: true,

  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  property_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  memberCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  checkinDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  checkoutDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  priceAmount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  paymentMode: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  ticket_id: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,

  },
});

module.exports = Booking;
