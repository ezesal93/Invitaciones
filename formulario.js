// =====================================================
// JAVASCRIPT DEL FORMULARIO DE CONFIRMACIÓN
// =====================================================

const formulario = document.getElementById('formularioConfirmacion');
const alergico = document.querySelectorAll('input[name="alergico"]');
const grupoRestriccion = document.getElementById('grupo-restriccion');
const inputRestriccion = document.getElementById('restriccion');

// Mostrar/ocultar campo de restricción según respuesta de alergia
alergico.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'Sí') {
            grupoRestriccion.style.display = 'block';
            inputRestriccion.required = true;
        } else {
            grupoRestriccion.style.display = 'none';
            inputRestriccion.required = false;
            inputRestriccion.value = '';
        }
    });
});

// Enviar formulario
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const asiste = document.querySelector('input[name="asiste"]:checked')?.value || '';
    const alergico = document.querySelector('input[name="alergico"]:checked')?.value || '';
    const restriccion = document.getElementById('restriccion').value.trim();
    const dieta = document.querySelector('input[name="dieta"]:checked')?.value || 'Ninguna';

    // Validar campos requeridos
    let esValido = true;
    limpiarErrores();

    if (!nombre) {
        mostrarError('nombre', 'El nombre es requerido');
        esValido = false;
    }

    if (!asiste) {
        mostrarError('asiste', 'Por favor, indica si asistirás');
        esValido = false;
    }

    if (!alergico) {
        mostrarError('alergico', 'Por favor, responde sobre alergias');
        esValido = false;
    }

    if (alergico === 'Sí' && !restriccion) {
        mostrarError('restriccion', 'Por favor, cuéntanos sobre tu alergia');
        esValido = false;
    }

    if (!esValido) return;

    // Enviar a Google Apps Script
    const dataToSend = {
        nombre: nombre,
        asiste: asiste,
        alergico: alergico,
        restriccion: alergico === 'Sí' ? restriccion : 'N/A',
        dieta: dieta,
        fecha: new Date().toLocaleString('es-CL')
    };

    // Deshabilitar botón
    const boton = formulario.querySelector('.btn-enviar');
    boton.disabled = true;
    boton.textContent = 'Enviando...';

    // REEMPLAZA ESTA URL CON TU SCRIPT DE GOOGLE APPS SCRIPT
    fetch('https://script.google.com/macros/s/AKfycbyJUX8KTh3Ab8yClQMyyzBtDeEYxjPvSfOZkr-J8akO9O6tqPIzncv_TVnDj6lTJtAT/exec', {
        method: 'POST',
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            mostrarExito();
            formulario.reset();
            grupoRestriccion.style.display = 'none';
        } else {
            mostrarErrorGeneral();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarErrorGeneral();
    })
    .finally(() => {
        boton.disabled = false;
        boton.textContent = 'ENVIAR CONFIRMACIÓN';
    });
});

function mostrarError(campo, mensaje) {
    const errorElement = document.getElementById(`error-${campo}`);
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }
}

function limpiarErrores() {
    document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

function mostrarExito() {
    const mensaje = document.getElementById('mensajeExito');
    mensaje.style.display = 'block';
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 4000);
}

function mostrarErrorGeneral() {
    const mensaje = document.getElementById('mensajeError');
    mensaje.style.display = 'block';
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 4000);
}