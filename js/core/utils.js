/* =========================================================
   UTILIDADES pequeñas reutilizables por todas las secciones
   ========================================================= */

/** Devuelve una copia desordenada de la lista. */
export const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

/** Toma n elementos al azar de la lista. */
export const pick = (list, n) => shuffle(list).slice(0, n);

/** Toma 1 elemento al azar. */
export const rnd = (list) => list[Math.floor(Math.random() * list.length)];
