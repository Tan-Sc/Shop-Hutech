const router = require('express').Router()
const categoriesController = require('../controllers/categories.controller')

const auth = require('../middleware/auth.middleware');

router.get('/', categoriesController.getCategories);
router.post('/create', auth.auth, auth.authAdmin, categoriesController.createCategory);
router.post('/update/:id', auth.auth, auth.authAdmin, categoriesController.updateCategory);
router.delete('/delete/:id', auth.auth, auth.authAdmin, categoriesController.deleteCategory);
module.exports = router;