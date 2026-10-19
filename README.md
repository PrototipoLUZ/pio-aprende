# 🐥 Pío aprende jugando

Juego web para niños de 5 a 6 años (vocales, tamaños, colores y cantidades).
HTML + CSS + JavaScript puro: **sin instalar nada y sin costo**.

## Estructura

```
pio-aprende/
├── index.html              ← página única
├── css/styles.css          ← colores, tamaños y animaciones
├── js/
│   ├── main.js             ← punto de entrada
│   ├── config.js           ← rondas, voz, frases de Pío, rutas de sonidos
│   ├── core/               ← motor (no se toca al agregar secciones)
│   │   ├── game.js         ← rondas y feedback (acierto/error/pista)
│   │   ├── audio.js        ← sonidos y voz
│   │   ├── storage.js      ← estrellas guardadas en el celular
│   │   └── utils.js        ← funciones auxiliares
│   ├── ui/menu.js          ← menú principal
│   └── sections/           ← ⭐ una carpeta de juegos, un archivo por sección
│       ├── index.js        ← registro de secciones
│       ├── vocales.js  tamanos.js  colores.js  cantidades.js
└── assets/
    ├── sounds/             ← tus .mp3 (opcional)
    └── images/             ← tus .png/.svg (opcional)
```

## Probar en tu computadora

Los módulos de JavaScript no funcionan abriendo el archivo con doble clic.
Abre una terminal en la carpeta y ejecuta:

```
python -m http.server 8000
```

Luego entra a http://localhost:8000 (o desde el celular con la IP de tu PC).

## Publicar gratis en GitHub Pages

1. Crea una cuenta en github.com y un repositorio **público** nuevo (ej. `pio-aprende`).
2. Sube **el contenido de la carpeta** (que `index.html` quede en la raíz del repositorio).
3. Ve a **Settings → Pages**.
4. En *Build and deployment* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** y guarda.
5. En 1 o 2 minutos tu juego estará en `https://TU-USUARIO.github.io/pio-aprende/`.

Cada vez que subas un cambio, la página se actualiza sola.
Usa nombres de archivo en minúsculas y sin tildes ni ñ (GitHub distingue mayúsculas).

## Agregar una sección nueva (ejemplo: formas)

1. Copia `js/sections/colores.js` a `js/sections/formas.js`.
2. Cambia `id`, `name`, `icon`, `color` y la lógica de `generate()`.
3. En `js/sections/index.js` agrega `import formas from './formas.js';` y `formas,` a la lista.

Listo: aparece en el menú con sus estrellas y el mismo feedback.

## Cambiar sonidos e imágenes

- **Sonidos:** copia tus archivos a `assets/sounds/` y pon la ruta en `SOUND_FILES` de `js/config.js`.
- **Imágenes:** copia a `assets/images/` y úsalas en `show` o `html` con `<img src="assets/images/gato.png" alt="gato" width="120">`.
- Fuentes gratuitas: OpenMoji y Kenney (dibujos), Pixabay y freesound.org (sonidos). Revisa la licencia de cada recurso.

## Ideas futuras

Nueva mecánica (arrastrar y soltar), modo sin conexión (PWA), varios niveles de dificultad,
perfil por niño, y más idiomas (las frases están en `config.js`).
