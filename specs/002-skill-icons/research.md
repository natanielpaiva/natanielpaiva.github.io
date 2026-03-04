# Research: Ícones das Habilidades Técnicas

**Date**: 2026-03-04
**Status**: Complete

## Research Summary

All NEEDS CLARIFICATION items from the spec have been resolved through the clarification session and Devicons catalog research. This document consolidates findings on icon source availability, download methodology, and custom SVG approach for architecture concepts.

## R1: Devicons Availability per Skill

**Task**: Determine which of the 19 technical skills have icons available in Devicons v2.17.0

**Findings**: The Devicons catalog (v2.17.0, 578 total icons) was analyzed against the 19 required skills. Cross-reference results:

| # | Skill | Devicons Name | Available | Variant | Notes |
|---|-------|--------------|-----------|---------|-------|
| 1 | Java | `java` | ✅ Yes | `java-original` | Colorful coffee cup logo |
| 2 | PHP | `php` | ✅ Yes | `php-original` | Purple PHP logo |
| 3 | Python | `python` | ✅ Yes | `python-original` | Blue/yellow snake logo |
| 4 | JavaScript | `javascript` | ✅ Yes | `javascript-original` | Yellow JS square |
| 5 | TypeScript | `typescript` | ✅ Yes | `typescript-original` | Blue TS square |
| 6 | Spring Framework | `spring` | ✅ Yes | `spring-original` | Green leaf logo |
| 7 | Laravel | `laravel` | ✅ Yes | `laravel-original` | Red flame logo |
| 8 | Flask | `flask` | ✅ Yes | `flask-original` | Flask/bottle logo |
| 9 | React | `react` | ✅ Yes | `react-original` | Blue atom logo |
| 10 | Angular | `angular` | ✅ Yes | `angular-original` | Red shield logo |
| 11 | React Native | `react` | ✅ Yes | `react-original` | Same atom logo as React |
| 12 | Ionic | `ionic` | ✅ Yes | `ionic-original` | Blue Ionic logo |
| 13 | MongoDB | `mongodb` | ✅ Yes | `mongodb-original` | Green leaf logo |
| 14 | MySQL | `mysql` | ✅ Yes | `mysql-original` | Blue dolphin logo |
| 15 | Oracle | `oracle` | ✅ Yes | `oracle-original` | Red Oracle text logo |
| 16 | Cassandra | `cassandra` | ✅ Yes | `cassandra-original` | Blue eye logo |
| 17 | C4 Model | N/A | ❌ No | Custom SVG | Architecture concept |
| 18 | Hexagonal Architecture | N/A | ❌ No | Custom SVG | Architecture concept |
| 19 | Microservices | N/A | ❌ No | Custom SVG | Architecture concept |

**Decision**: 16 of 19 icons available in Devicons. 3 architecture concepts require custom SVGs.
**Rationale**: Devicons provides consistent, high-quality SVG icons optimized for developer tools, with MIT license allowing free use.
**Alternatives considered**: Simple Icons (more enterprise brands but less dev-focused), SVGRepo (broader catalog but inconsistent quality), official logos (varied quality and licensing concerns).

## R2: Devicons Download Methodology

**Task**: Determine the best approach to download and store Devicons icons locally

**Findings**:

Three download approaches were evaluated:

1. **CDN via jsDelivr** (recommended for remote use):
   - URL pattern: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{name}/{name}-original.svg`
   - Pros: Always up-to-date, fast delivery
   - Cons: External dependency, not offline-capable

2. **GitHub Raw download** (recommended for local storage):
   - URL pattern: `https://raw.githubusercontent.com/devicons/devicon/master/icons/{name}/{name}-original.svg`
   - Pros: Direct file access, can download via curl/wget
   - Cons: Tied to GitHub availability during download

3. **Clone repository + extract**:
   - Clone full repo, copy needed files
   - Pros: All variants available
   - Cons: 500MB+ repo for just 16 files

