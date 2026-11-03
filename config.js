// Same-origin Hub is the default. For another origin, use HTTPS and enable
// GET CORS only for the public catalogue and public image endpoints there.
window.POWERBUILD_CONFIG = Object.freeze({
  hubOrigin: '',
  cataloguePath: '/api/ecommerce/public',
  whatsapp: '', // Optional override, international format: 27... (no +).
  logoUrl: '' // Optional approved logo URL; otherwise the text wordmark is used.
});
