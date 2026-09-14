/* BEKES — shared behaviour */
document.addEventListener('DOMContentLoaded', function () {
  /* Mobile nav */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
    });
    header.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('nav-open'); });
    });
  }

  /* Reveal on scroll */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Highlight today's row in hours tables */
  var today = new Date().getDay(); // 0 Sun … 6 Sat
  var idx = (today + 6) % 7;       // 0 = Monday … 6 = Sunday
  document.querySelectorAll('.hours-table tr[data-day]').forEach(function (tr) {
    if (parseInt(tr.getAttribute('data-day'), 10) === idx) tr.classList.add('today');
  });

  /* Contact form (front-end only) */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.reset();
      var msg = document.getElementById('form-success');
      if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
