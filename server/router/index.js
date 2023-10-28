const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');
const more7LessController = require('../controllers/more-7-less-controller');
const {getLogs} = require('../utils')
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/createUser', authMiddleware, userController.createUser)
router.get('/getUser', authMiddleware, userController.getUser)
router.get('/updateBalance', userController.updateBalance)
router.post('/withdraw', authMiddleware, userController.withdraw)

router.post('/newBet', authMiddleware, more7LessController.newBet)
router.get('/getBank', authMiddleware, more7LessController.getBank)
router.get('/getHistory', authMiddleware, more7LessController.getHistory)

router.get('/getLogs', getLogs)

module.exports = router
