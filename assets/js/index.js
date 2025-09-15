

document.addEventListener('DOMContentLoaded', () => {

  const inner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  let index = 0;
  function showNext() {
    index = (index + 1) % items.length;
    inner.style.transform = `translateX(-${index * 100}%)`;
  }

  // change every 3 seconds
  setInterval(showNext, 3000);

  document.querySelector('.next').onclick = () => {
    index = (index + 1) % items.length;
    inner.style.transform = `translateX(-${index * 100}%)`;
  };
  document.querySelector('.prev').onclick = () => {
    index = (index - 1 + items.length) % items.length;
    inner.style.transform = `translateX(-${index * 100}%)`;
  };

  fetch('/assets/events.json')
    .then(res => res.json())
    .then(events => {
      const now = new Date();

      const upcoming = events
        .filter(e => new Date(e.start) >= now)
        .sort((a, b) => new Date(a.start) - new Date(b.start));

      const list = document.getElementById('event-list');

      if (upcoming.length === 0) {
        list.innerHTML = "<p>Aucun événement à venir.</p>";
        return;
      }

      upcoming.forEach(event => {
        const container = document.createElement('div');
        container.className = 'event-entry';

        const date = new Date(event.start);
        const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
        const dateStr = date.toLocaleDateString('fr-FR', options);

        container.innerHTML = `
            <div class="event-title">${event.title}</div>
            <div class="event-meta">
              📅 ${dateStr}<br/>
              📍 ${event.location || "Lieu non précisé"}<br/>
              👟 Chaussures recommandées : ${event.chaussures || "non spécifiées"}
            </div>
            ${event.raw?.link ? `<a class="event-link" href="${event.raw.link}" target="_blank">🔗 Lien vers l'événement</a>` : ""}
          `;

        list.appendChild(container);
      });
    })
    .catch(err => {
      console.error("Erreur chargement événements:", err);
      document.getElementById('event-list').innerHTML = "<p>Erreur lors du chargement des événements.</p>";
    });
});

