// ========================================
// JavaScript del Portafolio - Edison Jara
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Menú hamburguesa en móvil ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // --- Resaltar el enlace activo del menú al hacer scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function resaltarMenu() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', resaltarMenu);

  // --- Scroll suave al hacer clic en el menú ---
  document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
      const destinoId = this.getAttribute('href');
      if (destinoId === '#') return;

      const destino = document.querySelector(destinoId);
      if (destino) {
        e.preventDefault();
        const offset = 80;
        const posicion = destino.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: posicion, behavior: 'smooth' });
      }
    });
  });

  // --- Formulario de contacto ---
  const formulario = document.getElementById('contact-form');
  if (formulario) {
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = formulario.querySelector('#name').value.trim();
      const email = formulario.querySelector('#email').value.trim();
      const mensaje = formulario.querySelector('#message').value.trim();

      if (!nombre || !email || !mensaje) {
        alert('Por favor completa todos los campos.');
        return;
      }

      alert('¡Gracias ' + nombre + '!\n\nTu mensaje ha sido enviado correctamente.\n\n(Esto es una demostración.)');
      formulario.reset();
    });
  }

  // --- Botones "Ver más detalles" de los proyectos ---
  document.querySelectorAll('[data-project]').forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      const proyecto = boton.getAttribute('data-project');

      const titulos = {
        video: 'Video Publicitario',
        grafico: 'Diseño de Flyers & Gráfico',
        uxui: 'Creación de UX / UI'
      };

      alert('Proyecto: ' + (titulos[proyecto] || proyecto) + '\n\nAquí puedes colocar el enlace a más detalles de tu trabajo.');
    });
  });

  // --- Animación de aparición al hacer scroll ---
  const opciones = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, opciones);

  document.querySelectorAll('.project-card, .about-grid, .contact-form').forEach(el => {
    el.classList.add('fade-in');
    observador.observe(el);
  });
});

// Estilos de la animación de entrada
const estiloAnimacion = document.createElement('style');
estiloAnimacion.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(estiloAnimacion);