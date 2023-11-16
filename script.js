const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalCarrito = document.getElementById('total-carrito');

let totalCompra = 0;

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
        calcularTotal();
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100>
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    let elemento, elementoId;
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
        calcularTotal();
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    totalCompra = 0;
    actualizarTotal();
    return false;
}

function calcularTotal() {
    totalCompra = 0;
    document.querySelectorAll('#lista-carrito tbody tr').forEach((elemento) => {
        const precio = parseFloat(elemento.children[2].textContent.replace('$', ''));
        totalCompra += precio;
    });
    actualizarTotal();
}

function actualizarTotal() {
    totalCarrito.textContent = `$${totalCompra.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function () {
    var comprarBtn = document.getElementById('comprar');

    comprarBtn.addEventListener('click', function () {
        var total = calcularTotal();

        console.log('Total calculado:', total);

        Swal.fire({
            title: '¡Gracias por tu compra!',
            text: 'El total es: $' + total.toFixed(2),
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    });

    function calcularTotal() {
        
        var total = totalCompra;
        console.log('Total en calcularTotal:', total);

        return total;
    }
});document.addEventListener('DOMContentLoaded', function () {
    const bienvenidaModal = document.getElementById('bienvenidaModal');
    const cerrarBienvenida = document.getElementById('cerrarBienvenida');

    // Muestra la ventana emergente de bienvenida
    bienvenidaModal.style.display = 'block';

    // Cierra la ventana emergente de bienvenida al hacer clic en el botón de cerrar
    cerrarBienvenida.addEventListener('click', function () {
        bienvenidaModal.style.display = 'none';
    });

    // Cierra la ventana emergente de bienvenida si se hace clic fuera de ella
    window.addEventListener('click', function (event) {
        if (event.target === bienvenidaModal) {
            bienvenidaModal.style.display = 'none';
        }
    });

    const carrito = document.getElementById('carrito');
    const elementos1 = document.getElementById('lista-1');
    const lista = document.querySelector("#lista-carrito tbody");
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    let carritoCompra = [];

    cargarEventListeners();

    function cargarEventListeners() {
        elementos1.addEventListener('click', comprarElemento);
        carrito.addEventListener('click', eliminarElemento);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    function comprarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const elemento = e.target.parentElement.parentElement;
            leerDatosElemento(elemento);
            calcularTotal();
        }
    }

    function leerDatosElemento(elemento) {
        const infoElemento = {
            imagen: elemento.querySelector('img').src,
            titulo: elemento.querySelector('h3').textContent,
            precio: elemento.querySelector('.precio').textContent,
            id: elemento.querySelector('a').getAttribute('data-id')
        };
        agregarAlCarrito(infoElemento);
    }

    function agregarAlCarrito(elemento) {
        carritoCompra.push(elemento);
        actualizarCarrito();
    }

    function actualizarCarrito() {
        // Limpiar el contenido previo del carrito
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }

        // Actualizar la lista del carrito
        carritoCompra.forEach((elemento) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${elemento.imagen}" width=100>
                </td>
                <td>
                    ${elemento.titulo}
                </td>
                <td>
                    ${elemento.precio}
                </td>
                <td>
                    <a href="#" class="borrar" data-id="${elemento.id}">X</a>
                </td>
            `;
            lista.appendChild(row);
        });
    }

    function eliminarElemento(e) {
        e.preventDefault();
        let elementoId;
        if (e.target.classList.contains('borrar')) {
            elementoId = e.target.getAttribute('data-id');
            eliminarDelCarrito(elementoId);
        }
    }

    function eliminarDelCarrito(id) {
        carritoCompra = carritoCompra.filter((elemento) => elemento.id !== id);
        actualizarCarrito();
        calcularTotal();
    }

    function vaciarCarrito() {
        carritoCompra = [];
        actualizarCarrito();
        calcularTotal();
        return false;
    }

    function calcularTotal() {
        let totalCompra = 0;
        carritoCompra.forEach((elemento) => {
            const precio = parseFloat(elemento.precio.replace('$', ''));
            totalCompra += precio;
        });
        actualizarTotal(totalCompra);
    }

    function actualizarTotal(total) {
        totalCarrito.textContent = `$${total.toFixed(2)}`;
    }

    var comprarBtn = document.getElementById('comprar');

    comprarBtn.addEventListener('click', function () {
        var totalCompra = calcularTotal();

        Swal.fire({
            title: '¡Gracias por tu compra!',
            text: 'El total es: $' + totalCompra.toFixed(2),
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    });
});