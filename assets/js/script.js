/* =========================================================
   ELITE GROUP CARPENTRY — script.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- CONFIG: ajuste aqui depois ---------- */
  var CONFIG = {
    // Para receber os formulários por e-mail sem servidor, crie uma conta gratis
    // em https://formspree.io , pegue o ID do form e cole abaixo (ex.: "xmyzabcd").
    // Enquanto estiver vazio, o formulario abre o app de e-mail do visitante (mailto).
    formspreeId: "",
    contactEmail: "elite.group.carpentry@gmail.com",
    phone: "+19787605784"
  };

  /* ---------- Ano no footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: sombra/encolhe no scroll + parallax do hero ---------- */
  var nav = document.getElementById("nav");
  var heroMedia = document.querySelector(".hero__media");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 20);
    if (heroMedia && !reduceMotion && y < 900) {
      heroMedia.style.transform = "translateY(" + (y * 0.22) + "px)";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById("navBurger");
  var menu = document.getElementById("navMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // dropdown no mobile
    var drop = menu.querySelector(".nav__dropdown");
    if (drop) {
      var toggle = drop.querySelector(".nav__dropToggle");
      toggle.addEventListener("click", function (e) {
        if (window.innerWidth <= 780) {
          e.preventDefault();
          drop.classList.toggle("open");
        }
      });
    }
    // fecha menu ao clicar num link
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (a.classList.contains("nav__dropToggle")) return;
        menu.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active link on scroll ---------- */
  var sections = ["home", "about", "services", "gallery", "reviews", "areas", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = menu ? menu.querySelectorAll('a[href^="#"]') : [];
  function setActive() {
    var pos = window.scrollY + 120;
    var current = "home";
    sections.forEach(function (s) {
      if (s.offsetTop <= pos) current = s.id;
    });
    navLinks.forEach(function (l) {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ---------- Carrossel Recent Projects ---------- */
  var track = document.getElementById("recentTrack");
  var prev = document.getElementById("recentPrev");
  var next = document.getElementById("recentNext");
  if (track && prev && next) {
    var step = function () {
      var first = track.querySelector("figure");
      return first ? first.getBoundingClientRect().width + 16 : 300;
    };
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
  }

  /* ---------- Reviews dinâmicos ---------- */
  var REVIEWS = [
    { n: "Sarah M.", c: "Hudson, MA", t: "The team built our gazebo in a single weekend. Clean, professional and exactly what we pictured. Highly recommend!" },
    { n: "James R.", c: "Framingham, MA", t: "Pergola turned out beautiful. They showed up on time, respected our property and the price was fair. Five stars." },
    { n: "Diana P.", c: "Worcester, MA", t: "Our kids love the new playset. Installation was fast and safe. Great communication from start to finish." },
    { n: "Michael T.", c: "Natick, MA", t: "Shed assembly was flawless. These guys really know carpentry. Will hire again for our deck project." },
    { n: "Laura K.", c: "Marlborough, MA", t: "From the free estimate to the final cleanup, everything was smooth. Quality workmanship you can see." },
    { n: "Anthony G.", c: "Boston, MA", t: "Fully insured, on time, and the craftsmanship is top notch. Couldn't be happier with our pergola." }
  ];
  var grid = document.getElementById("reviewsGrid");
  if (grid) {
    grid.innerHTML = REVIEWS.map(function (r) {
      var initials = r.n.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2);
      return '<article class="review">' +
        '<div class="review__stars" aria-label="5 out of 5 stars">★★★★★</div>' +
        '<p class="review__text">' + r.t + '</p>' +
        '<div class="review__who">' +
        '<span class="review__avatar" aria-hidden="true">' + initials + '</span>' +
        '<span><span class="review__name">' + r.n + '</span><br>' +
        '<span class="review__meta">' + r.c + ' · Google Review</span></span>' +
        '</div></article>';
    }).join("");
  }

  /* ---------- Upload de fotos (preview de nomes) ---------- */
  var fileInput = document.getElementById("photos");
  var uploadLabel = document.querySelector(".upload");
  var uploadList = document.getElementById("uploadList");
  function showFiles(files) {
    if (!uploadList) return;
    if (!files || !files.length) { uploadList.hidden = true; return; }
    var names = Array.prototype.map.call(files, function (f) { return f.name; });
    uploadList.textContent = "📎 " + names.length + " file(s): " + names.join(", ");
    uploadList.hidden = false;
  }
  if (fileInput) {
    fileInput.addEventListener("change", function () { showFiles(fileInput.files); });
  }
  if (uploadLabel) {
    ["dragenter", "dragover"].forEach(function (ev) {
      uploadLabel.addEventListener(ev, function (e) { e.preventDefault(); uploadLabel.classList.add("dragover"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      uploadLabel.addEventListener(ev, function (e) { e.preventDefault(); uploadLabel.classList.remove("dragover"); });
    });
    uploadLabel.addEventListener("drop", function (e) {
      if (e.dataTransfer && e.dataTransfer.files && fileInput) {
        fileInput.files = e.dataTransfer.files;
        showFiles(fileInput.files);
      }
    });
  }

  /* ---------- Formulário de orçamento ---------- */
  var form = document.getElementById("estimateForm");
  var status = document.getElementById("formStatus");

  function setStatus(msg, ok) {
    if (!status) return;
    status.textContent = msg;
    status.className = "estimate__status " + (ok ? "ok" : "err");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();

      if (!name || !email || !phone || !service) {
        setStatus("Please fill in your name, phone, email and service.", false);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("Please enter a valid email address.", false);
        return;
      }

      // Caminho 1: Formspree (se configurado) — envia de verdade, com fotos.
      if (CONFIG.formspreeId) {
        setStatus("Sending…", true);
        fetch("https://formspree.io/f/" + CONFIG.formspreeId, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        })
          .then(function (r) {
            if (r.ok) {
              form.reset();
              if (uploadList) uploadList.hidden = true;
              setStatus("✅ Thank you! We'll reply within 30 minutes.", true);
            } else {
              setStatus("Something went wrong. Please text us at (978) 760-5784.", false);
            }
          })
          .catch(function () {
            setStatus("Network error. Please text us at (978) 760-5784.", false);
          });
        return;
      }

      // Caminho 2 (padrão): abre o app de e-mail já preenchido.
      var subject = encodeURIComponent("Free Estimate Request — " + service);
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n" +
        "City: " + (data.get("city") || "") + "\n" +
        "Service: " + service + "\n" +
        "Details: " + (data.get("details") || "") + "\n\n" +
        "(Photos: please attach them in this email.)"
      );
      window.location.href = "mailto:" + CONFIG.contactEmail + "?subject=" + subject + "&body=" + body;
      setStatus("Opening your email app… If nothing happens, email us at " + CONFIG.contactEmail, true);
    });
  }

  /* ---------- Count-up das estatísticas ---------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var dur = 1600, start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Reveal on scroll (com stagger) ---------- */
  var revealTargets = document.querySelectorAll(
    ".card, .stat, .review, .trust__item, .why, .estimate, .framing, .g, .areasSec__list li"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        // stagger entre irmãos do mesmo grupo
        var siblings = Array.prototype.slice.call(el.parentNode.children);
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(idx, 6) * 80 + "ms";
        el.classList.add("in");
        // contadores
        var nums = el.querySelectorAll ? el.querySelectorAll("[data-count]") : [];
        nums.forEach(function (n) { if (!n.dataset.done) { n.dataset.done = "1"; countUp(n); } });
        io.unobserve(el);
      });
    }, { threshold: 0.14 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll("[data-count]").forEach(countUp);
  }
})();
