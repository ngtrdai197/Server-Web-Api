const express = require('express');
const router = express.Router();
const customer = require('../controllers/customer.controller');


// create a new customer
router.get('/api', customer.findAll);
router.get('/api/:id', customer.findOne);
router.post('/api/create', customer.create);
router.put('/api/update/:id', customer.update);
router.delete('/api/delete/:id', customer.delete);

module.exports = router;

