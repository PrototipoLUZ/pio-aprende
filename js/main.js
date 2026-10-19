/* =========================================================
   PUNTO DE ENTRADA: conecta el menú con el motor del juego
   ========================================================= */
import { showMenu } from './ui/menu.js';
import { playSection } from './core/game.js';

const app = document.getElementById('app');

/** Muestra el menú; al elegir una sección, inicia la partida. */
function goHome() {
  showMenu(app, (section) => playSection(app, section, goHome));
}

goHome();
