# BLINK MAZE v0.2 design QA

final result: passed

## Comparison target and evidence

Source: `docs/reference-v0.2.png`, user-provided1536×1024 composite. The top-left playable visual reference is cropped mechanically to1024×600 as `docs/qa/v0.2/reference-play-area.png`. Implementation: `docs/qa/v0.2/production-desktop.jpg`,1440×900 pixels/CSS viewport, JA Stage004, phase0; `production-mobile.jpg`,360×800 pixels/CSS viewport. Captures use density1 and no device bezel.

Source crop and both production screenshots were opened together in a single comparison input. No image was stretched to match geometry. The source is an art/layout direction, not a pixel-cloning contract: it depicts an illustrative maze and budget2. The new supplied Stage004 is5×3 floor cells, budget1, and has its own title/edge connections. Its geometry/copy/budget intentionally follow the v0.2 JSON and task document. The instructions explicitly allow approximate visual proportions.

Focused checks: `docs/art/v02/tiles-preview.png` verifies stone medallions, paired eyelids, round-blue/diamond-amber pupils and alpha. `horizontal-eyes.jpg` shows both phases of horizontal boundaries; mobile before/after captures show actual opened passages at target size. The full and focused views support the same finding.

## Findings and fixes

- **P2 fixed: desktop height overflow.** Initial1440×900 layout exceeded900px; later1280×810 layout exceeded810px. Capped cover/board height, reduced desktop spacing and added a compact-height layout. Final DOM bounds are1440×900 and1280×810 with no overflow; updated screenshots saved.
- **P2 fixed: mobile control size.** The v0.1 pad was smaller than44px. Rebuilt the pad into two44px rows, retained56px BLINK and44px secondary controls, and collapsed mobile level buttons into an accessible modal.360×800/720×1280 fit.
- **P2 fixed: floor-eye interpretation.** Replaced cell-blocking rules and floor-centered eye sprites with geometric edge walls. Fixed and opening strips contact the stone-eye medallion; sleeping walls leave end posts and a faint closed emblem. Eye center measurements are within0.021 CSS px of the mathematical boundary.
- **P2 fixed: old tutorial/save semantics.** Removed standing-on-eye restrictions and old8-level runtime data. New5-maze localized copy explains wall/passages. Old clear IDs are retained under the old key but never counted toward new mazes.
- No remaining actionable P0/P1/P2 visual or interaction issue was observed.

## Fidelity surfaces

- **Typography:** local Fraunces serif titles and DM Sans controls with Japanese system fallback; budget and level hierarchy remain legible. The longest English level name and JA text fit360px without overlap. Desktop type is smaller than the composite mock by design to keep controls visible.
- **Spacing/layout:** desktop left illustration/right play panel follows the reference. Mobile hides decoration and keeps board, budget, clear rule, BLINK and directions visible. All action targets are at least44px; secondary level navigation is collapsed.
- **Color/tokens:** parchment, slate/moss stone, blue, amber, dark-green CTA and gold exit follow the reference and v0.2 palette. Floors remain visually distinct from the boundary stone.
- **Image quality/assets:** new Imagegen stone, floor, carved-eye pairs, traveler, golden door and wall-eye cover are used. Transparent sprites retain matching scale. Standard icons are Tabler source SVGs. Game geometry is structural DOM positioning, not a painted fake maze or replacement illustration.
- **Copy/content:** both languages consistently describe eyes in boundary walls, never eyes as floor tiles. Dynamic legends show each family's current wall/passage state. Budget0 gives a reversible recovery message; hints are optional. Versioning information appears only in save/credits context.

## Follow-up polish and limits

P3: physical-phone readability of the small sleeping-wall emblem, tactile controls, full-motion timing and sound balance; human puzzle discovery and fun. Reduced motion was actually active in the automated browser and immediate switching passed; the full-motion path was not browser-tested.

The25 passing browser checks,57 automated tests,5 BFS routes and current build/ZIP evidence are recorded in `docs/VALIDATION.md`.