**Decision**: Use GitHub Raw download (option 2) to download individual SVG files and store them locally in the repository.
**Rationale**: Meets the constraint of offline-capable (no CDN dependency at runtime). Each file is downloaded once and committed to the repo. This ensures the site works without any external dependencies.
**Alternatives considered**: CDN approach rejected because spec requires local storage (FR-003). Full repo clone rejected as excessive for 16 files.

## R3: React Native Icon Approach

**Task**: Determine how to handle React Native icon given Devicons has no separate `reactnative` icon

**Findings**:

- Devicons has a `reactnative` entry in the catalog but it's the same React atom logo
- The React and React Native logos are identical (both use the atom/orbital design)
- The `data.js` file references `react-native.svg` as the filename

**Decision**: Download the React `react-original.svg` icon and save it as both `react.svg` and `react-native.svg`.
**Rationale**: The React Native logo IS the React logo — they are visually identical. Using the same SVG for both is technically accurate and maintains visual consistency.
**Alternatives considered**: Adding a "Native" label overlay was considered but rejected as it would break visual consistency with other clean logo icons.

## R4: Spring Framework PNG Requirement

**Task**: Determine approach for Spring Framework icon since `data.js` references `spring.png` (not SVG)

**Findings**:

- `data.js` specifies `spring.png` for Spring Framework (all others use `.svg`)
- Devicons provides `spring-original.svg` as SVG
- Converting SVG to PNG requires a tool (e.g., Inkscape, ImageMagick, or browser-based conversion)
- Alternative: Change the reference in `data.js` from `.png` to `.svg`

**Decision**: Download the SVG from Devicons and convert to PNG for Spring Framework, respecting the existing `data.js` reference. Alternatively, update `data.js` to use `.svg` since the browser supports SVG natively.
**Rationale**: The spec states "Nenhuma alteração no código JavaScript é necessária" (no JS changes needed). However, changing a file extension is minimal and would be more consistent. The implementation task should decide based on simplicity.
**Alternatives considered**: Keep .png reference and convert (adds complexity), or change to .svg in data.js (simpler, more consistent, but technically a code change).

## R5: Custom SVG Design for Architecture Concepts

**Task**: Define visual design approach for the 3 custom architecture concept SVGs

**Findings**:

Based on the clarification session decision to create "simple custom SVGs":

1. **C4 Model** (`c4-model.svg`):
   - Visual: Layered diagram with 4 stacked rectangles of decreasing size (representing Context, Container, Component, Code levels)
   - Colors: Blue gradient (consistent with C4 model documentation style)
   - Approach: Simple geometric shapes, no text needed at badge size

2. **Hexagonal Architecture** (`hexagonal.svg`):
   - Visual: Single hexagon shape with inner connecting lines suggesting ports
   - Colors: Deep purple/violet (commonly associated with clean architecture diagrams)
   - Approach: Geometric hexagon with minimal internal detail

3. **Microservices** (`microservices.svg`):
   - Visual: 3-4 small connected blocks/nodes with lines between them
   - Colors: Teal/green (suggesting distributed/connected systems)
   - Approach: Simple node-and-edge diagram

**Decision**: Create minimal geometric SVGs using basic shapes (rect, polygon, circle, line) with solid colors. No text labels — icons must be recognizable at 48x48px badge size.
**Rationale**: Simple geometric designs scale well to small sizes and remain recognizable. Text would be illegible at badge size.
**Alternatives considered**: Using existing architecture diagram tools to generate complex icons (rejected — too detailed for badge size), using single-letter abbreviations like "C4", "H", "M" (rejected — less visually distinctive than geometric shapes).

## R6: Licensing

**Task**: Verify licensing compatibility for Devicons usage

**Findings**:

- Devicons is licensed under **MIT License** (https://github.com/devicons/devicon/blob/master/LICENSE)
- MIT License permits: commercial use, modification, distribution, private use
- The Devicons website states: "All product names, logos, and brands are property of their respective owners"
- Individual technology logos are trademarks of their respective companies but are used for identification purposes

**Decision**: Devicons MIT license is fully compatible with the portfolio website's use case.
**Rationale**: Portfolio site uses icons for identification/educational purposes, which falls within fair use and MIT license terms.
**Alternatives considered**: None needed — MIT is one of the most permissive licenses available.
