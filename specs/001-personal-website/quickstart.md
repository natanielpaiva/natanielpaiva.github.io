# Quickstart: Site Pessoal Nataniel Paiva

**Quick Reference** | **Date**: 2026-02-18

> **🌐 IMPORTANTE**: Este site é hospedado no **GitHub Pages** - um serviço gratuito de hospedagem de sites estáticos.
> Isso significa: apenas HTML/CSS/JavaScript, sem backend/servidor. Deploy automático via `git push`.

## Overview

Guia rápido para desenvolver, testar e fazer deploy do site pessoal profissional no **GitHub Pages**.

## Prerequisites

- Git instalado
- Editor de código (VS Code recomendado)
- Navegador moderno (Chrome/Firefox/Safari)
- **Conta GitHub (obrigatório para GitHub Pages hosting)**
- Formspree account (para formulário) - free tier

## Project Setup

### 1. Clone/Navigate to Repository

```bash
cd /Users/nataniel/momento-amor/natanielpaiva.github.io
git checkout 001-personal-website
```

### 2. File Structure

```
natanielpaiva.github.io/
├── index.html              # Main HTML (criar)
├── assets/
│   ├── css/
│   │   ├── style.css       # Main styles (criar)
│   │   ├── responsive.css  # Media queries (criar)
│   │   └── animations.css  # Animations (criar)
│   ├── js/
│   │   ├── main.js        # Main logic (criar)
│   │   ├── animations.js  # Scroll effects (criar)
│   │   ├── youtube.js     # YouTube integration (criar)
│   │   ├── contact.js     # Form handling (criar)
│   │   ├── data.js        # Site data (criar)
│   │   └── utils.js       # Utilities (criar)
│   └── images/
│       ├── hero-photo.jpg   # Adicionar foto principal
│       ├── about-photo.jpg  # Adicionar foto secundária
│       ├── favicon.ico      # Adicionar favicon
│       └── tech-icons/      # Adicionar ícones de tecnologias
├── sitemap.xml             # SEO (criar)
├── robots.txt              # SEO (criar)
└── README.md               # Documentation (atualizar)
```

## Development Workflow

### Phase 1: HTML Structure (MVP)

1. **Create index.html** with semantic HTML5:
   ```html
   <!DOCTYPE html>
   <html lang="pt-BR">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Nataniel Paiva - Staff Engineer & Professor</title>
     <!-- Meta tags, CSS -->
   </head>
   <body>
     <nav><!-- Navigation --></nav>
     <main>
       <section id="hero"><!-- Hero section --></section>
       <section id="about"><!-- About --></section>
       <section id="experience"><!-- Experience --></section>
       <section id="courses"><!-- Courses --></section>
       <section id="contact"><!-- Contact --></section>
     </main>
     <footer><!-- Footer --></footer>
     <!-- Scripts -->
   </body>
   </html>
   ```

2. **Open in browser**:
   ```bash
   # Simple way: double-click index.html
   # Or use Live Server extension in VS Code
   ```

### Phase 2: Styling

1. **Create CSS files**:
   - `assets/css/style.css` - Base styles, layout
   - `assets/css/responsive.css` - Media queries
   - `assets/css/animations.css` - Transitions, animations

2. **Test responsiveness**:
   - Chrome DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
   - Test: iPhone SE, iPad, Desktop (1920x1080)

### Phase 3: JavaScript Functionality

1. **Create JS modules**:
   ```javascript
   // assets/js/main.js
   import { initAnimations } from './animations.js';
   import { initContactForm } from './contact.js';
   import SiteData from './data.js';
   
   // Initialize
   document.addEventListener('DOMContentLoaded', () => {
     initAnimations();
     initContactForm();
   });
   ```

2. **Test functionality**:
   - Smooth scroll navigation
   - Form validation
   - Animations on scroll

### Phase 4: External Integrations

#### Formspree Setup

1. **Sign up**: https://formspree.io/
2. **Create form**:
   - Click "New Form"
   - Name: "Nataniel Paiva Contact"
   - Get form ID (format: `xyzabc123`)
3. **Update HTML**:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### YouTube Videos

1. **Get video IDs** from channel URLs:
   ```
   URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ID: dQw4w9WgXcQ
   ```

2. **Update data.js**:
   ```javascript
   youtubeVideos: [
     { id: "VIDEO_ID_1" },
     { id: "VIDEO_ID_2" },
     { id: "VIDEO_ID_3" }
   ]
   ```

