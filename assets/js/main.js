/* Alana Maranhão · interações leves, sem dependências */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Cabeçalho: linha fina ao rolar + botão flutuante do WhatsApp */
  var header = document.querySelector(".site-header");
  var floatWa = document.querySelector(".float-wa");
  var onScroll = function () {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (floatWa) floatWa.classList.toggle("is-visible", y > window.innerHeight * 0.8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* Entradas suaves ao rolar */
  var revealEls = document.querySelectorAll(".reveal, .reveal-img");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Vídeos: carregam e tocam (mudos) só quando visíveis */
  var videos = Array.prototype.slice.call(document.querySelectorAll("video[data-autoplay]"));
  var userPaused = new WeakSet();
  var playSafe = function (v) {
    if (v.preload === "none") { v.preload = "metadata"; }
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  };
  if ("IntersectionObserver" in window && !reduceMotion) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
          if (!userPaused.has(v)) playSafe(v);
        } else if (!v.paused) { v.pause(); }
      });
    }, { threshold: [0, 0.45, 0.8] });
    videos.forEach(function (v) { v.muted = true; vio.observe(v); });
  }
  var syncBtn = function (v) {
    var btn = v.parentElement.querySelector(".reel__toggle");
    if (!btn) return;
    btn.setAttribute("aria-pressed", String(!v.paused));
    btn.setAttribute("aria-label", v.paused ? "Reproduzir vídeo" : "Pausar vídeo");
  };
  videos.forEach(function (v) {
    v.addEventListener("play", function () { syncBtn(v); });
    v.addEventListener("pause", function () { syncBtn(v); });
    var btn = v.parentElement.querySelector(".reel__toggle");
    if (btn) btn.addEventListener("click", function () {
      if (v.paused) { userPaused.delete(v); playSafe(v); } else { userPaused.add(v); v.pause(); }
    });
    syncBtn(v);
  });

  /* Carrosséis: setas rolam um cartão por vez */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".carousel__track");
    var prev = root.querySelector("[data-prev]");
    var next = root.querySelector("[data-next]");
    if (!track || !prev || !next) return;
    var step = function () {
      var card = track.querySelector(".reel");
      var gap = parseFloat(getComputedStyle(track).columnGap) || 24;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    };
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  /* Ano no rodapé */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
