/**
 * ============================
 * PORTFÓLIO EDILSON MUTISSE
 * ============================
 * JavaScript otimizado para o portfólio
 * Versão: 2.0
 * Data: 2024
 */

/** ==================== CONSTANTES ==================== */
const DOM = {
  menuIcon: document.querySelector("#menu-icon"),
  navbar: document.querySelector(".navbar"),
  navLinks: document.querySelectorAll(".navbar a"),
  sections: document.querySelectorAll("section"),
  header: document.querySelector("header"),
  footerTopBtn: document.querySelector(".footer-icontop a"),
  cvDownloadBtn: document.querySelector("#cv-download-btn"),
  typedElement: document.querySelector(".multiple-text"),
};

/** ==================== FUNÇÕES PRINCIPAIS ==================== */

/**
 * Controla o menu mobile
 */
function setupMobileMenu() {
  const toggleMenu = () => {
    DOM.menuIcon.classList.toggle("fa-xmark");
    DOM.navbar.classList.toggle("active");
  };

  DOM.menuIcon.addEventListener("click", toggleMenu);

  DOM.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      DOM.navbar.classList.remove("active");
      DOM.menuIcon.classList.remove("fa-xmark");
    });
  });
}

/**
 * Atualiza os links ativos durante o scroll
 */
function updateActiveLinks() {
  const scrollY = window.pageYOffset;

  DOM.sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollY >= offset && scrollY < offset + height) {
      document
        .querySelector(`header nav a[href*="${id}"]`)
        .classList.add("active");
    } else {
      document
        .querySelector(`header nav a[href*="${id}"]`)
        .classList.remove("active");
    }
  });
}

/**
 * Configura o comportamento da navbar durante o scroll
 */
function setupScrollBehavior() {
  const handleScroll = () => {
    DOM.header.classList.toggle("sticky", window.scrollY > 100);
    updateActiveLinks();
  };

  let isScrolling;
  window.addEventListener("scroll", () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      handleScroll();
      DOM.navbar.classList.remove("active");
      DOM.menuIcon.classList.remove("fa-xmark");
    }, 100);
  });

  // Scroll suave para o topo
  DOM.footerTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * Configura o texto animado com Typed.js
 */
function setupTypedAnimation() {
  if (DOM.typedElement) {
    new Typed(DOM.typedElement, {
      strings: ["Full-stack", "Front-end", "Back-end", "Mobile"],
      typeSpeed: 70,
      backSpeed: 70,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
  }
}

/**
 * Configura as animações com ScrollReveal
 */
function setupScrollAnimations() {
  ScrollReveal({
    distance: "80px",
    duration: 2000,
    delay: 200,
    reset: true,
  })
    .reveal(".home-content, .heading", { origin: "top" })
    .reveal(".home-img, .services-container, .portfolio-box, .contact form", {
      origin: "bottom",
      interval: 200,
    })
    .reveal(".home-contact h1, .about-img", { origin: "left" })
    .reveal(".home-contact p, .about-content", { origin: "right" });
}

/**
 * Configura o download do CV com fallback
 */
function setupCVDownload() {
  if (DOM.cvDownloadBtn) {
    DOM.cvDownloadBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Tenta o download normal
      const link = document.createElement("a");
      link.href = this.href;
      link.download = "Edilson_Mutisse_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Fallback após 3 segundos
      setTimeout(() => {
        if (!sessionStorage.getItem("cvDownloaded")) {
          const shouldOpen = confirm(
            "Download não iniciado. Deseja abrir em nova aba?"
          );
          if (shouldOpen) {
            window.open(this.href, "_blank");
          }
        }
      }, 3000);

      sessionStorage.setItem("cvDownloaded", "true");
      setTimeout(() => sessionStorage.removeItem("cvDownloaded"), 10000);
    });
  }
}

/** ==================== INICIALIZAÇÃO ==================== */
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupScrollBehavior();
  setupTypedAnimation();
  setupScrollAnimations();
  setupCVDownload();

  // Ativa o estado inicial
  updateActiveLinks();
  DOM.header.classList.toggle("sticky", window.scrollY > 100);
});
