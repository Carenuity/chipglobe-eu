(function () {
  if (window.__mobileNavInstalled) return;
  window.__mobileNavInstalled = true;

  const navbarSelector = '#navbar';
  const toggleSelector = '.mobile-nav-toggle';

  document.addEventListener('click', function (e) {
    const toggle = e.target.closest(toggleSelector);
    const navbar = document.querySelector(navbarSelector);
    if (!navbar) return;

    /* ===== TOGGLE CLICK ===== */
    if (toggle) {
      e.preventDefault();

      const open = navbar.classList.contains('navbar-mobile');

      // reset
      navbar.classList.remove('navbar-mobile');
      document.body.classList.remove('mobile-nav-active');
      toggle.classList.remove('bi-x');
      toggle.classList.add('bi-list');

      if (!open) {
        navbar.classList.add('navbar-mobile');
        document.body.classList.add('mobile-nav-active');
        toggle.classList.remove('bi-list');
        toggle.classList.add('bi-x');
      }
      return;
    }

    /* ===== DROPDOWNS ===== */
    const dropdownLink = e.target.closest('.dropdown > a');
    if (
      dropdownLink &&
      navbar.classList.contains('navbar-mobile')
    ) {
      e.preventDefault();
      dropdownLink.nextElementSibling?.classList.toggle('dropdown-active');
      return;
    }

    /* ===== OUTSIDE CLICK CLOSE ===== */
    if (
      navbar.classList.contains('navbar-mobile') &&
      !e.target.closest(navbarSelector)
    ) {
      navbar.classList.remove('navbar-mobile');
      document.body.classList.remove('mobile-nav-active');
      document
        .querySelector(toggleSelector)
        ?.classList.remove('bi-x');
      document
        .querySelector(toggleSelector)
        ?.classList.add('bi-list');
    }
  });

  /* ===== BACK/FORWARD FIX ===== */
  window.addEventListener('pageshow', () => {
    document.querySelector(navbarSelector)?.classList.remove('navbar-mobile');
    document.body.classList.remove('mobile-nav-active');
    document
      .querySelector(toggleSelector)
      ?.classList.remove('bi-x');
    document
      .querySelector(toggleSelector)
      ?.classList.add('bi-list');
  });
})();



// (function () {
//   const navbarSelector = '#navbar';
//   const toggleSelector = '.mobile-nav-toggle';

//   function openNav(toggle, navbar) {
//     navbar.classList.add('navbar-mobile');
//     toggle.classList.remove('bi-list');
//     toggle.classList.add('bi-x');
//     document.body.classList.add('mobile-nav-active');
//   }

//   function closeNav(toggle, navbar) {
//     navbar.classList.remove('navbar-mobile');
//     toggle.classList.remove('bi-x');
//     toggle.classList.add('bi-list');
//     document.body.classList.remove('mobile-nav-active');
//   }

//   // ✅ SINGLE delegated toggle handler
  
//   if (!window.__mobileNavClickBound) {
//   window.__mobileNavClickBound = true;

//   document.addEventListener('click', function (e) {
//     const toggle = e.target.closest('.mobile-nav-toggle');
//     if (!toggle) return;

//     e.preventDefault();

//     const navbar = document.querySelector('#navbar');
//     if (!navbar) return;

//     const open = navbar.classList.contains('navbar-mobile');

//     navbar.classList.remove('navbar-mobile');
//     document.body.classList.remove('mobile-nav-active');
//     toggle.classList.remove('bi-x');
//     toggle.classList.add('bi-list');

//     if (!open) {
//       navbar.classList.add('navbar-mobile');
//       document.body.classList.add('mobile-nav-active');
//       toggle.classList.remove('bi-list');
//       toggle.classList.add('bi-x');
//     }
//   });
// }
  
//   // Keep a reference to the handler

//   // ===============================
// // MOBILE NAV — SINGLE SOURCE
// // ===============================

// if (!window.__mobileNavInitialized) {
//   window.__mobileNavInitialized = true;

//   function mobileNavHandler(e) {
//     const toggle = e.target.closest('.mobile-nav-toggle');
//     if (!toggle) return;

//     e.preventDefault();

//     const navbar = document.querySelector('#navbar');
//     if (!navbar) return;

//     const isOpen = navbar.classList.contains('navbar-mobile');

//     // normalize state
//     navbar.classList.remove('navbar-mobile');
//     document.body.classList.remove('mobile-nav-active');
//     toggle.classList.remove('bi-x');
//     toggle.classList.add('bi-list');

//     if (!isOpen) {
//       navbar.classList.add('navbar-mobile');
//       document.body.classList.add('mobile-nav-active');
//       toggle.classList.remove('bi-list');
//       toggle.classList.add('bi-x');
//     }
//   }

//   document.addEventListener('click', mobileNavHandler, { passive: false });
// }

  
// //   document.addEventListener('click', function (e) {
// //   const toggle = e.target.closest('.mobile-nav-toggle');
// //   if (!toggle) return;

// //   e.preventDefault(); // 🔥 REQUIRED FOR INDEX

// //   const navbar = document.querySelector('#navbar');
// //   if (!navbar) return;

// //   navbar.classList.toggle('navbar-mobile');

// //   toggle.classList.toggle('bi-list');
// //   toggle.classList.toggle('bi-x');
// // a
// //   document.body.classList.toggle(
// //     'mobile-nav-active',
// //     navbar.classList.contains('navbar-mobile')
// //   );
// // });

// window.addEventListener('pageshow', function () {
//   document.querySelector('#navbar')?.classList.remove('navbar-mobile');
//   document.querySelector('.mobile-nav-toggle')?.classList.remove('bi-x');
//   document.querySelector('.mobile-nav-toggle')?.classList.add('bi-list');
//   document.body.classList.remove('mobile-nav-active');
// });



//   // ✅ Outside click close
//   document.addEventListener('click', function (e) {
//     const navbar = document.querySelector(navbarSelector);
//     if (!navbar || !navbar.classList.contains('navbar-mobile')) return;

//     if (
//       e.target.closest(toggleSelector) ||
//       e.target.closest(navbarSelector)
//     ) {
//       return;
//     }

//     closeNav(
//       document.querySelector(toggleSelector),
//       navbar
//     );
//   });

//   // ✅ Mobile dropdowns
//   document.addEventListener('click', function (e) {
//     const navbar = document.querySelector(navbarSelector);
//     const link = e.target.closest('.dropdown > a');

//     if (!navbar || !link) return;
//     if (!navbar.classList.contains('navbar-mobile')) return;

//     e.preventDefault();
//     link.nextElementSibling?.classList.toggle('dropdown-active');
//   });

// })();

// // ===============================
// // Mobile navbar async init (INDEX FIX)
// // ===============================
// document.addEventListener("DOMContentLoaded", () => {
//   const observer = new MutationObserver(() => {
//     const toggle = document.querySelector(".mobile-nav-toggle");
//     if (toggle) {
//       initToggle(toggle);
//       observer.disconnect(); // run once
//     }
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });
// });




