document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");
    const paginationContainer = document.getElementById("pagination");
    const postsPerPage = 5;
    let currentPage = 1;
    let allPosts = [];
  
    postsContainer.style.transition = "opacity 0.3s ease";
  
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        if (!res.ok) throw new Error("Erro ao buscar os posts.");
        allPosts = await res.json();
        renderPosts();
        renderPagination();
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
        postsContainer.innerHTML = `<p class="text-center text-red-500">Erro ao carregar os posts.</p>`;
      }
    };
  
    const renderPosts = () => {
      postsContainer.style.opacity = 0;
  
      setTimeout(() => {
        postsContainer.innerHTML = "";
  
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = allPosts.slice(start, end);
  
        if (paginatedPosts.length === 0) {
          postsContainer.innerHTML = "<p class='text-center text-gray-500'>Nenhum post encontrado.</p>";
        } else {
          paginatedPosts.forEach((post) => {
            const postEl = document.createElement("div");
            postEl.className = "bg-white p-6 rounded-lg shadow transition-transform duration-300 hover:scale-[1.01]";
  
            postEl.innerHTML = `
              <h2 class="text-xl font-semibold mb-2">${post.titulo}</h2>
              <p class="text-sm text-indigo-600 mb-2">Categoria: ${post.categoria.nome}</p>
              <p class="text-gray-700">${post.conteudo}</p>
            `;
  
            postsContainer.appendChild(postEl);
          });
        }
  
        postsContainer.style.opacity = 1;
      }, 200);
    };
  
    const renderPagination = () => {
      paginationContainer.innerHTML = "";
      const totalPages = Math.ceil(allPosts.length / postsPerPage);
      if (totalPages <= 1) return;
  
      const createButton = (label, page, isActive = false, isDisabled = false) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.className = `
          w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200
          text-sm font-medium
          ${isActive
            ? "bg-indigo-600 text-white shadow-lg scale-105"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `;
        btn.disabled = isDisabled;
        if (!isDisabled) {
          btn.addEventListener("click", () => {
            currentPage = page;
            renderPosts();
            renderPagination();
          });
        }
        paginationContainer.appendChild(btn);
      };
  
      // Prev button
      createButton("«", currentPage - 1, false, currentPage === 1);
  
      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        createButton(i, i, i === currentPage);
      }
  
      // Next button
      createButton("»", currentPage + 1, false, currentPage === totalPages);
    };
  
    fetchPosts();
  });
  