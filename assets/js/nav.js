


  function initToggle(toggleEl) {
    const navbar = document.querySelector('#navbar');
    if (!toggleEl || !navbar) return;

    function openNav() {
      navbar.classList.add('navbar-mobile');
      toggleEl.classList.remove('bi-list');
      toggleEl.classList.add('bi-x');
    }

    function closeNav() {
      navbar.classList.remove('navbar-mobile');
      toggleEl.classList.remove('bi-x');
      toggleEl.classList.add('bi-list');
    }

    function toggleNav(e) {
      // stop other click handlers interfering
      e.stopPropagation();
      if (navbar.classList.contains('navbar-mobile')) {
        closeNav();
      } else {
        openNav();
      }
    }

    // attach listener if not already attached
    if (!toggleEl.dataset.listenerAttached) {
      toggleEl.addEventListener('click', toggleNav);
      toggleEl.dataset.listenerAttached = 'true';
    }

    // close when clicking outside the mobile nav
    document.addEventListener('click', function (evt) {
      if (!navbar.classList.contains('navbar-mobile')) return;
      // if click target is the toggle or inside navbar, ignore
      if (toggleEl.contains(evt.target) || navbar.contains(evt.target)) return;
      closeNav();
    });

    // dropdown handlers inside mobile nav
    document.querySelectorAll('.navbar .dropdown > a').forEach(el => {
      el.addEventListener('click', function (e) {
        if (navbar.classList.contains('navbar-mobile')) {
          e.preventDefault();
          this.nextElementSibling.classList.toggle('dropdown-active');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.mobile-nav-toggle');

    // normal init
    initToggle(toggle);

    // fallback: if the toggle gets replaced dynamically later, delegate to document
    document.addEventListener('click', function (e) {
      const t = e.target.closest && e.target.closest('.mobile-nav-toggle');
      if (t) {
        // ensure init runs if needed
        initToggle(t);
        // trigger the click handler we just ensured exists
        // (the handler will run via the click the browser already processed)
      }
    });
  });

  // ===============================
// Language switch (EN / DE)
// ===============================

function setActiveLang(lang) {
  document.getElementById("lang-en")?.classList.remove("active");
  document.getElementById("lang-de")?.classList.remove("active");

  const active = document.getElementById("lang-" + lang);
  if (active) {
    active.classList.add("active");
  }
}

function changeLanguage(lang) {
  if (!window.i18next) return;

  i18next.changeLanguage(lang);
  localStorage.setItem("selectedLanguage", lang);
  setActiveLang(lang);
}

// expose to inline HTML onclick
window.changeLanguage = changeLanguage;
window.setActiveLang = setActiveLang;

// set highlight on initial load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  setActiveLang(savedLang);
});

