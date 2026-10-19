/* =========================================================
   CONFIGURACIÓN GENERAL
   Todo lo que quieras ajustar sin tocar la lógica está aquí.
   ========================================================= */

export const CONFIG = {
  rounds: 5,            // preguntas por partida
  hintAfterTries: 2,    // errores antes de que la respuesta correcta brille
  advanceDelay: 1900,   // ms que se muestra el acierto antes de pasar a la siguiente
  voiceLang: 'es-ES',   // idioma de la voz (probar 'es-MX' o 'es-US')
  voiceRate: 0.85,      // velocidad de voz (más lento = mejor para niños)
  voicePitch: 1.25,     // tono de voz (más agudo = más amigable)
  storageKey: 'pio-aprende', // clave donde se guardan las estrellas
};

/* Frases de Pío. Agrega o cambia frases libremente. */
export const TEXTS = {
  title: 'Pío aprende jugando',
  subtitle: '¡Toca un juego!',
  play: '▶ ¡Jugar!',                                  // botón de la pantalla de bienvenida
  welcomeVoice: '¡Hola! Soy Pío. ¡Vamos a jugar!',   // lo que dice Pío al empezar
  praise: ['¡Muy bien!', '¡Genial!', '¡Lo lograste!', '¡Excelente!'],
  retry: ['¡Casi! Intenta otra vez', 'Ups, prueba con otra', '¡Tú puedes! Otra vez'],
  hint: '¡Mira! Toca el que brilla',
  endHigh: '¡Eres un campeón!',
  endMid: '¡Muy bien jugado!',
  endLow: '¡Sigue practicando!',
  again: '🔁 Jugar otra vez',
  home: '🏠 Menú',
};

/* Sonidos. null = usa el sonido generado por código (sin archivos).
   Para usar tus propios sonidos, pon la ruta, por ejemplo:
   ok: 'assets/sounds/correcto.mp3'                                   */
export const SOUND_FILES = {
  ok: null,   // acierto
  no: null,   // error
  win: null,  // fin de la partida
  tap: null,  // toque en botones del menú
};
