const express = require('express');
const router = express.Router();
const UserController = require('../controllers/signup.controller');
//const UserController = require('../controllers/UserController');

router.get('/all',UserController.getTotalUser);
router.get('/', UserController.getUserDetail);
router.post('/', UserController.createNewUser);
router.put('/', UserController.updateUser);
router.delete('/', UserController.deleteUser);
router.get('/email',UserController.getUserbyEmail);

module.exports = router;
