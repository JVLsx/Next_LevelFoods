const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Endpoint para receber os dados do carrinho
app.post('/enviar-carrinho', async (req, res) => {
    const carrinho = req.body;

    if (!Array.isArray(carrinho) || carrinho.length === 0) {
        return res.status(400).send('Carrinho vazio ou inválido.');
    }

    // Gerar conteúdo do e-mail
    const emailContent = `
        <h1>Itens do Carrinho</h1>
        <ul>
            ${carrinho.map(item => `
                <li>
                    <strong>${item.name}</strong> - Quantidade: ${item.quantity} - Preço: R$ ${(item.price * item.quantity).toFixed(2)}
                </li>
            `).join('')}
        </ul>
        <p>Total: R$ ${carrinho.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'dantas.marcelo@academico.ifpb.edu.br',
            subject: 'Itens do Carrinho - Next Level Foods',
            html: emailContent,
        });

        console.log('E-mail enviado com sucesso!');
        res.status(200).send('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).send('Erro ao enviar o e-mail.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
