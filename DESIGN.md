---
name: LisBran
description: Kenya's procurement marketplace for marketing services, drawn as a tension network of rods and one red cord.
colors:
  concrete-ground: "#e9e6e1"
  concrete-surface: "#f5f3ef"
  concrete-surface-deep: "#dcd8d1"
  carbon-ink: "#141414"
  ink-secondary: "#494744"
  ink-muted: "#686560"
  rod: "#141414"
  rod-slack: "#c7c2ba"
  cord-red: "#d9143a"
  cord-ink: "#ffffff"
  verified-green: "#1e7a45"
  night-ground: "#121212"
  night-surface: "#1b1b1a"
  night-surface-deep: "#262624"
  night-ink: "#ece9e4"
  night-ink-secondary: "#b3afa8"
  night-ink-muted: "#8f8b84"
  night-rod: "#d8d4cd"
  night-rod-slack: "#34332f"
  night-cord-red: "#ff3355"
  night-cord-ink: "#141414"
  night-verified-green: "#4cc47a"
  film-edge: "#13181e"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 80"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 80"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 80"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  body-strong:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.25
    fontFeature: "'tnum'"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 3.2vw, 112px)"
  chip-gap: "8px"
  row-gap: "12px"
  block: "16px"
  field-gap: "20px"
  section: "56px"
  section-wide: "80px"
components:
  button-primary:
    backgroundColor: "{colors.cord-red}"
    textColor: "{colors.cord-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.carbon-ink}"
    textColor: "{colors.concrete-ground}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.cord-red}"
    textColor: "{colors.cord-ink}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.carbon-ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.carbon-ink}"
    textColor: "{colors.concrete-ground}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.carbon-ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "36px"
  chip-selected:
    backgroundColor: "{colors.cord-red}"
    textColor: "{colors.cord-ink}"
  input-search:
    backgroundColor: "{colors.concrete-surface}"
    textColor: "{colors.carbon-ink}"
    rounded: "{rounded.none}"
    padding: "0 16px 0 40px"
    height: "48px"
  select:
    backgroundColor: "{colors.concrete-ground}"
    textColor: "{colors.carbon-ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
    padding: "0 8px"
    height: "36px"
  nav-top:
    backgroundColor: "{colors.concrete-ground}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body-strong}"
    height: "56px"
  nav-tabs:
    backgroundColor: "{colors.concrete-ground}"
    textColor: "{colors.ink-muted}"
    height: "64px"
---

# Design System: LisBran

## Overview

**Creative North Star: "The Tension Network"**

A buyer's job is a load, and suppliers are anchored to it by lines. Those who can take the job pull taut in one red cord; those who cannot hang slack in ash gray. Everything else on every page is structure: carbon rods of a fixed 1.5px weight drawn across a pale concrete ground by day, or light rods on carbon by night. The system is flat, square-cornered, ruled and engineering-dense. It reads like a plan drawing, not a marketplace brochure.

Content runs edge to edge. There is no centred column. Only the gutter grows with the screen, and reading measure is held on the text itself (48ch to 70ch). Section heads sit on a rod. Lists are ruled rows rather than card grids. The brand film is the one full-colour, atmospheric element. It sits as a full-screen masthead, and everything laid over it switches to the night tokens so it stays legible in both themes.

The owner has confirmed these rejections: gradient heroes, decorative gradients, glows, glass, floating loops, eyebrow labels, card grids of icon tiles, emojis, and anything that reads as AI-generated.

**Key Characteristics:**
- One accent colour (cord red), used only to show tension: urgency, selection, primary action.
- 1.5px rods carry all structure. Hairline slack rules divide rows inside a section.
- Square corners everywhere, and no shadows.
- Archivo at 80% width and weight 800 for display. Archivo for body text. Geist Mono with tabular numerals for data.
- Full-width layout with a fluid gutter. Day and night editions both work and are equal.

## Colors

The palette is two neutral editions (concrete by day, carbon by night) plus one red cord that appears only where something is under tension.

