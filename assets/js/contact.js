/**
 * Contact Form Handler
 * Handles form validation and submission to Google Forms
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

// Submit form to Google Forms
async function submitContactForm(formData) {
  const { googleForms } = contactConfig;
  const params = new URLSearchParams();

  params.append(googleForms.fieldMapping.name,    formData.name);
  params.append(googleForms.fieldMapping.email,   formData.email);
  params.append(googleForms.fieldMapping.subject,  formData.subject);
  params.append(googleForms.fieldMapping.message,  formData.message);

  await fetch(googleForms.actionUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  // mode: 'no-cors' returns opaque response (type: "opaque", status: 0).
  // If fetch resolves without throwing, the request was sent successfully.
  // Network errors, offline, or blocked requests will reject the promise.
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
  try {
    await submitContactForm(formData);
    // Opaque response resolved — treat as success
    showFormFeedback(contactConfig.successMessage, 'success');
    form.reset();
  } catch (error) {
    // Network error or request blocked — show error, preserve form data
    showFormFeedback(contactConfig.errorMessage, 'error');
  } finally {
    toggleSubmitButton(false);
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
