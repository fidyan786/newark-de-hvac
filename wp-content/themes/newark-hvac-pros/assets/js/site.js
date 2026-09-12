(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var header = document.querySelector(".site-header");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.dataLayer) {
        window.dataLayer.push({ event: "phone_click" });
      }
    });
  });

  function updateScrollClass() {
    document.body.classList.toggle("has-scrolled", window.scrollY > 160);
  }
  updateScrollClass();
  window.addEventListener("scroll", updateScrollClass, { passive: true });
})();
