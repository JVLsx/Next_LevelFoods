const addToCartButton = document.getElementById('add-to-cart');
const viewCartButton = document.getElementById('view-cart');
const cartItemsList = document.getElementById('carrinho-items');
const totalElement = document.getElementById('total');
const finalizeButton = document.getElementById('finalizar-compra');
const clearCartButton = document.getElementById('limpar-carrinho');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Adiciona produto ao carrinho
if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
        const productName = 'Produto 1';
        const productPrice = 50.00;

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produto adicionado ao carrinho!');
    });
}

// Visualiza o carrinho
if (viewCartButton) {
    viewCartButton.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
}

// Atualiza o carrinho na página do carrinho
if (cartItemsList) {
    updateCart();
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

// Atualiza o carrinho na página do carrinho
function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
        
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.onclick = () => changeQuantity(item.name, 1);
        
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.onclick = () => changeQuantity(item.name, -1);
        
        li.appendChild(addButton);
        li.appendChild(removeButton);
        cartItemsList.appendChild(li);
        
        total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Finaliza a compra
if (finalizeButton) {
    finalizeButton.addEventListener('click', () => {
        alert('Compra finalizada! Total: ' + totalElement.textContent);
        localStorage.removeItem('cart');
        cart = [];
        updateCart();
    });
}

// Limpa o carrinho
if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        cart = [];
        updateCart();
    });
}
