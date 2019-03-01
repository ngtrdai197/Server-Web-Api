const search = require('../controllers/search.controller');
const router = require('express').Router();

router.get('/api/:postname', search.searchAll);
router.get('/query', search.searchParams);
// http://localhost:8088/search/query?area=5c73495c0e677424a8dd9c5a&categoryParent=5c7348b52583740004db7347&categoryChild=5c734b482583740004db7356
module.exports = router;