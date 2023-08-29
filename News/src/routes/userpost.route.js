const express = require('express');
const router = express.Router();
const PostController = require('../controllers/userpost.controller');

router.get('/', PostController.getTotalPost);
router.get('/user', PostController.getpostsDetail);
router.post('/', PostController.createNewPost);
router.put('/', PostController.updatePost);
router.delete('/', PostController.deletePostInfo);

module.exports = router;