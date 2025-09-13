---
layout: home
---

Association de course à pied. L'adhésion est ouverte à toutes et à tous les adultes, quel que soit le niveau.

# Prochains Événements

<ul id="event-list" class="event-list"></ul>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    fetch('{{ "/assets/events.json" | relative_url }}')
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
</script>


# Activités du Club

Nous proposons 3 séances par semaine.

## Mardi 18h30/19h30

Les séances du mardi sont centrées sur le **travail de la vitesse et du fractionné**.  
Elles ont lieu généralement en fin de journée, autour de 18h30, et durent environ une heure.

Ces entraînements suivent une structure typique :

- 15 à 20 minutes d’échauffement (footing + mobilité)
- une série d’exercices de fractionné (intervalles courts ou longs)
- retour au calme (footing lent + étirements)

Ils s’adressent aux coureuses et coureurs souhaitant améliorer leur **vitesse**,
leur **capacité anaérobie**, et leur **gestion de l’effort** sur des distances
courtes ou intermédiaires.

Ces séances peuvent être exigeantes, mais sont adaptées à tous les niveaux :
chacun·e peut ajuster les répétitions ou les allures selon ses capacités.


## Jeudi 18h30/19h30

Les Ateliers du Jeudi sont des séances techniques pour s'améliorer dans sa
pratique de la course à pied.

Ils durent en moyenne une heure et suivent la même structure:

- 10 à 15 minutes d'échauffement 
- corps de la séance
- debrief


## Sorties du Dimanche

Les sorties du dimanche sont des **sorties longues**, souvent en nature ou sur
sentiers (trail).  Elles permettent de travailler l’endurance, la régularité, et
de prendre du plaisir à courir en groupe.

Elles se déroulent le matin, autour de 10h, et durent entre **1h15 et 3h** selon
les parcours.

Le format est volontairement **souple** et **convivial** :

- allure tranquille permettant de discuter
- pauses si besoin pour regrouper ou admirer le paysage
- parfois des variantes : sortie en côte, avec bâtons, rando-course, etc.

C’est une excellente séance pour développer sa **base aérobie** tout en
profitant de la nature et de l’énergie du groupe.

