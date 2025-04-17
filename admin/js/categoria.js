function iniciarCategoriaForm() {
    console.log('Função iniciarCategoriaForm() executada!');

    const form = document.getElementById('form-criar-categoria');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const botaoSalvar = this.querySelector('button[type="submit"]');

        console.log('Dados:', nome, descricao);

        // Salvar conteúdo original do botão
        const originalBtnContent = botaoSalvar.innerHTML;

        // Desabilita botão e mostra loading
        botaoSalvar.disabled = true;
        botaoSalvar.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Salvando...`;

        fetch('http://localhost:5000/api/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao })
        })
            .then(response => response.json())
            .then(data => {
                showAlert('Categoria criada com sucesso!');
                form.reset();
                window.history.replaceState({}, document.title, window.location.pathname);
            })
            .catch(err => {
                console.error('Erro ao criar categoria:', err);
                showAlert('Erro ao criar categoria!', 'error');
            })
            .finally(() => {
                // Reabilita e restaura o botão
                botaoSalvar.disabled = false;
                botaoSalvar.innerHTML = originalBtnContent;
            });
    });
}

function showAlert(message, type = 'success') {
    const colors = {
      success: {
        bg: 'bg-green-100',
        border: 'border-green-400',
        text: 'text-green-800',
        icon: 'fa-circle-check'
      },
      error: {
        bg: 'bg-red-100',
        border: 'border-red-400',
        text: 'text-red-800',
        icon: 'fa-circle-exclamation'
      }
    };
  
    const alertWrapper = document.createElement('div');
    alertWrapper.className = `flex items-center justify-between p-4 rounded-lg border ${colors[type].bg} ${colors[type].border} shadow-md mt-4 transition-opacity duration-300 opacity-0`;
  
    alertWrapper.innerHTML = `
      <div class="flex items-center gap-3 ${colors[type].text}">
        <i class="fas ${colors[type].icon} text-xl"></i>
        <span>${message}</span>
      </div>
      <button class="${colors[type].text} hover:opacity-70 text-xl focus:outline-none">
        &times;
      </button>
    `;
  
    // Fechar ao clicar no botão
    alertWrapper.querySelector('button').addEventListener('click', () => {
      alertWrapper.remove();
    });
  
    // Inserir e animar
    const container = document.querySelector('#form-criar-categoria');
    container.parentElement.insertBefore(alertWrapper, container);
  
    requestAnimationFrame(() => {
      alertWrapper.classList.remove('opacity-0');
      alertWrapper.classList.add('opacity-100');
    });
  
    setTimeout(() => {
      alertWrapper.classList.remove('opacity-100');
      alertWrapper.classList.add('opacity-0');
      setTimeout(() => alertWrapper.remove(), 300);
    }, 5000);
}
