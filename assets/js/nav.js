document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navbar = document.querySelector("#navbar");

  // ✅ Handle mobile menu toggle (hamburger button)
  if (mobileToggle && navbar) {
    mobileToggle.addEventListener("click", function () {
      navbar.classList.toggle("navbar-mobile");
      mobileToggle.classList.toggle("bi-list");
      mobileToggle.classList.toggle("bi-x");
    });
  }

  // ✅ Handle dropdown menu toggle on mobile
  document.querySelectorAll(".navbar .dropdown > a").forEach(el => {
    el.addEventListener("click", function (e) {
      if (navbar.classList.contains("navbar-mobile")) {
        e.preventDefault(); // Prevent link from navigating
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    });
  });
}); 

