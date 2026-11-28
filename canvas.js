// ========================================
// NÚCLEO DE LUZ - Arte Generativo
// Edison Jara · Tarea 8
// ========================================

document.addEventListener('DOMContentLoaded', function () {

  const canvas = document.getElementById('canvasGenerativo');
  
  if (!canvas) {
    console.error('No se encontró el canvas con id "canvasGenerativo"');
    return;
  }

  const ctx = canvas.getContext('2d');

  // Paletas de color
  const paletaNeon = ['#22d3ee', '#67e8f9', '#a855f7', '#c084fc', '#e0f2fe', '#818cf8'];
  const paletaAtardecer = ['#f97316', '#fb923c', '#fbbf24', '#f472b6', '#e11d48', '#fcd34d'];

  let paletaActual = [...paletaNeon];

  // ---------- Función: Fondo con degradado ----------
  function dibujarFondo() {
    const gradiente = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 10,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.65
    );
    gradiente.addColorStop(0, '#1e1b4b');
    gradiente.addColorStop(0.4, '#0f172a');
    gradiente.addColorStop(1, '#020617');

    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // ---------- Función: Círculo ----------
  function dibujarCirculo(x, y, radio, color, relleno = true, grosor = 1.5) {
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);
    if (relleno) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = grosor;
      ctx.stroke();
    }
  }

  // ---------- Función: Línea ----------
  function dibujarLinea(x1, y1, x2, y2, color, grosor = 1) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.stroke();
  }

  // ---------- Función: Triángulo ----------
  function dibujarTriangulo(x, y, tamaño, color) {
    ctx.beginPath();
    ctx.moveTo(x, y - tamaño);
    ctx.lineTo(x + tamaño, y + tamaño * 0.8);
    ctx.lineTo(x - tamaño, y + tamaño * 0.8);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  // ---------- Función: Textos ----------
  function dibujarTextos() {
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NÚCLEO DE LUZ', canvas.width / 2, 48);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px Arial, sans-serif';
    ctx.fillText('Energía creativa · Diseño multimedia generativo', canvas.width / 2, 75);
  }

  // ---------- Función principal: Generar composición ----------
  function generarComposicion() {
    dibujarFondo();

    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2 + 15;

    // Núcleo central con brillo
    const gradienteNucleo = ctx.createRadialGradient(centroX, centroY, 4, centroX, centroY, 80);
    gradienteNucleo.addColorStop(0, paletaActual[0]);
    gradienteNucleo.addColorStop(0.6, paletaActual[1] + '88');
    gradienteNucleo.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(centroX, centroY, 80, 0, Math.PI * 2);
    ctx.fillStyle = gradienteNucleo;
    ctx.fill();

    // Núcleo sólido
    dibujarCirculo(centroX, centroY, 16, paletaActual[0]);

    // BUCLE: dibujar muchos elementos
    for (let i = 0; i < 30; i++) {
      const angulo = (Math.PI * 2 / 30) * i + Math.random() * 0.5;
      const distancia = 100 + Math.random() * 170;
      const x = centroX + Math.cos(angulo) * distancia;
      const y = centroY + Math.sin(angulo) * distancia;
      const tamaño = 4 + Math.random() * 12;
      const color = paletaActual[Math.floor(Math.random() * paletaActual.length)];

      // Condicional: decide el tipo de figura
      if (i % 4 === 0) {
        dibujarTriangulo(x, y, tamaño * 0.75, color);
      } else if (i % 3 === 0) {
        ctx.fillStyle = color;
        ctx.fillRect(x - tamaño / 2, y - tamaño / 2, tamaño, tamaño);
      } else {
        dibujarCirculo(x, y, tamaño * 0.45, color);
      }

      // Algunas líneas hacia el centro
      if (i % 6 === 0) {
        dibujarLinea(centroX, centroY, x, y, color + '40', 0.9);
      }
    }

    // Órbitas
    for (let r = 110; r <= 250; r += 45) {
      const colorOrbita = paletaActual[Math.floor(Math.random() * 3)];
      dibujarCirculo(centroX, centroY, r + Math.random() * 8, colorOrbita + '35', false, 1.3);
    }

    dibujarTextos();
  }

  // ---------- Eventos de los botones ----------
  const btnPaleta1 = document.getElementById('btnPaleta1');
  const btnPaleta2 = document.getElementById('btnPaleta2');
  const btnGenerar = document.getElementById('btnGenerar');
  const btnGuardar = document.getElementById('btnGuardar');

  if (btnPaleta1) {
    btnPaleta1.addEventListener('click', function () {
      paletaActual = [...paletaNeon];
      generarComposicion();
    });
  }

  if (btnPaleta2) {
    btnPaleta2.addEventListener('click', function () {
      paletaActual = [...paletaAtardecer];
      generarComposicion();
    });
  }

  if (btnGenerar) {
    btnGenerar.addEventListener('click', function () {
      generarComposicion();
    });
  }

  if (btnGuardar) {
    btnGuardar.addEventListener('click', function () {
      const enlace = document.createElement('a');
      enlace.download = 'nucleo-de-luz.png';
      enlace.href = canvas.toDataURL('image/png');
      enlace.click();
    });
  }

  // Generar la primera composición
  generarComposicion();
  console.log('Canvas generado correctamente');
});