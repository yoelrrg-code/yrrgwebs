---
name: YRRG.ai
description: Smart Website System para Latinoamérica
colors:
  primary: "#00b231"
  primary-hover: "#008f27"
  primary-light: "#33cf5e"
  secondary: "#2fa4e3"
  secondary-hover: "#1e88c2"
  neutral-bg: "#070d14"
  neutral-surface: "#0e1724"
  neutral-border: "#1b2a3d"
  neutral-text: "#f7fafc"
  neutral-muted: "#94a6b8"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1.18
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.22
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.68
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.neutral-text}"
  button-secondary:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  card-surface:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.lg}"
    padding: "24px 24px"
  badge-telemetry:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
---

# Design System: YRRG.ai

## Overview

**Creative North Star: "The Edge Terminal"**

The Edge Terminal visual identity reflects high-velocity engineering precision, enterprise robustness, and zero-friction operational authority. Rooted in developer tooling aesthetics, the canvas is an abyss of deep Obsidian (`#070d14`) punctuated by tactical Slate surfaces (`#0e1724`), razor-sharp hairline Steel borders (`#1b2a3d`), and active pulse signals in Telemetry Emerald (`#00b231`) and Electric Indigo (`#2fa4e3`).

The system avoids the pastel softness of generic B2B SaaS in favor of technical high-density clarity: dark-mode only, legible typography pairings with dedicated monospace telemetry data, and subtle 44px cybernetic background grids. The experience communicates instant speed, transparent deployment, and complete mechanical control.

**Key Characteristics:**
- High-contrast obsidian dark palette with emerald and indigo status luminescence
- Typographic hierarchy separating assertive marketing display from precise monospace telemetry
- Tonal depth created with hairline steel borders and subtle backdrop-blur rather than heavy drop shadows
- Interactive responsiveness featuring micro-elevations, pulsing status rings, and live messaging simulations

## Colors

The palette combines deep nocturnal space with active laser-like telemetry accents, emphasizing performance and technological superiority.

### Primary
- **Telemetry Emerald** (`#00b231` / hover `#008f27` / light `#33cf5e`): Used for primary calls-to-action, success states, live indicators, performance metric callouts, and conversion highlights. Represents operational speed and uptime.

### Secondary
- **Electric Indigo** (`#2fa4e3` / hover `#1e88c2`): Used for secondary accents, segment badges (Enterprise, B2B), technical infrastructure links, and complementary gradient stops. Represents connectivity and platform stability.

### Neutral
- **Obsidian Canvas** (`#070d14`): The foundational canvas for the entire application, eliminating eye strain and framing high-contrast elements.
- **Slate Surface** (`#0e1724`): The elevated container background for cards, simulator dialogs, and navigation drawers.
- **Steel Border** (`#1b2a3d`): The hairline separator for containers, cards, tables, and dropdown boundaries.
- **Snow Text** (`#f7fafc`): Primary high-contrast typography color for headings, button text on dark surfaces, and prominent statements.
- **Cool Gray Muted** (`#94a6b8`): Secondary body typography, metadata labels, icon strokes, and unselected navigation states.

### Named Rules
**The Telemetry Rarity Rule.** Telemetry Emerald is strictly a signal color. It is applied to no more than 10% of any viewport to preserve its punch as a conversion trigger and live indicator.
**The Dual-Accent Division Rule.** Telemetry Emerald always signals action, speed, or performance; Electric Indigo always signals structural categorization, segments, or informational links. Never invert their roles.

## Typography

**Display Font:** Plus Jakarta Sans (with `sans-serif` fallback)  
**Body Font:** Inter (with `sans-serif` fallback)  
**Label/Mono Font:** JetBrains Mono (with `monospace` fallback)  

**Character:** Bold, geometric, and modern in headings to establish authority; neutral, highly legible, and comfortable in body copy; precise, technical, and tabular in monospace telemetry data.

### Hierarchy
- **Display** (800 Extrabold, `3.75rem` / `60px`, line-height `1.18`, letter-spacing `-0.025em`): Hero headlines and major value propositions.
- **Headline** (800 Extrabold, `2.25rem` / `36px`, line-height `1.22`, letter-spacing `-0.02em`): Section titles and modal headers.
- **Title** (700 Bold, `1.25rem` / `20px`, line-height `1.3`, letter-spacing `-0.01em`): Card titles, feature names, and dialog headers.
- **Body** (400 Regular / 500 Medium, `1rem` / `16px`, line-height `1.68`): Explanatory paragraphs, lists, and form labels (max line length 65–75ch).
- **Label** (600 SemiBold, `0.75rem` / `12px`, letter-spacing `0.05em`, uppercase): Eyebrow badges, telemetry metrics, timestamps, and status chips.

### Named Rules
**The Monospace Proof Rule.** All quantitative metrics (PageSpeed scores, latencies, percentages, pricing tiers, timestamps) must be rendered in JetBrains Mono. Numbers are technical proof, not marketing prose.

## Layout

- **Spatial Grid:** 8px base grid rhythm with 44px × 44px subtle background grid lines (`rgba(27, 42, 61, 0.36)`).
- **Container Constraints:** Main content wraps within max-width `80rem` (`1280px` / `max-w-7xl`), with generous horizontal padding (`16px` mobile, `24px` tablet, `32px` desktop).
- **Vertical Spacing:** Substantial section breathing room (`py-24` to `py-32` / `96px`–`128px`) to enforce enterprise visual gravity.
- **Density:** Balanced high-density information display in dashboards and comparison cards with expansive breathing room in hero and narrative sections.

