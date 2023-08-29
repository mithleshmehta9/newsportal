const express = require('express');
const router = express.Router();

const UserController = require('../controllers/edunotice.controller');

router.get('/', UserController.getTotalEduNews);
router.post('/', UserController.createEduNewsinfo);
router.put('/', UserController.updateEduNewsinfo);
router.delete('/', UserController.deleteEduNewsInfo);


module.exports = router;