// models/property.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Property = sequelize.define('Property', {
  property_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  vendor_id:{
    type:DataTypes.STRING,
    allowNull: false,

  },
  property_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  property_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  landmark: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status_vendor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  features: {
    type: DataTypes.TEXT, // Change to TEXT to store JSON
    allowNull: true,
    get() {
      return JSON.parse(this.getDataValue('features'));
    },
    set(value) {
      this.setDataValue('features', JSON.stringify(value));
    }
  },
  room_images: {
    type: DataTypes.TEXT, 
    allowNull: true,
    get() {
      return JSON.parse(this.getDataValue('room_images'));
    },
    set(value) {
      this.setDataValue('room_images', JSON.stringify(value));
    }
  },
  property_image: {
    type: DataTypes.TEXT, 
    allowNull: true,
    get() {
      return JSON.parse(this.getDataValue('property_image'));
    },
    set(value) {
      this.setDataValue('property_image', JSON.stringify(value));
    }
  },
  roomType: {
    type: DataTypes.TEXT, // Change to TEXT to store JSON
    allowNull: true,
    get() {
      return JSON.parse(this.getDataValue('roomType'));
    },
    set(value) {

      this.setDataValue('roomType', JSON.stringify(value));
    }
  },
  latitude: {
    type: DataTypes.FLOAT,
  },
  longitude: {
    type: DataTypes.FLOAT,
  },
});

module.exports = Property;