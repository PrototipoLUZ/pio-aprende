/* =========================================================
   AUDIO: efectos de sonido + voz que lee las instrucciones
   Si en config.js pones un archivo en SOUND_FILES, se usa ese;
   si no, se genera un sonido con código (no pesa nada).
   ========================================================= */
import { CONFIG, SOUND_FILES } from '../config.js';

let ctx; // contexto de audio (se crea con el primer toque, lo exigen los navegadores)

/** Reproduce una nota. f = frecuencia, t = inicio (s), d = duración (s). */
function tone(f, t, d, type = 'sine', vol = 0.18) {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = type; osc.frequency.value = f;
    osc.connect(gain); gain.connect(ctx.destination);
    const start = ctx.currentTime + t;
    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + d);
    osc.start(start); osc.stop(start + d);
  } catch (e) { /* sin audio: el juego sigue funcionando */ }
}

/* Sonidos generados por código (cámbialos o agrega nuevos aquí) */
const synth = {
  ok:  () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.25, 'triangle')), // melodía alegre
  no:  () => { tone(300, 0, 0.18); tone(240, 0.18, 0.28); },                               // tono suave y bajo
  win: () => [523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.3, 'triangle')),
  tap: () => tone(660, 0, 0.08),
};

/** Reproduce un efecto: 'ok' | 'no' | 'win' | 'tap'. */
export function sfx(name) {
  const file = SOUND_FILES[name];
  if (file) { new Audio(file).play().catch(() => synth[name]?.()); }
  else synth[name]?.();
}

/** La voz lee un texto en voz alta. */
export function say(text) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = CONFIG.voiceLang; u.rate = CONFIG.voiceRate; u.pitch = CONFIG.voicePitch;
    speechSynthesis.speak(u);
  } catch (e) { /* el celular no tiene voz: se ignora */ }
}

/** Calla la voz (al salir de una partida). */
export function stopSpeaking() {
  try { speechSynthesis.cancel(); } catch (e) {}
}

/* =========================================================
   DESBLOQUEO DE AUDIO (se llama desde la pantalla de bienvenida)
   Los celulares no permiten sonido ni voz hasta que el niño toca
   la pantalla. Esta función se ejecuta en ese primer toque.
   ========================================================= */
export function unlockAudio() {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();   // activa el audio en iPhone/Chrome
  } catch (e) {}
  tone(880, 0, 0.12);                               // pitido corto: confirma que hay sonido
  try { speechSynthesis.cancel(); speechSynthesis.resume(); } catch (e) {} // activa la voz
}
