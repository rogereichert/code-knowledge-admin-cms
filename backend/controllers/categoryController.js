const db = require('../database/db');

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
            return res.status(500).json({ error: 'Erro ao buscar a categoria'})
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
    db.query(query, [ nome, descricao ], (err, results) => {
        if (err) return res.status(500).json( { error: 'Erro ao criar a categoria' })
        res.status(201).json( { id: results.insertId, nome, descricao })
    })

}