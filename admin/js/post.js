function iniciarPostForm() {
    const form = document.getElementById("form-criar-post");
    const selectCategoria = document.getElementById("categoria");
    const alertBox = document.getElementById("alert");

    // Função auxiliar para exibir mensagens de alerta
    function exibirAlerta(mensagem, tipo) {
        alertBox.className = `mt-4 bg-${tipo}-100 text-${tipo}-800 p-4 rounded shadow`;
        alertBox.textContent = mensagem;
        alertBox.classList.remove("hidden");
    }

    // Carregar categorias
    fetch("http://localhost:5000/api/categorias")
        .then((res) => {
            if (!res.ok) throw new Error("Erro ao carregar categorias.");
            return res.json();
        })
        .then((categorias) => {
            console.log("Categorias carregadas:", categorias);
            categorias.forEach((categoria) => {
                const option = document.createElement("option");
                option.value = categoria.id || categoria._id || categoria.categoria_id; // Padronização
                option.textContent = categoria.nome;
                selectCategoria.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar categorias:", error);
            exibirAlerta("Erro ao carregar categorias. Tente novamente mais tarde.", "red");
        });

    // Envio do formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validação dos campos
        const titulo = form.titulo.value.trim();
        const categoriaId = form.categoria.value;
        const conteudo = form.conteudo.value.trim();

        if (!titulo || !categoriaId || !conteudo) {
            exibirAlerta("Todos os campos são obrigatórios.", "red");
            return;
        }

        const postData = { titulo, categoria_id: categoriaId, conteudo };

        fetch("http://localhost:5000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao criar post.");
                return res.json();
            })
            .then(() => {
                exibirAlerta("Post criado com sucesso!", "green");
                form.reset();
            })
            .catch((error) => {
                console.error("Erro ao criar post:", error);
                exibirAlerta("Erro ao criar post. Verifique os campos e tente novamente.", "red");
            });
    });
}