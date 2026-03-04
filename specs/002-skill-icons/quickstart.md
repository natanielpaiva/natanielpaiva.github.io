# Quickstart: Ícones das Habilidades Técnicas

**Date**: 2026-03-04
**Estimated effort**: ~1 hour

## Prerequisites

- Git (repository already cloned)
- curl or wget (for downloading icons)
- A text editor (for custom SVGs)
- A web browser (for visual testing)
- Optional: ImageMagick or similar tool (only if keeping `spring.png` format)

## Step-by-Step Implementation

### Step 1: Create the target directory

```bash
cd /Users/nataniel.amorim/Documents/meugithub/natanielpaiva.github.io
mkdir -p assets/images/tech-icons
```

### Step 2: Download Devicons icons (14 unique SVGs)

```bash
BASE="https://raw.githubusercontent.com/devicons/devicon/master/icons"
DEST="assets/images/tech-icons"

# Languages
curl -sL "$BASE/java/java-original.svg" -o "$DEST/java.svg"
curl -sL "$BASE/php/php-original.svg" -o "$DEST/php.svg"
curl -sL "$BASE/python/python-original.svg" -o "$DEST/python.svg"
curl -sL "$BASE/javascript/javascript-original.svg" -o "$DEST/javascript.svg"
curl -sL "$BASE/typescript/typescript-original.svg" -o "$DEST/typescript.svg"

# Backend Frameworks
curl -sL "$BASE/laravel/laravel-original.svg" -o "$DEST/laravel.svg"
curl -sL "$BASE/flask/flask-original.svg" -o "$DEST/flask.svg"

# Frontend Frameworks
curl -sL "$BASE/react/react-original.svg" -o "$DEST/react.svg"
curl -sL "$BASE/angular/angular-original.svg" -o "$DEST/angular.svg"

# Mobile
curl -sL "$BASE/ionic/ionic-original.svg" -o "$DEST/ionic.svg"

# Databases
curl -sL "$BASE/mongodb/mongodb-original.svg" -o "$DEST/mongodb.svg"
curl -sL "$BASE/mysql/mysql-original.svg" -o "$DEST/mysql.svg"
curl -sL "$BASE/oracle/oracle-original.svg" -o "$DEST/oracle.svg"
curl -sL "$BASE/cassandra/cassandra-original.svg" -o "$DEST/cassandra.svg"
```

### Step 3: Create React Native copy

```bash
cp "$DEST/react.svg" "$DEST/react-native.svg"
```

### Step 4: Handle Spring Framework icon

**Option A** (recommended — simpler): Update `data.js` to use SVG

```bash
curl -sL "$BASE/spring/spring-original.svg" -o "$DEST/spring.svg"
```

Then change line 80 in `assets/js/data.js`:
```javascript
// FROM:
icon: "assets/images/tech-icons/spring.png"
// TO:
icon: "assets/images/tech-icons/spring.svg"
```

**Option B** (no code changes): Convert SVG to PNG

```bash
curl -sL "$BASE/spring/spring-original.svg" -o /tmp/spring-original.svg
# Using ImageMagick:
convert -background none -size 128x128 /tmp/spring-original.svg "$DEST/spring.png"
# Or using rsvg-convert:
rsvg-convert -w 128 -h 128 /tmp/spring-original.svg > "$DEST/spring.png"
```

### Step 5: Create custom architecture SVGs

Create 3 minimal SVG files for the architecture concepts:

**`assets/images/tech-icons/c4-model.svg`** — Layered diagram (4 stacked rectangles):
- Blue color scheme (#1168BD)
- 4 rectangles of decreasing width representing Context, Container, Component, Code

**`assets/images/tech-icons/hexagonal.svg`** — Hexagon shape:
- Purple/violet color scheme (#6B21A8)
- Central hexagon with small circles at vertices suggesting ports/adapters

**`assets/images/tech-icons/microservices.svg`** — Connected blocks:
- Teal/green color scheme (#0D9488)
- 3-4 small rounded rectangles connected by lines

Each SVG should:
- Use `viewBox="0 0 128 128"` for consistency with Devicons
- Be under 5KB in size
- Be visually clear at 48x48px rendering

### Step 6: Verify all files exist

```bash
ls -la assets/images/tech-icons/
# Expected: 19 files (16 SVG + 1 PNG or 17 SVG + 2 copies)
```

### Step 7: Test in browser

1. Open `index.html` in a browser
2. Navigate to the Skills section
3. Verify all 19 icons display correctly
4. Open browser DevTools → Console → Check for 404 errors
5. Test on mobile viewport (320px width)

## Verification Checklist

- [ ] `assets/images/tech-icons/` directory exists with 19 files
- [ ] All 16 Devicons icons render as colorful logos
- [ ] 3 custom architecture SVGs are visually recognizable at badge size
- [ ] No 404 errors in browser console for icon files
- [ ] Icons display correctly on desktop (1920px) and mobile (320px)
- [ ] Page load time not noticeably affected
- [ ] Fallback still works if an icon file is manually removed (test by renaming one)

## Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Icon shows placeholder | File missing or wrong filename | Check filename matches `data.js` icon path |
| Icon is blank/white | SVG has no fill or uses currentColor | Use `-original` variant (has embedded colors) |
| Icon too large/slow | Large PNG file | Use SVG format or optimize PNG |
| Spring icon not showing | `.png` extension but file is `.svg` | Either convert to PNG or update `data.js` |
| CORS error in console | Opening file:// directly | Use a local server: `python3 -m http.server` |
