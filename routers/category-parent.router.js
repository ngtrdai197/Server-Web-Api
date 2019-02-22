const router = require('express').Router();
const CategoryParent = require('../controllers/category-parent.controller');


router.get('/api', CategoryParent.findAll);
router.get('/api/:id', CategoryParent.findOne);
router.get('/api/query/:id', CategoryParent.findChildByParentId);
router.post('/api/create', CategoryParent.create);
router.put('/api/update/:id', CategoryParent.update);
router.delete('/api/delete/:id', CategoryParent.delete);

module.exports = router;


