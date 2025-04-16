document.getElementById('category-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('category-name').value;
    const descricao = document.getElementById('category-description').value;

    fetch('http://localhost:5000/api/categorias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            descricao
        })
    })
        .then(response => response.json())
        .then(data => {
            alert('Categoria criada com sucesso!');
            document.getElementById('category-form').reset();
        })
        .catch(err => {
            console.error('Erro ao criar categoria:', err);
            alert('Erro ao criar categoria!');
        });
});

// Função para exibir alertas bonitos com Tailwind
function showAlert(message, type = 'success') {
    const colors = {
        success: 'bg-green-100 text-green-800 border-green-300',
        error: 'bg-red-100 text-red-800 border-red-300',
    };

    const alertBox = document.createElement('div');
    alertBox.className = `mt-4 border-l-4 p-4 rounded-md shadow ${colors[type]}`;
    alertBox.innerText = message;

    const container = document.querySelector('#form-criar-categoria');
    container.parentElement.insertBefore(alertBox, container);

    setTimeout(() => {
        alertBox.remove();
    }, 4000);
}