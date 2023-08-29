// models/like.js

const dbconn = require('../../config/config');

const Like = {
  likePost: (postId, userId) => {
    return new Promise((resolve, reject) => {
      dbconn.query('INSERT INTO likeu (post_id, user_id) VALUES (?, ?)', [postId, userId], (error, results) => {
        if (error) return reject(error);
        resolve();
      });
    });
  },

  unlikePost: (postId, userId) => {
    return new Promise((resolve, reject) => {
      dbconn.query('DELETE FROM likeu WHERE post_id = ? AND user_id = ?', [postId, userId], (error, results) => {
        if (error) return reject(error);
        resolve();
      });
    });
  },

  // Add other like-related database operations here
};

module.exports = Like;
