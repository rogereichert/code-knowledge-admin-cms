const db = require('../database/db');

// Mostrar todos os posts com categoria como objeto
exports.listarPosts = (req, res) => {
    const query = `
        SELECT posts.id, posts.titulo, posts.conteudo, posts.criado_em, 
               categorias.id AS categoria_id, categorias.nome AS categoria_nome
        FROM posts
        INNER JOIN categorias ON posts.categoria_id = categorias.id
        ORDER BY posts.id DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar posts:", err);
            return res.status(500).json({ error: "Erro ao buscar posts" });
        }

        const postsComCategoria = results.map(post => ({
            id: post.id,
            titulo: post.titulo,
            conteudo: post.conteudo,
            createdAt: post.criado_em,
            categoria: {
                id: post.categoria_id,
                nome: post.categoria_nome
            }
        }));

        res.status(200).json(postsComCategoria);
    });
};

// Cadastrar um novo post
exports.cadastrarPost = (req, res) => {
    const { titulo, conteudo, categoria_id } = req.body;

    if (!titulo || !conteudo || !categoria_id) {
        return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    const query = "INSERT INTO posts (titulo, conteudo, categoria_id) VALUES (?, ?, ?)";
    db.query(query, [titulo, conteudo, categoria_id], (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar post:", err);
            return res.status(500).json({ error: "Erro ao cadastrar post" });
        }
        res.status(201).json({ message: "Post cadastrado com sucesso!", postId: result.insertId });
    });
};

// Editar um post
exports.editarPost = (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, categoria_id } = req.body;

    if (!titulo || !conteudo || !categoria_id) {
        return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    const query = "UPDATE posts SET titulo = ?, conteudo = ?, categoria_id = ? WHERE id = ?";
    db.query(query, [titulo, conteudo, categoria_id, id], (err) => {
        if (err) {
            console.error("Erro ao editar post:", err);
            return res.status(500).json({ error: "Erro ao editar post" });
        }
        res.status(200).json({ message: "Post atualizado com sucesso!" });
    });
};

// Excluir um post
exports.excluirPost = (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM posts WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) {
            console.error("Erro ao excluir post:", err);
            return res.status(500).json({ error: "Erro ao excluir post" });
        }
        res.status(200).json({ message: "Post excluído com sucesso!" });
    });
};

// Mostrar o total de posts
exports.mostrarTotalPosts = (req, res) => {
    const query = "SELECT COUNT(*) AS total FROM posts";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao contar posts:", err);
            return res.status(500).json({ error: "Erro ao contar posts" });
        }
        res.json({ total: results[0].total });
    });
};

// Mostrar o último post (mais recente)
exports.mostrarUltimoPost = (req, res) => {
    const query = `
        SELECT
            posts.id,
            posts.titulo,
            posts.conteudo,
            posts.criado_em,
            categorias.id AS categoria_id,
            categorias.nome AS categoria_nome
        FROM
            posts
        INNER JOIN categorias
            ON posts.categoria_id = categorias.id
        ORDER BY posts.criado_em DESC
        LIMIT 1
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar o último post:", err);
            return res.status(500).json({ error: "Erro ao buscar o último post" });
        }

        if (results.length === 0) {
            return res.status(200).json({ titulo: null });
        }

        const post = results[0];

        res.status(200).json({
            id: post.id,
            titulo: post.titulo,
            conteudo: post.conteudo,
            criado_em: post.criado_em,
            categoria: {
                id: post.categoria_id,
                nome: post.categoria_nome
            }
        });
    });
};
