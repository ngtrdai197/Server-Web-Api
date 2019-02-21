const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const auth = require('../controllers/auth/login.controller');
const passport = require('passport');

// create role of user
// router.get('/api/role', passport.authenticate('jwt', { session: false }), role.findAll);
// router.get('/api/role/:id', role.findOne);
// router.delete('/api/role/:id', role.delete);
// end role of user

// router login
router.post('/api/auth/login', auth.login);

// -> login with facebook
// lấy thêm thông tin khi login đến fb
router.get('/api/auth/fb', passport.authenticate('facebook', { scope: ['email', 'gender', 'displayName'] }));
router.get('/api/auth/github', passport.authenticate('github'));
// end router login


router.get('/api', user.findAll);
router.get('/api/:id', user.findOne);
router.put('/api/update/:id', user.update);
router.post('/api/create', user.create);
router.delete('/api/delete/:id', user.delete);

module.exports = router;