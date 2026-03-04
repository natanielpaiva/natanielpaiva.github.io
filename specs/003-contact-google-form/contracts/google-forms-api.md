# Contract: Google Forms Submission API

**API**: Google Forms `/formResponse` endpoint  
**Version**: N/A (stable, public)  
**Base URL**: `https://docs.google.com/forms/d/e/{formId}/formResponse`  
**Form ID**: `1FAIpQLSfekOv2-RyIlc9VpWnMUZ2NvIrJARLTKOETH8q9LnYxpgv7Sw`  
**Full URL**: `https://docs.google.com/forms/d/e/1FAIpQLSfekOv2-RyIlc9VpWnMUZ2NvIrJARLTKOETH8q9LnYxpgv7Sw/formResponse`

## Overview

Google Forms provides a `/formResponse` endpoint that accepts form field data via HTTP POST. Each field is identified by a numeric entry ID. This endpoint is publicly accessible and does not require authentication for submission.

## CORS Behavior

- **No CORS headers** are returned by Google Forms
- **Simple requests** (POST with `application/x-www-form-urlencoded`) are sent without CORS preflight
- The data IS received and stored by Google even though the browser gets an opaque response
- Use `fetch` with `mode: 'no-cors'` to submit from a cross-origin page

## Endpoint

### POST /formResponse

Submit form data to the Google Form.

**Method**: `POST`  
**Content-Type**: `application/x-www-form-urlencoded`  
**Authentication**: None  
**Rate Limit**: Not published (Google infrastructure, no practical limit for personal use)

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `entry.437236891` | string | Yes | Nome (sender's name) |
| `entry.572187819` | string | Yes | Email (sender's email) |
| `entry.1008170530` | string | No | Assunto (subject) |
| `entry.1210054035` | string | Yes | Mensagem (message body, paragraph type) |

### Example Request

```
POST /forms/d/e/1FAIpQLSfekOv2-RyIlc9VpWnMUZ2NvIrJARLTKOETH8q9LnYxpgv7Sw/formResponse HTTP/1.1
Host: docs.google.com
Content-Type: application/x-www-form-urlencoded

entry.437236891=Nataniel&entry.572187819=email%40example.com&entry.1008170530=Assunto&entry.1210054035=Mensagem+de+teste
```

### Response (when called via `mode: 'no-cors'`)

When called from a browser with `mode: 'no-cors'`:

| Property | Value | Notes |
|----------|-------|-------|
| `response.type` | `"opaque"` | Cannot read actual response |
| `response.ok` | `false` | Always false for opaque responses |
| `response.status` | `0` | Always 0 for opaque responses |
| `response.body` | `null` | Not readable |

**Success detection**: The `fetch` promise **resolves** (even with opaque response) → treat as success.
**Error detection**: The `fetch` promise **rejects** with `TypeError` → network failure.

### Example JavaScript Usage

```javascript
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfekOv2-RyIlc9VpWnMUZ2NvIrJARLTKOETH8q9LnYxpgv7Sw/formResponse';

const params = new URLSearchParams();
params.append('entry.437236891', formData.name);
params.append('entry.572187819', formData.email);
params.append('entry.1008170530', formData.subject);
params.append('entry.1210054035', formData.message);

try {
  await fetch(GOOGLE_FORM_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  // Data submitted (opaque response — treat as success)
} catch (error) {
  // Network error — submission failed
}
```

## Replaces

This contract replaces the [Formspree API contract](../../001-personal-website/contracts/formspree-api.md) from feature 001. The Formspree endpoint (`https://formspree.io/f/{form_id}`) is no longer needed.

## Limitations

- **No server-side validation feedback**: If Google Forms rejects a submission (e.g., missing required field), we cannot detect it from the opaque response. Client-side validation before submission is essential.
- **No delivery confirmation**: We cannot read the HTTP status code. We infer success from the fetch promise resolving.
- **Entry IDs are stable**: Entry IDs are tied to the form structure and only change if the form is recreated. They remain stable across edits to field labels or descriptions.
