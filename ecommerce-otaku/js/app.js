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
    console.log("Se ha hecho clic en el producto con ID:", idProducto);
    // Más adelante aquí programaremos la lógica de guardar en localStorage
}

// 4. Inicializar la vista cuando el documento cargue
document.addEventListener('DOMContentLoaded', renderizarProductos);