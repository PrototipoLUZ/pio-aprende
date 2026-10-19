/* SECCIÓN: TAMAÑOS — grande / pequeño. (Archivo sin ñ para evitar problemas en GitHub) */
import { rnd, shuffle } from '../core/utils.js';

const ANIMALES = ['🐶', '🐱', '🐸', '🐥', '🐻'];
const TAMANOS = [2.2, 3.6, 5.2]; // pequeño, mediano, grande (en rem)

export default {
  id: 'tamanos', name: 'Tamaños', icon: '🐘', color: 'var(--c2)',

  generate() {
    const animal = rnd(ANIMALES);
    const pedido = rnd(['grande', 'pequeño']);
    const meta = pedido === 'grande' ? 5.2 : 2.2;
    return {
      say: `Toca el más ${pedido}`,
      show: animal,
      opts: shuffle(TAMANOS).map((t) => ({
        html: `<span style="font-size:${t}rem">${animal}</span>`, ok: t === meta,
      })),
    };
  },
};
