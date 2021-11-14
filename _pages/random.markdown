---
layout: single
permalink: /random/
classes: wide
title: About
---


<p>Posts in category "basic" are:</p>

<ul>
  {% for post in site.categories.rant %}
    {% if post.url %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>