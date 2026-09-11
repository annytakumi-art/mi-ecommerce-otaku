// =========================================================
// 1. VARIABLES GLOBALES Y REFERENCIAS DEL DOM
// =========================================================
let carrito = JSON.parse(localStorage.getItem('carritoOtaku')) || [];
const cartCounter = document.getElementById('cart-counter');
const productsGrid = document.getElementById('products-grid');

// Referencias del panel del carrito
const cartModal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// NUEVAS Referencias para el Modal de Checkout (Pago)
const btnCheckout = document.querySelector('.btn-checkout');
const checkoutOverlay = document.getElementById('checkout-overlay');
const closeCheckoutBtn = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');

// =========================================================
// 2. INVENTARIO SIMULADO
// =========================================================
const productos = [
    { id: 1, nombre: "Figura Nendoroid Anya Forger", precio: 55.99, categoria: "Figuras", imagen: "imagenes/anya.jpg" },
    { id: 2, nombre: "Taza Studio Ghibli Totoro", precio: 15.50, categoria: "Tazas", imagen: "imagenes/totoro.jpg" },
    { id: 3, nombre: "Camiseta Cardcaptor Sakura", precio: 22.00, categoria: "Camisetas", imagen: "imagenes/sakura.jpg" },
    { id: 4, nombre: "Figura Escala 1/7 Sailor Moon", precio: 120.00, categoria: "Figuras", imagen: "imagenes/sailormoon.jpg" },
    { id: 5, nombre: "Peluches Pochita Chainsaw Man", precio: 25.00, categoria: "Figuras", imagen: "imagenes/pochita.jpg" },
    { id: 6, nombre: "Camiseta Jujutsu Kaisen Gojo", precio: 24.99, categoria: "Camisetas", imagen: "imagenes/gojo.jpg" }
];

// =========================================================
// 3. FUNCIONES DE CATÁLOGO Y CARRITO
// =========================================================
function renderizarProductos() {
    productsGrid.innerHTML = ''; 
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" 
                 onerror="this.src='https://via.placeholder.com/250x250/FFDAC1/5C4B51?text=🌸+Imagen'">
            <h4>${producto.nombre}</h4>
            <p class="price">${producto.precio.toFixed(2)} €</p>
            <button class="btn-add" onclick="agregarAlCarrito(${producto.id})">
                Añadir al carrito 🎀
            </button>
        `;
        productsGrid.appendChild(card);
    });
}

function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);
    const productoEnCarrito = carrito.find(item => item.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++; 
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    localStorage.setItem('carritoOtaku', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    // Si el panel del carrito está abierto, lo recargamos para que se vea el nuevo producto
    if (cartModal.classList.contains('open')) {
        renderizarCarrito();
    }
}

function actualizarContadorCarrito() {
    const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);
    cartCounter.textContent = totalArticulos;
}

function renderizarCarrito() {
    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#8C7A80;">Tu carrito está vacío 🥺</p>';
    } else {
        carrito.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/60/FFDAC1/5C4B51?text=🌸'">
                <div class="cart-item-info">
                    <h5>${item.nombre}</h5>
                    <p>${item.precio.toFixed(2)} € x ${item.cantidad}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.precio * item.cantidad;
        });
    }
    cartTotalElement.textContent = total.toFixed(2);
}

// =========================================================
// 4. EVENTOS DE CLIC (INTERFAZ)
// =========================================================
openCartBtn.addEventListener('click', () => {
    cartModal.classList.add('open');
    renderizarCarrito(); 
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('open');
});

// =========================================================
// 5. LÓGICA DE CHECKOUT Y LOGÍSTICA SIMULADA
// =========================================================

// Abrir modal de pago al pulsar "Proceder al Pago"
btnCheckout.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("¡Tu carrito está vacío! Añade algo kawaii primero. 🌸");
        return;
    }
    cartModal.classList.remove('open'); // Cerramos el panel lateral
    checkoutOverlay.classList.add('active'); // Abrimos la ventana de pago
});

// Cerrar modal de pago
closeCheckoutBtn.addEventListener('click', () => {
    checkoutOverlay.classList.remove('active');
});

// Procesar el formulario de pago falso
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    // Creamos el objeto del pedido simulado
    const nuevoPedido = {
        id: "OTK-" + Math.floor(Math.random() * 10000), // Genera ID aleatorio
        cliente: document.getElementById('nombre-cliente').value,
        total: cartTotalElement.textContent,
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString()
    };

    // Guardamos el pedido en el "backend" simulado (localStorage de pedidos)
    let pedidos = JSON.parse(localStorage.getItem('pedidosOtaku')) || [];
    pedidos.push(nuevoPedido);
    localStorage.setItem('pedidosOtaku', JSON.stringify(pedidos));

    // Guardamos temporalmente el ID para mostrarlo en la página de éxito
    localStorage.setItem('pedidoActual', nuevoPedido.id);

    // Vaciamos el carrito porque ya se compró
    carrito = [];
    localStorage.setItem('carritoOtaku', JSON.stringify(carrito));

    // Redirigimos a la página de éxito
    window.location.href = "success.html";
});

// =========================================================
// 6. INICIALIZAR LA APP
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContadorCarrito();
});