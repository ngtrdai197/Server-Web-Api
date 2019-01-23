const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const role = require('../controllers/role.controller');

// create role of user
router.post('/api/role/create', role.create);
router.get('/api/role', role.findAll);
router.get('/api/role/:id', role.findOne);
router.delete('/api/role/:id', role.delete);
// end role of user


router.get('/api', user.findAll);
router.get('/api/:id', user.findOne);
router.put('/api/update/:id', user.update);
router.post('/api/create', user.create);
router.delete('/api/delete/:id', user.delete);

module.exports = router;