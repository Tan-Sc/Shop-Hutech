const router = require('express').Router()
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

router.get('/users', auth.auth, auth.authAdmin, userController.getAllUser)
router.get('/infor', auth.auth, userController.getUser);
router.get('/logout', userController.logout);
router.get('/refresh_token', userController.refreshToken);
router.get('/address', auth.auth, userController.getAddress)
router.get('/history', auth.auth, userController.history);

router.post('/addcart', auth.auth, userController.addCart)
router.post('/address', auth.auth, userController.addAddress)
router.post('/remove', auth.auth, userController.removeItem)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forget', userController.forgotPassword)
router.post('/reset/:verify', userController.resetPassword)
router.post('/block/:id', auth.auth, auth.authAdmin, userController.changeAccount)
router.post('/changepassword/:id', auth.auth, userController.changePassword);

module.exports = router;