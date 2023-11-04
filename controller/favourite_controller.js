// controllers/favoritePostController.js
const FavoritePost = require('../model/favourite_model');

async function create(req, res) {
  try {
    const { user_id, property_id, room_id, other_details } = req.body;
    const favoritePost = await FavoritePost.create({
      user_id,
      property_id,
      room_id,
      other_details,
    });

    res.status(201).json(favoritePost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FavoritePost record' });
  }
}

async function getByUserId(req, res) {
  try {
    const { user_id } = req.body;
    const favoritePosts = await FavoritePost.findAll({
      where: { user_id },
    });

    res.status(200).json(favoritePosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve FavoritePost records by user_id' });
  }
}

async function getByPropertyId(req, res) {
  try {
    const { property_id } = req.body;
    const favoritePosts = await FavoritePost.findAll({
      where: { property_id },
    });

    res.status(200).json(favoritePosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve FavoritePost records by property_id' });
  }
}

async function getByRoomId(req, res) {
  try {
    const { room_id } = req.body;
    const favoritePosts = await FavoritePost.findAll({
      where: { room_id },
    });

    res.status(200).json(favoritePosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve FavoritePost records by room_id' });
  }
}

module.exports = {
  create,
  getByUserId,
  getByPropertyId,
  getByRoomId,
};
