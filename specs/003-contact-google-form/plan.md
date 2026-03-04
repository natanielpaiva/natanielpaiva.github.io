# Implementation Plan: Contact Form — Transparent Google Forms Integration

**Branch**: `003-contact-google-form` | **Date**: 2026-03-04 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/003-contact-google-form/spec.md`

## Summary

Replace the current Formspree integration in the contact form with a transparent Google Forms submission. The existing form UI, validation, loading states, and error/success feedback remain unchanged. Only the `submitContactForm()` function in `contact.js` and the `contactConfig` in `data.js` need to be modified to POST data to the Google Forms `/formResponse` endpoint using `fetch` with `mode: 'no-cors'`.

## Technical Context

**Language/Version**: JavaScript (ES6+), HTML5, CSS3 — no build tools  
**Primary Dependencies**: None (vanilla JS, no frameworks)  
**Storage**: N/A (Google Forms stores responses in Google Sheets)  
**Testing**: Manual browser testing (no test framework in project)  
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge) — static site hosted on GitHub Pages  
**Project Type**: Single static website  
**Performance Goals**: Form submission feedback within 5 seconds  
**Constraints**: No server-side code; CORS restrictions on Google Forms (no readable response); must work on GitHub Pages  
**Scale/Scope**: Single-page portfolio site, ~470 lines of HTML, ~200 lines of contact JS

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is not customized (still template). No project-specific gates to enforce. Proceeding with standard best practices:

- [x] **Simplicity**: Minimal changes — only modify `contact.js` and `data.js`, no new files
- [x] **No new dependencies**: Uses native `fetch` API, no libraries added
- [x] **Backward compatibility**: Form UI and UX remain identical for visitors

## Project Structure

### Documentation (this feature)

```text
specs/003-contact-google-form/
├── plan.md              # This file
├── research.md          # Phase 0: CORS research, submission patterns
├── data-model.md        # Phase 1: Field mappings
├── quickstart.md        # Phase 1: Step-by-step implementation guide
├── contracts/
│   └── google-forms-api.md  # Phase 1: Google Forms submission contract
├── checklists/
│   └── requirements.md  # Quality checklist
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (files to modify)

```text
assets/js/
├── contact.js           # MODIFY: Replace submitContactForm() with Google Forms POST
└── data.js              # MODIFY: Replace contactConfig.formspreeEndpoint with Google Forms config
```

**Structure Decision**: No new files needed. The change is a drop-in replacement of the submission backend within the existing 2 JS files.
