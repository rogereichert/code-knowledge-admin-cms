const db = require('../database/db');
const { verificacaoCodigoStatus } = require('../utils/functions')

// Listar todas as categorias
exports.getAllCategorias = (req, res) => {
    const query = 'SELECT * FROM categorias'
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar as categorias' })
        }

        res.json(results)
    })
}

exports.getCategoryById = (req, res) => {
    const { id } = req.params
    const query = 'SELECT * FROM categorias WHERE id = ?'
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar a categoria' })
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada' })
        }

        res.json(results[0])
    })
}

// Criar nova categoria
exports.createCategory = (req, res) => {
    const { nome, descricao } = req.body
    const query = 'INSERT INTO categorias (nome, descricao) VALUES (?, ?)'
    db.query(query, [nome, descricao], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao criar a categoria' })
        res.status(201).json({ id: results.insertId, nome, descricao })
    })

}

exports.updateCategory = (req, res) => {
    const { id } = req.params
    const { nome, descricao } = req.body
    const query = 'UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?'
    db.query(query, [nome, descricao, id], (err, results) => {
        if (err) {
            verificacaoCodigoStatus(res, 500, 'Erro ao atualizar a categoria')
        }

        if (results.affectedRows === 0) {
            verificacaoCodigoStatus(res, 404, 'Categoria não encontrada')
        }

        res.json({ id, nome, descricao })
    })
}

exports.deleteCategory = (req, res) => {
    const { id } = req.params
    const query = 'DELETE FROM categorias WHERE id = ?'
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao excluir a categoria' });
        }

        if (results.affectedRows === 0) {
            return verificacaoCodigoStatus(res, 404, 'Categoria não encontrada');
        }

        return res.status(200).json({ message: 'Categoria excluída com sucesso' });
    });
}

