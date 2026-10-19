/* =========================================================
   PANTALLA DE MENÚ
   Dibuja un botón por cada sección registrada en sections/index.js
   ========================================================= */
import { TEXTS } from '../config.js';
import { sfx } from '../core/audio.js';
import { getBest } from '../core/storage.js';
import { SECTIONS } from '../sections/index.js';

/** onSelect(section) se llama cuando el niño toca una sección. */
export function showMenu(app, onSelect) {
  app.innerHTML = `
    <span class="pio">🐥</span>
    <h1>${TEXTS.title}</h1>
    <p class="sub">${TEXTS.subtitle}</p>
    <div class="grid">
      ${SECTIONS.map((s) => `
        <button class="tile" data-id="${s.id}" style="background:${s.color}">
          <span class="ic">${s.icon}</span>${s.name}
          <span class="st">${'⭐'.repeat(getBest(s.id)) || '☆'}</span>
        </button>`).join('')}
    </div>`;

  app.querySelectorAll('.tile').forEach((btn) =>
    btn.addEventListener('click', () => {
      sfx('tap');
      onSelect(SECTIONS.find((s) => s.id === btn.dataset.id));
    }));
}
