const db = require('../database/db');

// Listar todas as categorias
exports.listarCategorias = (req, res) => {
    const query = "SELECT * FROM categorias ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar categorias:", err);
            return res.status(500).json({ error: "Erro ao buscar categorias" });
        }
        res.status(200).json(results);
    });
};

// Cadastrar uma nova categoria
exports.cadastrarCategoria = (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ error: "O nome da categoria é obrigatório." });
    }

    const query = "INSERT INTO categorias (nome) VALUES (?)";
    db.query(query, [nome], (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar categoria:", err);
            return res.status(500).json({ error: "Erro ao cadastrar categoria" });
        }
        res.status(201).json({ message: "Categoria cadastrada com sucesso!", categoriaId: result.insertId });
    });
};

// Editar uma categoria
exports.editarCategoria = (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ error: "O nome da categoria é obrigatório." });
    }

    const query = "UPDATE categorias SET nome = ? WHERE id = ?";
    db.query(query, [nome, id], (err) => {
        if (err) {
            console.error("Erro ao editar categoria:", err);
            return res.status(500).json({ error: "Erro ao editar categoria" });
        }
        res.status(200).json({ message: "Categoria atualizada com sucesso!" });
    });
};

// Excluir uma categoria
exports.excluirCategoria = (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM categorias WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) {
            console.error("Erro ao excluir categoria:", err);
            return res.status(500).json({ error: "Erro ao excluir categoria" });
        }
        res.status(200).json({ message: "Categoria excluída com sucesso!" });
    });
};

// Mostrar categoria por ID
exports.mostrarCategoriaPorId = (req, res) => {
    const { id } = req.params;

    const query = "SELECT * FROM categorias WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar categoria:", err);
            return res.status(500).json({ error: "Erro ao buscar categoria" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Categoria não encontrada." });
        }

        res.status(200).json(results[0]);
    });
};

// Mostrar total de categorias
exports.mostrarTotalCategorias = (req, res) => {
    const query = "SELECT COUNT(*) AS total FROM categorias";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao contar categorias:", err);
            return res.status(500).json({ error: "Erro ao contar categorias" });
        }
        res.status(200).json({ total: results[0].total });
    });
};
