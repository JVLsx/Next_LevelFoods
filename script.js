const cartItemsList = document.getElementById('carrinho-items');
const totalElement = document.getElementById('total');
const clearCartButton = document.getElementById('limpar-carrinho');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Adiciona produto ao carrinho
document.querySelectorAll('.add_car').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-nome') || 'Produto';
        const productPrice = parseFloat(button.getAttribute('data-preco'));

        // Encontra a imagem do produto no mesmo contêiner do botão
        const productImage = button.closest('.produto').querySelector('img').src;

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
      //  alert('Produto adicionado ao carrinho!');
        updateCart();
    });
});

// Atualiza o carrinho na página do carrinho
// Atualiza o carrinho no localStorage
function updateCart() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho no localStorage
    localStorage.setItem('cartTotal', total); // Salva o total

    cartItemsList.innerHTML = ''; // Limpa o carrinho
    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('produto');

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;

        const name = document.createElement('p');
        name.classList.add('precos');
        name.style.fontFamily = 'Arial, Helvetica, sans-serif';
        name.textContent = item.name;

        const price = document.createElement('p');
        price.classList.add('precos');
        price.style.fontFamily = 'Arial, Helvetica, sans-serif';
        price.textContent = `R$ ${(item.price * item.quantity).toFixed(2)}`;

        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.onclick = () => changeQuantity(item.name, 1);

        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.onclick = () => changeQuantity(item.name, -1);

        productDiv.appendChild(img);
        productDiv.appendChild(name);
        productDiv.appendChild(price);
        productDiv.appendChild(addButton);
        productDiv.appendChild(removeButton);

        cartItemsList.appendChild(productDiv);
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}




// Função para mudar a quantidade de um produto
function changeQuantity(productName, change) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += change;

        if (product.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        cart = [];
        updateCart();
    });
}
// Inicializa o carrinho ao carregar a página
updateCart();
// guarda o carrinho na variavel carrinho no pedido.js
localStorage.setItem('carrinho', JSON.stringify(cart));


document.getElementById('confirmar-compra').addEventListener('click', async () => {
    const carrinho = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (carrinho.length === 0) {
        alert('O carrinho está vazio.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/enviar-carrinho', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carrinho),
        });

        if (response.ok) {
            alert('E-mail enviado com sucesso!');
        } else {
            alert('Erro ao enviar o e-mail.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
});



