const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/login', userController.login);
router.get('/user', authMiddleware, userController.getUser);

module.exports = router