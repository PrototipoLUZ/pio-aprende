/* SECCIÓN: COLORES PRIMARIOS */
import { rnd, shuffle } from '../core/utils.js';

/* ✏️ DATOS: agrega colores como [nombre, código]. */
const COLORES = [['rojo', '#E63946'], ['azul', '#2F6FED'], ['amarillo', '#FFC93C']];

export default {
  id: 'colores', name: 'Colores', icon: '🎨', color: 'var(--c3)',

  generate() {
    const meta = rnd(COLORES);
    return {
      say: `Toca el color ${meta[0]}`,
      show: '🖌️',
      opts: shuffle(COLORES).map((c) => ({
        html: `<span style="display:block;width:64px;height:64px;border-radius:50%;background:${c[1]};border:3px solid var(--ink)"></span>`,
        ok: c === meta,
      })),
    };
  },
};
