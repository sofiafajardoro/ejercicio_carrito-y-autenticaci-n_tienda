const catalogo = [
    {
        id: 1,
        nombre: "Zapatillas",
        precio: 25990,
        descuentoAplicado: false,
        imagen: "assets/img/zapatillas.jpg"
    },
    {
        id: 2,
        nombre: "Jeans",
        precio: 12990,
        descuentoAplicado: false,
        imagen: "assets/img/jeans.jpg"
    },
    {
        id: 3,
        nombre: "Polera",
        precio: 9990,
        descuentoAplicado: false,
        imagen: "assets/img/polera.jpg"
    }
];

let carrito = [];

const PASSWORD_MAESTRA = "1234";
let usuarioLogueado = false;

function mostrarModal(tipo) {
    const modal = new bootstrap.Modal(
        document.getElementById("modalAuth")
    );
    modal.show();
}

function login() {
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    iniciarSesion(usuario, password);
}

function iniciarSesion(usuario, password) {
    if (password === PASSWORD_MAESTRA) {
        usuarioLogueado = true;
        alert("Bienvenida " + usuario);
        bootstrap.Modal.getInstance(
            document.getElementById("modalAuth")
        ).hide();
    } else {
        alert("Contraseña incorrecta");
    }
}

function agregarProducto(idProducto) {
    const prod = catalogo.find(p => p.id === idProducto);
    if (prod) {
        carrito.push({ ...prod });
        renderizarCarrito();
    }
}

function quitarProducto(idProducto) {
    const index = carrito.findIndex(p => p.id === idProducto);
    if (index >= 0) {
        carrito.splice(index, 1);
        renderizarCarrito();
    }
}

function aplicarCodigo() {
    const codigo = document.getElementById("codigo").value;
    renderizarCarrito(codigo);
}

function aplicarDescuento(codigo) {
    if (codigo === "DESC15") {
        carrito.forEach(p => p.descuentoAplicado = true);
        return 0.85;
    }
    return 1;
}

function calcularTotal(codigo) {
    const factor = aplicarDescuento(codigo);
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    return Math.round(total * factor);
}

function renderizarCarrito(codigo = "") {
    const tbody = document.getElementById("carrito-body");
    tbody.innerHTML = "";

    carrito.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.nombre}</td>
            <td>$${formatearPrecio(p.precio)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="quitarProducto(${p.id})">
                    Quitar
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    document.getElementById("total").textContent =
        "$" + formatearPrecio(calcularTotal(codigo));
}

function formatearPrecio(valor) {
    return new Intl.NumberFormat("es-CL").format(valor);
}
