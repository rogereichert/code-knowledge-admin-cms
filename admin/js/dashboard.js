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
  } catch (error) {
    console.error("Erro ao carregar dados da dashboard:", error);
  }
}
