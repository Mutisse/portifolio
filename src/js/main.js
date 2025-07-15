/**
 * ===========================================
 * PORTFÓLIO PROFISSIONAL - EDILSON MUTISSE
 * ===========================================
 * JavaScript otimizado para portfólio
 * Versão: 3.0
 * Data: Junho 2024
 */

/** ==================== INICIALIZAÇÃO ==================== */
document.addEventListener('DOMContentLoaded', function() {
  // Seleção de elementos do DOM
  const elements = {
    menuIcon: document.getElementById('menu-icon'),
    navbar: document.querySelector('.navbar'),
    navLinks: document.querySelectorAll('.navbar a'),
    sections: document.querySelectorAll('section'),
    header: document.querySelector('header'),
    footerTopBtn: document.querySelector('.footer-icontop a'),
    cvDownloadBtn: document.querySelector('.btn[download]'),
    typedElement: document.querySelector('.multiple-text'),
    contactForm: document.getElementById('contact-form'),
    contactSubmitBtn: document.querySelector('#contact-form button[type="submit"]')
  };

  /** ==================== FUNÇÕES PRINCIPAIS ==================== */

  /**
   * Controla o menu mobile com acessibilidade aprimorada
   */
  function initMobileMenu() {
    const toggleMenu = () => {
      const isExpanded = elements.menuIcon.getAttribute('aria-expanded') === 'true';
      elements.menuIcon.setAttribute('aria-expanded', !isExpanded);
      elements.menuIcon.classList.toggle('fa-x');
      elements.navbar.classList.toggle('active');
      
      // Bloqueia/libera scroll do body quando menu está aberto
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    };

    // Event listeners
    elements.menuIcon.addEventListener('click', toggleMenu);
    
    // Fecha menu ao clicar nos links
    elements.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        elements.navbar.classList.remove('active');
        elements.menuIcon.classList.remove('fa-x');
        elements.menuIcon.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Fecha menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.navbar.classList.contains('active')) {
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
      
      elements.sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPosition >= offset && scrollPosition < offset + height) {
          elements.navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
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
        elements.header.classList.toggle('sticky', !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (elements.sections[0]) {
      headerObserver.observe(elements.sections[0]);
    }

    // Scroll suave para links internos
    elements.navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Scroll para o topo
    if (elements.footerTopBtn) {
      elements.footerTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  /**
   * Configura o texto animado com Typed.js
   */
  function initTypedAnimation() {
    if (elements.typedElement && typeof Typed !== 'undefined') {
      try {
        new Typed(elements.typedElement, {
          strings: ['Full-stack', 'Front-end', 'Back-end', 'Mobile'],
          typeSpeed: 100,
          backSpeed: 80,
          backDelay: 1500,
          loop: true,
          showCursor: true,
          cursorChar: '|',
          smartBackspace: true,
          contentType: 'html'
        });
      } catch (error) {
        console.error('Erro ao inicializar Typed.js:', error);
      }
    }
  }

  /**
   * Configura as animações com ScrollReveal
   */
  function initScrollAnimations() {
    if (typeof ScrollReveal !== 'undefined') {
      const sr = ScrollReveal({
        distance: '40px',
        duration: 1200,
        delay: 200,
        reset: false,
        mobile: true,
        viewFactor: 0.2
      });

      // Animações personalizadas
      sr.reveal('.home-content, .section-title', { 
        origin: 'top', 
        interval: 100 
      });
      
      sr.reveal('.home-img, .services-grid, .portfolio-grid, .contact-form', { 
        origin: 'bottom',
        interval: 150
      });
      
      sr.reveal('.about-img, .skill-card:nth-child(odd)', { 
        origin: 'left' 
      });
      
      sr.reveal('.about-content, .skill-card:nth-child(even)', { 
        origin: 'right' 
      });
    }
  }

  /**
   * Configura o download do CV com feedback visual
   */
  function initCVDownload() {
    if (elements.cvDownloadBtn) {
      elements.cvDownloadBtn.addEventListener('click', function(e) {
        // Adiciona feedback visual
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Preparando...';
        
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
   * Configura o formulário de contato com validação
   */
  function initContactForm() {
    if (elements.contactForm) {
      elements.contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[name="email"]');
        const messageInput = this.querySelector('textarea[name="message"]');
        let isValid = true;
        
        // Reset de erros
        this.querySelectorAll('.error').forEach(el => el.remove());
        
        // Validação do nome
        if (!nameInput.value.trim()) {
          showError(nameInput, 'Por favor, insira seu nome');
          isValid = false;
        }
        
        // Validação de email
        if (!validateEmail(emailInput.value.trim())) {
          showError(emailInput, 'Por favor, insira um email válido');
          isValid = false;
        }
        
        // Validação da mensagem
        if (!messageInput.value.trim()) {
          showError(messageInput, 'Por favor, escreva sua mensagem');
          isValid = false;
        }
        
        if (isValid) {
          const originalBtnText = elements.contactSubmitBtn.innerHTML;
          elements.contactSubmitBtn.disabled = true;
          elements.contactSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
          
          // Simula envio (substituir por fetch/axios em produção)
          setTimeout(() => {
            elements.contactSubmitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            this.reset();
            
            setTimeout(() => {
              elements.contactSubmitBtn.innerHTML = originalBtnText;
              elements.contactSubmitBtn.disabled = false;
            }, 2000);
          }, 2000);
        }
      });
    }
    
    // Função auxiliar para mostrar erros
    function showError(input, message) {
      const errorElement = document.createElement('small');
      errorElement.className = 'error';
      errorElement.style.color = '#ff4d4d';
      errorElement.style.display = 'block';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = message;
      input.insertAdjacentElement('afterend', errorElement);
      input.focus();
    }
    
    // Validação de email simples
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  }

  /**
   * Inicializa observadores de elementos
   */
  function initObservers() {
    // Observador para animações lazy
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          animationObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      animationObserver.observe(el);
    });
  }

  /**
   * Inicializa tooltips
   */
  function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
      el.addEventListener('mouseenter', showTooltip);
      el.addEventListener('mouseleave', hideTooltip);
    });
    
    function showTooltip(e) {
      const tooltipText = this.getAttribute('data-tooltip');
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }
    
    function hideTooltip() {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) tooltip.remove();
    }
  }

  /** ==================== INICIALIZAÇÃO DOS MÓDULOS ==================== */
  initMobileMenu();
  handleActiveLinks();
  initScrollBehavior();
  initTypedAnimation();
  initScrollAnimations();
  initCVDownload();
  initContactForm();
  initObservers();
  initTooltips();

  // Verificação de carregamento do Typed.js
  window.addEventListener('load', () => {
    if (!document.querySelector('.typed-cursor') {
      initTypedAnimation();
    }
  });

  // Atualiza estado inicial
  elements.header.classList.toggle('sticky', window.scrollY > 100);
});

// Polyfill para requestAnimationFrame
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());