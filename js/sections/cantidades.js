/* SECCIÓN: CANTIDADES — mucho/poco/nada y contar del 1 al 5 */
import { rnd, pick, shuffle } from '../core/utils.js';

export default {
  id: 'cantidades', name: 'Cantidades', icon: '🍎', color: 'var(--c4)',

  generate() {
    // Modo 1: mucho, poco o nada
    if (Math.random() < 0.5) {
      const clave = rnd(['mucho', 'poco', 'nada']);
      const n = clave === 'nada' ? 0 : clave === 'poco' ? rnd([1, 2]) : rnd([8, 9, 10]);
      return {
        say: '¿Hay mucho, poco o nada?', items: true,
        show: n ? '🍎'.repeat(n) : '🧺',                 // 🧺 = canasta vacía
        opts: [['mucho', '🌊'], ['poco', '💧'], ['nada', '⭕']].map(([k, ic]) => ({
          html: `${ic}<small>${k}</small>`, ok: k === clave,
        })),
      };
    }
    // Modo 2: contar del 1 al 5
    const n = rnd([1, 2, 3, 4, 5]);
    const objeto = rnd(['🍎', '⭐', '🎈', '🐟']);
    return {
      say: '¿Cuántos hay?', items: true, show: objeto.repeat(n),
      opts: shuffle([...pick([1, 2, 3, 4, 5].filter((x) => x !== n), 2), n])
        .map((x) => ({ html: String(x), ok: x === n })),
    };
  },
};
