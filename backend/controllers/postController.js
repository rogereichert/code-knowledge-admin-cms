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