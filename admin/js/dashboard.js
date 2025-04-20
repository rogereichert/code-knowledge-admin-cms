async function carregarDadosDashboard() {
  try {
    // Total de posts
    const resPosts = await fetch("http://localhost:5000/api/posts/total");
    const dataPosts = await resPosts.json();
    document.getElementById("card-total-posts").innerText = dataPosts.total;

    // Total de categorias
    const resCategorias = await fetch("http://localhost:5000/api/categorias/total");
    const dataCategorias = await resCategorias.json();
    document.getElementById("card-total-categorias").innerText = dataCategorias.total;

    // Último post
    const resUltimo = await fetch("http://localhost:5000/api/posts/ultimo");
    const dataUltimo = await resUltimo.json();
    document.getElementById("card-ultimo-post").innerText = dataUltimo.titulo || "Nenhum post";

    // Todos os posts para a tabela
    const resTodos = await fetch("http://localhost:5000/api/posts");
    const todosPosts = await resTodos.json();
    preencherTabelaPosts(todosPosts);
  } catch (error) {
    console.error("Erro ao carregar dados da dashboard:", error);
  }
}

function preencherTabelaPosts(posts) {
  const tbody = document.getElementById("tabela-posts");
  if (!tbody) return;

  tbody.innerHTML = ""; // Limpa antes de preencher

  posts.forEach((post) => {
    const tr = document.createElement("tr");
    tr.classList.add("border-b");

    tr.innerHTML = `
      <td class="px-4 py-3">${post.titulo}</td>
      <td class="px-4 py-3">${post.categoria?.nome || "-"}</td>
      <td class="px-4 py-3">${post.createdAt ? new Date(post.createdAt).toLocaleDateString("pt-BR") : "-"}</td>


      <td class="px-4 py-3 text-center space-x-2">
        <button
          class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition"
          onclick="editarPost(${post.id})"
        >
          <i class="fas fa-edit"></i> Editar
        </button>
        <button
          class="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium hover:bg-red-200 transition"
          onclick="excluirPost(${post.id})"
        >
          <i class="fas fa-trash-alt"></i> Excluir
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Essas funções você pode implementar depois
function editarPost(id) {
  alert(`Editar post ${id} (em desenvolvimento)`);
}

function excluirPost(id) {
  if (confirm("Tem certeza que deseja excluir este post?")) {
    alert(`Excluir post ${id} (em desenvolvimento)`);
  }
}
