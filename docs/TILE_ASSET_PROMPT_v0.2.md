# BLINK MAZE v0.2 tile art

Generated with built-in Imagegen on 2026-10-12. This is an edge-wall puzzle asset set. The supplied reference was used to match stone, watercolor, and engraved illustration style. No third-party bitmap source was incorporated.

## Provenance

- Workflow: built-in Imagegen with transparent_background=true.
- Reference: C:\Users\hiro\Downloads\目を閉じて進む迷宮設計図.png
- Generated original: C:\Users\hiro\.codex\generated_images\01a12e65-80ca-7a93-8222-f6b0a2e8b41d\exec-ef9eae64-0a17-4419-a09c-fdd1309b9a52.png
- Unchanged project source: docs/art/v02/tiles-source.png (RGBA 1774 x 887).
- Source SHA-256: 2557b329ead466ed2217b8e7f224900a366b442c2c20e05a8642ac9065c1de58
- Normalized individual sprites: public/assets/art/v02/.
- Normalized equal-cell atlas: docs/art/v02/tiles-atlas.png (RGBA 1024 x 512; four columns and two rows of 256 x 256 cells).
- Visual inspection sheet: docs/art/v02/tiles-preview.png (RGB warm stone background).
- Extraction receipt: docs/art/v02/normalization.json.

## Normalization and checks

Source is RGBA with alpha extrema 0 and 255. The generated atlas has 1-pixel nominal grid rounding and the wall extends 9 source pixels across its first nominal cell. Wall and floor use isolated object regions instead of nominal cell crops; the floor therefore contains no stray wall fragment. The other six assets use their nominal cells. Significant-alpha bounds use alpha above 64 plus three source pixels of padding; alpha inside each crop is retained. The source remains byte-identical.

Wall is fitted to a 252 x 44 interior within a 256 x 48 transparent canvas. This mechanically compresses the raw wall height slightly to suit an edge boundary; no custom drawing or texture replacement is involved. Floor is resized to a 252 x 252 interior within its 256 x 256 canvas. All four medallions use identical 256 x 176 canvases and proportional resizing to a maximum 252 x 172 interior. Their outer stone silhouettes match, and the blue and amber pairs have matched dimensions. Traveler and door are proportionally resized and centered in 256 x 256 transparent canvases.

All eight final images were checked for expected dimensions, RGBA mode, and alpha extrema 0 and 255. The final contact sheet was visually inspected. No code, browser, in-engine GPU check, or deployment was part of this asset task. v0.1 assets were preserved.

| Asset | Dimensions | SHA-256 |
| --- | --- | --- |
| wall.png | 256 x 48 | 34598aa428182430683f1af1d0fdc561ed50181f54b4ef0cbf0798d7c46e73d9 |
| floor.png | 256 x 256 | 5c257282717b294d723f20c55f63799644bdc5d978cab4bf37ae771636e5604c |
| blue-open.png | 256 x 176 | a740c3e739b6be62a1464d0bca204184b8cc7401a34d72bb93be79620bfd710a |
| blue-closed.png | 256 x 176 | f2cafaa61036f751e75d0788ccd0afa2e1b64555d1de0c796f12bd1eb979faff |
| amber-open.png | 256 x 176 | baffa8ee9d02b173d6cf28434106d82d3a1077321af47bf6bf07ef57ca419201 |
| amber-closed.png | 256 x 176 | ceb8358d0df3488914b5c982a5ef9c2305539dc35397f598365a0ca4db472524 |
| traveler.png | 256 x 256 | 3b2c6e97c660b2cc01edb66d6d3c9f3c1b7320a528d63b156967ae0bf8cbeef1 |
| goal.png | 256 x 256 | e00e65a38b51f5d8be1e7b75bc3fd54105d6304c40a932c5633d7aa9d396458c |

## Exact prompt

