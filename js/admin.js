// Referencia al cuerpo de la tabla en el HTML
const tablaPedidos = document.getElementById('tabla-pedidos');

// 1. Función para pintar los pedidos en la tabla
function renderizarPedidos() {
    // Leemos los pedidos del localStorage (o un array vacío si no hay nada)
    const pedidos = JSON.parse(localStorage.getItem('pedidosOtaku')) || [];
    
    tablaPedidos.innerHTML = ''; // Limpiamos la tabla antes de pintar

    // Si no hay pedidos, mostramos un mensaje amigable
    if (pedidos.length === 0) {
        tablaPedidos.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 2rem;">No hay pedidos pendientes aún 🥺</td></tr>';
        return;
    }

    // Recorremos cada pedido y creamos una fila (tr)
    pedidos.forEach((pedido, index) => {
        const fila = document.createElement('tr');
        
        // Asignamos una clase CSS distinta según el estado
        const claseEstado = pedido.estado === 'Pendiente' ? 'status-pendiente' : 'status-enviado';
        
        // Si está pendiente mostramos el botón, si ya se envió mostramos un texto
        const botonAccion = pedido.estado === 'Pendiente' 
            ? `<button class="btn-enviar" onclick="marcarComoEnviado(${index})">Marcar Enviado 📦</button>` 
            : `<span>Completado ✔️</span>`;

        fila.innerHTML = `
            <td><strong>${pedido.id}</strong></td>
            <td>${pedido.cliente}</td>
            <td>${pedido.fecha}</td>
            <td>${pedido.total}</td>
            <td class="${claseEstado}">${pedido.estado}</td>
            <td>${botonAccion}</td>
        `;
        
        tablaPedidos.appendChild(fila);
    });
}

// 2. Función para cambiar el estado de un pedido
function marcarComoEnviado(index) {
    // Obtenemos los pedidos actuales
    let pedidos = JSON.parse(localStorage.getItem('pedidosOtaku')) || [];
    
    // Cambiamos el estado del pedido específico a "Enviado"
    pedidos[index].estado = 'Enviado';
    
    // Volvemos a guardar en localStorage
    localStorage.setItem('pedidosOtaku', JSON.stringify(pedidos));
    
    // Recargamos la tabla para ver los cambios
    renderizarPedidos();
}

// 3. Iniciar cuando cargue la página
document.addEventListener('DOMContentLoaded', renderizarPedidos);