## Elevation & Depth

Depth is established primarily through tonal stratification and hairline steel borders rather than diffused drop shadows, preserving an architectural and engineered feel.

### Shadow Vocabulary
- **Ambient Glow** (`box-shadow: 0 0 22px -2px rgba(0, 178, 49, 0.32), 0 8px 20px -4px rgba(0, 178, 49, 0.18)`): Dynamic hover and pulse state on primary conversion CTAs.
- **Interactive Card Lift** (`box-shadow: 0 0 35px -5px rgba(0, 178, 49, 0.16)`): Applied on card hover alongside a `-4px` vertical transform.
- **Dropdown Overlay** (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6)`): Applied to elevated menus, floating simulator windows, and mobile navigation sheets.

### Named Rules
**The Flat-By-Default Rule.** All surfaces rest completely flat on the Obsidian canvas. Shadows and luminous glows exist only as reactive responses to user interaction, active polling, or live telemetry states.

## Shapes

- **Base Radius:** `12px` (`rounded-xl`) for buttons, inputs, and standard interactive controls.
- **Container Radius:** `16px` (`rounded-2xl`) to `24px` (`rounded-3xl`) for cards, modular sections, and dialog panels.
- **Pill Radius:** `9999px` (`rounded-full`) for status tags, metric badges, and avatars.
- **Asymmetrical Messaging Corner:** Chat simulation bubbles feature a collapsed top-right corner (`rounded-2xl rounded-tr-sm`) to denote client transmission.

## Components

### Buttons
- **Shape:** Medium curved corners (`12px` / `rounded-xl`).
- **Primary:** Background Telemetry Emerald (`#00b231`), text Obsidian (`#070d14`), padding `16px 32px` (`px-8 py-4`), font-weight 700. On hover: scale `1.02`, background Emerald Hover (`#008f27`), text Snow (`#f7fafc`), shadow `0 0 22px -2px rgba(0, 178, 49, 0.32)`.
- **Secondary:** Background Slate Surface (`#0e1724`), border `1px solid #1b2a3d`, text Snow (`#f7fafc`), padding `16px 32px`. On hover: border Electric Indigo (`#2fa4e3`), background `#0e1724`/80.
- **Ghost:** Background transparent, text Cool Gray (`#94a6b8`), padding `8px 16px`. On hover: background `#0e1724`, text Snow (`#f7fafc`).

### Chips & Badges
- **Style:** Background `#00b231`/10, border `1px solid #00b231`/35, text Telemetry Emerald (`#00b231`), font JetBrains Mono `12px`, padding `6px 14px`, shape `rounded-full`.
- **Informational Variant:** Background `#2fa4e3`/10, border `1px solid #2fa4e3`/35, text Electric Indigo (`#2fa4e3`).

### Cards / Containers
- **Corner Style:** `16px` (`rounded-2xl`) or `24px` (`rounded-3xl`).
- **Background:** Slate Surface `#0e1724`/90 with `backdrop-blur-md`.
- **Border:** `1px solid #1b2a3d`.
- **Internal Padding:** `20px` to `36px` (`p-5` to `p-9`).
- **Interaction:** On hover, lifts `-4px` (`translateY(-4px)`) with subtle emerald border lighting.

### Inputs / Fields
- **Style:** Background `#070d14`, border `1px solid #1b2a3d`, radius `12px`, text `#f7fafc`, placeholder `#94a6b8`/60, padding `12px 16px`.
- **Focus:** Border `#00b231`, outline none, subtle emerald ring glow (`0 0 0 2px rgba(0, 178, 49, 0.2)`).

### Navigation
- **Header:** Sticky top `0`, background `#070d14`/85, backdrop-blur `xl`, bottom border `1px solid #1b2a3d`/80.
- **Links:** JetBrains Mono or Inter medium `14px`, text `#f7fafc`/90, hover text `#00b231`.
- **Dropdown Menu:** Background `#0e1724`/95, border `#1b2a3d`, rounded `16px`, shadow `2xl`.

### Signature Component: Live WhatsApp & AI Simulator
- **Visuals:** Split viewport featuring real-time client audio/message simulation on the left and live agent execution logs plus instant web preview on the right.
- **Telemetry Indicators:** Pulsing typing dots (`animate-typingDot`), green live badge, and stopwatch calculating elapsed minutes.

## Do's and Don'ts

### Do:
- **Do** format all performance scores, latencies, metrics, and timestamps in JetBrains Mono.
- **Do** use hairline steel borders (`#1b2a3d`) on all cards to maintain visual separation on dark backgrounds.
- **Do** restrict Telemetry Emerald to active CTAs, success metrics, and real-time indicators.
- **Do** use subtle background radial glows (`rgba(0, 178, 49, 0.15)`) behind hero and signature sections to create atmospheric depth.

### Don't:
- **Don't** introduce light-mode backgrounds, pure white cards, or pastel fills.
- **Don't** use generic decorative serif fonts or playful handwritten styles.
- **Don't** use heavy drop shadows without steel borders; depth on dark canvases must be structural.
- **Don't** color body paragraphs in pure `#ffffff`; always use Snow (`#f7fafc`) or Cool Gray (`#94a6b8`) for contrast balance.
