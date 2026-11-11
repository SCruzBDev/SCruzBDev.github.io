# Portafolio · Sebastián Cruz Sierra

Portafolio personal: desarrollador full stack en formación, estudiante de Ingeniería de Sistemas en la UPB (Medellín).

**Sitio:** https://scruzbdev.github.io

- Sitio estático en un solo archivo (`index.html`), sin dependencias ni compilación.
- Diseño oscuro inspirado en *Serial Experiments Lain* (scanlines suaves, acentos rojos, sombras de puntos), con tono amigable y profesional.
- Foto de perfil en `img/perfil.jpg` (retrato, idealmente 800×1000). Si no existe, se muestran las iniciales.
- Sección dedicada a Linux (Arch, Hyprland, fish) con terminal animada.
- Español e inglés, diseño adaptable a celular y respeto a `prefers-reduced-motion`.
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