### Primary
- **Cord Red** (`cord-red` by day, `night-cord-red` by night): the tension colour. It marks the taut cords in the network, selected chips, urgent turnaround text ("Overnight", "24 hours"), the active-nav underline, the primary action, focus outlines, text selection, and the caret. Text on cord uses `cord-ink`: white by day, carbon by night.

### Neutral
- **Concrete Ground** / **Carbon Night Ground**: the page. It also serves as the background for selects, the tab bar and the solid top bar.
- **Concrete Surface** / **Night Surface**: raised panes such as the job card, search field, cookie bar, supplier facts box and row hover fill.
- **Surface Deep**: a secondary fill for quiet hovers on buttons that are not primary.
- **Carbon Ink** / **Night Ink**: primary text and the rod colour. By day, rod and ink are the same carbon.
- **Ink Secondary**: descriptions, inactive nav, legends.
- **Ink Muted**: metadata, `dt` labels, placeholders, inactive tabs, slack cords, scrollbar thumb.
- **Rod Slack**: the hairline between rows, unselected chip borders, idle field borders, and the node of a non-matching supplier.
- **Verified Green** (`verified-green` / `night-verified-green`): used only for the verified badge on a supplier who matches. It never appears as a second accent.
- **Film Edge** (`film-edge`): sampled from the film's darkest field. It sits behind the film, behind the stacked masthead words, and behind owner service artwork thumbnails, so there is no seam where they meet.

### Named Rules
**The One Cord Rule.** Red means tension and nothing else. If an element is not urgent, selected, or the primary action, it is not red. Hover states may turn a link or title cord-red because hovering is a selection in progress.

**The Night-Over-Film Rule.** Anything laid on the brand film uses the night tokens (the on-dark scope) in both themes, and preserves the white logo mark.

**The Two Equal Editions Rule.** Every token has a day and a night value. A surface does not ship until it works in both.

## Typography

**Display Font:** Archivo, on its width axis at 80% and weight 800 (fallback Helvetica Neue, Arial)
**Body Font:** Archivo (same family, normal width)
**Label/Mono Font:** Geist Mono (fallback ui-monospace), always with tabular numerals

**Character:** A condensed, heavy engineering grotesque for names and heads, plain Archivo for reading text, and a mono voice for numbers. Mono appears where a spec sheet would put it.

### Hierarchy
- **Display** (800, clamp(2.2rem, 5vw, 3.75rem), 0.98, balanced wrap): the inner-page h1 on its rod. The home and splash masthead h1 runs slightly larger, clamp(2.4rem, 4.6vw, 4.5rem).
- **Headline** (800, 1.875rem to 3.75rem by breakpoint): section h2s such as "Tell us the job", "Services" and the sell band.
- **Title** (800, 1.25rem to 1.875rem): supplier names in rows, service names in the index, card heads ("Your job").
- **Body** (400, 1rem, measure 48ch to 70ch): descriptions and bios. Secondary copy is ink-secondary at 0.875rem.
- **Body Strong** (600, 0.875rem): nav links, chips, legends, field labels, row names. Buttons use 700.
- **Label** (Geist Mono, 0.75rem to 0.875rem, tabular): prices (KES), turnaround, ratings, counts, phone numbers. Always sentence or title case. Never uppercase.

### Named Rules
**The Spec-Sheet Numbers Rule.** Every number a buyer compares (price, rating, count, turnaround, phone) is set in Geist Mono with tabular numerals. Prose never is.

**The No Kicker Rule.** Headings stand on their own rod. There is no small uppercase tracked label above a heading, anywhere.

## Layout

The layout is full-bleed with a fluid gutter of clamp(16px, 3.2vw, 112px) on every screen, including 2560px. It never uses a max-width centred container. Inside the gutter, content sits on a 12-column grid. Typical splits are 7/5 for the masthead, 8/4 for bands, 4 or 3 / 2 or 3 / 6 for the network, and a main column plus a facts aside on supplier pages. Sections are separated by 56px, or 80px from md up. Controls use an 8px chip gap, 20px between field groups, and 12px row padding.

