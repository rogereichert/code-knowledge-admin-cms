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

devknow/ → Pasta raiz do projeto ├── 📁 admin/ → Painel administrativo (criação de posts, categorias, etc.) │ ├── index.html │ ├── criar-post.html │ └── criar-categoria.html │ ├── 📁 public/ → Site público (exibição dos posts) │ ├── index.html │ └── post.html │ ├── 📁 backend/ → API em Node.js + Express │ ├── server.js → Servidor principal │ ├── 📁 routes/ → Rotas da API (posts, categorias, menus, etc.) │ └── 📁 controllers/ → Lógica das rotas │ ├── 📁 database/ → Scripts SQL e conexão com MySQL │ ├── db.js → Conexão com o banco │ └── schema.sql → Criação das tabelas │ ├── .env → Variáveis de ambiente (credenciais do MySQL, etc.) ├── .gitignore → Arquivos ignorados pelo Git ├── package.json → Dependências e scripts do Node.js └── README.md → Documentação do projeto
