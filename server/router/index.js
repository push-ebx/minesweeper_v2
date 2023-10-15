const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/createUser', authMiddleware, userController.createUser)
router.get('/getUser', authMiddleware, userController.getUser)

module.exports = router