Section rhythm: the head sits on or above a 1.5px rod, followed by the content, followed by rows divided by slack hairlines.

Responsive behaviour:
- From 1024px, the top bar carries all navigation. Below 1024px, a fixed bottom tab bar of five labelled items takes over, and the top bar keeps only the logo, theme and notifications.
- **The `wide` condition** (aspect ratio at least 4/3 and height at least 521px): the film fills 100svh, and the words sit on a carbon wash at its foot. Otherwise the film keeps 16:9 and the words stack beneath it on film-edge.
- The tension network's cords show from md up. On phones, each row's node becomes a 3px vertical tension bar.
- Rows are sized in rem so geometry scales with the visitor's text size. At 200% text, chips wrap and nothing forces horizontal scroll.

## Elevation & Depth

The system has no shadows. It stays flat. Depth comes from tone (surface on ground), from rods (a 1.5px border defines a pane), and from inversion (a band of ink with ground-coloured text for the sell call-out). The only gradients in the build are the two legibility washes over the brand film: rgba(18,18,18,0.7) fading to 0 under the header, and rgba(18,18,18,0.96) fading to 0 beneath the words. They exist only as functional scrims on video.

### Named Rules
**The Drawn, Not Lifted Rule.** A pane is drawn with a rod, not lifted with a shadow. If something needs to stand out, give it a 1.5px rod border or a surface fill. Never give it a shadow, glow or blur.

## Shapes

Every corner is square (0px): buttons, chips, inputs, panes, thumbnails and nodes. Borders come in two weights only. A **rod** is 1.5px in the rod colour and marks structure, primary panes and outline buttons. A **slack hairline** is 1px in rod-slack and divides rows. Empty states use a dashed slack border to show a slot waiting to be filled. Nodes and markers are small squares (8px to 10px), filled cord when matched and outlined or rod-slack when not. The one exception is event markers on the map, which are round so they read apart from square supplier nodes. The one curve in the system belongs to the cords themselves: quadratic lines, straight when taut and sagging when slack.

## Components

### Buttons
Blunt, square, heavy-labelled.
- **Shape:** square (0px), minimum 44px high (48px for page-level actions), label weight 700.
- **Primary:** cord-red fill with cord-ink text, usually with a trailing arrow. Hover raises brightness to 110%.
- **Secondary:** ink fill with ground text. Hover turns cord.
- **Outline:** 1.5px rod border with ink text. Hover inverts to an ink fill with ground text. It pairs with primary as the second action, for example "Sell on LisBran".
- **Ghost:** ink-secondary text. Hover moves to ink with a surface fill.
- **Focus:** a 2px cord outline at 2px offset, set globally.
- **Disabled:** 40% opacity, no pointer events.

### Chips
- **Style:** radio inputs styled as square chips, 36px tall, 12px horizontal padding, 1.5px rod-slack border, 600 weight at 0.875rem.
- **State:** hover raises the border to rod. When checked, the chip fills cord with cord-ink text. Keyboard focus draws the cord outline on the chip. Chips sit inside a fieldset whose legend is plain question text, such as "How soon?".

### Cards / Containers
- **Corner Style:** square.
- **Background:** surface on ground, for example the job card and the supplier facts aside.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** a 1.5px rod border. Internal dividers use slack hairlines.
- **Internal Padding:** 16px. Fact rows use a two-column label and value layout, with ink-muted labels and ink values.
- Card grids are not used for lists. Suppliers, services, notifications and saved items are ruled rows.

### Inputs / Fields
- **Style:** square, 1.5px border. Search is 48px on surface with a rod border and a leading 18px icon. Selects are 36px on ground with a rod-slack border that rises to rod on hover.
- **Focus:** the border shifts to cord, or the global cord outline shows.
- **Placeholder:** ink-muted at full opacity.

