const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

// Rota para obter todos os posts
router.get('/', postController.listarPosts);

// Rota para criar um novo post
router.post('/', postController.cadastrarPost);

// Rota para atualizar um post existente
router.put('/:id', postController.editarPost);

// Rota para deletar um post
router.delete('/:id', postController.excluirPost);

// rotas especiais
router.get("/total", postController.mostrarTotalPosts);
router.get("/ultimo", postController.mostrarUltimoPost);

// Exportando o roteador
module.exports = router;
