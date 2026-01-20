# Fontinizer: Handwritten Single‑Stroke Font Pipeline

This document outlines a software solution that converts scanned handwriting samples into a **single‑stroke (.tiff) font** with **multiple glyph variations** per character, aimed at engineering students needing math/physics symbols.

## Core Requirements

1. **Input**: scanned images of handwritten glyphs (letters, numbers, symbols, and user‑selected characters).
2. **Template**: printable forms guiding users to write each glyph and its variation count.
3. **Vectorization**: extract a **single‑stroke** path per glyph (skeletonization + stroke ordering).
4. **Font packaging**: export to a **.tiff** single‑stroke font format.
5. **Variation**: at least **4 glyph variations** per character (user‑defined) and automatic alternation at render time.

## Proposed System Overview

### 1. Template Generator
- **Character set selection**: UI to select Latin letters, digits, punctuation, and extended sets (e.g., math/physics). Includes LaTeX symbol presets (e.g., `\alpha`, `\beta`, `\int`, `\sum`).
- **Variation slots**: user chooses number of variations per glyph (minimum 4).
- **Output**: printable PDF/PNG templates with alignment boxes and labels.

### 2. Scan Import + Pre‑processing
- **Deskewing and alignment**: auto‑detect template markers (QR/ArUco tags) to align scans.
- **Segmentation**: crop each glyph cell into an individual bitmap.
- **Noise cleanup**: binarization and morphology to remove dust and background shadows.

### 3. Single‑Stroke Extraction
- **Skeletonization**: convert thick strokes to 1‑pixel skeletons.
- **Stroke ordering**: infer drawing order using path continuity + heuristics (start at endpoints, minimize sharp turns).
- **Smoothing**: optional vector smoothing to reduce jitter.

### 4. Glyph Variation Engine
- **Storage**: each glyph stores N variants (e.g., `t.alt1`, `t.alt2`, ...).
- **Runtime selection**: use alternates (e.g., OpenType `salt`/`calt` in standard fonts, or app‑level selection for .tiff if required by the target engine).
- **Avoid repetition**: ensure adjacent characters don’t reuse the same variation.

### 5. Font Export
- **Single‑stroke .tiff** export: package skeleton paths into the target format.
- **Metrics**: auto‑calculate baseline, x‑height, cap height, and spacing.

## Suggested UI Features

- **Character picker** with search (by name and LaTeX code).
- **Template preview** before printing.
- **Batch scan import** with live preview of segmentation.
- **Glyph editor** for manual corrections (merge/split strokes, adjust order).

## Recommended Tech Stack

- **Frontend**: Electron or web UI (React) for cross‑platform usability.
- **Image processing**: OpenCV + scikit‑image.
- **Vectorization**: custom graph‑based stroke tracing.
- **Font build**: custom exporter for .tiff single‑stroke format.

## Notes on LaTeX Symbols

A curated list of LaTeX symbols can be provided as presets and mapped to Unicode where possible. This enables engineering students to include physics/math characters alongside standard Latin glyphs.

## Deliverables

1. **Template generator** with LaTeX symbol support.
2. **Scan processing** to isolate each glyph.
3. **Single‑stroke extraction** into consistent vector paths.
4. **Font packaging** with multi‑variant glyphs.
5. **Preview & QA tools** to inspect output.

## Windows App Prototype (Current)

This repository now includes an Electron-based Windows desktop prototype that begins the UI workflow for selecting glyph sets, choosing variation counts, and previewing a printable template grid. The processing pipeline is still in progress, but the shell is ready for expanding scan import, segmentation, and export steps.

### Run Locally (Windows)

1. Install Node.js 20+.
2. Install dependencies: `npm install`.
3. Start the app: `npm start`.

### Current Features

- Glyph set selection (Latin, digits, punctuation, math/physics presets).
- Custom glyph entry (Unicode/LaTeX input).
- Variation count selector (minimum 4).
- Template preview grid.
