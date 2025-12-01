// document.addEventListener("DOMContentLoaded", function () {
//   const mobileToggle = document.querySelector(".mobile-nav-toggle");
//   const navbar = document.querySelector("#navbar");

//   // ✅ Handle mobile menu toggle (hamburger button)
//   if (mobileToggle && navbar) {
//     mobileToggle.addEventListener("click", function () {
//       navbar.classList.toggle("navbar-mobile");
//       mobileToggle.classList.toggle("bi-list");
//       mobileToggle.classList.toggle("bi-x");
//     });
//   }

//   // ✅ Handle dropdown menu toggle on mobile
//   document.querySelectorAll(".navbar .dropdown > a").forEach(el => {
//     el.addEventListener("click", function (e) {
//       if (navbar.classList.contains("navbar-mobile")) {
//         e.preventDefault(); // Prevent link from navigating
//         this.nextElementSibling.classList.toggle("dropdown-active");
//       }
//     });
//   });
// }); 


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

