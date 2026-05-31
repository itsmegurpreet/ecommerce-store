---
name: SmartDeskHub Design System
colors:
    surface: "#fbf9f4"
    surface-dim: "#dbdad5"
    surface-bright: "#fbf9f4"
    surface-container-lowest: "#ffffff"
    surface-container-low: "#f5f3ee"
    surface-container: "#f0eee9"
    surface-container-high: "#eae8e3"
    surface-container-highest: "#e4e2dd"
    on-surface: "#1b1c19"
    on-surface-variant: "#444748"
    inverse-surface: "#30312e"
    inverse-on-surface: "#f2f1ec"
    outline: "#747878"
    outline-variant: "#c4c7c7"
    surface-tint: "#5f5e5e"
    primary: "#000000"
    on-primary: "#ffffff"
    primary-container: "#1c1b1b"
    on-primary-container: "#858383"
    inverse-primary: "#c8c6c5"
    secondary: "#006972"
    on-secondary: "#ffffff"
    secondary-container: "#9ff0fb"
    on-secondary-container: "#066f79"
    tertiary: "#000000"
    on-tertiary: "#ffffff"
    tertiary-container: "#1c1c16"
    on-tertiary-container: "#86847c"
    error: "#ba1a1a"
    on-error: "#ffffff"
    error-container: "#ffdad6"
    on-error-container: "#93000a"
    primary-fixed: "#e5e2e1"
    primary-fixed-dim: "#c8c6c5"
    on-primary-fixed: "#1c1b1b"
    on-primary-fixed-variant: "#474746"
    secondary-fixed: "#9ff0fb"
    secondary-fixed-dim: "#82d3de"
    on-secondary-fixed: "#001f23"
    on-secondary-fixed-variant: "#004f56"
    tertiary-fixed: "#e6e2d9"
    tertiary-fixed-dim: "#cac6be"
    on-tertiary-fixed: "#1c1c16"
    on-tertiary-fixed-variant: "#484740"
    background: "#fbf9f4"
    on-background: "#1b1c19"
    surface-variant: "#e4e2dd"
typography:
    display-lg:
        fontFamily: Bodoni Moda
        fontSize: 80px
        fontWeight: "700"
        lineHeight: 88px
        letterSpacing: -0.02em
    display-lg-mobile:
        fontFamily: Bodoni Moda
        fontSize: 48px
        fontWeight: "700"
        lineHeight: 52px
        letterSpacing: -0.01em
    headline-lg:
        fontFamily: Bodoni Moda
        fontSize: 48px
        fontWeight: "600"
        lineHeight: 56px
        letterSpacing: 0em
    headline-lg-mobile:
        fontFamily: Bodoni Moda
        fontSize: 32px
        fontWeight: "600"
        lineHeight: 40px
        letterSpacing: 0em
    headline-md:
        fontFamily: Bodoni Moda
        fontSize: 32px
        fontWeight: "500"
        lineHeight: 40px
    body-lg:
        fontFamily: Geist
        fontSize: 18px
        fontWeight: "400"
        lineHeight: 28px
    body-md:
        fontFamily: Geist
        fontSize: 16px
        fontWeight: "400"
        lineHeight: 24px
    label-md:
        fontFamily: Geist
        fontSize: 14px
        fontWeight: "600"
        lineHeight: 20px
        letterSpacing: 0.05em
    label-sm:
        fontFamily: Geist
        fontSize: 12px
        fontWeight: "500"
        lineHeight: 16px
        letterSpacing: 0.02em
rounded:
    sm: 0.25rem
    DEFAULT: 0.5rem
    md: 0.75rem
    lg: 1rem
    xl: 1.5rem
    full: 9999px
spacing:
    unit: 8px
    xs: 4px
    sm: 8px
    md: 16px
    lg: 24px
    xl: 32px
    xxl: 48px
    section: 80px
    container-max: 1280px
    gutter: 24px
    margin-mobile: 16px
    margin-desktop: 40px
---

## Brand & Style

This design system embodies the intersection of architectural precision and high-end editorial aesthetics. It is designed for a sophisticated, tech-savvy audience that values organization as a form of self-expression.

