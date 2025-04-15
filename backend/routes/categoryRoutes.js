const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAllCategorias)
router.get('/:id', categoryController.getCategoryById)
router.post('/', categoryController.createCategory)

// Exportando o roteador
module.exports = router;
