# Implementation Plan: Ícones das Habilidades Técnicas

**Branch**: `002-skill-icons` | **Date**: 2026-03-04 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-skill-icons/spec.md`

## Summary

Add 19 technical skill icons to the portfolio website by downloading colorful original logos from Devicons (16 icons) and creating 3 custom SVGs for architecture concepts. The existing code in `data.js` and `main.js` already references the correct paths and has fallback handling — only the image files need to be placed in `assets/images/tech-icons/`.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript ES6+ (no build step)
**Primary Dependencies**: None (static site, no frameworks)
**Storage**: Local files in `assets/images/tech-icons/`
**Testing**: Manual browser testing (visual inspection + console error check)
**Target Platform**: Web — GitHub Pages, all modern browsers
**Project Type**: Single static website
**Performance Goals**: Icon loading adds < 1 second to page load
**Constraints**: SVG preferred, images must be < 50KB each, offline-capable (no CDN dependency)
**Scale/Scope**: 19 icon files (16 from Devicons + 3 custom SVGs)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is a blank template with no custom rules defined. All gates pass by default.

- No principle violations detected
- No complexity thresholds defined to exceed
- No architectural constraints to validate against

**Result**: ✅ PASS (no constitution rules to evaluate)

## Project Structure

### Documentation (this feature)

```text
specs/002-skill-icons/
├── plan.md              # This file
├── research.md          # Phase 0 output - Devicons availability research
├── data-model.md        # Phase 1 output - Icon entity model
├── quickstart.md        # Phase 1 output - Implementation guide
├── contracts/           # Phase 1 output
│   └── devicons-cdn.md  # Devicons CDN/download contract
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
assets/images/tech-icons/     # NEW directory - 19 icon files
├── java.svg                  # Devicons: java-original.svg
├── php.svg                   # Devicons: php-original.svg
├── python.svg                # Devicons: python-original.svg
├── javascript.svg            # Devicons: javascript-original.svg
├── typescript.svg            # Devicons: typescript-original.svg
├── spring.png                # Devicons: spring-original.svg → convert to PNG
├── laravel.svg               # Devicons: laravel-original.svg
├── flask.svg                 # Devicons: flask-original.svg
├── react.svg                 # Devicons: react-original.svg
├── angular.svg               # Devicons: angular-original.svg
├── react-native.svg          # Devicons: react-original.svg (shared with React)
├── ionic.svg                 # Devicons: ionic-original.svg
├── mongodb.svg               # Devicons: mongodb-original.svg
├── mysql.svg                 # Devicons: mysql-original.svg
├── oracle.svg                # Devicons: oracle-original.svg
├── cassandra.svg             # Devicons: cassandra-original.svg
├── c4-model.svg              # Custom SVG: layered diagram
├── hexagonal.svg             # Custom SVG: hexagon shape
└── microservices.svg         # Custom SVG: connected blocks
```

**Structure Decision**: No source code directories needed. This feature only adds image files to the existing `assets/images/` directory. The `tech-icons/` subdirectory will be created as a new folder under the existing images directory.

## Complexity Tracking

No violations to justify — constitution has no custom rules defined.
