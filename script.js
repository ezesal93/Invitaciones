// =====================================================
// JAVASCRIPT GENERAL (Modal, Countdown, etc)
// =====================================================

// ==================== CUENTA REGRESIVA ====================
const fechaBoda = new Date(2026, 8, 16, 11, 0, 0).getTime(); 

function actualizarCuentaRegresiva() {
    const ahora = new Date().getTime();
    const diferencia = fechaBoda - ahora;

    if (diferencia > 0) {
        // Cálculos matemáticos para días, horas, minutos y segundos
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Inyectar valores en el HTML
        document.getElementById('dias').innerText = dias;
        document.getElementById('horas').innerText = horas < 10 ? '0' + horas : horas;
        document.getElementById('minutos').innerText = minutos < 10 ? '0' + minutos : minutos;
        document.getElementById('segundos').innerText = segundos < 10 ? '0' + segundos : segundos;
    } else {
        // Mensaje si la fecha ya pasó
        document.querySelector('.cuenta-regresiva').innerHTML = "<h3>¡Llegó el gran día!</h3>";
    }
}

// Ejecutar inmediatamente y luego actualizar cada segundo
actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);

// ==================== MODAL DE DATOS BANCARIOS ====================

// Referencias a los elementos del modal
const modal = document.getElementById('modalBancario');
const btnAbrir = document.getElementById('btnAbrirModal');
const btnCerrar = document.getElementById('btnCerrarModal');

// Abrir modal al hacer clic en el botón
btnAbrir.addEventListener('click', () => {
    modal.showModal();
});

// Cerrar modal al hacer clic en CERRAR
btnCerrar.addEventListener('click', () => {
    modal.close();
});

// Cerrar modal si el usuario hace clic fuera de la tarjeta
modal.addEventListener('click', (e) => {
    const dialogBounds = modal.getBoundingClientRect();
    if (
        e.clientX < dialogBounds.left ||
        e.clientX > dialogBounds.right ||
        e.clientY < dialogBounds.top ||
        e.clientY > dialogBounds.bottom
    ) {
        modal.close();
    }
});

// ==================== COPIAR AL PORTAPAPELES ====================

// Función para copiar RUT o N° de cuenta al portapapeles
function copiarTexto(idElemento, boton) {
    const texto = document.getElementById(idElemento).innerText;

    navigator.clipboard.writeText(texto).then(() => {
        const textoOriginal = boton.innerText;
        
        boton.innerText = '¡Copiado!';
        boton.classList.add('copiado');

        setTimeout(() => {
            boton.innerText = textoOriginal;
            boton.classList.remove('copiado');
        }, 1500);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}