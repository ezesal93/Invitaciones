// =====================================================
// ANIMACIONES DE SCROLL - Elementos aparecen al bajar
// =====================================================

/**
 * Intersection Observer: Detecta cuando un elemento entra en pantalla
 * y le agrega la clase "visible" para animar
 */

const observerOptions = {
    root: null,                    // Viewport
    rootMargin: '0px 0px -100px 0px', // Activar 100px antes de entrar en pantalla
    threshold: 0.1                 // 10% visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Si el elemento entra en la pantalla
        if (entry.isIntersecting) {
            // Agregar clase 'visible' para animar
            entry.target.classList.add('visible');
            
            // Dejar de observar (anima solo una vez)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * Observar todos los elementos que queremos animar
 */
document.addEventListener('DOMContentLoaded', () => {
    // Observar secciones principales
    const elementosParaAnimar = document.querySelectorAll(
        '.reproductor-cancion, ' +
        '.cuenta-regresiva-container, ' +
        '.ceremonia, ' +
        '.nosotros-seccion, ' +
        '.confirmacion-seccion, ' +
        '.regalos-container'
    );

    elementosParaAnimar.forEach(elemento => {
        observer.observe(elemento);
    });

    // También animar bloques individuales de tiempo
    const bloquesTiempo = document.querySelectorAll('.bloque-tiempo');
    bloquesTiempo.forEach((bloque, index) => {
        // Agregar delay diferente a cada bloque
        bloque.style.setProperty('--delay', `${index * 0.1}s`);
        observer.observe(bloque);
    });

    // Animar fotos de la galería
    const fotos = document.querySelectorAll('.galeria-collage img');
    fotos.forEach(foto => {
        observer.observe(foto);
    });
});

/**
 * BONUS: Efecto parallax suave en el banner
 * (opcional, descomenta si te gusta)
 */
/*
window.addEventListener('scroll', () => {
    const banner = document.querySelector('.banner');
    const scrollPosition = window.scrollY;
    
    // Mover el banner lentamente mientras haces scroll
    banner.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
});
*/