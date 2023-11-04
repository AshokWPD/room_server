// routes/favoritePostRoutes.js
const express = require('express');
const router = express.Router();
const favoritePostController = require('../controller/favourite_controller');

// Create a FavoritePost record
router.post('/Add_favourite', favoritePostController.create);

// Get FavoritePost records by user_id
router.post('/fav_UserId', favoritePostController.getByUserId);

// Get FavoritePost records by property_id
router.post('/fav_PropertyId', favoritePostController.getByPropertyId);

// Get FavoritePost records by room_id
router.post('/fav_RoomId', favoritePostController.getByRoomId);

module.exports = router;
