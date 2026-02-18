# Contract: Formspree API

**API**: Formspree Contact Form API  
**Version**: v1  
**Base URL**: `https://formspree.io/f/{form_id}`  
**Documentation**: https://formspree.io/docs/

## Overview

Formspree provides a simple form backend for static sites. No server-side code required - just point your HTML form to Formspree's endpoint.

## Authentication

None required for basic form submission (rate limited to 50 submissions/month on free tier).

## Endpoints

### POST /f/{form_id}

Submit a contact form message.

**Method**: `POST`  
**Content-Type**: `application/x-www-form-urlencoded` or `application/json`  
**Rate Limit**: 50 submissions/month (free tier)

**Request Parameters** (form fields):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Sender's name |
| `email` | string | Yes | Sender's email (validated) |
| `_replyto` | string | Yes | Reply-to email (usually same as `email`) |
| `subject` | string | No | Email subject line |
| `message` | string | Yes | Message content |
| `_captcha` | boolean | Yes (recommended) | Enable reCAPTCHA (`true`) |
| `_next` | string | No | Redirect URL after successful submission |
| `_subject` | string | No | Override email subject |

**Special Hidden Fields** (Formspree features):

| Field | Description |
|-------|-------------|
| `_captcha` | Set to `true` to enable reCAPTCHA v3 |
| `_replyto` | Email address for reply-to header |
| `_next` | URL to redirect to after submission |
| `_subject` | Custom email subject line |
| `_cc` | CC email address |
| `_gotcha` | Honeypot field (must be empty to pass spam check) |

**Example HTML Form**:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- reCAPTCHA enabled -->
  <input type="hidden" name="_captcha" value="true">
  
  <!-- Redirect after success -->
  <input type="hidden" name="_next" value="https://natanielpaiva.github.io#contact-success">
  
  <!-- Visible fields -->
  <label for="name">Nome</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email</label>
  <input type="email" id="email" name="email" name="_replyto" required>
  
  <label for="subject">Assunto</label>
  <input type="text" id="subject" name="subject">
  
  <label for="message">Mensagem</label>
  <textarea id="message" name="message" required minlength="10"></textarea>
  
  <button type="submit">Enviar</button>
</form>
```

**Example AJAX Submission**:

```javascript
async function submitContactForm(formData) {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}

// Usage
const formData = {
  name: "João Silva",
  email: "joao@example.com",
  _replyto: "joao@example.com",
  subject: "Proposta de Palestra",
  message: "Olá Nataniel...",
  _captcha: true
};

submitContactForm(formData)
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

**Success Response** (200 OK):

```json
{
  "ok": true,
  "next": "https://natanielpaiva.github.io#contact-success"
}
```

**Error Response** (400 Bad Request):

