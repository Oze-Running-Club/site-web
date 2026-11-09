---
layout: default
---

Oze Running Club (ORC) est une association loi 1901, qui a pour objectif de promouvoir la pratique régulière et
encadrée de la course à pied (route, trail, renforcement musculaire) à
Blaisy-Bas et aux alentours, dans une atmosphère conviviale.

L'association est ouverte à toutes et à tous les adultes, quel que soit le niveau.

<div class="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/assets/img/pic1.jpeg" alt="Picture 1">
    </div>
    <div class="carousel-item">
      <img src="/assets/img/pic2.jpeg" alt="Picture 2">
    </div>
    <div class="carousel-item">
      <img src="/assets/img/pic3.jpeg" alt="Picture 3">
    </div>
    <div class="carousel-item">
      <img src="/assets/img/pic4.jpeg" alt="Picture 4">
    </div>
  </div>
  <button class="prev">‹</button>
  <button class="next">›</button>
</div>


# Actualités
<ul class="post-list">
{%- for post in site.posts limit:5 %}
  <li>
    <span class="post-meta">{{ post.date | date: "%d/%m/%Y" }}</span>
    <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
  </li>
{%- endfor %}
</ul>

# Prochains Événements
<ul id="event-list" class="event-list"></ul>
