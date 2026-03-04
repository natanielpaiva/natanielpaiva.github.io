# Contract: Devicons CDN / GitHub Raw Download

**Date**: 2026-03-04
**Type**: External Resource Download (build-time only, not runtime)

## Overview

This contract documents the Devicons icon download URLs used during implementation to obtain SVG icon files. These URLs are used **only at build/implementation time** — the final site serves icons locally from `assets/images/tech-icons/`.

## Source Repository

- **Repository**: https://github.com/devicons/devicon
- **Version**: v2.17.0 (latest at time of planning)
- **License**: MIT
- **Total icons available**: 578

## Download URL Pattern

### GitHub Raw (Primary — for downloading individual files)

```
https://raw.githubusercontent.com/devicons/devicon/master/icons/{ICON_NAME}/{ICON_NAME}-{VARIANT}.svg
```

**Parameters**:
- `{ICON_NAME}`: Devicons icon identifier (lowercase, e.g., `java`, `python`, `react`)
- `{VARIANT}`: Visual variant — use `original` for colorful logos

**Example**:
```
https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg
```

### jsDelivr CDN (Alternative — for reference/preview)

```
https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{ICON_NAME}/{ICON_NAME}-{VARIANT}.svg
```

## Available Variants

Each Devicons icon may have multiple variants:

| Variant | Description | Use Case |
|---------|-------------|----------|
| `original` | Full-color official logo | ✅ **Selected** — matches clarification decision |
| `original-wordmark` | Full-color with text label | Not used — text illegible at badge size |
| `plain` | Single-color simplified | Not used — clarification chose colorful |
| `plain-wordmark` | Single-color with text | Not used |
| `line` | Outline/line art style | Not used |
| `line-wordmark` | Outline with text | Not used |

## Download Commands

### Batch download script (curl)

```bash
#!/bin/bash
# Download all 16 Devicons icons to assets/images/tech-icons/
DEST="assets/images/tech-icons"
BASE="https://raw.githubusercontent.com/devicons/devicon/master/icons"
mkdir -p "$DEST"

# Map: local_filename=devicons_name
declare -A ICONS=(
  ["java.svg"]="java/java-original.svg"
  ["php.svg"]="php/php-original.svg"
  ["python.svg"]="python/python-original.svg"
  ["javascript.svg"]="javascript/javascript-original.svg"
  ["typescript.svg"]="typescript/typescript-original.svg"
  ["laravel.svg"]="laravel/laravel-original.svg"
  ["flask.svg"]="flask/flask-original.svg"
  ["react.svg"]="react/react-original.svg"
  ["angular.svg"]="angular/angular-original.svg"
  ["ionic.svg"]="ionic/ionic-original.svg"
  ["mongodb.svg"]="mongodb/mongodb-original.svg"
  ["mysql.svg"]="mysql/mysql-original.svg"
  ["oracle.svg"]="oracle/oracle-original.svg"
  ["cassandra.svg"]="cassandra/cassandra-original.svg"
)

for local in "${!ICONS[@]}"; do
  echo "Downloading $local..."
  curl -sL "$BASE/${ICONS[$local]}" -o "$DEST/$local"
done

# React Native uses the same icon as React
cp "$DEST/react.svg" "$DEST/react-native.svg"

# Spring needs PNG conversion (or change data.js to .svg)
curl -sL "$BASE/spring/spring-original.svg" -o "$DEST/spring-original.svg"
echo "Spring SVG downloaded — convert to spring.png or update data.js to use .svg"

echo "Done! Downloaded ${#ICONS[@]} icons + 1 copy (react-native) + 1 pending (spring)"
```

## Response Format

Each download returns a raw SVG file:

- **Content-Type**: `image/svg+xml`
- **Typical size**: 2KB–30KB per icon
- **ViewBox**: `0 0 128 128` (Devicons standard)
- **Encoding**: UTF-8

## Error Handling

| HTTP Status | Meaning | Action |
|-------------|---------|--------|
| 200 | Success | Save file locally |
| 404 | Icon name/variant not found | Check Devicons catalog for correct name |
| 403 | Rate limited | Wait and retry, or use jsDelivr CDN |
| 5xx | GitHub server error | Retry after delay |

## Runtime Behavior

At runtime (when a user visits the website):

- Icons are served from `assets/images/tech-icons/` via GitHub Pages
- **No external API calls** are made to Devicons or any CDN
- If an icon file is missing or fails to load, `main.js` `createSkillBadge()` triggers `onerror` fallback:
  ```javascript
  onerror="this.src='https://via.placeholder.com/48?text=${skill.name.charAt(0)}'"
  ```
