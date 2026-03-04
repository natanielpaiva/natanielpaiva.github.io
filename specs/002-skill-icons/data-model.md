# Data Model: Ícones das Habilidades Técnicas

**Date**: 2026-03-04
**Status**: Complete

## Entity: Skill Icon (File-based)

This feature uses file-based storage — no database entities. Each icon is a static image file stored in the repository.

### Icon File Entity

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| filename | string | File name including extension | Must match `data.js` icon path (e.g., `java.svg`) |
| format | enum | `svg` or `png` | SVG preferred; PNG only for Spring Framework |
| source | enum | `devicons` or `custom` | 16 from Devicons, 3 custom |
| devicons_name | string? | Devicons icon identifier | e.g., `java-original`; null for custom icons |
| dimensions | string | SVG viewBox or PNG pixel size | SVG: `viewBox="0 0 128 128"`; min 48x48 rendering |
| license | string | License type | MIT (Devicons) or custom (self-created) |

### Existing Entity: Technical Skill (in `data.js`)

Already defined in `assets/js/data.js` — no modifications needed.

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| id | string | Unique skill identifier | `"java"` |
| name | string | Display name | `"Java"` |
| category | string | Skill category | `"language"` |
| proficiency | string | Skill level | `"expert"` |
| icon | string | Relative path to icon file | `"assets/images/tech-icons/java.svg"` |

### Relationship

```
Technical Skill (data.js)  1 ──── 1  Icon File (filesystem)
     │                                      │
     │ icon: "assets/images/tech-icons/     │ Location: assets/images/tech-icons/
     │        {filename}"                   │ {filename}
     └──────────────────────────────────────┘
```

Each Technical Skill references exactly one Icon File via the `icon` field path. The relationship is implicit (file path reference, not a foreign key).

### Validation Rules

1. **Filename match**: Icon filename MUST match the path suffix in `data.js` `icon` field
2. **Format constraint**: File extension MUST be `.svg` or `.png`
3. **Size constraint**: File size SHOULD be under 50KB for performance
4. **Viewbox**: SVG files SHOULD use `viewBox="0 0 128 128"` (Devicons standard) for consistency
5. **Rendering**: Icons MUST be visually clear at 48x48px rendering size

### Complete Icon Inventory

| filename | format | source | devicons_name | category |
|----------|--------|--------|---------------|----------|
| java.svg | svg | devicons | java-original | language |
| php.svg | svg | devicons | php-original | language |
| python.svg | svg | devicons | python-original | language |
| javascript.svg | svg | devicons | javascript-original | language |
| typescript.svg | svg | devicons | typescript-original | language |
| spring.png | png | devicons | spring-original | framework-backend |
| laravel.svg | svg | devicons | laravel-original | framework-backend |
| flask.svg | svg | devicons | flask-original | framework-backend |
| react.svg | svg | devicons | react-original | framework-frontend |
| angular.svg | svg | devicons | angular-original | framework-frontend |
| react-native.svg | svg | devicons | react-original | mobile |
| ionic.svg | svg | devicons | ionic-original | mobile |
| mongodb.svg | svg | devicons | mongodb-original | database |
| mysql.svg | svg | devicons | mysql-original | database |
| oracle.svg | svg | devicons | oracle-original | database |
| cassandra.svg | svg | devicons | cassandra-original | database |
| c4-model.svg | svg | custom | — | architecture |
| hexagonal.svg | svg | custom | — | architecture |
| microservices.svg | svg | custom | — | architecture |

### State Transitions

Not applicable — icon files are static assets with no state changes. They are either present (icon displays) or absent (fallback displays).

| State | Condition | Visual Result |
|-------|-----------|---------------|
| Missing | File not in `tech-icons/` | Placeholder with initial letter |
| Present | File exists and loads | Technology icon displayed |
| Error | File exists but corrupt/invalid | Fallback triggered by `onerror` |
