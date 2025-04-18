const db = require('../database/db');

// Função para pegar todos os posts
exports.getAllPosts = (req, res) => {
    const query = 'SELECT * FROM posts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro no MySQL:', err); // MOSTRA O ERRO NO CONSOLE
            return res.status(500).json({ error: 'Erro ao buscar os posts' });
        }
        res.status(200).json(results); // Sempre especificar o status HTTP
    });
};

// Função para criar um novo post
exports.createPost = (req, res) => {
    console.log("BODY:", req.body);
    const { titulo, conteudo, categoria_id } = req.body;

    // Validação para garantir que todos os campos necessários estejam presentes
    if (!titulo || !conteudo || !categoria_id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO posts (titulo, conteudo, categoria_id) VALUES (?, ?, ?)';
    db.query(query, [titulo, conteudo, categoria_id], (err, results) => {
        if (err) {
            console.error('Erro ao criar post:', err);
            return res.status(500).json({ error: 'Erro ao criar o post' });
        }
        res.status(201).json({ id: results.insertId, titulo, conteudo, categoria_id });
    });
};

// Função para atualizar um post existente
exports.updatePost = (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, categoria_id } = req.body;

    // Validação para garantir que os dados fornecidos estejam completos
    if (!titulo || !conteudo || !categoria_id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios para atualização.' });
    }

    const query = 'UPDATE posts SET titulo = ?, conteudo = ?, categoria_id = ? WHERE id = ?';
    db.query(query, [titulo, conteudo, categoria_id, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar post:', err);
            return res.status(500).json({ error: 'Erro ao atualizar o post' });
        }

        // Verifica se algum registro foi atualizado
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        res.status(200).json({ id, titulo, conteudo, categoria_id });
    });
};

// Função para deletar um post
exports.deletePost = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM posts WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar post:', err);
            return res.status(500).json({ error: 'Erro ao deletar o post' });
        }

        // Verifica se algum registro foi deletado
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        res.status(204).send(); // Status 204 não retorna corpo na resposta
    });
};