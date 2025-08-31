const axios = require('axios');
const credentials = {
    client_id: 'SEU_CLIENT_ID',
    client_secret: 'SEU_CLIENT_SECRET'
};

async function gerarPix(amount) {
    const tokenResponse = await axios.post('https://api.gerencianet.com.br/v1/token', credentials);
    const token = tokenResponse.data.access_token;

    const pixResponse = await axios.post('https://api.gerencianet.com.br/v1/charge', {
        items: [
            {
                name: 'Produto 1',
                value: amount, // Valor em centavos
                amount: 1
            }
        ]
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const chargeId = pixResponse.data.charge_id;
    const pixCodeResponse = await axios.post(`https://api.gerencianet.com.br/v1/pix/${chargeId}/qrcode`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return pixCodeResponse.data;  // Retorna o código e QR Code
}
