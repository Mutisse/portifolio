/**============================ CONSTANTES E VARIÁVEIS ========================== */
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");
const header = document.querySelector("header");

/**============================ TOGGLE MENU MOBILE ========================== */
const toggleMenu = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

menuIcon.addEventListener("click", toggleMenu);

/**============================ FECHAR MENU AO CLICAR EM LINKS ========================== */
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuIcon.classList.remove("fa-xmark");
  });
});

/**============================ SCROLL SECTIONS ACTIVE LINK ========================== */
const updateActiveLinks = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((sec) => {
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
};

/**============================ STICKY NAVBAR ========================== */
const handleScroll = () => {
  header.classList.toggle("sticky", window.scrollY > 100);
  updateActiveLinks();
};

/**============================ SCROLL REVEAL ========================== */
const sr = ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
  reset: true,
});

sr.reveal(".home-content, .heading", { origin: "top" });
sr.reveal(".home-img, .services-container, .portfolio-box, .contact form", {
  origin: "bottom",
  interval: 200,
});
sr.reveal(".home-contact h1, .about-img", { origin: "left" });
sr.reveal(".home-contact p, .about-content", { origin: "right" });

/**============================ TYPED JS ========================== */
const typed = new Typed(".multiple-text", {
  strings: [
    "Criador de soluções digitais que transformam ideias em realidade.",
    "Entusiasta de design que busca inovar a experiência do usuário.",
    "Desenvolvedor Full-stack",
    "Especialista em React Native",
  ],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

/**============================ FORMULÁRIO DE CONTATO ========================== */
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const spinner = document.getElementById("spinner");
  const formStatus = document.getElementById("formStatus");

  // Estado de carregamento
  btnText.textContent = "Enviando...";
  spinner.style.display = "block";
  submitBtn.disabled = true;
  formStatus.style.display = "none";

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/edilsonmutisse007@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          subject: document.getElementById("subject").value,
          message: document.getElementById("message").value,
          _captcha: "false",
          _template: "table",
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      formStatus.textContent =
        "Mensagem enviada com sucesso! Retornarei em breve.";
      formStatus.className = "form-status success";
      document.getElementById("contactForm").reset();
    } else {
      throw new Error(data.message || "Erro no envio");
    }
  } catch (error) {
    formStatus.textContent =
      "Erro ao enviar mensagem. Tente novamente mais tarde.";
    formStatus.className = "form-status error";
    console.error("Erro:", error);
  } finally {
    btnText.textContent = "Enviar mensagem";
    spinner.style.display = "none";
    submitBtn.disabled = false;
    formStatus.style.display = "block";
  }
});

/**============================ EVENTO DE SCROLL OTIMIZADO ========================== */
let isScrolling;
window.addEventListener("scroll", () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    handleScroll();
    navbar.classList.remove("active");
    menuIcon.classList.remove("fa-xmark");
  }, 100);
});

/**============================ SCROLL SUAVE PARA O TOPO ========================== */
document.querySelector(".footer-icontop a").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
