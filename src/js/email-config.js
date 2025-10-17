/**
 * ===========================================
 * CONFIGURAÇÃO DO EMAILJS
 * ===========================================
 * Configuração para formulário de contato
 * Versão: 1.2 (validações visuais corrigidas)
 * Data: Junho 2024
 */

// Inicializa EmailJS - SUBSTITUA com suas credenciais
(function() {
  emailjs.init("sua_public_key_aqui"); // Sua Public Key do EmailJS
})();

// Configuração do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  // Funções de validação 
  function validateName(input) {
    const value = input.value.trim();
    const isValid = value.length >= 2 && /^[a-zA-ZÀ-ÿ\s]{2,}$/.test(value);
    updateValidationState(input, isValid, 'Nome deve ter pelo menos 2 caracteres (apenas letras)');
    return isValid;
  }

  function validateEmail(input) {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    updateValidationState(input, isValid, 'Por favor, insira um email válido');
    return isValid;
  }

  function validateSubject(input) {
    const value = input.value.trim();
    const isValid = value.length >= 5;
    updateValidationState(input, isValid, 'Assunto deve ter pelo menos 5 caracteres');
    return isValid;
  }

  function validateMessage(input) {
    const value = input.value.trim();
    const isValid = value.length >= 10;
    updateValidationState(input, isValid, 'Mensagem deve ter pelo menos 10 caracteres');
    return isValid;
  }

  function validatePhone(input) {
    const value = input.value.replace(/\s/g, '');
    const isValid = value === '' || /^[0-9]{9}$/.test(value);
    updateValidationState(input, isValid, 'Telefone deve ter 9 dígitos (ex: 86 123 456)');
    return isValid;
  }

  function updateValidationState(input, isValid, errorMessage) {
    const inputBox = input.parentElement;
    let errorElement = inputBox.querySelector('.error-message');

    inputBox.classList.remove('success', 'error');

    if (input.value.trim() === '') {
      if (errorElement) errorElement.style.display = 'none';
      return;
    }

    if (isValid) {
      inputBox.classList.add('success');
      if (errorElement) errorElement.style.display = 'none';
    } else {
      inputBox.classList.add('error');
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        inputBox.appendChild(errorElement);
      }
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    }
  }

  // Função para validar o formulário completo
  function validateFullForm() {
    const inputs = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message'),
      phone: document.getElementById('phone')
    };

    let isValid = true;

    // Valida campos obrigatórios
    Object.keys(inputs).forEach(field => {
      const input = inputs[field];
      if (input) {
        let fieldValid = false;
        
        switch(field) {
          case 'name': fieldValid = validateName(input); break;
          case 'email': fieldValid = validateEmail(input); break;
          case 'subject': fieldValid = validateSubject(input); break;
          case 'message': fieldValid = validateMessage(input); break;
          case 'phone': fieldValid = validatePhone(input); break;
        }
        
        if (!fieldValid && field !== 'phone') { // Telefone é opcional
          isValid = false;
        }
      }
    });

    return isValid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validação completa do formulário
      if (!validateFullForm()) {
        Swal.fire({
          icon: 'warning',
          title: 'Formulário incompleto',
          text: 'Por favor, corrija os campos destacados em vermelho.',
          confirmButtonColor: '#147efb'
        });
        
        // Rola para o primeiro erro
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
        return;
      }
      
      // Mostrar loading no SweetAlert
      Swal.fire({
        title: 'Enviando mensagem...',
        text: 'Aguarde um momento',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      // Desabilitar botão
      submitBtn.disabled = true;
      
      // Preparar dados para envio
      const phoneInput = document.getElementById('phone');
      let phoneValue = phoneInput.value.replace(/\s/g, '');
      
      // Adiciona prefixo completo ao telefone para o email
      if (phoneValue) {
        // Cria um input hidden temporário para o telefone completo
        let hiddenPhone = contactForm.querySelector('input[name="phone_full"]');
        if (!hiddenPhone) {
          hiddenPhone = document.createElement('input');
          hiddenPhone.type = 'hidden';
          hiddenPhone.name = 'phone_full';
          contactForm.appendChild(hiddenPhone);
        }
        hiddenPhone.value = '+258' + phoneValue;
      }
      
      // Enviar via EmailJS - SUBSTITUA com suas credenciais
      emailjs.sendForm('seu_service_id', 'seu_template_id', this)
        .then(function(response) {
          Swal.fire({
            icon: 'success',
            title: 'Mensagem enviada!',
            text: 'Obrigado pelo contato! Responderei em breve.',
            confirmButtonColor: '#28a745',
            timer: 5000,
            timerProgressBar: true
          });
          contactForm.reset();
          
          // Remove estados de validação
          contactForm.querySelectorAll('.input-box').forEach(box => {
            box.classList.remove('success', 'error');
            const errorMsg = box.querySelector('.error-message');
            if (errorMsg) errorMsg.style.display = 'none';
          });
        }, function(error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar',
            text: 'Desculpe, houve um erro. Tente novamente ou entre em contato diretamente por email.',
            confirmButtonColor: '#dc3545'
          });
          console.error('EmailJS Error:', error);
        })
        .finally(function() {
          submitBtn.disabled = false;
        });
    });
  }
});