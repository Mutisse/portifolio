/**
 * ===========================================
 * PORTFÓLIO PROFISSIONAL - EDILSON MUTISSE
 * ===========================================
 * JavaScript otimizado para portfólio
 * Versão: 3.2 (corrigido envio de email via FormSubmit)
 * Data: Agosto 2025
 */

document.addEventListener("DOMContentLoaded", function () {
  const elements = {
    menuIcon: document.getElementById("menu-icon"),
    navbar: document.querySelector(".navbar"),
    navLinks: document.querySelectorAll(".navbar a"),
    sections: document.querySelectorAll("section"),
    header: document.querySelector("header"),
    footerTopBtn: document.querySelector(".footer-icontop a"),
    cvDownloadBtn: document.querySelector(".btn[download]"),
    typedElement: document.querySelector(".multiple-text"),
    contactForm: document.getElementById("contact-form"),
    contactSubmitBtn: document.querySelector('#contact-form button[type="submit"]'),
  };

  function initMobileMenu() {
    const overlay = document.createElement("div");
    overlay.classList.add("navbar-overlay");
    document.body.appendChild(overlay);

    const toggleMenu = () => {
      const isExpanded = elements.menuIcon.getAttribute("aria-expanded") === "true";
      elements.menuIcon.setAttribute("aria-expanded", !isExpanded);
      elements.menuIcon.classList.toggle("fa-x");
      elements.navbar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = isExpanded ? "" : "hidden";

      elements.menuIcon.innerHTML = elements.menuIcon.classList.contains("fa-x")
        ? '<i class="fa-solid fa-x"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    };

    elements.menuIcon.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);

    elements.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        elements.navbar.classList.remove("active");
        elements.menuIcon.classList.remove("fa-x");
        elements.menuIcon.setAttribute("aria-expanded", "false");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        elements.menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && elements.navbar.classList.contains("active")) {
        toggleMenu();
      }
    });
  }

  function handleActiveLinks() {
    let lastScrollPosition = window.scrollY;
    let ticking = false;

    const update = () => {
      const scrollPosition = lastScrollPosition;
      elements.sections.forEach((sec) => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (scrollPosition >= offset && scrollPosition < offset + height) {
          elements.navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
          if (activeLink) activeLink.classList.add("active");
        }
      });
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      lastScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    });
  }

  function initScrollBehavior() {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        elements.header.classList.toggle("sticky", !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (elements.sections[0]) headerObserver.observe(elements.sections[0]);

    elements.navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: "smooth",
            });
          }
        }
      });
    });

    if (elements.footerTopBtn) {
      elements.footerTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  function initTypedAnimation() {
    if (elements.typedElement && typeof Typed !== "undefined") {
      try {
        new Typed(elements.typedElement, {
          strings: ["Full-stack", "Front-end", "Back-end", "Mobile"],
          typeSpeed: 100,
          backSpeed: 80,
          backDelay: 1500,
          loop: true,
          showCursor: true,
          cursorChar: "|",
          smartBackspace: true,
          contentType: "html",
        });
      } catch (error) {
        console.error("Erro ao inicializar Typed.js:", error);
      }
    }
  }

  function initScrollAnimations() {
    if (typeof ScrollReveal !== "undefined") {
      const sr = ScrollReveal({
        distance: "40px",
        duration: 1200,
        delay: 200,
        reset: false,
        mobile: true,
        viewFactor: 0.2,
      });
      sr.reveal(".home-content, .section-title", { origin: "top", interval: 100 });
      sr.reveal(".home-img, .services-grid, .portfolio-grid, .contact-form", { origin: "bottom", interval: 150 });
      sr.reveal(".about-img, .skill-card:nth-child(odd)", { origin: "left" });
      sr.reveal(".about-content, .skill-card:nth-child(even)", { origin: "right" });
    }
  }

  function initCVDownload() {
    if (elements.cvDownloadBtn) {
      elements.cvDownloadBtn.addEventListener("click", function () {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Preparando...';
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-check"></i> Download completo!';
          setTimeout(() => { this.innerHTML = originalText; }, 2000);
        }, 1500);
      });
    }
  }

  function initContactForm() {
    if (elements.contactForm) {
      elements.contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[name="email"]');
        const messageInput = this.querySelector('textarea[name="message"]');
        let isValid = true;

        this.querySelectorAll(".error").forEach((el) => el.remove());

        if (!nameInput.value.trim()) { showError(nameInput, "Por favor, insira seu nome"); isValid = false; }
        if (!validateEmail(emailInput.value.trim())) { showError(emailInput, "Por favor, insira um email válido"); isValid = false; }
        if (!messageInput.value.trim()) { showError(messageInput, "Por favor, escreva sua mensagem"); isValid = false; }

        if (isValid) {
          const originalBtnText = elements.contactSubmitBtn.innerHTML;
          elements.contactSubmitBtn.disabled = true;
          elements.contactSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

          const formData = new FormData(this);
          fetch(this.action, { method: "POST", body: formData })
            .then(() => {
              elements.contactSubmitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
              this.reset();
              setTimeout(() => {
                elements.contactSubmitBtn.innerHTML = originalBtnText;
                elements.contactSubmitBtn.disabled = false;
              }, 2000);
            })
            .catch(() => {
              elements.contactSubmitBtn.innerHTML = 'Erro ao enviar';
              setTimeout(() => {
                elements.contactSubmitBtn.innerHTML = originalBtnText;
                elements.contactSubmitBtn.disabled = false;
              }, 2000);
            });
        }
      });
    }

    function showError(input, message) {
      const errorElement = document.createElement("small");
      errorElement.className = "error";
      errorElement.style.color = "#ff4d4d";
      errorElement.style.display = "block";
      errorElement.style.marginTop = "5px";
      errorElement.textContent = message;
      input.insertAdjacentElement("afterend", errorElement);
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  }

  function initObservers() {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            animationObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      animationObserver.observe(el);
    });
  }

  function initTooltips() {
    const tooltipElements = document.querySelectorAll("[data-tooltip]");
    tooltipElements.forEach((el) => {
      el.addEventListener("mouseenter", showTooltip);
      el.addEventListener("mouseleave", hideTooltip);
    });

    function showTooltip() {
      const tooltipText = this.getAttribute("data-tooltip");
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = tooltipText;
      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }
    function hideTooltip() {
      const tooltip = document.querySelector(".tooltip");
      if (tooltip) tooltip.remove();
    }
  }

  initMobileMenu();
  handleActiveLinks();
  initScrollBehavior();
  initTypedAnimation();
  initScrollAnimations();
  initCVDownload();
  initContactForm();
  initObservers();
  initTooltips();

  window.addEventListener("load", () => {
    if (!document.querySelector(".typed-cursor")) {
      initTypedAnimation();
    }
  });

  elements.header.classList.toggle("sticky", window.scrollY > 100);
});

(function () {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
})();