~~~text
Use case: illustration-story.
Asset type: ONE production transparent raster sprite atlas for BLINK MAZE v0.2, an EDGE-WALL puzzle. Input image 1 is a STYLE AND MATERIAL REFERENCE ONLY: detailed engraved watercolor, ancient mossy stone masonry and parchment, gentle mystery. The eyes in the reference are physically embedded in walls. Do not recreate its user interface.
Canvas: genuinely transparent RGBA background. Exactly 4 columns x 2 rows, eight equal square cells, total aspect ratio 2:1, preferably 2048 x 1024. Each asset centered at the exact center of its own cell, generous clear transparent gutters, nothing touching another cell, no drawn dividers. Consistent orthographic 2D game sprites. All shapes readable at 32–64 pixels.
Strict asset order left to right:
ROW 1 CELL 1: one LONG HORIZONTAL ancient rectangular stone MASONRY WALL STRIP, approximately 6:1 width to height, made of rough individual rectangular dark slate / moss stones with engraved joints, a few tiny moss accents. Straight horizontal boundary segment, softly irregular stone edge. NO EYE. About 90% cell width, centered vertically. It is not a square tile.
ROW 1 CELL 2: one SQUARE pale warm cream COBBLESTONE FLOOR texture tile, modest engraved stone joints separating a few larger pavers, subtle weathering, fills about 90% of the square cell. NO WALL, NO EYE.
ROW 1 CELL 3: one small horizontally OVAL CARVED STONE MEDALLION containing an OPEN BLUE EYE. Physical ancient stone surround, blue round iris and clearly ROUND dark pupil carved into the inset stone. The eye is embedded in stone, not floating over a floor. Oval medallion about 70% cell width, ratio about 1.6:1. NO separate square floor backing.
ROW 1 CELL 4: the EXACT SAME OVAL STONE MEDALLION, identical outer silhouette, dimensions, stone texture and crop as row 1 cell 3, containing a CLOSED engraved BLUE EYELID. Clearly closed, NO iris, NO pupil. Keep precisely the same stone surround and scale.
ROW 2 CELL 1: the SAME OVAL STONE MEDALLION and same scale as the blue pair, containing an OPEN AMBER EYE with a clearly DIAMOND-shaped dark pupil in an ochre iris, subtle angular engraved eyelid details. The eye is physically embedded in the stone. NO separate square floor backing.
ROW 2 CELL 2: the EXACT SAME OVAL STONE MEDALLION, identical outer silhouette, dimensions, stone texture and crop as row 2 cell 1, containing a CLOSED engraved AMBER EYELID. Clearly closed, NO iris, NO pupil. Keep precisely the same stone surround and scale.
ROW 2 CELL 3: one FULL-BODY small traveler, cream hood and tunic, ochre scarf, short dark legs, face hidden by hood, FACING RIGHT, same gentle silhouette and costume as the reference, complete head and feet, standing pose. About 75% cell height.
ROW 2 CELL 4: one GOLDEN ARCHED EXIT DOOR with warm illuminated inset and a small ivory four-point sparkle, weathered golden masonry arch around it, gentle glow contained close to the doorway, about 80% cell height. Complete door.
Palette: dark slate / moss stone #52655b, pale floor #e5dcc8, ink #182725, blue #3985af, amber #c58b39, warm cream cloth and parchment.
Materials and style: refined watercolor storybook illustration with delicate engraved linework, subtle granular stone and paper textures WITHIN the assets only; ancient tactile stone instead of smooth flat shapes. Modest detail so every object remains clear at tiny game scale. Soft neutral illumination except for the golden doorway. Consistent view, no angled perspective. Transparent alpha around each asset.
Constraints: EXACTLY eight assets, exact order, all equal cells, no overlaps, no scenery, no UI, no text, no labels, no watermark, no background color, no checkerboard, no panels. No extra assets. Wall is a thin horizontal strip; floor is square. All FOUR eye medallions MUST share the same stone shape and size. Open blue ROUND pupil and open amber DIAMOND pupil must be visually distinct. Closed eyes must look visibly closed.
~~~
