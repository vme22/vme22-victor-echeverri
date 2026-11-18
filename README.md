# Portafolio — Victor Manuel Echeverri Osorio

Sitio estático (HTML, CSS y JavaScript sin dependencias ni compilación). Se abre con doble clic en `index.html`.

| Archivo | Contenido |
|---|---|
| `index.html` | Secciones: Inicio, Experiencia, Proyectos, Tecnologías, Sobre mí y Contacto |
| `styles.css` | Estilos y paleta (variables en `:root`: verde `--verde`, ámbar `--ambar`, fondos oscuros) |
| `main.js` | Menú móvil, sección activa, animaciones al hacer scroll, rol que se escribe solo, menú de CV y copiar contacto |
| `assets/favicon.svg` | Ícono de la pestaña |
| `docs/` | Hojas de vida en PDF que descarga el botón "Descargar CV" |

## Hojas de vida

El botón "Descargar CV" enlaza estos dos archivos; deben existir con estos nombres en `docs/`:

- `docs/CV_Victor_Echeverri_FullStack.pdf` — CV técnico (ATS).
- `docs/HV_Victor_Echeverri_Certificados.pdf` — hoja de vida con certificados.

Antes de publicarlos, quitar los datos que no deben quedar en internet: número de cédula, dirección, fecha de
nacimiento y los datos (cédula y teléfono) de las referencias personales.

## Publicar

Cualquier hosting estático sirve: Vercel, Netlify o GitHub Pages. No hay paso de compilación; la carpeta raíz es
la que se publica.
