/**
 * ===========================================
 * PORTFÓLIO PROFISSIONAL - EDILSON MUTISSE
 * ===========================================
 * JavaScript otimizado para portfólio
 * Versão: 3.4 (validações visuais corrigidas)
 * Data: Junho 2024
 */

/** ==================== INICIALIZAÇÃO ==================== */
document.addEventListener("DOMContentLoaded", function () {
  // Seleção de elementos do DOM
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
    contactSubmitBtn: document.querySelector(
      '#contact-form button[type="submit"]'
    ),
  };

  /** ==================== FUNÇÕES DE VALIDAÇÃO ==================== */

  /**
   * Configura o prefixo automático para o telefone
   */
  function initPhonePrefix() {
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      // Adiciona classe para styling
      phoneInput.parentElement.classList.add("has-prefix");

      // Cria elemento do prefixo
      const prefix = document.createElement("span");
      prefix.className = "prefix";
      prefix.textContent = "+258";
      phoneInput.parentElement.appendChild(prefix);

      // Manipulação do input
      phoneInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, ""); // Remove não-números

        // Remove o prefixo 258 se o usuário digitar
        if (value.startsWith("258")) {
          value = value.substring(3);
        }

        // Limita a 9 dígitos (78 612 744)
        if (value.length > 9) {
          value = value.substring(0, 9);
        }

        // Formata o número (78 612 744)
        if (value.length > 0) {
          value = value.replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
        }

        e.target.value = value;

        // Valida em tempo real
        validatePhone(this);
      });

      // Validação ao sair do campo
      phoneInput.addEventListener("blur", function () {
        validatePhone(this);
      });
    }
  }

  /**
   * Validação do telefone
   */
  function validatePhone(input) {
    const value = input.value.replace(/\s/g, "");
    // Telefone é opcional, mas se preenchido deve ser válido
    const isValid = value === "" || /^[0-9]{9}$/.test(value);

    updateValidationState(
      input,
      isValid,
      "Telefone deve ter 9 dígitos (ex: 86 123 456)"
    );
    return isValid;
  }

  /**
   * Validação do nome
   */
  function validateName(input) {
    const value = input.value.trim();
    const isValid = value.length >= 2 && /^[a-zA-ZÀ-ÿ\s]{2,}$/.test(value);

    updateValidationState(
      input,
      isValid,
      "Nome deve ter pelo menos 2 caracteres (apenas letras)"
    );
    return isValid;
  }

  /**
   * Validação do email
   */
  function validateEmail(input) {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);

    updateValidationState(input, isValid, "Por favor, insira um email válido");
    return isValid;
  }

  /**
   * Validação do assunto
   */
  function validateSubject(input) {
    const value = input.value.trim();
    const isValid = value.length >= 5;

    updateValidationState(
      input,
      isValid,
      "Assunto deve ter pelo menos 5 caracteres"
    );
    return isValid;
  }

  /**
   * Validação da mensagem
   */
  function validateMessage(input) {
    const value = input.value.trim();
    const isValid = value.length >= 10;

    updateValidationState(
      input,
      isValid,
      "Mensagem deve ter pelo menos 10 caracteres"
    );
    return isValid;
  }

  /**
   * Atualiza o estado visual da validação
   */
  function updateValidationState(input, isValid, errorMessage) {
    const inputBox = input.parentElement;
    let errorElement = inputBox.querySelector(".error-message");

    // Remove estados anteriores
    inputBox.classList.remove("success", "error");

    if (input.value.trim() === "") {
      // Campo vazio - estado neutro
      if (errorElement) {
        errorElement.style.display = "none";
      }
      return;
    }

    if (isValid) {
      // Campo válido - VERDE
      inputBox.classList.add("success");
      if (errorElement) {
        errorElement.style.display = "none";
      }
    } else {
      // Campo inválido - VERMELHO
      inputBox.classList.add("error");

      // Cria ou atualiza mensagem de erro
      if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        inputBox.appendChild(errorElement);
      }
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
    }
  }

  /**
   * Configura validações em tempo real para todos os campos
   */
  function initFormValidations() {
    const inputs = {
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      subject: document.getElementById("subject"),
      message: document.getElementById("message"),
      phone: document.getElementById("phone"),
    };

    // Validação em tempo real para cada campo
    Object.keys(inputs).forEach((field) => {
      const input = inputs[field];
      if (input) {
        // Valida ao digitar (com delay para performance)
        let timeout;
        input.addEventListener("input", () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            switch (field) {
              case "name":
                validateName(input);
                break;
              case "email":
                validateEmail(input);
                break;
              case "subject":
                validateSubject(input);
                break;
              case "message":
                validateMessage(input);
                break;
              case "phone":
                validatePhone(input);
                break;
            }
          }, 500);
        });

        // Valida ao sair do campo
        input.addEventListener("blur", () => {
          switch (field) {
            case "name":
              validateName(input);
              break;
            case "email":
              validateEmail(input);
              break;
            case "subject":
              validateSubject(input);
              break;
            case "message":
              validateMessage(input);
              break;
            case "phone":
              validatePhone(input);
              break;
          }
        });
      }
    });
  }

  /**
   * Validação completa do formulário antes do envio
   */
  function validateForm() {
    const inputs = {
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      subject: document.getElementById("subject"),
      message: document.getElementById("message"),
      phone: document.getElementById("phone"),
    };

    let isValid = true;

    // Valida campos obrigatórios
    Object.keys(inputs).forEach((field) => {
      const input = inputs[field];
      if (input && field !== "phone") {
        // Telefone é opcional
        let fieldValid = false;

        switch (field) {
          case "name":
            fieldValid = validateName(input);
            break;
          case "email":
            fieldValid = validateEmail(input);
            break;
          case "subject":
            fieldValid = validateSubject(input);
            break;
          case "message":
            fieldValid = validateMessage(input);
            break;
        }

        if (!fieldValid) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  /** ==================== FUNÇÕES PRINCIPAIS ==================== */

  /**
   * Controla o menu mobile com acessibilidade aprimorada
   */
  function initMobileMenu() {
    const overlay = document.createElement("div");
    overlay.classList.add("navbar-overlay");
    document.body.appendChild(overlay);

    const toggleMenu = () => {
      const isExpanded =
        elements.menuIcon.getAttribute("aria-expanded") === "true";
      elements.menuIcon.setAttribute("aria-expanded", !isExpanded);
      elements.menuIcon.classList.toggle("fa-x");
      elements.navbar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = isExpanded ? "" : "hidden";

      // Atualiza o ícone
      if (elements.menuIcon.classList.contains("fa-x")) {
        elements.menuIcon.innerHTML = '<i class="fa-solid fa-x"></i>';
      } else {
        elements.menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    };

    // Event listeners
    elements.menuIcon.addEventListener("click", toggleMenu);

    // Fecha menu ao clicar no overlay
    overlay.addEventListener("click", toggleMenu);

    // Fecha menu ao clicar nos links
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

    // Fecha menu ao pressionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && elements.navbar.classList.contains("active")) {
        toggleMenu();
      }
    });
  }

  /**
   * Atualiza os links ativos durante o scroll com performance otimizada
   */
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
          const activeLink = document.querySelector(
            `header nav a[href*="${id}"]`
          );
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

  /**
   * Configura o comportamento da navbar durante o scroll
   */
  function initScrollBehavior() {
    // Efeito sticky header
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        elements.header.classList.toggle("sticky", !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (elements.sections[0]) {
      headerObserver.observe(elements.sections[0]);
    }

    // Scroll suave para links internos
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

    // Scroll para o topo
    if (elements.footerTopBtn) {
      elements.footerTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }

  /**
   * Configura o texto animado com Typed.js
   */
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

  /**
   * Configura as animações com ScrollReveal
   */
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

      // Animações personalizadas
      sr.reveal(".home-content, .section-title", {
        origin: "top",
        interval: 100,
      });

      sr.reveal(".home-img, .services-grid, .portfolio-grid, .contact-form", {
        origin: "bottom",
        interval: 150,
      });

      sr.reveal(".about-img, .skill-card:nth-child(odd)", {
        origin: "left",
      });

      sr.reveal(".about-content, .skill-card:nth-child(even)", {
        origin: "right",
      });
    }
  }

  /**
   * Configura o download do CV com feedback visual
   */
  function initCVDownload() {
    if (elements.cvDownloadBtn) {
      elements.cvDownloadBtn.addEventListener("click", function (e) {
        // Adiciona feedback visual
        const originalText = this.innerHTML;
        this.innerHTML =
          '<i class="fas fa-circle-notch fa-spin"></i> Preparando...';

        // Simula tempo de download (remover em produção)
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-check"></i> Download completo!';
          setTimeout(() => {
            this.innerHTML = originalText;
          }, 2000);
        }, 1500);
      });
    }
  }

  /**
   * Inicializa observadores de elementos
   */
  function initObservers() {
    // Observador para animações lazy
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

  /** ==================== INICIALIZAÇÃO DOS MÓDULOS ==================== */
  initMobileMenu();
  handleActiveLinks();
  initScrollBehavior();
  initTypedAnimation();
  initScrollAnimations();
  initCVDownload();
  initObservers();
  initPhonePrefix();
  initFormValidations();

  // Verificação de carregamento do Typed.js
  window.addEventListener("load", () => {
    if (!document.querySelector(".typed-cursor")) {
      initTypedAnimation();
    }
  });

  // Atualiza estado inicial
  elements.header.classList.toggle("sticky", window.scrollY > 100);
});

// Polyfill para requestAnimationFrame
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
    window.requestAnimationFrame = function (callback, element) {
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
