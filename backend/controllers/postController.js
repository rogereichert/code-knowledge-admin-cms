const db = require('../database/db');

// Função para pegar todos os posts
exports.getAllPosts = (req, res) => {
    const query = 'SELECT * FROM posts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro no MySQL:', err); // MOSTRA O ERRO NO CONSOLE
            return res.status(500).json({ error: 'Erro ao buscar os posts' });
        }
        res.json(results);
    });
};

exports.createPost = (req, res) => {
    const { titulo, conteudo, categoria_id } = req.body
    const query = 'INSERT INTO posts (titulo, conteudo, categoria_id) VALUES (?, ?, ?)';
    db.query(query, [titulo, conteudo, categoria_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar o post' });
        }
        res.status(201).json({ id: results.insertId, titulo, conteudo, categoria_id });
    })
}

exports.updatePost = (req, res) => {
    const { id } = req.params
    const { titulo, conteudo, categoria_id } = req.body
    const query = 'UPDATE posts SET titulo = ?, conteudo = ?, categoria_id = ? WHERE id = ?'
    db.query(query, [titulo, conteudo, categoria_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar o post' })
        }
        res.json({ id, titulo, conteudo, categoria_id });
    })
}

// Função para deletar um post
exports.deletePost = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM posts WHERE id = ?'
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar o post' })
        }

        res.status(204).send();
    })
}