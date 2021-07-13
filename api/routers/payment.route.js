const router = require('express').Router()
const paymentController = require('../controllers/payment.controller');
const auth = require('../middleware/auth.middleware');


router.get('/', auth.auth, paymentController.getPayment);
router.post('/', auth.auth, paymentController.createPayment);

module.exports = router;