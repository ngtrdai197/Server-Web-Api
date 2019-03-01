const search = require('../controllers/search.controller');
const router = require('express').Router();

router.get('/api/:postname', search.searchAll);

module.exports = router;