// controllers/likeController.js

const Like = require('../models/like.model');

const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    // Get the logged-in user (you'll need authentication middleware for this)
    const userId = 'user_id_here'; // Replace with the actual user ID

    // Check if the user already liked the post
    const existingLikes = await Like.findAll({ where: { post_id: postId, user_id: userId } });

    if (existingLikes.length > 0) {
      // If already liked, unlike the post
      await Like.unlikePost(postId, userId);
      return res.status(200).json({ message: 'Like removed successfully.' });
    } else {
      // If not liked, like the post
      await Like.likePost(postId, userId);
      return res.status(201).json({ message: 'Post liked successfully.' });
    }
  } catch (error) {
    console.error('Error handling post like:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Add other like-related controller functions here if needed

module.exports = {
  likePost,
};
