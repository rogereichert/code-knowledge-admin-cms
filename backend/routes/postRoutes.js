const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

// Rota para obter todos os posts
router.get('/', postController.getAllPosts);

// Rota para criar um novo post
router.post('/', postController.createPost);

// Exportando o roteador
module.exports = router;

