const db = require('../database/db');

// Função para pegar todos os posts
exports.getAllPosts = (req, res) => {
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro no MySQL:', err); // 👈 MOSTRA O ERRO NO CONSOLE
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