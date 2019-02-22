const router = require('express').Router();
const Post = require('../controllers/post.controller');


router.get('/api', Post.findAll);
router.get('/api/:id', Post.findOne);
router.get('/api/image/:id', Post.findImage);
router.post('/api/create', Post.create);
router.put('/api/update/:id', Post.update);
router.delete('/api/delete/:id', Post.delete);

module.exports = router;


