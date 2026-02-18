/**
 * Contact Form Handler
 * Handles form validation and submission to Formspree
 */

// Form validation
function validateContactForm(formData) {
  const errors = {};
  
  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Por favor, insira seu nome completo';
  }
  
  // Email validation
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Por favor, insira um email válido';
  }
  
  // Message validation
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Por favor, insira uma mensagem com pelo menos 10 caracteres';
  }
  
  if (formData.message && formData.message.length > 1000) {
    errors.message = 'Mensagem muito longa (máximo 1000 caracteres)';
  }
  
  return errors;
}

// Display form errors
function displayFormErrors(errors) {
  // Clear previous errors
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
    el.style.borderColor = '';
  });
  
  // Display new errors
  Object.keys(errors).forEach(field => {
    const errorElement = document.getElementById(`${field}Error`);
    const inputElement = document.getElementById(field);
    
    if (errorElement) {
      errorElement.textContent = errors[field];
    }
    
    if (inputElement) {
      inputElement.style.borderColor = '#e74c3c';
    }
  });
}

// Show form feedback
function showFormFeedback(message, type) {
  const feedback = document.getElementById('formFeedback');
  if (!feedback) return;
  
  feedback.textContent = message;
  feedback.className = `form-feedback ${type}`;
  feedback.style.display = 'block';
  
  // Auto-hide success message after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 5000);
  }
}

// Toggle submit button loading state
function toggleSubmitButton(loading) {
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  
  if (loading) {
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
  } else {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
  }
}

// Submit form to Formspree
async function submitContactForm(formData) {
  const endpoint = contactConfig?.formspreeEndpoint || 'YOUR_FORMSPREE_ENDPOINT_HERE';
  
  // Check if endpoint is configured
  if (endpoint === 'YOUR_FORMSPREE_ENDPOINT_HERE') {
    showFormFeedback('Formulário não configurado. Entre em contato por email.', 'error');
    return false;
  }
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json();
      console.error('Form submission error:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Network error:', error);
    return false;
  }
}

// Handle form submission
async function handleContactFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const form = event.target;
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };
  
  // Validate form
  const errors = validateContactForm(formData);
  
  if (Object.keys(errors).length > 0) {
    displayFormErrors(errors);
    return;
  }
  
  // Clear errors
  displayFormErrors({});
  
  // Show loading state
  toggleSubmitButton(true);
  
  // Submit form
  const success = await submitContactForm(formData);
  
  // Hide loading state
  toggleSubmitButton(false);
  
  if (success) {
    showFormFeedback('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
    form.reset();
  } else {
    showFormFeedback('Erro ao enviar mensagem. Por favor, tente novamente ou envie um email diretamente.', 'error');
  }
}

// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
    
    // Real-time validation on blur
    ['name', 'email', 'message'].forEach(field => {
      const input = document.getElementById(field);
      if (input) {
        input.addEventListener('blur', () => {
          const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
          };
          const errors = validateContactForm(formData);
          if (errors[field]) {
            displayFormErrors({ [field]: errors[field] });
          } else {
            document.getElementById(`${field}Error`).textContent = '';
            input.style.borderColor = '';
          }
        });
      }
    });
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}
