/* =========================================================
   GUARDADO: las mejores estrellas por sección, en el celular
   (localStorage). Si el navegador no lo permite, no falla.
   ========================================================= */
import { CONFIG } from '../config.js';

let data = {};
try { data = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '{}'); } catch (e) {}

/** Mejor puntaje (estrellas) de una sección. */
export const getBest = (sectionId) => data[sectionId] || 0;

/** Guarda el puntaje solo si supera al anterior. */
export function saveBest(sectionId, score) {
  data[sectionId] = Math.max(getBest(sectionId), score);
  try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(data)); } catch (e) {}
}
