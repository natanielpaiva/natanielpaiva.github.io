# Quickstart — Contact Google Form Integration

## Overview

Replace the unconfigured Formspree backend with transparent Google Forms submission. The existing contact form stays identical — only the JavaScript submission logic and configuration change.

## Prerequisites

- Branch `003-contact-google-form` checked out
- Browser with DevTools for testing
- No build tools, dependencies, or API keys required

## Files to Modify

| File | Change |
|------|--------|
| `assets/js/data.js` | Replace `formspreeEndpoint` with Google Forms config |
| `assets/js/contact.js` | Rewrite `submitContactForm()` to use `fetch` with `mode: 'no-cors'` |

**No other files need changes.** The HTML form and CSS remain untouched.

## Step-by-Step Implementation

### Step 1: Update Configuration in `data.js`

Replace the `contactConfig` object (around line 239):

**Before:**
```js
const contactConfig = {
    formspreeEndpoint: "YOUR_FORMSPREE_ENDPOINT_HERE",
    // ...
};
```

**After:**
```js
const contactConfig = {
    googleForms: {
        actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfekOv2-RyIlc9VpWnMUZ2NvIrJARLTKOETH8q9LnYxpgv7Sw/formResponse",
        fieldMapping: {
            name:    "entry.437236891",
            email:   "entry.572187819",
            subject: "entry.1008170530",
            message: "entry.1210054035"
        }
    },
    successMessage: "Mensagem enviada com sucesso! Obrigado pelo contato.",
    errorMessage: "Não foi possível enviar a mensagem. Por favor, tente novamente.",
    // keep other existing properties (successDisplayTime, etc.)
};
```

### Step 2: Rewrite `submitContactForm()` in `contact.js`

Replace the existing `submitContactForm()` function (around line 90):

```js
async function submitContactForm(formData) {
    const { googleForms } = contactConfig;
    const params = new URLSearchParams();

    params.append(googleForms.fieldMapping.name,    formData.name);
    params.append(googleForms.fieldMapping.email,   formData.email);
    params.append(googleForms.fieldMapping.subject,  formData.subject);
    params.append(googleForms.fieldMapping.message,  formData.message);

    const response = await fetch(googleForms.actionUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
    });

    // mode: 'no-cors' returns opaque response (type: "opaque", status: 0)
    // If fetch resolves without throwing, the request was sent successfully.
    // Network errors, offline, or blocked requests will reject the promise.
    return response;
}
```

### Step 3: Update Error Handling in `handleContactFormSubmit()`

Adjust the caller to handle opaque responses:

```js
// In handleContactFormSubmit(), replace the success/error check:
try {
    await submitContactForm(formData);
    // Opaque response — treat as success
    showFormFeedback("success", contactConfig.successMessage);
    form.reset();
} catch (error) {
    // Network error or request blocked
    showFormFeedback("error", contactConfig.errorMessage);
} finally {
    toggleSubmitButton(false);
}
```

### Step 4: Remove Formspree References

- Delete or comment out any Formspree-specific code paths
- Remove `formspreeEndpoint` from `contactConfig`
- Remove Formspree-specific response parsing (status checks for 200, JSON parsing)

## Testing

### Manual Test (Browser)

1. Open `index.html` in a browser (or via local server)
2. Fill in all four fields in the contact form
3. Click "Enviar Mensagem"
4. Verify:
   - Success message appears on the page
   - Form fields are cleared
   - Open the Google Form responses spreadsheet to confirm data arrived

### DevTools Verification

1. Open Network tab in DevTools
2. Submit the form
3. Look for request to `docs.google.com/forms/d/e/.../formResponse`
4. Status will show `0` (opaque) — this is expected with `mode: 'no-cors'`
5. The request **should NOT be red/failed** — it should show as completed

### Edge Cases to Test

- Submit with empty fields → validation should block submission
- Submit while offline → error message should appear
- Double-click submit → button should be disabled during submission
- Very long message → should submit without truncation

## Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Data not appearing in Google Form responses | Wrong entry IDs | Verify entry IDs match the form's `FB_PUBLIC_LOAD_DATA_` |
| CORS error in console | Using `mode: 'cors'` | Must use `mode: 'no-cors'` |
| Form submits but no success message | Checking `response.ok` | Opaque responses have `status: 0`; treat fetch resolution as success |
| 405 Method Not Allowed | Wrong URL path | Ensure URL ends with `/formResponse`, not `/viewform` |
