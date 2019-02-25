const router = require('express').Router();
const Area = require('../controllers/area.controller');

router.get('/api', Area.findAll);
router.get('/api/:id', Area.findOne);
router.post('/api/create', Area.create);
router.put('/api/update/:id', Area.update);
router.delete('/api/delete/:id', Area.delete);

module.exports = router;


