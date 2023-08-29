const express = require('express');
const router = express.Router();

const UserController = require('../controllers/news.controller');

router.get('/', UserController.getTotalNewsInfo);
router.post('/', UserController.createNewNewsInfo);
router.put('/', UserController.updateNews);
router.delete('/', UserController.deleteNewsInfo);


module.exports = router;