The visual style is **Premium Minimalism**, characterized by expansive whitespace, intentional "cinematic" pacing of content, and a focus on tactile digital surfaces. The emotional response should be one of calm, professional confidence and understated luxury. We avoid visual clutter in favor of high-contrast typography and large-scale photography that treats product accessories as art objects.

## Colors

The palette is rooted in a "Neutral Luxury" philosophy.

- **Primary Charcoal (#1A1A1A):** Used for primary typography and high-impact structural elements to provide a grounded, authoritative feel.
- **Warm White (#F9F7F2):** The foundation for all page backgrounds, providing a softer, more premium alternative to pure white.
- **Soft Beige (#E5E1D8):** Employed for container backgrounds, secondary buttons, and subtle section dividers to create depth without introducing harsh lines.
- **Teal Accent (#006D77):** A restrained, sophisticated pop of color reserved strictly for primary calls-to-action and key interactive states to ensure high conversion visibility.
- **Muted Graphite (#333333):** Reserved for secondary body text and icons to maintain legibility while softening the visual hierarchy.

## Typography

The typographic hierarchy relies on the tension between the high-contrast elegance of **Bodoni Moda** and the technical clarity of **Geist**.

- **Headlines:** Use Bodoni Moda for all editorial headings and product names. This serif typeface provides the "luxury" feel, reminiscent of high-end fashion mastheads. Use tight letter-spacing for larger display sizes.
- **Body & Interface:** Use Geist for all functional text, descriptions, and UI labels. Its monolinear, geometric construction ensures maximum readability and reflects the brand's tech-savvy, organized nature.
- **Labels:** Button text and small labels should utilize Geist in medium or semi-bold weights with uppercase styling to denote hierarchy and actionability.

## Layout & Spacing

This design system follows a strict 8px spacing rhythm to ensure mathematical harmony across the interface.

- **Grid Model:** A 12-column fluid grid is used for desktop (max-width 1280px) with 24px gutters. For mobile, the grid collapses to 4 columns with 16px margins.
- **Whitespace:** Use generous vertical padding (`section` spacing) between major content blocks to facilitate a premium, "breathable" browsing experience.
- **Alignment:** Content should predominantly align to the left for a structured, organized appearance, though hero sections may utilize centered typography for dramatic editorial impact.

## Elevation & Depth

To maintain a minimal aesthetic, depth is achieved through **Tonal Layering** and **Ambient Shadows** rather than heavy skeuomorphism.

- **Surfaces:** The primary background is `Warm White`. Elements positioned "above" the main surface (like cards or product grids) should use `Soft Beige` or subtle 1px borders in a slightly darker neutral tone.
- **Shadows:** Use extremely soft, high-diffusion shadows with a hint of the charcoal color (`rgba(26, 26, 26, 0.04)`). These should feel like natural ambient light, appearing only on elevated elements like floating navigation bars or active product cards.
- **Borders:** 1px solid borders in `Soft Beige` are preferred over shadows for defining structural zones, maintaining the "minimal" and "clean" brand promise.

## Shapes

The shape language is refined and approachable. While the brand is professional, "Rounded" corners (level 2) soften the technical edges.

- **Standard Elements:** Buttons, input fields, and tags utilize a **12px (`rounded-md`)** corner radius.
- **Large Containers:** Product cards and hero imagery containers utilize a **16px to 24px (`rounded-lg` to `rounded-xl`)** radius to create a contemporary, friendly silhouette that feels high-quality and "designed."
- **Interactive States:** On hover, slightly increase the prominence of the element's border or shadow, but do not change the corner radius.

## Components

- **Buttons:**
    - **Primary:** Background `Teal Accent`, text `Warm White`. 12px rounded corners. Large padding (16px 32px).
    - **Secondary:** Background `Soft Beige` or Outline `Primary Charcoal`. 12px rounded corners.
- **Product Cards:**
    - Minimalist design. Image takes 80% of the card height. Typography (Product Name in Geist Semi-Bold, Price in Geist Regular) placed below with generous padding.
- **Input Fields:**
    - `Warm White` background with a subtle 1px border in `Soft Beige`. On focus, border transitions to `Primary Charcoal`.
- **Navigation Bar:**
    - Floating or sticky with a `Warm White` background at 95% opacity and a subtle backdrop blur. Minimalist icons in `Muted Graphite`.
- **Chips & Tags:**
    - Small, Geist Semi-Bold 12px, `Soft Beige` background. Used for categories (e.g., "Tech", "Travel", "Limited Edition").
- **Cart Drawer:**
    - High-contrast sidebar using `Warm White` surface. Clear hierarchy of items with high-quality thumbnails and a fixed "Checkout" button in `Teal Accent`.

---

## Anti-AI-Slop Rules

Every page and component must feel like it was designed by an opinionated human, not generated. Apply these rules without exception.

### Copy & Language

- **No generic taglines.** Never write "Elevate Your Experience", "Discover Our Collection", "Unleash Your Potential", "Take Your [X] to the Next Level", or any variant of these.
- **No em-dash filler.** Avoid constructions like "Crafted for those who — " or "Designed with you in mind."
- **No bullet-point feature lists as hero copy.** Headlines must be statements, not feature summaries.
- **Write with specificity.** "Italian full-grain leather, 3mm thick" beats "Premium quality materials." Describe the actual product.
- **No fake urgency.** Avoid "Limited Time Offer", "Don't Miss Out", "Act Now" unless it is a real, time-bound promotion with a date.
- **No corporate passive voice.** "We make bags" not "Bags are crafted with care."

### Layout & Structure

- **No symmetrical 3-column icon grids** as the default layout for features/benefits (the classic "icon + heading + paragraph" trio). If there are 3 items, find an asymmetric arrangement, a horizontal strip, or a single-column list.
- **No full-bleed gradient hero overlays.** The existing `bg-black/10` scrim is the maximum. No purple-to-pink, blue-to-teal, or multi-stop gradients anywhere.
- **No centered hero with a centered headline, centered subtext, and centered CTA buttons stacked vertically.** Hero text aligns left. CTAs sit on the same row.
- **No floating "badge" components** like a pill that says "✨ New Arrival" or "🏆 #1 Best Seller" floating over a hero image.
- **No scroll-triggered animation on every single element.** Animate at most one element per section entrance. Static elements are not lesser elements.
- **No divider lines between every section.** Let whitespace do the work.

### Imagery & Visual

- **No stock-photo-style placeholder descriptions.** When an image is needed, describe it as a real art direction brief: angle, lighting, subject position, mood.
- **No generic icon choices.** Don't reach for `Star`, `Check`, `Shield`, `Zap`, or `Sparkles` to represent trust/quality/speed. Find the specific icon that matches the actual concept.
- **No random icon + colored circle containers** (e.g., a blue circle with a white lightbulb icon) as decoration. Icons should be inline with text or structurally purposeful.

### Components

- **No card grids where every card is identical.** If listing features or content, vary the card sizes, weights, or layout (bento-style, editorial-style).
- **No "Stats Section"** with 4 centered numbers (e.g., "10,000+ Customers | 500+ Products | 4.9★ Rating | Free Shipping"). This pattern is overused. Use numbers only when embedded in context — inside a story section or a specific proof point.
- **No testimonials with a headshot, name, job title, and 5 stars in a carousel** unless the quote itself is genuinely distinct and long enough to stand on its own. No fake-sounding testimonials like "This product changed my life!"
- **No FAQ accordion** at the bottom of a marketing page unless the questions are real, specific, and answerable with substance.
- **No newsletter sections that say "Join our community" or "Stay in the loop."** Write the actual value proposition of subscribing.

### Code Patterns

- **No `"use client"` on components that have no interactivity.** Server Components are the default.
- **No placeholder `TODO` comments** left in committed code.
- **No `console.log` left in any component.**
- **No hardcoded magic numbers** without a comment explaining why that specific value is used.
- **No empty `alt=""` on meaningful images.** Every product or editorial image needs a descriptive alt string.
