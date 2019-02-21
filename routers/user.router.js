const router = require('express').Router();
const user = require('../controllers/user.controller');
const auth = require('../controllers/auth/login.controller');


router.post('/api/auth/login', auth.login);

router.get('/api', user.findAll);
router.get('/api/:id', user.findOne);
router.put('/api/update/:id', user.update);
router.post('/api/create', user.create);
router.delete('/api/delete/:id', user.delete);

module.exports = router;