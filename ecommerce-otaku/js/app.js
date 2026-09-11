
// Recuperar carrito del localStorage o inicializarlo vacío
let carrito = JSON.parse(localStorage.getItem('carritoOtaku')) || [];
const cartCounter = document.getElementById('cart-counter');
// 1. Inventario simulado de productos
const productos = [
    { 
        id: 1, 
        nombre: "Figura Nendoroid Anya Forger", 
        precio: 55.99, 
        categoria: "Figuras", 
        imagen: "imagenes/anya.jpg" 
    },
    { 
        id: 2, 
        nombre: "Taza Studio Ghibli Totoro", 
        precio: 15.50, 
        categoria: "Tazas", 
        imagen: "imagenes/totoro.jpg" 
    },
    { 
        id: 3, 
        nombre: "Camiseta Cardcaptor Sakura", 
        precio: 22.00, 
        categoria: "Camisetas", 
        imagen: "imagenes/sakura.jpg" 
    },
    { 
        id: 4, 
        nombre: "Figura Escala 1/7 Sailor Moon", 
        precio: 120.00, 
        categoria: "Figuras", 
        imagen: "imagenes/sailormoon.jpg" 
    },
    { 
        id: 5, 
        nombre: "Peluches Pochita Chainsaw Man", 
        precio: 25.00, 
        categoria: "Figuras", 
        imagen: "imagenes/pochita.jpg" 
    },
    { 
        id: 6, 
        nombre: "Camiseta Jujutsu Kaisen Gojo", 
        precio: 24.99, 
        categoria: "Camisetas", 
        imagen: "imagenes/gojo.jpg" 
    }
];

// Referencia al contenedor del grid en el HTML
const productsGrid = document.getElementById('products-grid');

// 2. Función para pintar los productos en el DOM
function renderizarProductos() {
    productsGrid.innerHTML = ''; // Limpiamos el grid por si acaso

    productos.forEach(producto => {
        // Crear el contenedor de la tarjeta
        const card = document.createElement('div');
        card.className = 'product-card';

        // Estructura interna de la tarjeta (Uso de template literals)
        // He añadido un 'onerror' en la imagen para que, si aún no descargas las fotos,
        // muestre un cuadro de color pastel amigable en lugar de una imagen rota.
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" 
                 onerror="this.src='https://via.placeholder.com/250x250/FFDAC1/5C4B51?text=🌸+Imagen'">
            <h4>${producto.nombre}</h4>
            <p class="price">${producto.precio.toFixed(2)} €</p>
            <button class="btn-add" onclick="agregarAlCarrito(${producto.id})">
                Añadir al carrito 🎀
            </button>
        `;

        // Añadir la tarjeta al grid principal
        productsGrid.appendChild(card);
    });
}

// 3. Función temporal para el carrito
function agregarAlCarrito(idProducto) {
    // 1. Encontrar el producto en nuestro inventario
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);

    // 2. Comprobar si el producto ya existe en el carrito
    const productoEnCarrito = carrito.find(item => item.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++; // Si existe, sumamos uno a la cantidad
    } else {
        // Si no existe, lo añadimos con cantidad 1
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    // 3. Guardar el carrito actualizado en localStorage
    localStorage.setItem('carritoOtaku', JSON.stringify(carrito));

    // 4. Actualizar la interfaz
    actualizarContadorCarrito();
    
    // Pequeño feedback visual en consola
    console.log("¡Añadido! Carrito actual:", carrito);
}
function actualizarContadorCarrito() {
    // Sumamos la propiedad 'cantidad' de todos los items en el carrito
    const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);
    cartCounter.textContent = totalArticulos;
}

// 4. Inicializar la vista cuando el documento cargue
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContadorCarrito();
});

// Referencias del DOM para el carrito
const cartModal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Abrir y cerrar el panel del carrito
openCartBtn.addEventListener('click', () => {
    cartModal.classList.add('open');
    renderizarCarrito(); // Dibujamos los items cada vez que se abre
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('open');
});

// Función para pintar los productos dentro del carrito
function renderizarCarrito() {
    cartItemsContainer.innerHTML = ''; // Limpiamos antes de pintar
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

            // Sumamos al total general
            total += item.precio * item.cantidad;
        });
    }

    // Actualizamos el precio total en el footer del carrito
    cartTotalElement.textContent = total.toFixed(2);
}