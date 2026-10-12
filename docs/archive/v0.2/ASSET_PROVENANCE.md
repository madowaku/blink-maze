# BLINK MAZE v0.2 asset provenance

Checked 2026-10-12. All deployed assets are local. `docs/asset-manifest.json` records sizes and SHA-256 for 58 shipped/preserved files.

## Current art

- User-provided style reference: `docs/reference-v0.2.png`, copied unchanged from `C:\Users\hiro\Downloads\目を閉じて進む迷宮設計図.png`. Used as art direction, never as the collision map.
- Built-in Imagegen generated a new stone-wall/floor/eye/traveler/door atlas. Exact prompt, original path, extraction bounds and hashes: `docs/TILE_ASSET_PROMPT_v0.2.md` and `docs/art/v02/normalization.json`.
- Eight shipped transparent PNGs are under `public/assets/art/v02/`. Wall:256×48; eyes:256×176; floor/traveler/goal:256×256. Alpha preserved. Source: `docs/art/v02/tiles-source.png`, byte-identical to the generated original.
- Original Imagegen cover: `docs/art/v02/cover-source.png`. Mechanical proportional resize to 720×1080, WebP quality87: `public/assets/art/v02/cover.webp`. Exact prompt and source path: `docs/IMAGEGEN_PROMPTS_v0.2.md`.
- Paper texture: a mechanical crop (40,40)-(216,216) from the original v0.1 Imagegen floor, now `docs/art/v01/floor.png`, converted to RGB/WebP quality82, shipped as `public/assets/art/v02/paper.webp`.
- No generated image defines traversability. Fixed/moving wall geometry is calculated from the supplied edge connections; raster textures and medallions are placed on those boundaries.
- v0.1 sprites are preserved under `docs/art/v01/` and excluded from the v0.2 distribution. Original v0.1 generation sources and prompts remain in `docs/art/` and the old prompt documents. Archived provenance is under `docs/archive/v0.1/`.

## Reused third-party assets

| Assets | Source/terms | Processing |
| --- | --- | --- |
| Loop03-long.mp3 / ループ03 | [OtoLogic source](https://otologic.jp/free/bgm/short-loop01.html), [CC BY 4.0 terms](https://otologic.jp/free/license.html), [license](https://creativecommons.org/licenses/by/4.0/). User-authorized source: `C:\Dev\AssetsShared\Audio\OtoLogic\Loop03\original\Loop03\Loop03-long.mp3`. | Byte-identical renamed copy `loop03.mp3`, runtime volume reduction only. OtoLogic attribution in game and CREDITS.txt. |
| Move/blink/undo/clear/blocked | [Kenney UI Audio](https://kenney.nl/assets/ui-audio), CC0. Source: `C:\Dev\AssetsShared\Audio\SE\kenney_ui-audio (1)\Audio\`. | Byte-identical renamed rollover1/switch1/click2/switch9/click5. License in `public/licenses/kenney.txt`. |
| Standard UI icons | [Tabler Icons v3.47.0](https://github.com/tabler/tabler-icons/tree/v3.47.0/icons/outline), MIT | Unchanged source SVGs; license included. |
| DM Sans/Fraunces | [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans), [Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces), SIL OFL 1.1 | Unchanged variable TTFs, served locally with OFL texts. Japanese system fonts fall back to Yu Gothic/Meiryo/Yu Mincho. |

License files and `CREDITS.txt` are included in the ZIP. No OpenTracks, itch.io or Tripo asset is shipped. No provider credential or paid third-party generation workflow was added.

The Game Development Studio CLI was unavailable during v0.1 production. This asset roster records byte integrity and provenance; it is not a canonical package receipt or GPU/hardware performance measurement.

