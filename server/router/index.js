const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');
const more7LessController = require('../controllers/more-7-less-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/createUser', authMiddleware, userController.createUser)
router.get('/getUser', authMiddleware, userController.getUser)

router.post('/newBet', authMiddleware, more7LessController.newBet)
router.get('/getBank', authMiddleware, more7LessController.getBank)

module.exports = router
