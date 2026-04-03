# Environmental Institutional Design System

## 1. Overview & Creative North Star

### Creative North Star: "The Ecological Authority"
This design system moves beyond the standard "administrative dashboard" to create a high-end, editorial-inspired interface for environmental governance. It balances the rigidity of institutional data with the organic vitality of environmental technology. By utilizing sophisticated layering and high-contrast typography, we transform a data-heavy survey platform into a prestigious digital experience that feels both authoritative and innovative.

**Breaking the Template:**
Unlike traditional government portals that rely on heavy borders and dense grids, this system uses **intentional asymmetry** and **tonal depth**. We prioritize breathing room (white space) as a functional element, allowing complex environmental data to be processed without cognitive fatigue. The layout feels "curated" rather than "generated," moving away from the generic box-model toward a more fluid, layered architectural style.

---

## 2. Colors

The color strategy uses a deep institutional green as its anchor, supported by a sophisticated palette of neutral surfaces and subtle environmental accents.

### Color Tokens (Material Convention)
*   **Primary (`#006b53`):** The core institutional green. Used for high-level brand moments and key interactive states.
*   **Primary Container (`#3cb391`):** A vibrant, eco-tech green used for main action buttons and active indicators.
*   **Surface (`#f8f9fb`):** The base canvas—a cool, clean off-white that prevents screen glare.
*   **Secondary Container (`#bae6fc`):** A subtle blue accent reserved for informational callouts and info cards.

### The "No-Line" Rule
To achieve a premium editorial feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts or subtle tonal transitions. 
*   *Instead of a bordered sidebar:* Use `surface-container-low` for the sidebar against a `surface` main content area.
*   *Instead of bordered table rows:* Use alternating `surface-container-lowest` and `surface-container-low` backgrounds.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use surface tiers to define depth without visual clutter:
1.  **Canvas:** `surface` (#f8f9fb)
2.  **Sectioning:** `surface-container-low` (#f2f4f6)
3.  **Floating Elements/Cards:** `surface-container-lowest` (#ffffff)

### The "Glass & Gradient" Rule
For elevated components like login modals or floating action headers, use **Glassmorphism**. Apply a semi-transparent `surface` color with a `20px` backdrop-blur. 
**Signature Textures:** For primary CTAs, use a subtle linear gradient (135°) from `primary` to `primary-container`. This adds a "soul" to the UI that flat blocks cannot replicate.

---

## 3. Typography

The system uses a dual-font strategy to balance international prestige with administrative clarity.

*   **Display & Headline (Manrope):** A modern sans-serif with geometric foundations. Used for large data points and page titles to convey technological precision.
*   **Body & Label (Inter):** A highly legible sans-serif optimized for both English and Chinese characters. It ensures that technical survey questions and legal fine print remain readable at small scales.

### Hierarchy & Brand Identity
*   **Bold Data Points:** Large `display-md` weights are used for key statistics (e.g., "58 Environment Technologies") to create an authoritative "Editorial Dashboard" look.
*   **Intentional Contrast:** Pair a `label-md` in `on-surface-variant` (grey) with a `title-lg` in `primary` (green) to create a clear informational hierarchy that guides the user's eye toward the most critical data first.

---

## 4. Elevation & Depth

We convey importance through **Tonal Layering** rather than traditional structural lines or heavy shadows.

### The Layering Principle
Depth is achieved by "stacking" surface tiers. Place a `surface-container-lowest` (pure white) card on a `surface-container-low` (pale grey) background. This creates a soft, natural lift that feels integrated into the environment.

### Ambient Shadows
When an element must float (e.g., a modal or a primary dropdown), use **Ambient Shadows**:
*   **Blur:** 24px to 40px.
*   **Opacity:** 4% to 8%.
*   **Color:** Tint the shadow with a hint of `primary` or `secondary` rather than pure black to mimic natural light passing through an environmental filter.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use a **Ghost Border**: `outline-variant` at **20% opacity**. Never use 100% opaque borders for decorative containment.

---

## 5. Components

### Buttons
*   **Primary:** Uses the "Signature Texture" gradient. Rounded corners at `md` (6px). High contrast text in `on-primary`.
*   **Secondary:** Ghost style. No background, `outline-variant` (20%) border, `primary` text.
*   **States:** On focus, increase the shadow spread rather than changing the border color to maintain the "No-Line" aesthetic.

### Cards & Data Modules
*   **Standard Card:** Background `surface-container-lowest`, Corner Radius `lg` (8px). 
*   **Forbid Dividers:** Do not use horizontal lines to separate card content. Use **24px vertical white space** or a 4px `primary` accent bar on the left edge of the card to indicate sections.

### Form Inputs
*   **Default State:** `surface-container-lowest` background with a subtle 1px `outline-variant` (20%).
*   **Focus State:** The border opacity increases to 100% `primary`, and a soft 4px `primary-fixed` "glow" (ambient shadow) is applied.
*   **Error State:** Border becomes `error`, with a `error-container` background tint.

### Data Status Chips
*   **Action Chips:** Use `secondary-container` for background with `on-secondary-container` text. This provides the "subtle blue accent" requested for information cards without overwhelming the green primary brand.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical padding in headers to create an editorial, non-template feel.
*   **Do** use "Environmental Blue" (`secondary-container`) for informational badges to differentiate from "Institutional Green" (`primary`).
*   **Do** lean on `display-lg` typography for single, impactful numbers.

### Don't
*   **Don't** use 1px solid black or dark grey borders to separate sections.
*   **Don't** use standard "drop shadows" (e.g., `0 2px 4px rgba(0,0,0,0.5)`).
*   **Don't** crowd the layout. If a section feels busy, increase the background tonal contrast instead of adding lines.
*   **Don't** use rounded corners larger than 12px or smaller than 4px; maintain the "Administrative Modern" balance.