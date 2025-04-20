const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/total', categoryController.getTotalCategorias)
router.get('/', categoryController.getAllCategorias)
router.get('/:id', categoryController.getCategoryById)
router.post('/', categoryController.createCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)
// Exportando o roteador
module.exports = router;
