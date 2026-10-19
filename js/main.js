/* =========================================================
   PUNTO DE ENTRADA: bienvenida → menú → juego
   ========================================================= */
import { showWelcome } from './ui/welcome.js';
import { showMenu } from './ui/menu.js';
import { playSection } from './core/game.js';

const app = document.getElementById('app');

/** Muestra el menú; al elegir una sección, inicia la partida. */
function goHome() {
  showMenu(app, (section) => playSection(app, section, goHome));
}

// Se empieza por la bienvenida (solo al abrir la página); luego siempre se vuelve al menú.
showWelcome(app, goHome);
