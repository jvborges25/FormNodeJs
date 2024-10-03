document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Erro ao enviar o formulário');
        }
    })
    .then(message => {
        alert('Formulário enviado com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar o formulário: ' + error.message);
    });
});
