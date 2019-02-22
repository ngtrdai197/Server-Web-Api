const router = require('express').Router();
const CategoryChild = require('../controllers/category-child.controller');


router.get('/api', CategoryChild.findAll);
router.get('/api/:id', CategoryChild.findOne);
router.get('/api/query/:id', CategoryChild.findParentById);
router.post('/api/create', CategoryChild.create);
router.put('/api/update/:id', CategoryChild.update);
router.delete('/api/delete/:id', CategoryChild.delete);

module.exports = router;


