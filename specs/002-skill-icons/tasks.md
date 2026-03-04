# Tasks: Ícones das Habilidades Técnicas

**Input**: Design documents from `/specs/002-skill-icons/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested — this feature uses manual browser verification only (no test framework).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the directory structure for icon storage

- [x] T001 Create `assets/images/tech-icons/` directory at repository root

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Resolve the Spring Framework file extension inconsistency before downloading icons

**⚠️ CRITICAL**: Must complete before US1 downloads, so all icons use consistent SVG format

- [x] T002 Update Spring Framework icon path from `spring.png` to `spring.svg` on line 80 of assets/js/data.js

**Rationale**: `data.js` references `spring.png` while all other skills use `.svg`. Devicons provides `spring-original.svg`. Changing the reference to `.svg` is simpler than converting SVG→PNG and maintains format consistency (see research.md R4, Option A).

**Checkpoint**: Directory exists and all `data.js` icon paths reference files that will be created in Phase 3

---

## Phase 3: User Story 1 — Visualizar ícones das habilidades técnicas (Priority: P1) 🎯 MVP

**Goal**: All 19 technical skill icons display in the Skills section instead of placeholder fallbacks

**Independent Test**: Open `index.html` in browser, navigate to Skills section, verify each of the 19 skills shows a recognizable technology icon

### Implementation for User Story 1

- [x] T003 [P] [US1] Download 15 Devicons SVG icons using batch curl commands to assets/images/tech-icons/ — download java.svg, php.svg, python.svg, javascript.svg, typescript.svg, spring.svg, laravel.svg, flask.svg, react.svg, angular.svg, ionic.svg, mongodb.svg, mysql.svg, oracle.svg, cassandra.svg from `https://raw.githubusercontent.com/devicons/devicon/master/icons/{name}/{name}-original.svg` (see contracts/devicons-cdn.md for full URL mapping)
- [x] T004 [US1] Copy assets/images/tech-icons/react.svg to assets/images/tech-icons/react-native.svg (React Native uses identical atom logo — see research.md R3)
- [x] T005 [P] [US1] Create custom C4 Model SVG in assets/images/tech-icons/c4-model.svg — layered diagram with 4 stacked blue rectangles (#1168BD) representing Context/Container/Component/Code levels, viewBox="0 0 128 128", under 5KB (see research.md R5)
- [x] T006 [P] [US1] Create custom Hexagonal Architecture SVG in assets/images/tech-icons/hexagonal.svg — central hexagon shape in purple/violet (#6B21A8) with small circles at vertices suggesting ports/adapters, viewBox="0 0 128 128", under 5KB (see research.md R5)
- [x] T007 [P] [US1] Create custom Microservices SVG in assets/images/tech-icons/microservices.svg — 3-4 small connected teal/green (#0D9488) rounded rectangles with lines between them, viewBox="0 0 128 128", under 5KB (see research.md R5)
- [x] T008 [US1] Verify all 19 icon files exist and are non-empty by running `ls -la assets/images/tech-icons/` — expected: 19 files (18 SVG + 0 PNG after T002 change), all > 0 bytes

**Checkpoint**: All 19 icon files present in `assets/images/tech-icons/`. Opening `index.html` shows icons instead of placeholder letters for every skill badge.

---

## Phase 4: User Story 2 — Carregamento adequado dos ícones (Priority: P2)

**Goal**: Icons load quickly without errors on any device and connection speed, with graceful fallback

**Independent Test**: Open browser DevTools, check Network tab for icon load times and Console for errors; test on mobile viewport

### Implementation for User Story 2

- [x] T009 [P] [US2] Verify all icon files in assets/images/tech-icons/ are under 50KB each by running `find assets/images/tech-icons/ -size +50k` — expected: no results (see data-model.md validation rule 3)
- [x] T010 [US2] Open index.html in browser, navigate to Skills section, open DevTools Console and verify zero 404 or loading errors for any icon file under assets/images/tech-icons/
- [x] T011 [US2] Test onerror fallback mechanism: temporarily rename one icon file (e.g., `mv assets/images/tech-icons/java.svg assets/images/tech-icons/java.svg.bak`), reload page, verify the placeholder initial letter displays for that skill, then restore the file
- [x] T012 [US2] Test Skills section rendering on mobile viewport (320px width) in browser DevTools responsive mode — verify all icons display with correct proportions and no distortion

**Checkpoint**: All icons load without console errors, fallback works when icons are missing, icons render correctly on mobile

---

## Phase 5: User Story 3 — Consistência visual dos ícones (Priority: P3)

**Goal**: All icons have uniform visual appearance — consistent dimensions and style across categories

**Independent Test**: Visually compare icons side by side in the Skills section, checking for uniform size and recognizability

### Implementation for User Story 3

- [x] T013 [P] [US3] Verify all SVG files in assets/images/tech-icons/ contain `viewBox="0 0 128 128"` — normalize any that differ by editing the SVG root element to use Devicons standard viewBox (see data-model.md validation rule 4)
- [x] T014 [US3] Visual comparison of all 19 icons at badge size in browser — verify uniform rendering dimensions across all categories (languages, frameworks, mobile, databases, architecture) and that no icon appears disproportionately large or small
- [x] T015 [US3] Verify all icons (especially custom architecture SVGs) are clearly visible against the page background in light mode and visually recognizable at 48x48px badge size

**Checkpoint**: All icons appear uniformly sized, style-consistent, and professionally presented across all skill categories

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and version control

- [x] T016 Run full verification checklist from specs/002-skill-icons/quickstart.md (7 items: directory exists, Devicons render, custom SVGs recognizable, no 404s, responsive, performance, fallback)
- [x] T017 Git add and commit all new/modified files on branch 002-skill-icons with descriptive commit message

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001) — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (T002) — T003 needs directory; T004 needs T003
- **User Story 2 (Phase 4)**: Depends on US1 completion (needs icons to test loading)
- **User Story 3 (Phase 5)**: Depends on US1 completion (needs icons to verify consistency)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — no dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 — icons must exist to verify loading behavior
- **User Story 3 (P3)**: Depends on US1 — icons must exist to verify visual consistency
- **US2 and US3**: Independent of each other — can run in parallel after US1

### Within User Story 1

- T003 (batch download) can run in parallel with T005, T006, T007 (custom SVGs)
- T004 (react-native copy) depends on T003 (needs react.svg to exist first)
- T008 (verification) depends on all previous US1 tasks

### Parallel Opportunities

- T003, T005, T006, T007 can all run in parallel (different files, no shared dependencies)
- T009 can run in parallel with T010, T011, T012 (different verification methods)
- T013 can run in parallel with T014, T015 (different checks)
- US2 and US3 phases can run in parallel after US1 completes

---

## Parallel Example: User Story 1

```
# These can run simultaneously (different files):
Task T003: "Download 15 Devicons SVGs to assets/images/tech-icons/"
Task T005: "Create C4 Model SVG in assets/images/tech-icons/c4-model.svg"
Task T006: "Create Hexagonal SVG in assets/images/tech-icons/hexagonal.svg"
Task T007: "Create Microservices SVG in assets/images/tech-icons/microservices.svg"

# Then sequentially:
Task T004: "Copy react.svg to react-native.svg" (needs T003 done)
Task T008: "Verify all 19 files exist" (needs all above done)
```

## Parallel Example: After US1 Completes

```
# US2 and US3 can run in parallel:
Phase 4 (US2): T009, T010, T011, T012
Phase 5 (US3): T013, T014, T015
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (create directory)
2. Complete Phase 2: Foundational (fix spring.svg reference)
3. Complete Phase 3: User Story 1 (download/create all 19 icons)
4. **STOP and VALIDATE**: Open `index.html` — all 19 skills should show icons
5. This alone delivers the core value of the feature

### Incremental Delivery

1. Complete Setup + Foundational → Directory ready, paths consistent
2. Add User Story 1 → All 19 icons display → **MVP delivered!**
3. Add User Story 2 → Loading quality verified (file sizes, errors, responsive, fallback)
4. Add User Story 3 → Visual consistency verified (viewBox, uniform sizing, visibility)
5. Polish → Full checklist validated, committed to branch

### Suggested MVP Scope

User Story 1 alone delivers **100% of the visible user value** — all 19 icons display instead of placeholders. User Stories 2 and 3 are quality assurance layers that verify the implementation meets performance and consistency standards.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No automated tests — manual browser verification per quickstart.md
- All Devicons URLs use `-original` variant for colorful logos (clarification decision)
- Custom SVGs must be minimal geometric shapes recognizable at 48x48px badge size
- Commit after each phase for incremental progress tracking
- Spring Framework is the only icon requiring a `data.js` code change (extension .png → .svg)
