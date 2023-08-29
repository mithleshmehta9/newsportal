// routes/likeRoutes.js

const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');

// Like a post
router.post('/posts/:postId/like', likeController.likePost);

// Add other like-related routes here if needed

module.exports = router;
