/* =========================================================
   MOTOR DEL JUEGO (igual para todas las secciones)
   Aquí vive la lógica de rondas, aciertos, errores y feedback.
   NO necesitas tocar este archivo para agregar una sección.
   ========================================================= */
import { CONFIG, TEXTS } from '../config.js';
import { rnd } from './utils.js';
import { sfx, say, stopSpeaking } from './audio.js';
import { saveBest } from './storage.js';

let run = null; // partida actual (se cancela al volver al menú)

/** Inicia una partida de una sección. onHome = función que vuelve al menú. */
export function playSection(app, section, onHome) {
  if (run) run.active = false;
  run = { section, i: 0, score: 0, active: true };
  nextQuestion(app, run, onHome);
}

/* ---------- PREGUNTA ---------- */
function nextQuestion(app, game, onHome) {
  if (!game.active) return;
  if (game.i >= CONFIG.rounds) return endScreen(app, game, onHome);

  // La sección fabrica la pregunta: { say, show, items?, opts:[{html, ok}] }
  const q = game.section.generate();
  game.q = q; game.tries = 0; game.done = false;

  app.innerHTML = `
    <div class="top">
      <button class="round" id="back" aria-label="Menú">🏠</button>
      <div class="dots">${Array.from({ length: CONFIG.rounds }, (_, i) =>
        `<span class="dot ${i < game.i ? 'done' : i === game.i ? 'now' : ''}"></span>`).join('')}</div>
      <button class="round" id="ear" aria-label="Escuchar otra vez">🔊</button>
    </div>
    <span class="pio" id="pio">🐥</span>
    <div class="bubble" id="msg">${q.say}</div>
    <div class="show ${q.items ? 'items' : ''}">${q.show}</div>
    <div class="opts" id="opts"></div>`;

  const box = app.querySelector('#opts');
  q.opts.forEach((opt) => {
    const b = document.createElement('button');
    b.className = 'opt'; b.innerHTML = opt.html;
    b.addEventListener('click', () => answer(app, game, b, opt, onHome));
    box.appendChild(b);
  });
  app.querySelector('#back').addEventListener('click', () => { sfx('tap'); game.active = false; stopSpeaking(); onHome(); });
  app.querySelector('#ear').addEventListener('click', () => say(q.say));
  setTimeout(() => game.active && say(q.say), 300); // la voz lee la instrucción
}

/* ---------- RESPUESTA: aquí está TODO el feedback ---------- */
function answer(app, game, btn, opt, onHome) {
  if (game.done) return;
  const msg = app.querySelector('#msg'), pio = app.querySelector('#pio');

  if (opt.ok) {
    /* ✅ CORRECTO: verde + palomita + melodía + Pío salta + voz */
    game.done = true;
    if (game.tries === 0) game.score++;           // estrella solo si acierta a la primera
    btn.classList.add('ok');
    msg.className = 'bubble ok';
    const phrase = rnd(TEXTS.praise); msg.textContent = phrase;
    pio.textContent = '🤩'; pio.classList.add('jump');
    sfx('ok'); setTimeout(() => say(phrase), 350);
    app.querySelector('#opts').classList.add('dis');
    game.i++;
    setTimeout(() => nextQuestion(app, game, onHome), CONFIG.advanceDelay);
  } else {
    /* ❌ INCORRECTO: tiembla + ✖ naranja + tono suave + voz amable. Sin castigo. */
    game.tries++;
    btn.classList.add('no');
    msg.className = 'bubble no';
    const phrase = rnd(TEXTS.retry); msg.textContent = phrase;
    pio.textContent = '🤔';
    sfx('no'); setTimeout(() => say(phrase), 300);

    /* 💡 PISTA: tras varios errores, la respuesta correcta brilla */
    if (game.tries >= CONFIG.hintAfterTries) {
      const idx = game.q.opts.findIndex((o) => o.ok);
      app.querySelector('#opts').children[idx].classList.add('hint');
      msg.textContent = TEXTS.hint;
      setTimeout(() => game.active && say(TEXTS.hint), 1800);
    }
  }
}

/* ---------- PANTALLA FINAL ---------- */
function endScreen(app, game, onHome) {
  saveBest(game.section.id, game.score);
  sfx('win');
  const text = game.score >= 4 ? TEXTS.endHigh : game.score >= 2 ? TEXTS.endMid : TEXTS.endLow;
  app.innerHTML = `
    <span class="pio jump" style="margin-top:30px;font-size:6rem">🥳</span>
    <h1>${text}</h1>
    <div class="stars">${'⭐'.repeat(game.score) || '🌱'}</div>
    <button class="big" id="again">${TEXTS.again}</button>
    <button class="big alt" id="home">${TEXTS.home}</button>`;
  setTimeout(() => game.active && say(text), 500);
  app.querySelector('#again').addEventListener('click', () => { sfx('tap'); playSection(app, game.section, onHome); });
  app.querySelector('#home').addEventListener('click', () => { sfx('tap'); onHome(); });
}
