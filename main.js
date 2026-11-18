// Portafolio — comportamiento de la página (sin dependencias)
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Año del pie
  $('#anio').textContent = new Date().getFullYear();

  // Reloj de la tarjeta "sistema"
  const reloj = $('#reloj');
  const tic = () => { reloj.textContent = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }); };
  tic(); setInterval(tic, 15000);

  // Barra con borde al hacer scroll
  const barra = $('#barra');
  const alScroll = () => barra.classList.toggle('con-sombra', window.scrollY > 10);
  alScroll(); window.addEventListener('scroll', alScroll, { passive: true });

  // Menú móvil
  const menuBtn = $('#menuBtn'), menu = $('#menu');
  const cerrarMenu = () => { menu.classList.remove('abierto'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Abrir menú'); };
  menuBtn.addEventListener('click', () => {
    const abrir = !menu.classList.contains('abierto');
    menu.classList.toggle('abierto', abrir);
    menuBtn.setAttribute('aria-expanded', String(abrir));
    menuBtn.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', cerrarMenu));

  // Sección activa en el menú
  const enlaces = $$('.menu a[href^="#"]');
  const observarSecciones = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      enlaces.forEach((a) => a.classList.toggle('activo', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => observarSecciones.observe(s));

  // Aparición al hacer scroll
  const revelar = $$('.revelar');
  if (reducido || !('IntersectionObserver' in window)) {
    revelar.forEach((el) => el.classList.add('visible'));
  } else {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revelar.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`; obs.observe(el); });
  }

  // Rol que se escribe solo
  const roles = ['Desarrollador Full Stack', 'Backend · PHP · Go · Node.js', 'Integraciones Moodle y APIs', 'Ingeniero en Sistemas'];
  const rol = $('#rol');
  if (!reducido) {
    let r = 0, c = roles[0].length, borrando = true;
    const paso = () => {
      const t = roles[r];
      c += borrando ? -1 : 1;
      rol.textContent = t.slice(0, c);
      let espera = borrando ? 35 : 70;
      if (!borrando && c === t.length) { borrando = true; espera = 2200; }
      else if (borrando && c === 0) { borrando = false; r = (r + 1) % roles.length; espera = 300; }
      setTimeout(paso, espera);
    };
    setTimeout(paso, 2600);
  }

  // Menú "Descargar CV"
  const cv = $('#cvMenu'), cvBtn = $('button', cv), cvLista = $('#cvOpciones');
  const cerrarCv = () => { cvLista.hidden = true; cvBtn.setAttribute('aria-expanded', 'false'); };
  cvBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const abrir = cvLista.hidden;
    cvLista.hidden = !abrir;
    cvBtn.setAttribute('aria-expanded', String(abrir));
  });
  document.addEventListener('click', (e) => { if (!cv.contains(e.target)) cerrarCv(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { cerrarCv(); cerrarMenu(); } });

  // Copiar datos de contacto
  const aviso = $('#aviso');
  let tAviso;
  const mostrarAviso = (txt) => {
    aviso.textContent = txt; aviso.classList.add('visible');
    clearTimeout(tAviso); tAviso = setTimeout(() => aviso.classList.remove('visible'), 2000);
  };
  $$('[data-copiar]').forEach((b) => b.addEventListener('click', async () => {
    const valor = b.dataset.copiar;
    try {
      await navigator.clipboard.writeText(valor);
      mostrarAviso('Copiado: ' + valor);
    } catch {
      const t = document.createElement('textarea');
      t.value = valor; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); mostrarAviso('Copiado: ' + valor); } catch { mostrarAviso(valor); }
      t.remove();
    }
  }));
})();