### Navigation
- **Top bar (1024px and up):** sticky, 56px high, ground background, 1.5px rod bottom border. It holds the logo mark and the "LisBran" wordmark in display face. Section links are 0.875rem at 600 weight, ink-secondary until active, and the active link gets a 3px cord underline on the rod. After the links come an outline "Sell on LisBran" button and 18px utility icons (Saved, Notifications, Account, theme). Over the film, the bar is transparent in the on-dark scope and turns solid once the film's bottom edge passes under it.
- **Tab bar (below 1024px):** fixed to the bottom, 64px high plus the safe-area inset, with a rod top border. It has five always-labelled tabs (Home, Services, Events, Saved, Account) with 20px icons and 11px labels. The active tab shows in ink with a 3px cord bar on top and a heavier icon stroke.
- There is one navigation system. The same section map drives both bars.

### Tension Network (signature)
The job card (surface, rod-bordered) sits on the left. Up to eight supplier rows, each 4.5rem high, sit on the right. An SVG between them draws one cord per row. Matching suppliers get a straight cord-red line at 2px and full opacity. Non-matching suppliers get a sagging ink-muted line at 1px and 55% opacity. Cords morph over 0.55s with cubic-bezier(0.16, 1, 0.3, 1), staggered 35ms per row, and are instant under reduced motion. A matching row gets a cord node or bar and ink text. A slack row falls back to ink-muted. The live count "N of M sample suppliers can take it" is announced politely to screen readers.

### Supplier Row
A ruled listing row with a slack bottom hairline and a surface fill on hover. The name is in the title face with a verified badge. Service and city follow in ink-secondary. Turnaround and "from KES" price are right-aligned in mono, with urgent turnaround in cord. The rating is in mono with a small filled star.

### Service Index Row
A 72px square thumbnail of owner artwork on film-edge with a rod border. Services without artwork get a square node instead. Next come the service name in the title face (cord when selected or hovered), a blurb, a live "N of M can take it" count with its node, and a trailing arrow.

### Page Header
An optional parent back-link sits at 0.875rem and 600 weight. Below it, the display h1 sits on a rod-bottom with an optional 60ch description, and optional actions are right-aligned on the same rod.

### Video Masthead
The brand film, muted and covering, with a pause control. The words sit at its foot in the on-dark scope. It appears on the home page and the splash screen only.

## Do's and Don'ts

### Do:
- **Do** mark tension only in cord red: urgency, the selected option, the one primary action per block.
- **Do** draw structure with 1.5px rods and divide rows with 1px rod-slack hairlines.
- **Do** keep every corner square (0px) and every surface flat.
- **Do** run content full width on the clamp(16px, 3.2vw, 112px) gutter, and hold measure on text with 48ch to 70ch.
- **Do** set every compared number in Geist Mono with tabular numerals.
- **Do** list suppliers, services and items as ruled rows. Use owner service artwork (icon-graphic.png, icon-printing.png, icon-marketing.png) only as thumbnails inside those rows, on film-edge.
- **Do** use the on-dark scope for anything placed over the brand film.
- **Do** ship day and night together and check WCAG 2.2 AA contrast in both.
- **Do** size signature geometry in rem so it survives 200% text.

### Don't:
- **Don't** use gradients as decoration, glows, glass or backdrop blur, or floating looping animation. The film scrims are the only gradients.
- **Don't** put an eyebrow or kicker (small uppercase tracked label) above a heading.
- **Don't** build card grids of icon tiles.
- **Don't** use emojis anywhere, in copy or as icons.
- **Don't** add shadows or rounded corners. That includes pill buttons.
- **Don't** centre content in a max-width column.
- **Don't** introduce a second navigation pattern, or a second accent colour. Verified green is a status mark, not an accent.
- **Don't** fabricate counts, reviews or live status. Sample data is labelled as sample.

### Open (native devices the world has but the build does not yet use)
- Mono labels pinned by leader lines outside the network.
- A map schematic drawn in rods for the state with no map key.
- The job's tension carried into search results and the map list.
