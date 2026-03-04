# Data Model: Contact Form — Transparent Google Forms Integration

**Feature**: 003-contact-google-form  
**Date**: 2026-03-04

## Entities

### ContactFormData

Represents the data collected from the site's contact form and sent to Google Forms.

| Field | Type | Required | Validation | Maps To |
|-------|------|----------|-----------|---------|
| `name` | string | Yes | Min 2 characters, trimmed | `entry.437236891` |
| `email` | string | Yes | Valid email format (regex), trimmed | `entry.572187819` |
| `subject` | string | No | None (optional field), trimmed | `entry.1008170530` |
| `message` | string | Yes | Min 10 characters, max 1000, trimmed | `entry.1210054035` |

### ContactConfig

Configuration object for the form submission backend. Replaces the current Formspree-based config in `data.js`.

| Field | Type | Description |
|-------|------|-------------|
| `googleFormUrl` | string | Full URL to the Google Forms `/formResponse` endpoint |
| `entryIds.name` | string | Google Form entry ID for the Name field |
| `entryIds.email` | string | Google Form entry ID for the Email field |
| `entryIds.subject` | string | Google Form entry ID for the Subject field |
| `entryIds.message` | string | Google Form entry ID for the Message field |
| `maxMessageLength` | number | Maximum message character length (1000) |
| `requiredFields` | string[] | List of required field names |
| `emailRegex` | RegExp | Regex for email validation |

## State Transitions

### Form Submission Flow

```
[Idle] → (user clicks Submit) → [Validating]
  [Validating] → (errors found) → [Showing Errors] → [Idle]
  [Validating] → (valid) → [Submitting]
    [Submitting] → (fetch resolves) → [Success] → (5s timeout) → [Idle]
    [Submitting] → (fetch rejects) → [Error] → [Idle]
```

- **Idle**: Form is editable, submit button is enabled
- **Validating**: Client-side validation in progress (synchronous)
- **Showing Errors**: Error messages displayed under invalid fields
- **Submitting**: Button shows spinner, is disabled; fetch in progress
- **Success**: Success message shown, form fields reset, auto-hide after 5s
- **Error**: Error message shown, form fields preserved (not cleared)

## Relationships

```
ContactConfig  ──uses──>  Google Forms /formResponse endpoint
ContactFormData ──validated by──> validateContactForm()
ContactFormData ──mapped via──> ContactConfig.entryIds ──sent to──> Google Forms
```

## No Changes to HTML Structure

The `<form>` element in `index.html` remains unchanged. Field `id` and `name` attributes (`name`, `email`, `subject`, `message`) stay the same. The `contactForm` event listener continues to intercept submit events.
