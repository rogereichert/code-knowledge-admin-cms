const express = require('express')
const cors = require('cors')
const postRoutes = require('./routes/postRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
require('dotenv').config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
app.use('/api/posts', postRoutes)
app.use('/api/categorias', categoryRoutes);

// Iniciando o servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
