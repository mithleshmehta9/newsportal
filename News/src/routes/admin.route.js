const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');

router.post('/', AdminController.adminUser);
router.get('/email', AdminController.getAdminEmail);
router.put('/', AdminController.updateAdmin);

module.exports = router;