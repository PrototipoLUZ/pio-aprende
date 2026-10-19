/* =========================================================
   PANTALLA DE BIENVENIDA
   Un botón grande: al tocarlo se activan el sonido y la voz
   y Pío saluda. Así la primera pregunta ya suena bien.
   ========================================================= */
import { TEXTS } from '../config.js';
import { unlockAudio, sfx, say } from '../core/audio.js';

/** onStart() se llama cuando el niño toca "Jugar" (normalmente muestra el menú). */
export function showWelcome(app, onStart) {
  app.innerHTML = `
    <div class="welcome">
      <span class="pio jump" style="font-size:8rem">🐥</span>
      <h1>${TEXTS.title}</h1>
      <button class="big play" id="play">${TEXTS.play}</button>
    </div>`;

  app.querySelector('#play').addEventListener('click', () => {
    unlockAudio();                                   // 1) activa audio y voz (primer toque)
    sfx('ok');                                       // 2) sonido alegre
    setTimeout(() => say(TEXTS.welcomeVoice), 250);  // 3) Pío saluda
    onStart();                                       // 4) pasa al menú
  });
}
