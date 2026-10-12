# BLINK MAZE tile art

Historical v0.1 record. Individual sprites originally at `public/assets/art/` are now preserved under `docs/art/v01/` and excluded from the current distribution. The original source and atlas under `docs/art/` remain unchanged.

Generated with the built-in Imagegen tool on 2026-10-12 for BLINK MAZE. Reference image was used only to match style. No third-party bitmap asset was incorporated.

## Provenance

- Provider/workflow: built-in Imagegen, transparent_background=true.
- Reference: `C:\Users\hiro\.codex\generated_images\01a12e5f-e622-7211-ac42-c629d080845a\exec-4c104dde-e2bb-4950-b422-57c079743e08.png`.
- Original generated PNG: `C:\Users\hiro\.codex\generated_images\01a12e65-80ca-7a93-8222-f6b0a2e8b41d\exec-8d7c77d9-9404-4b37-b294-b4278c10900a.png`.
- Project source copy: `docs/art/tiles-source.png`, unchanged RGBA 1774 x 887 pixels.
- Project outputs: `wall.png`, `floor.png`, `blue-open.png`, `blue-closed.png`, `amber-open.png`, `amber-closed.png`, `traveler.png`, and `goal.png` under `public/assets/art/`. Each is RGBA 256 x 256 pixels.
- Exact equal-cell output: `docs/art/tiles-atlas.png`, RGBA 1024 x 512 pixels, four columns and two rows of 256 x 256 pixel cells, in the prompt's order.
- Visual check sheet: `docs/art/tiles-preview.png`, sprites composited on the palette's warm ivory for inspection only.

The raw atlas has one-pixel rounding differences between cells because 1774 and 887 are not evenly divisible by four and two. Extraction uses row/column boundaries rounded down from those dimensions. Each significant-alpha bounding box receives six source pixels of transparent padding, is resized proportionally with Lanczos, and centered in a 256-pixel canvas. Wall and floor use a 90% size target, eyes use a 70% width target, traveler a 75% height target, and door an 80% height target. Alpha inside each extracted crop is preserved. Source pixels outside each padded asset region are discarded only from processed files; the source copy preserves every pixel.

No engine import, browser rendering, GPU check, or human playtest was performed by the art-production task. The final sprites were inspected as a contact sheet.

## Integrity checks

Every shipped individual sprite is 256 x 256 RGBA with alpha extrema 0 and 255. The source copy was verified byte-identical to the generated original.

| File | SHA-256 |
| --- | --- |
| tiles-source.png | a3d9d505417925cfef92dc111b77ffb56c1b9457becfba5c3a04d5ae221020fd |
| wall.png | 5a07e4ad7df413539a16049182543dd89871d3f01cb6f52534569df8d8552d1f |
| floor.png | e0d6afb1f8bd01af5553ab2befff2962a4ce10c53eb062e647b0fbf206140bf1 |
| blue-open.png | 573b6380a8a5a38603cb0bdeb6ae913feaeb71dacc56d963370db000ea09f544 |
| blue-closed.png | b9bae7565e70990364e0cfa5a5cf2ddb85392f406f2a1d97eff414d6d12c7223 |
| amber-open.png | e5f840ea3de1ea20cc183ac26520c4ef3d5311ff2bea0f29b3ef533e8144c8db |
| amber-closed.png | a30c5b90142bc7d534b9ef6fb8d0c702ebc573f7d36474b4f130563d48027393 |
| traveler.png | f4bb33334b291f47ecd995f51e32e69c691bdfe93473e0eceb797b9f22fef6b7 |
| goal.png | 64e501fd122fc2431d27d968ef55b0df36864eb678e5f7acf9f4b5793666573e |

## Exact generation prompt

```text
Use case: illustration-story.
Asset type: ONE production raster sprite atlas for the browser puzzle game BLINK MAZE.
Input image 1 is a STYLE REFERENCE ONLY: match its flat editorial storybook / risograph paper-grain illustration, muted warm ivory, moss sage, dark ink, soft blue and ochre colors. Do not recreate the interface or include any lettering.
Canvas: genuinely transparent RGBA background. Exactly 4 columns and 2 rows of equal square cells, total aspect ratio 2:1, ideally 2048 x 1024 px with eight 512 x 512 px cells. No drawn cell dividers. Every object centered on the exact center of its cell, plenty of transparent gutters, no overlapping cells. Orthographic front-view game sprite art with consistent sizing and readable silhouettes.
Strict ordered layout, left to right:
ROW 1 CELL 1: one square rounded moss sage stone wall tile, 90% cell width and height; subtly flecked with dark sage leaf-like stone grain, like the reference walls, rounded corners, straight square shape.
ROW 1 CELL 2: one square rounded warm cream floor tile, 90% cell width and height; warm ivory paper grain, subtle edge, straight square shape.
ROW 1 CELL 3: one BLUE OPEN EYE icon ONLY, no tile backing; almond outline with a blue iris and a clearly ROUND dark pupil, small simple lashes; 70% cell width.
ROW 1 CELL 4: one BLUE CLOSED EYELID icon ONLY, no tile backing; visibly closed arc with small curved lashes, NO iris, NO pupil; 70% cell width.
ROW 2 CELL 1: one AMBER OPEN EYE icon ONLY, no tile backing; almond outline with an ochre iris and a clearly DIAMOND-shaped dark pupil, distinctly angular lashes; 70% cell width.
ROW 2 CELL 2: one AMBER CLOSED EYELID icon ONLY, no tile backing; visibly closed arc with distinct angular lashes, NO iris, NO pupil; 70% cell width.
ROW 2 CELL 3: one small FULL-BODY traveler with warm cream hood and tunic, ochre scarf, short dark ink legs, hood hiding face, FACING RIGHT as in the reference; single standing pose, complete head and feet, about 75% cell height.
ROW 2 CELL 4: one GOLDEN ARCHED EXIT DOOR with a simple luminous ivory four-point sparkle in its center, ochre stone surround, small delicate rays, about 80% cell height.
Palette: warm ivory #f3f0e6, moss sage #647b68, dark ink #293c38, blue #548cac, ochre #c79445.
Materials: attractive subtle risograph speckles and natural paper grain WITHIN the illustrated shapes only, alpha background outside each object. Crisp readable edges at small game scale, flat lighting, minimal shadows.
Constraints: exactly eight assets; exact cell order; every asset wholly inside its own equal cell; preserve transparent space; no text, no labels, no watermark, no scenery, no extra objects, no canvas backdrop, no fake checkerboard. Eye symbols must be transparent icons, never on floor tiles. Do not render another mockup.
```