```json
{
  "error": "Invalid email address",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

**Error Response** (429 Too Many Requests):

```json
{
  "error": "Too many submissions this month"
}
```

## Client-Side Validation

Before submitting to Formspree, validate on client:

```javascript
function validateContactForm(data) {
  const errors = [];
  
  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Nome deve ter pelo menos 2 caracteres'
    });
  }
  
  // Email validation
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({
      field: 'email',
      message: 'Email inválido'
    });
  }
  
  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.push({
      field: 'message',
      message: 'Mensagem deve ter pelo menos 10 caracteres'
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

## Error Handling

```javascript
function handleFormSubmission(e) {
  e.preventDefault();
  
  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    _replyto: e.target.email.value,
    subject: e.target.subject.value || 'Contato via site',
    message: e.target.message.value,
    _captcha: true
  };
  
  // Validate
  const validation = validateContactForm(formData);
  if (!validation.isValid) {
    displayErrors(validation.errors);
    return;
  }
  
  // Submit
  submitContactForm(formData)
    .then(result => {
      // Show success message
      showSuccessMessage('Mensagem enviada com sucesso!');
      e.target.reset();
    })
    .catch(error => {
      // Show error message
      showErrorMessage('Erro ao enviar mensagem. Tente novamente.');
    });
}
```

## Security Features

### reCAPTCHA

Formspree integrates with Google reCAPTCHA v3 when `_captcha` is set to `true`.

**Benefits**:
- Protects against spam bots
- Invisible to users (no challenge)
- No additional configuration required

### Honeypot Field

Add a hidden field that bots will fill but humans won't:

```html
<input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
```

If this field is filled, Formspree rejects the submission.

### Rate Limiting

- **Free tier**: 50 submissions/month
- **Paid plans**: Higher limits
- Returns 429 status when limit exceeded

## Testing

### Test Form ID

During development, use a test email:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- Test with personal email first -->
</form>
```

### Test Checklist

- [ ] Form submits successfully
- [ ] Email received with correct content
- [ ] Reply-to header works
- [ ] reCAPTCHA validation works
- [ ] Error messages display correctly
- [ ] Success message/redirect works
- [ ] Honeypot field rejects spam
- [ ] Form validation prevents invalid submissions

## Integration Example (Complete)

```html
<!-- HTML -->
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="hidden" name="_captcha" value="true">
  <input type="hidden" name="_next" value="https://natanielpaiva.github.io#contact-success">
  <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
  
  <div class="form-group">
    <label for="name">Nome *</label>
    <input type="text" id="name" name="name" required minlength="2" maxlength="100">
    <span class="error-message" data-field="name"></span>
  </div>
  
  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" name="_replyto" required>
    <span class="error-message" data-field="email"></span>
  </div>
  
  <div class="form-group">
    <label for="subject">Assunto</label>
    <input type="text" id="subject" name="subject" maxlength="150">
  </div>
  
  <div class="form-group">
    <label for="message">Mensagem *</label>
    <textarea id="message" name="message" required minlength="10" maxlength="1000"></textarea>
    <span class="error-message" data-field="message"></span>
  </div>
  
  <button type="submit" class="btn-submit">
    <span class="btn-text">Enviar</span>
    <span class="btn-loading" style="display:none">Enviando...</span>
  </button>
  
  <div class="form-status">
    <div class="success-message" style="display:none">
      ✅ Mensagem enviada com sucesso! Responderei em breve.
    </div>
    <div class="error-message-global" style="display:none">
      ❌ Erro ao enviar mensagem. Por favor, tente novamente.
    </div>
  </div>
</form>

<script type="module">
import { submitContactForm, validateContactForm } from './assets/js/contact.js';

const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  document.querySelector('.error-message-global').style.display = 'none';
  
  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Validate
  const validation = validateContactForm(data);
  if (!validation.isValid) {
    validation.errors.forEach(error => {
      const errorEl = document.querySelector(`[data-field="${error.field}"]`);
      if (errorEl) {
        errorEl.textContent = error.message;
      }
    });
    return;
  }
  
  // Show loading state
  const btnText = form.querySelector('.btn-text');
  const btnLoading = form.querySelector('.btn-loading');
  const submitBtn = form.querySelector('.btn-submit');
  
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled = true;
  
  try {
    // Submit to Formspree
    await submitContactForm(data);
    
    // Show success
    document.querySelector('.success-message').style.display = 'block';
    form.reset();
    
    // Track analytics
    if (window.gtag) {
      gtag('event', 'contact_form_submit', {
        event_category: 'engagement',
        event_label: 'success'
      });
    }
  } catch (error) {
    // Show error
    document.querySelector('.error-message-global').style.display = 'block';
    
    // Track analytics
    if (window.gtag) {
      gtag('event', 'contact_form_error', {
        event_category: 'engagement',
        event_label: error.message
      });
    }
  } finally {
    // Reset button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
});
</script>
```

## Notes

- **Free tier limitations**: 50 submissions/month
- **reCAPTCHA**: Automatically enabled with `_captcha=true`
- **Email delivery**: Instant (usually within seconds)
- **Custom domain**: Paid plans allow custom "from" email addresses
- **File uploads**: Not supported on free tier

## References

- Official Docs: https://formspree.io/docs/
- reCAPTCHA: https://formspree.io/docs/spam-protection
- AJAX submissions: https://formspree.io/docs/ajax

---

**Version**: 1.0  
**Last Updated**: 2026-02-18
