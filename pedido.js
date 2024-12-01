document.getElementById('upload-proof-button').addEventListener('click', async () => {
    const carrinho = JSON.parse(localStorage.getItem('cart')) || []; // Obtém o carrinho do localStorage

    if (carrinho.length > 0) {
        try {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ carrinho }),
            });

            if (response.ok) {
                alert('E-mail enviado com sucesso!');
            } else {    
                const errorData = await response.json();
                alert(`Erro ao enviar e-mail: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para o servidor:', error);
        }
    } else {
        alert('Carrinho vazio! Nenhum e-mail será enviado.');
    }
});
