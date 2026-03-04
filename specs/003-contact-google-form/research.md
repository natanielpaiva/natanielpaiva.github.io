# Research: Contact Form — Transparent Google Forms Integration

**Feature**: 003-contact-google-form  
**Date**: 2026-03-04

## Research Topics

### 1. Google Forms submission via cross-origin POST

**Question**: Can the site submit data to Google Forms from a different origin (GitHub Pages → docs.google.com) without a server?

**Findings**:

- Google Forms `/formResponse` endpoint accepts POST with `Content-Type: application/x-www-form-urlencoded`
- Google Forms does **NOT** return CORS headers (`Access-Control-Allow-Origin` is absent)
- This means: `fetch()` with default mode will throw a CORS error when trying to read the response
- **However**: `fetch()` with `mode: 'no-cors'` sends the request successfully — Google receives and stores the data, but the browser gets an **opaque response** (status 0, no body)
- Verified via curl: POST returns HTTP 200 with cross-origin `Origin` header present

**Decision**: Use `fetch` with `mode: 'no-cors'`  
**Rationale**: It's the simplest approach — no iframe tricks, no proxy servers, no additional dependencies. The data is reliably submitted. The only tradeoff is that we can't distinguish between "success" and "server error" from the opaque response.  
**Alternatives considered**:
- **Hidden iframe**: More complex, requires creating/destroying DOM elements, and has edge cases with form target. Rejected — adds complexity without real benefit since Google Forms rarely fails.
- **CORS proxy**: Requires a third-party proxy service or deploying one. Rejected — adds external dependency, latency, and potential privacy concerns.
- **Embedding Google Form iframe**: Rejected — doesn't match the requirement (transparent to user, same site UI).

### 2. Handling opaque responses (success detection)

**Question**: If `mode: 'no-cors'` returns an opaque response, how do we know if the submission succeeded?

**Findings**:

- With `mode: 'no-cors'`, `fetch` resolves successfully if the network request was sent (response.type === 'opaque', response.ok === false, response.status === 0)
- If there's a network error (offline, DNS failure), `fetch` rejects with a TypeError
- Google Forms `/formResponse` endpoint is highly reliable (backed by Google infrastructure)
- There's no way to detect server-side validation errors from the opaque response

**Decision**: Treat `fetch` resolution as "success" and `fetch` rejection as "error"  
**Rationale**: The only realistic failure scenario is a network problem, which `fetch` correctly reports as a rejection. Google Forms server errors are extremely rare and not detectable anyway.  
**Alternatives considered**:
- **Timeout-based detection**: Set a timeout and assume success after X ms. Rejected — less reliable than just using the fetch promise.
- **Follow-up GET to check response**: Would require reading the form's confirmation page. Rejected — over-engineering for near-zero failure rate.

### 3. Field mapping between site form and Google Form

**Question**: What are the exact entry IDs for each Google Form field?

**Findings** (extracted from `FB_PUBLIC_LOAD_DATA_` in the form HTML):

| Site Field | Google Form Field | Entry ID | Required |
|-----------|-------------------|----------|----------|
| `name` | Nome | `entry.437236891` | Yes |
| `email` | Email | `entry.572187819` | Yes |
| `subject` | Assunto | `entry.1008170530` | No |
| `message` | Mensagem | `entry.1210054035` | Yes (as paragraph) |

**Decision**: Map fields 1:1 since both forms have identical fields  
**Rationale**: The Google Form was created to match the site's existing contact form exactly.

### 4. Request format and Content-Type

**Question**: What Content-Type and body format does Google Forms expect?

**Findings**:

- Google Forms expects `application/x-www-form-urlencoded` format
- Fields are sent as `entry.XXXXXXX=value` pairs
- JavaScript `URLSearchParams` can be used to properly encode the body
- With `mode: 'no-cors'`, only "simple" Content-Types are allowed: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain` — JSON is NOT allowed
- `application/x-www-form-urlencoded` is a simple request, so no CORS preflight is triggered

**Decision**: Use `URLSearchParams` to build the body with `application/x-www-form-urlencoded`  
**Rationale**: This is the standard format Google Forms expects, and it qualifies as a "simple request" which avoids CORS preflight entirely.

### 5. Files to modify

**Question**: What files need to change and what can remain untouched?

**Findings** (from codebase analysis):

| File | Change | Details |
|------|--------|---------|
| `assets/js/contact.js` | MODIFY | Replace `submitContactForm()` function body: change from Formspree `fetch` to Google Forms `fetch` with `mode: 'no-cors'` |
| `assets/js/data.js` | MODIFY | Replace `contactConfig.formspreeEndpoint` with Google Forms URL and entry ID mapping |
| `index.html` | NO CHANGE | Form HTML stays the same (same fields, same IDs) |
| `assets/css/style.css` | NO CHANGE | No visual changes needed |
| `assets/js/main.js` | NO CHANGE | No changes needed |
| `assets/js/utils.js` | NO CHANGE | `isValidEmail()` helper stays the same |

**Decision**: Only modify `contact.js` and `data.js`  
**Rationale**: The change is purely a backend swap. All UI (HTML), styling (CSS), validation logic, loading states, and success/error feedback already exist and work correctly.
