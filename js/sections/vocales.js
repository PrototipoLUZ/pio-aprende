/* SECCIÓN: VOCALES — identificar la vocal y con cuál empieza una palabra */
import { rnd, pick, shuffle } from '../core/utils.js';

const VOCALES = ['A', 'E', 'I', 'O', 'U'];

/* ✏️ DATOS: para más palabras agrega [dibujo, palabra, vocal inicial] */
const PALABRAS = [
  ['✈️', 'avión', 'A'], ['🐘', 'elefante', 'E'], ['🏝️', 'isla', 'I'],
  ['🐻', 'oso', 'O'], ['🍇', 'uva', 'U'],
];

/** 3 opciones de vocal, una de ellas correcta. */
const opciones = (correcta) =>
  shuffle([...pick(VOCALES.filter((v) => v !== correcta), 2), correcta])
    .map((v) => ({ html: v, ok: v === correcta }));

export default {
  id: 'vocales', name: 'Vocales', icon: '🔤', color: 'var(--c1)',

  generate() {
    // Modo 1: reconocer la letra
    if (Math.random() < 0.5) {
      const v = rnd(VOCALES);
      return { say: `Toca la vocal ${v}`, show: `<span class="letter">${v}</span>`, opts: opciones(v) };
    }
    // Modo 2: ¿con qué vocal empieza el dibujo?
    const [dibujo, palabra, vocal] = rnd(PALABRAS);
    return {
      say: `${palabra}. ¿Con qué vocal empieza?`,
      show: `${dibujo}<small>${palabra}</small>`,
      opts: opciones(vocal),
    };
  },
};
