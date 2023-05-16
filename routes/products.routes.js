const express = require('express');
const router = express.Router();
const ControllerProduct = require('../controllers/products.controller');

router.get('/products', ControllerProduct.getAll);

router.get('/products/random', ControllerProduct.getRandom);

router.get('/products/:id', ControllerProduct.getById);

router.post('/products', ControllerProduct.addProd);

router.put('/products/:id', ControllerProduct.updateProd);

router.delete('/products/:id', ControllerProduct.deleteProd);

module.exports = router;