#### Google Analytics (Optional)

1. **Create GA4 property**: https://analytics.google.com/
2. **Get Measurement ID**: G-XXXXXXXXXX
3. **Add to index.html** `<head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## Testing

### Manual Testing Checklist

#### Visual/Layout
- [ ] Hero section displays correctly
- [ ] All sections are visible and aligned
- [ ] Images load properly
- [ ] Icons/badges display correctly
- [ ] Footer links work

#### Responsiveness
- [ ] **Mobile** (< 768px): Single column, readable text, touch-friendly buttons
- [ ] **Tablet** (768-1024px): 2-column layout where appropriate
- [ ] **Desktop** (> 1024px): Full layout, optimal spacing

#### Functionality
- [ ] Smooth scroll navigation works
- [ ] Course cards clickable (open Udemy)
- [ ] YouTube embeds load/play
- [ ] Contact form:
  - [ ] Validation works (try invalid email)
  - [ ] Submit shows loading state
  - [ ] Success message displays
  - [ ] Email received

#### Performance (Chrome DevTools)
- [ ] Run Lighthouse audit:
  - Performance > 90
  - Accessibility > 95
  - Best Practices > 90
  - SEO > 95

#### Cross-browser
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge

#### Accessibility
- [ ] Tab navigation works
- [ ] Focus visible on interactive elements
- [ ] Screen reader friendly (test with browser extension)
- [ ] Alt text on all images

### Automated Testing

```bash
# HTML Validation
# Open: https://validator.w3.org/
# Upload index.html

# CSS Validation
# Open: https://jigsaw.w3.org/css-validator/
# Upload CSS files

# Lighthouse CI (opcional - requires Node.js)
npm install -g @lhci/cli
lhci autorun --config=lighthouserc.json
```

### Test URLs

**Formspree Test**:
```
Test email: your.email@example.com
Fill form and check email inbox
```

**YouTube Test**:
```
Replace VIDEO_ID with actual video from channel
Verify thumbnail loads
Click play, video should start
```

## Build & Deploy

### Pre-Deploy Checklist

- [ ] All content accurate and up-to-date
- [ ] Images optimized (< 200KB hero, < 50KB thumbnails)
- [ ] Formspree form ID updated
- [ ] Google Analytics ID added (if using)
- [ ] YouTube video IDs correct
- [ ] Social links correct
- [ ] sitemap.xml created
- [ ] robots.txt created
- [ ] README.md updated

### Deploy to GitHub Pages

#### Method 1: Via GitHub Web UI

1. **Commit changes**:
   ```bash
   git add .
   git commit -m "Initial site implementation"
   git push origin 001-personal-website
   ```

2. **Create Pull Request** (optional):
   - Go to GitHub repository
   - Click "Compare & pull request"
   - Review changes
   - Merge to `main`

3. **Or merge directly**:
   ```bash
   git checkout main
   git merge 001-personal-website
   git push origin main
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages"
   - Source: Deploy from branch `main` / root
   - Click "Save"

5. **Wait 1-2 minutes**, then visit:
   ```
   https://natanielpaiva.github.io
   ```

#### Method 2: Via Git Command Line

```bash
# Merge feature branch
git checkout main
git merge 001-personal-website

# Push to GitHub
git push origin main

# GitHub Pages auto-deploys
# Check: https://natanielpaiva.github.io
```

### Post-Deploy Verification

- [ ] Site loads at https://natanielpaiva.github.io
- [ ] HTTPS enabled (GitHub Pages default)
- [ ] All pages/sections visible
- [ ] Images load
- [ ] Forms work
- [ ] No console errors (F12 → Console)
- [ ] Test on mobile device
- [ ] Share link with friends for feedback

## Maintenance

### Content Updates

#### Adding New Course

1. Edit `assets/js/data.js`:
   ```javascript
   featuredCourses: [
     // ... existing courses
     {
       id: "new-course-id",
       title: "New Course Title",
       rating: 4.5,
       // ... other fields
     }
   ]
   ```

2. Commit and push:
   ```bash
   git add assets/js/data.js
   git commit -m "Add new course: [Course Name]"
   git push origin main
   ```

#### Adding New YouTube Video

