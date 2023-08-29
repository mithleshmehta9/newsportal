const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

router.get('/', ProductController.getTotalProductinfo);
router.post('/', ProductController.createProductinfo);
router.put('/', ProductController.updateProductinfo);


module.exports = router;