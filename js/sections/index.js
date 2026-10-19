/* =========================================================
   REGISTRO DE SECCIONES  ⭐ AQUÍ SE AGREGAN NUEVAS SECCIONES ⭐
   Pasos: 1) crea js/sections/mi-seccion.js  2) impórtala  3) agrégala a la lista.
   El menú, las estrellas y el feedback se generan solos.

   CONTRATO de cada sección (ver vocales.js como ejemplo):
   {
     id:    'vocales',              // único, sin espacios ni tildes
     name:  'Vocales',              // texto del botón del menú
     icon:  '🔤',                   // emoji (o <img> en HTML)
     color: 'var(--c1)',            // color del botón (ver css/styles.css)
     generate() -> {
       say:   'Toca la vocal A',    // lo que Pío dice y escribe
       show:  '<span>A</span>',     // lo que se ve en pantalla (HTML)
       items: true,                 // (opcional) true si "show" son varios objetos a contar
       opts:  [{ html:'A', ok:true }, { html:'E', ok:false }, ...]  // opciones
     }
   }
   ========================================================= */
import vocales from './vocales.js';
import tamanos from './tamanos.js';
import colores from './colores.js';
import cantidades from './cantidades.js';

export const SECTIONS = [
  vocales,
  tamanos,
  colores,
  cantidades,
  // formas,   ← ejemplo: nueva sección futura
];
