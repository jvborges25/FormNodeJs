const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./db');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const data = req.body;
    const query = `
        INSERT INTO clientes (nome, sexo, cpf, data_nascimento, naturalidade, estado_civil, escolaridade, email, contato1, contato2, endereco_residencial, ponto_referencia_residencial, tipo_residencial, endereco_comercial, ponto_referencia_comercial, tipo_comercial, atividade, tempo_funcionamento, setor, cnpj, outro_negocio, vendas, frequencia_compras, local_compras, pessoas_ajudam_renda, pessoas_residem)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.nome, data.sexo, data.cpf, data.data_nascimento, data.naturalidade, data.estado_civil, data.escolaridade, data.email, data.contato1, data.contato2, data.endereco_residencial, data.ponto_referencia_residencial, data.tipo_residencial, data.endereco_comercial, data.ponto_referencia_comercial, data.tipo_comercial, data.atividade, data.tempo_funcionamento, data.setor, data.cnpj, data.outro_negocio, data.vendas, data.frequencia_compras, data.local_compras, data.pessoas_ajudam_renda, data.pessoas_residem
    ];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao enviar o formulário');
        } else {
            res.status(200).send('Formulário enviado com sucesso!');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
