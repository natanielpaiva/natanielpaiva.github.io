# Tasks: Contact Form — Transparent Google Forms Integration

**Input**: Design documents from `/specs/003-contact-google-form/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No project initialization needed — the project structure, form HTML, CSS, validation, and UI feedback already exist. This phase simply ensures the working branch is ready.

- [X] T001 Verify branch `003-contact-google-form` is checked out and up to date with `master`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Update the shared configuration object that both US1 and US2 depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Replace `contactConfig` in `assets/js/data.js`: remove `formspreeEndpoint`, add `googleForms` object with `actionUrl` (`https://docs.google.com/forms/d/e/1FAIpQLSfekOv2-RyIlc9VpWnMUZ2NvIrJARLTKOETH8q9LnYxpgv7Sw/formResponse`) and `fieldMapping` (`name: "entry.437236891"`, `email: "entry.572187819"`, `subject: "entry.1008170530"`, `message: "entry.1210054035"`). Keep existing properties (`maxMessageLength`, `requiredFields`, `emailRegex`).

**Checkpoint**: Configuration ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Visitante envia mensagem pelo formulário do site (Priority: P1) 🎯 MVP

**Goal**: The contact form submits data transparently to Google Forms. The visitor sees a success message and the form resets. Data appears in the linked Google Sheets spreadsheet.

**Independent Test**: Fill all four fields in the contact form, click "Enviar Mensagem", verify (1) success message appears on the site, (2) form fields are cleared, (3) the response appears in the Google Form responses spreadsheet.

### Implementation for User Story 1

- [X] T003 [US1] Rewrite `submitContactForm()` function in `assets/js/contact.js`: remove Formspree fetch and endpoint check, replace with `fetch` POST to `contactConfig.googleForms.actionUrl` using `mode: 'no-cors'`, `Content-Type: application/x-www-form-urlencoded`, and `URLSearchParams` body mapping form fields via `contactConfig.googleForms.fieldMapping`
- [X] T004 [US1] Update `handleContactFormSubmit()` function in `assets/js/contact.js`: replace boolean return check (`if (success)`) with `try/catch/finally` pattern — `try` block calls `await submitContactForm(formData)` then shows success feedback via `showFormFeedback()` and resets form; `catch` block shows error feedback; `finally` block calls `toggleSubmitButton(false)` to re-enable the button

**Checkpoint**: At this point, User Story 1 should be fully functional — form submits to Google Forms, visitor sees success message, form resets

---

## Phase 4: User Story 2 — Visitante recebe feedback adequado em caso de falha (Priority: P2)

**Goal**: When submission fails (network error, offline), the visitor sees a friendly error message, form data is preserved (not cleared), and the submit button is re-enabled for retry.

**Independent Test**: Enable browser offline mode (DevTools → Network → Offline), fill the form and submit. Verify (1) error message appears, (2) all typed data remains in the fields, (3) submit button is re-enabled. Disable offline mode and resubmit — verify success.

### Implementation for User Story 2

- [X] T005 [US2] Verify and refine error handling in `handleContactFormSubmit()` in `assets/js/contact.js`: ensure the `catch` block does NOT call `form.reset()`, displays error message from `contactConfig` (e.g., "Não foi possível enviar a mensagem. Por favor, tente novamente."), and that the `finally` block re-enables the submit button via `toggleSubmitButton(false)` — preserving all user-entered data on failure
- [X] T006 [US2] Verify double-submit prevention in `assets/js/contact.js`: confirm `toggleSubmitButton(true)` is called before the `try` block and `toggleSubmitButton(false)` runs in `finally` — the button must stay disabled during the entire fetch lifecycle to prevent duplicate submissions

**Checkpoint**: Error scenarios handled — visitor can retry failed submissions without losing data

---

## Phase 5: User Story 3 — Visitante acessa contato via botões do hero ou CTA (Priority: P3)

**Goal**: All "Entre em Contato" buttons and navbar "Contato" link still scroll to the `#contact` section with the form visible.

**Independent Test**: Click each CTA button (hero section, experience section) and the navbar "Contato" link. Verify all scroll smoothly to the contact section with the form visible and functional.

### Implementation for User Story 3

- [X] T007 [US3] Verify all anchor links pointing to `#contact` in `index.html` still navigate correctly to the contact section — no code changes expected since HTML is unchanged, but confirm no regressions from JS modifications

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Clean up legacy code and validate the complete implementation

- [X] T008 Remove all remaining Formspree references from `assets/js/contact.js` and `assets/js/data.js`: delete commented-out Formspree code, remove any `formspreeEndpoint` mentions, ensure no "Formspree" string appears in the codebase
- [X] T009 Run `specs/003-contact-google-form/quickstart.md` validation: open `index.html` in browser, submit the form with all fields, verify success message appears, verify data arrives in Google Sheets, test offline submission for error message, check browser console for no errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational (Phase 2) — the `contactConfig.googleForms` object must exist before `submitContactForm()` can reference it
- **US2 (Phase 4)**: Depends on US1 (Phase 3) — error handling refines the same `handleContactFormSubmit()` function rewritten in US1
- **US3 (Phase 5)**: Depends on Foundational (Phase 2) only — can run in parallel with US1/US2 since it involves no code changes
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — no dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 — refines the `try/catch` pattern introduced in T004
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) — independent of US1 and US2 (verification only)

### Within Each User Story

- Configuration (T002) before submission logic (T003)
- Submission function (T003) before handler function (T004)
- Handler success path (T004) before error refinement (T005, T006)

### Parallel Opportunities

- T005 and T006 within US2 can be verified in parallel (different concerns in same file)
- US3 (T007) can run in parallel with US1 (T003, T004) since it requires no code changes

---

## Parallel Example: User Story 1

```bash
# Sequential — T003 must complete before T004:
Task T003: "Rewrite submitContactForm() in assets/js/contact.js"
  ↓ (T004 depends on T003 — new function signature)
Task T004: "Update handleContactFormSubmit() in assets/js/contact.js"
```

## Parallel Example: US2 and US3

```bash
# US3 can run in parallel with US2 (different concerns):
Task T005: "[US2] Verify error handling in assets/js/contact.js"
Task T007: "[US3] Verify CTA navigation in index.html"
  → Both can run concurrently after US1 checkpoint
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify branch)
2. Complete Phase 2: Foundational (update `contactConfig` in `data.js`)
3. Complete Phase 3: User Story 1 (rewrite submission + handler)
4. **STOP and VALIDATE**: Submit form, check Google Sheets for data
5. Deploy if ready — US1 alone delivers the core value

### Incremental Delivery

1. Complete Setup + Foundational → Config ready
2. Add User Story 1 → Test submission → Deploy (MVP!)
3. Add User Story 2 → Test offline/error → Deploy
4. Add User Story 3 → Verify CTA buttons → Deploy
5. Polish → Remove dead code → Final validation

### Scope Note

This is a minimal feature (2 files, ~30 lines of changes). All 9 tasks can be completed in a single session. The phased structure primarily serves to ensure independent testability at each checkpoint.

---

## Notes

- Only 2 source files are modified: `assets/js/contact.js` and `assets/js/data.js`
- No HTML or CSS changes — the form UI is unchanged
- No new dependencies or build tools — uses native `fetch` and `URLSearchParams`
- `mode: 'no-cors'` means opaque responses (status 0) — treat fetch resolution as success
- Client-side validation (`validateContactForm()`) is NOT modified — it already works correctly
- Commit after each phase checkpoint for clean git history
