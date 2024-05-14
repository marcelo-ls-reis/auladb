const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'estoque',
    password: '252300',
    port: 5432, // Porta padrão do PostgreSQL
});

app.post('/produto', async (req, res) => {
    try {
        const { descricao, categoria, valor, criadoPor } = req.body;
        const insertQuery = `
            INSERT INTO produto (descricao, categoria, valor, criado_por)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const { rows } = await pool.query(insertQuery, [descricao, categoria, valor, criadoPor]);
        res.status(201).json(rows[0]); // Retorna o produto inserido
    } catch (error) {
        console.error('Erro ao inserir produto:', error);
        res.status(500).send('Erro ao inserir produto');
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});
