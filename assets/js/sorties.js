(async function renderRoutes() {
  const ROUTES_JSON_URL = '/assets/routes.json';

  // escape user-provided strings to avoid injection
  const escapeHTML = (s = '') =>
    s.replace(/[&<>"']/g, ch => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
    ));

  try {
    const res = await fetch(ROUTES_JSON_URL, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load routes.json');
    const routes = await res.json();

    const grid = document.getElementById('routes-grid');
    if (!grid) return;

    routes.forEach(r => {
      const article = document.createElement('article');
      article.style.marginBottom = '2rem';

      const title = escapeHTML(r.title);
      const desc = escapeHTML(r.description || '');
      const embedId = escapeHTML(r.embedId);
      const mapHash = r.mapHash ? ` data-map-hash="${escapeHTML(r.mapHash)}"` : '';
      const clubId = r.clubId ? ` data-club-id="${escapeHTML(r.clubId)}"` : '';
      const style = r.style ? ` data-style="${escapeHTML(r.style)}"` : ' data-style="standard"';
      const fullW = (r.fullWidth === false) ? '' : ' data-full-width="true"';

      article.innerHTML = `
        <h2>${title}</h2>
        ${desc ? `<p>${desc}</p>` : ''}
        <div class="strava-embed-placeholder"
             data-embed-type="route"
             data-embed-id="${embedId}"
             ${fullW}${style}${mapHash}${clubId}
             data-from-embed="true"></div>
      `;
      grid.appendChild(article);
    });

    // Reload Strava embed script to initialize new placeholders
    const existing = document.querySelector('script[data-strava-embed-reloader]');
    if (existing) existing.remove();

    const s = document.createElement('script');
    s.src = 'https://strava-embeds.com/embed.js';
    s.async = true;
    s.setAttribute('data-strava-embed-reloader', '1');
    document.body.appendChild(s);

  } catch (err) {
    console.error(err);
    const grid = document.getElementById('routes-grid');
    if (grid) {
      grid.innerHTML = '<p>Impossible de charger les parcours pour le moment.</p>';
    }
  }
})();
