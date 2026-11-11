# Portafolio · Sebastián Cruz Sierra

Portafolio personal: desarrollador full stack en formación, estudiante de Ingeniería de Sistemas en la UPB (Medellín).

**Sitio:** https://scruzbdev.github.io

- Sitio estático en un solo archivo (`index.html`), sin dependencias ni compilación.
- Español e inglés, modo claro y oscuro, diseño adaptable a celular.
- Hoja de vida descargable en PDF (`cv/`), en español e inglés.
- Publicado con GitHub Pages.

## Ver en local

Abre `index.html` en el navegador.

## Regenerar la hoja de vida

Los datos están en `scripts/generar-cv.js`. Después de editarlos:

```bash
npm i playwright
npx playwright install chromium
node scripts/generar-cv.js
```
