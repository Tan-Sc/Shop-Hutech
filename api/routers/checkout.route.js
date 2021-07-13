const router = require('express').Router()
const checkoutController = require('../controllers/checkout.controller');
const auth = require('../middleware/auth.middleware');


router.get('/', auth.auth, checkoutController.getCheckout);
router.post('/', auth.auth, checkoutController.createCheckout);
router.post('/:id', auth.auth, checkoutController.updateCheckout);
router.delete('/delete/:id', auth.auth, checkoutController.deleteCheckout)

module.exports = router;