1. Get video ID from URL
2. Edit `assets/js/data.js`:
   ```javascript
   youtubeVideos: [
     { id: "NEW_VIDEO_ID" },
     // ... existing videos (keep 3-6 total)
   ]
   ```

3. Commit and push (same as above)

#### Updating Job Position

1. Edit `assets/js/data.js`:
   ```javascript
   currentPosition: {
     role: "New Role",
     company: "New Company",
     companyUrl: "https://..."
   }
   ```

2. Commit and push

### Performance Monitoring

**Monthly checks**:
- [ ] Run Lighthouse audit (target: all scores > 90)
- [ ] Check Google Analytics (if enabled):
  - Page views
  - Bounce rate
  - Top pages
  - Course clicks
- [ ] Check Google Search Console:
  - Impressions
  - Click-through rate
  - Mobile usability issues
- [ ] Test form (send test message)

### Updates

**Quarterly**:
- [ ] Update course statistics (students, reviews)
- [ ] Refresh featured courses list
- [ ] Check and fix broken links
- [ ] Review and optimize images
- [ ] Update years of experience

**Annual**:
- [ ] Full content review
- [ ] Skills assessment (add/remove)
- [ ] Testimonials update (if added)
- [ ] Design refresh (if needed)

## Quick Commands Reference

```bash
# Development
cd natanielpaiva.github.io
git status                    # Check status
git diff                      # See changes

# Testing
# Open index.html in browser

# Deploy
git add .
git commit -m "Description"
git push origin main

# Branch management
git branch                    # List branches
git checkout -b feature-name  # New branch
git checkout main             # Switch to main
git merge feature-name        # Merge feature
```

## Troubleshooting

### Issue: Site not loading on GitHub Pages

**Check**:
1. Repository Settings → Pages → Source is set correctly
2. Branch is `main` and root directory is `/`
3. Wait 2-5 minutes for deploy to complete
4. Check repository "Actions" tab for deploy status

### Issue: Images not displaying

**Check**:
1. Image paths are correct (relative: `assets/images/...`)
2. Image files are committed and pushed
3. Check browser console for 404 errors
4. Verify image file extensions match HTML (`jpg` vs `jpeg`)

### Issue: Form not working

**Check**:
1. Formspree form ID is correct
2. Form action URL is correct: `https://formspree.io/f/YOUR_ID`
3. Check browser console for CORS errors
4. Verify Formspree account is active

### Issue: YouTube videos not loading

**Check**:
1. Video IDs are correct (11 characters)
2. Videos are public and embeddable
3. Check browser console for errors
4. Try different video ID to isolate issue

### Issue: Poor Lighthouse scores

**Performance**:
- Optimize images (compress, WebP format)
- Minify CSS/JavaScript
- Remove unused code
- Add lazy loading to images

**Accessibility**:
- Add alt text to images
- Check color contrast
- Ensure keyboard navigation works
- Add ARIA labels where needed

**SEO**:
- Add meta description
- Add Open Graph tags
- Create sitemap.xml
- Add structured data (Schema.org)

## Resources

### Documentation
- **Spec**: `specs/001-personal-website/spec.md`
- **Plan**: `specs/001-personal-website/plan.md`
- **Research**: `specs/001-personal-website/research.md`
- **Data Model**: `specs/001-personal-website/data-model.md`
- **Contracts**: `specs/001-personal-website/contracts/`

### Tools
- **HTML Validator**: https://validator.w3.org/
- **CSS Validator**: https://jigsaw.w3.org/css-validator/
- **Image Optimizer**: https://squoosh.app/
- **Lighthouse**: Chrome DevTools (F12 → Lighthouse tab)
- **Formspree**: https://formspree.io/
- **Google Analytics**: https://analytics.google.com/

### References
- **GitHub Pages**: https://docs.github.com/en/pages
- **YouTube IFrame API**: https://developers.google.com/youtube/iframe_api_reference
- **Formspree Docs**: https://formspree.io/docs/
- **Web.dev**: https://web.dev/ (performance tips)
- **MDN Web Docs**: https://developer.mozilla.org/

## Support

**Issues or questions**:
1. Check troubleshooting section above
2. Review documentation in `specs/` directory
3. Check browser console for errors
4. Google error messages
5. Ask for help in team chat

---

**Version**: 1.0  
**Last Updated**: 2026-02-18  
**Next**: Run `/speckit.tasks` to generate task breakdown
