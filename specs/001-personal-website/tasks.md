# Tasks: Site Pessoal Nataniel Paiva

**Input**: Design documents from `/specs/001-personal-website/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not explicitly requested in spec - focusing on manual testing with Lighthouse, W3C validators, and cross-browser testing.

**Organization**: Tasks are grouped by user story (from spec.md) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Project structure and basic configuration for GitHub Pages hosting

- [X] T001 Create base directory structure (assets/css/, assets/js/, assets/images/, assets/images/tech-icons/)
- [X] T002 Create robots.txt in repository root for SEO
- [X] T003 [P] Create sitemap.xml in repository root for SEO
- [ ] T004 [P] Add favicon.ico to assets/images/
- [X] T005 [P] Create README.md with project description and GitHub Pages deployment info
- [X] T006 [P] Create assets/js/data.js with site data structures from data-model.md

**Checkpoint**: Directory structure ready, SEO files in place

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Create index.html with complete semantic HTML5 structure (nav, main, all sections, footer)
- [ ] T008 Add meta tags to index.html (charset, viewport, title, description, Open Graph, schema.org Person)
- [ ] T009 Create assets/css/style.css with CSS variables for design system (colors, fonts, spacing)
- [ ] T010 [P] Create assets/css/responsive.css with mobile-first media queries (breakpoints: 768px, 1024px)
- [ ] T011 [P] Create assets/css/animations.css with transition and animation definitions
- [ ] T012 [P] Create assets/js/utils.js with utility functions (smooth scroll, mobile menu toggle)
- [ ] T013 [P] Create assets/js/animations.js with Intersection Observer for scroll animations
- [ ] T014 Setup Formspree account and get form endpoint URL for contact form

**Checkpoint**: Foundation ready - all HTML structure, CSS framework, and JS utilities available

---

## Phase 3: User Story 1 - Hero/Apresentação (Priority: P1) 🎯 MVP

**Goal**: Visitor sees immediately who Nataniel is and his specialization

**Independent Test**: 
- Open index.html in browser
- Hero section displays with full-height viewport
- Name, tagline, description, and CTA are visible
- Social links are clickable

### Implementation for User Story 1

- [ ] T015 [P] [US1] Add hero section HTML structure in index.html (#hero section with photo, name, tagline, description, social links, CTA)
- [ ] T016 [P] [US1] Style hero section in assets/css/style.css (full-height, centered content, background, typography)
- [ ] T017 [P] [US1] Add hero photo to assets/images/hero-photo.jpg (placeholder or actual)
- [ ] T018 [P] [US1] Add social media icons/links to hero section (LinkedIn, GitHub, YouTube, Facebook)
- [ ] T019 [US1] Implement smooth scroll for CTA button in assets/js/main.js (scroll to #courses or #contact)
- [ ] T020 [US1] Add responsive styles for hero section in assets/css/responsive.css (mobile: stack, tablet/desktop: flex)

**Checkpoint**: Hero section complete and responsive - visitor understands who Nataniel is

---

## Phase 4: User Story 2 - Sobre Mim (Priority: P1)

**Goal**: Visitor understands Nataniel's trajectory, education, and credibility

**Independent Test**:
- Scroll to About section
- Education, current position, experience summary, and tech stack are visible
- Section is readable and well-formatted

### Implementation for User Story 2

- [ ] T021 [P] [US2] Add about section HTML in index.html (#about section with photo, education, position, experience, tech stack)
- [ ] T022 [P] [US2] Populate Profile entity in assets/js/data.js with complete data (name, title, description, years, position, education)
- [ ] T023 [P] [US2] Style about section in assets/css/style.css (two-column layout for desktop, card design)
- [ ] T024 [P] [US2] Add about photo to assets/images/about-photo.jpg
- [ ] T025 [US2] Add responsive styles for about section in assets/css/responsive.css (mobile: single column)

**Checkpoint**: About section complete - visitor knows Nataniel's background

---

## Phase 5: User Story 3 - Experiência Profissional (Priority: P1)

**Goal**: Recruiter/client sees detailed professional experience

**Independent Test**:
- Scroll to Experience section
- Current position (Staff Engineer at PicPay) is prominently displayed
- Years of experience (13+) and areas of expertise are clear

### Implementation for User Story 3

- [ ] T026 [P] [US3] Add experience section HTML in index.html (#experience section with timeline/cards)
- [ ] T027 [P] [US3] Style experience section in assets/css/style.css (timeline or card layout)
- [ ] T028 [US3] Add responsive styles for experience section in assets/css/responsive.css (mobile: vertical timeline)
- [ ] T029 [US3] Add scroll animation for experience items in assets/js/animations.js (fade in on scroll)

**Checkpoint**: Experience section complete - professional background is clear

---

## Phase 6: User Story 4 - Cursos e Educação (Priority: P1)

**Goal**: Students can see courses and choose one to enroll in

**Independent Test**:
- Scroll to Courses section
- Statistics (17 courses, 55,541 students, 4,480 reviews) are displayed
- Featured courses show title, rating, reviews, duration, level, and Udemy link
- "Ver todos os cursos" link works

### Implementation for User Story 4

- [ ] T030 [P] [US4] Add courses section HTML in index.html (#courses section with stats, course cards grid)
- [ ] T031 [P] [US4] Populate Course entities in assets/js/data.js (17 courses with all details from data-model.md)
- [ ] T032 [P] [US4] Add course statistics object to assets/js/data.js (totalCourses: 17, totalStudents: 55541, totalReviews: 4480)
- [ ] T033 [P] [US4] Style courses section in assets/css/style.css (grid layout, course cards with hover effects)
- [ ] T034 [US4] Implement dynamic course rendering in assets/js/main.js (render featured courses from data.js)
- [ ] T035 [US4] Add star rating visualization function in assets/js/utils.js (convert 4.3 to visual stars)
- [ ] T036 [US4] Add course card hover animations in assets/css/animations.css (elevation effect)
- [ ] T037 [US4] Add responsive styles for courses section in assets/css/responsive.css (mobile: 1 column, tablet: 2 columns, desktop: 3 columns)

**Checkpoint**: Courses section complete - students can explore and click to Udemy

---

## Phase 7: User Story 8 - Formulário de Contato (Priority: P1)

**Goal**: Visitor can contact Nataniel directly with questions or proposals

**Independent Test**:
- Scroll to Contact section
- Form has fields: Name, Email, Subject, Message
- Validation shows errors for empty required fields
- Submission shows success/error message
- Test with real submission to Formspree

### Implementation for User Story 8

- [ ] T038 [P] [US8] Add contact section HTML in index.html (#contact section with form fields: name, email, subject, message, submit button)
- [ ] T039 [P] [US8] Create assets/js/contact.js with form validation logic (required fields, email format)
- [ ] T040 [US8] Implement Formspree integration in assets/js/contact.js (POST to Formspree endpoint, handle response)
- [ ] T041 [US8] Add ContactMessage validation from data-model.md to assets/js/contact.js (maxLength checks, sanitization)
- [ ] T042 [US8] Style contact form in assets/css/style.css (form layout, input styles, button styles)
- [ ] T043 [US8] Add form validation feedback styles in assets/css/style.css (error states, success states)
- [ ] T044 [US8] Add loading state to submit button in assets/js/contact.js (disable button, show spinner)
- [ ] T045 [US8] Add responsive styles for contact form in assets/css/responsive.css (mobile: full-width inputs)
- [ ] T046 [US8] Add reCAPTCHA v3 (optional) to contact form per contracts/formspree-api.md

**Checkpoint**: Contact form complete and functional - visitors can reach out

---

## Phase 8: User Story 9 - Footer/Rodapé (Priority: P1)

**Goal**: Visitor accesses quick links and secondary information

**Independent Test**:
- Scroll to Footer
- Social links, copyright, email, and quick navigation are visible
- Links work correctly

### Implementation for User Story 9

- [ ] T047 [P] [US9] Add footer HTML in index.html (social links, copyright, email, quick nav links)
- [ ] T048 [P] [US9] Populate SocialLink entities in assets/js/data.js (LinkedIn, GitHub, YouTube, Udemy, Facebook URLs)
- [ ] T049 [US9] Style footer in assets/css/style.css (dark background, centered content, link styles)
- [ ] T050 [US9] Add responsive styles for footer in assets/css/responsive.css (mobile: stacked links)

**Checkpoint**: Footer complete - all P1 user stories implemented (MVP ready)

---

## Phase 9: User Story 5 - Conteúdo YouTube (Priority: P2)

**Goal**: Visitor sees recent YouTube videos and can access free educational content

**Independent Test**:
- Scroll to YouTube section
- 3-6 recent videos from @NatanielTech channel are displayed
- Thumbnails are clickable and open YouTube
- Videos can be played inline (optional)
- Channel link works

### Implementation for User Story 5

- [ ] T051 [P] [US5] Add YouTube section HTML in index.html (#youtube section with video grid, channel link)
- [ ] T052 [P] [US5] Create assets/js/youtube.js with YouTube IFrame API integration per contracts/youtube-iframe-api.md
- [ ] T053 [US5] Implement lazy loading for YouTube thumbnails in assets/js/youtube.js (load on scroll)
- [ ] T054 [US5] Add manual video list to assets/js/data.js (3-6 YouTubeVideo entities with IDs, titles)
- [ ] T055 [US5] Style YouTube section in assets/css/style.css (video grid, responsive embeds)
- [ ] T056 [US5] Add play button overlay on thumbnails in assets/css/style.css
- [ ] T057 [US5] Add responsive styles for YouTube section in assets/css/responsive.css (mobile: 1 column, desktop: 2-3 columns)

**Checkpoint**: YouTube section complete - visitors can watch educational content

---

## Phase 10: User Story 6 - Palestras e Eventos (Priority: P2)

**Goal**: Event organizers can learn about speaking experience and request talks

**Independent Test**:
- Scroll to Talks section
- List of previous talks (if available) is displayed
- Talk topics are listed
- CTA button to request a talk is present

### Implementation for User Story 6

- [ ] T058 [P] [US6] Add talks section HTML in index.html (#talks section with past talks list, topics, CTA)
- [ ] T059 [P] [US6] Populate Talk entities in assets/js/data.js (if data available, otherwise placeholder)
- [ ] T060 [US6] Style talks section in assets/css/style.css (timeline or card layout)
- [ ] T061 [US6] Link talk CTA to contact form (smooth scroll to #contact with pre-filled subject)
- [ ] T062 [US6] Add responsive styles for talks section in assets/css/responsive.css

**Checkpoint**: Talks section complete - organizers can request speaking engagements

---

## Phase 11: User Story 7 - Habilidades Técnicas (Priority: P2)

**Goal**: Technical recruiter can quickly assess technology fit

**Independent Test**:
- Scroll to Skills section
- Technologies are displayed with visual badges/tags
- Skills are grouped by category (Languages, Frameworks, etc.)
- Proficiency levels are visible (optional)

### Implementation for User Story 7

- [ ] T063 [P] [US7] Add skills section HTML in index.html (#skills section with category groups)
- [ ] T064 [P] [US7] Populate TechnicalSkill entities in assets/js/data.js (Java, PHP, Python, Spring, React, etc. per spec.md)
- [ ] T065 [P] [US7] Add technology icons to assets/images/tech-icons/ (SVG or PNG for each skill)
- [ ] T066 [US7] Implement dynamic skill rendering in assets/js/main.js (group by category, render badges)
- [ ] T067 [US7] Style skills section in assets/css/style.css (badge/tag design, category headers)
- [ ] T068 [US7] Add skill hover effects in assets/css/animations.css (scale, shadow)
- [ ] T069 [US7] Add responsive styles for skills section in assets/css/responsive.css (mobile: smaller badges)

**Checkpoint**: Skills section complete - tech stack is clearly visible

---

## Phase 12: Polish & Cross-Cutting Concerns (Final Phase)

**Purpose**: Performance, SEO, accessibility, and production readiness

- [ ] T070 [P] Add smooth scroll behavior to all anchor links in assets/js/main.js
- [ ] T071 [P] Implement mobile hamburger menu toggle in assets/js/main.js
- [ ] T072 [P] Add scroll-to-top button in assets/js/main.js (appears after scrolling down)
- [ ] T073 [P] Optimize images (compress to WebP with fallback) in assets/images/
- [ ] T074 [P] Minify CSS files (style.css, responsive.css, animations.css) - create .min.css versions
- [ ] T075 [P] Minify JavaScript files (main.js, animations.js, utils.js, youtube.js, contact.js, data.js) - create .min.js versions
- [ ] T076 [P] Add loading states/skeletons for async content (YouTube videos)
- [ ] T077 [P] Add error boundary for JavaScript errors (try-catch in main.js)
- [ ] T078 [P] Implement Content Security Policy (CSP) headers via meta tag in index.html
- [ ] T079 [P] Add ARIA labels to interactive elements in index.html
- [ ] T080 [P] Verify keyboard navigation (Tab order, Enter/Space on buttons)
- [ ] T081 [P] Test color contrast ratios with Chrome DevTools (WCAG AA: 4.5:1 minimum)
- [ ] T082 Run Lighthouse audit (Performance, SEO, Accessibility, Best Practices - target >90 each)
- [ ] T083 Validate HTML with W3C Validator (https://validator.w3.org/)
- [ ] T084 Validate CSS with W3C CSS Validator
- [ ] T085 Test on mobile devices (iPhone, Android) - Safari, Chrome
- [ ] T086 Test on desktop browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- [ ] T087 Test contact form end-to-end (submit real test message to Formspree)
- [ ] T088 Update index.html to use minified CSS/JS files in production
- [ ] T089 Create CNAME file in root (if using custom domain like natanielpaiva.com.br)
- [ ] T090 Verify all external links open in new tab (target="_blank" rel="noopener")
- [ ] T091 Add Google Analytics 4 tracking code to index.html (optional)
- [ ] T092 Test GitHub Pages deployment (push to main branch, verify live site)

**Checkpoint**: Site is production-ready, optimized, and deployed to GitHub Pages

---

## Task Summary

**Total Tasks**: 92

### Task Count by Phase/User Story:
- **Phase 1 (Setup)**: 6 tasks
- **Phase 2 (Foundational)**: 8 tasks
- **Phase 3 (US1 - Hero)**: 6 tasks
- **Phase 4 (US2 - About)**: 5 tasks
- **Phase 5 (US3 - Experience)**: 4 tasks
- **Phase 6 (US4 - Courses)**: 8 tasks
- **Phase 7 (US8 - Contact)**: 9 tasks
- **Phase 8 (US9 - Footer)**: 4 tasks
- **Phase 9 (US5 - YouTube)**: 7 tasks (P2)
- **Phase 10 (US6 - Talks)**: 5 tasks (P2)
- **Phase 11 (US7 - Skills)**: 7 tasks (P2)
- **Phase 12 (Polish)**: 23 tasks

### Parallelization Opportunities:
- **Setup phase**: 5 of 6 tasks can run in parallel (T002-T006)
- **Foundational phase**: 6 of 8 tasks can run in parallel (T009-T013)
- **User stories**: Most implementation tasks within each story can be parallelized since they touch different files
- **Polish phase**: 20 of 23 tasks are fully independent and can run in parallel

### Independent Test Criteria per Story:
- **US1 (Hero)**: Open site → see name, tagline, CTA, social links
- **US2 (About)**: Scroll to About → see education, position, tech stack
- **US3 (Experience)**: Scroll to Experience → see Staff Engineer role, 13+ years
- **US4 (Courses)**: Scroll to Courses → see 17 courses, stats, clickable Udemy links
- **US8 (Contact)**: Scroll to Contact → fill form, submit, see success message
- **US9 (Footer)**: Scroll to Footer → see social links, copyright, quick nav
- **US5 (YouTube)**: Scroll to YouTube → see 3-6 videos, playable
- **US6 (Talks)**: Scroll to Talks → see topics, CTA to request talk
- **US7 (Skills)**: Scroll to Skills → see tech badges grouped by category

---

## Implementation Strategy

### MVP Scope (First Delivery):
**Phases 1-8 complete = Fully functional personal website**

Includes:
- ✅ Hero section (introduce Nataniel)
- ✅ About section (background)
- ✅ Experience section (professional history)
- ✅ Courses section (Udemy portfolio)
- ✅ Contact form (working)
- ✅ Footer (navigation & links)

### Incremental Delivery Order:
1. **Week 1**: Phases 1-2 (Setup + Foundational) → HTML structure visible
2. **Week 2**: Phases 3-5 (Hero, About, Experience) → Personal brand established
3. **Week 3**: Phases 6-8 (Courses, Contact, Footer) → **MVP READY** 🚀
4. **Week 4**: Phases 9-11 (YouTube, Talks, Skills) → Enhanced content
5. **Week 5**: Phase 12 (Polish) → Production optimization

### Dependencies:
- **Blocking**: Phases 1-2 must complete before any user story
- **User Stories**: Each user story (Phases 3-11) is independent after Phase 2
- **Suggested Order**: Follow P1 stories (Phases 3-8) before P2 stories (Phases 9-11)
- **Polish**: Can start in parallel once core user stories are functional

---

## Deployment Notes

**GitHub Pages Setup**:
1. Repository name must be: `natanielpaiva.github.io`
2. Push to `main` branch (or `gh-pages`)
3. Enable GitHub Pages in repo Settings → Pages
4. Site will be live at: `https://natanielpaiva.github.io`
5. Deploy time: ~2 minutes after push

**Custom Domain** (optional):
1. Create CNAME file with domain: `natanielpaiva.com.br`
2. Configure DNS: CNAME record pointing to `natanielpaiva.github.io`
3. Enable HTTPS in GitHub Pages settings (automatic)

**Continuous Deployment**:
- Every push to `main` → automatic rebuild and deploy
- No CI/CD configuration needed (GitHub Pages handles it)
- View deployment status in repo → Environments → github-pages

---

## Format Validation

✅ **All tasks follow checklist format**:
- [x] Every task starts with `- [ ]`
- [x] Sequential Task IDs (T001-T092)
- [x] `[P]` marker present for parallelizable tasks
- [x] `[Story]` label present for user story phases (US1-US9)
- [x] File paths included in all implementation tasks
- [x] Clear, actionable descriptions

✅ **Organization by user story**: Each phase corresponds to a specific user story from spec.md, enabling independent implementation and testing.

✅ **MVP identification**: First 8 phases (Phases 1-8) deliver a complete, deployable personal website.
