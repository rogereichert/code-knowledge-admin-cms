# DevKnow 🧠💻
Sistema de conhecimento para programadores com painel administrativo completo (CMS) para criação e organização de posts com códigos explicativos.

## 📚 Descrição

Este projeto tem como objetivo permitir que você crie um portal pessoal com conteúdos técnicos (posts com códigos, explicações e categorias), ideal para compartilhar, estudar e organizar seus conhecimentos de programação.

Inclui:
- Painel Admin para criar categorias, posts e menus
- Site público com listagem de conteúdos
- Backend com Node.js e banco de dados MySQL
- Códigos destacados com syntax highlight

---

## ⚙️ Tecnologias utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL
- **Bibliotecas/Recursos:**
  - `highlight.js` ou `prism.js` (destaque de código)
  - `dotenv`, `mysql2`, `cors`, `nodemon`

---

## 🗂 Estrutura do Projeto

📦 projeto-conhecimento
├── 📁 public/               → Site público (frontend principal)
├── 📁 admin/                → Painel administrativo (frontend)
├── 📁 backend/              → Backend Node.js com rotas (Express)
├── 📁 database/             → Scripts SQL e conexão com MySQL
├── 📁 uploads/              → Se quiser usar imagens depois
├── 📄 package.json
└── 📄 .env
