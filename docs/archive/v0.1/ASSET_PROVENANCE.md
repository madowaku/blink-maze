# BLINK MAZE asset provenance

Checked 2026-10-12. All deployed files are local. `docs/asset-manifest.json` records SHA-256 and size for each shipped asset and preserved art source.

| Assets | Source and terms | Changes |
| --- | --- | --- |
| Eye sprites, traveler, exit, wall and floor | Original built-in Imagegen generation, prompted for this project. No third-party image incorporated. Exact prompt/source recorded in `docs/TILE_ASSET_PROMPT.md`. | Transparent atlas mechanically extracted and resized to 256×256 PNG; alpha preserved. Source archived under `docs/art/`. |
| Cover illustration | Original Imagegen generation matching the Imagegen mock. Exact prompt/source recorded in `docs/IMAGEGEN_PROMPTS.md`. | Source preserved; resized to 640×960 and encoded WebP quality 84. |
| Reference mock | Original Imagegen UI direction; `docs/reference.png` | Reference only; excluded from distribution. |
| BGM Loop03-long.mp3 / ループ03 | [OtoLogic source](https://otologic.jp/free/bgm/short-loop01.html), [CC BY 4.0 terms](https://otologic.jp/free/license.html), [CC BY license](https://creativecommons.org/licenses/by/4.0/). Source bytes from user-authorized shared library `C:\Dev\AssetsShared\Audio\OtoLogic\Loop03\original\Loop03\Loop03-long.mp3`. Commercial use allowed with OtoLogic attribution. | Byte-identical copy renamed `loop03.mp3`. Playback volume reduced in game; original audio file unchanged. |
| Move, blink, undo, clear, blocked SE | [Kenney UI Audio](https://kenney.nl/assets/ui-audio), CC0. Local source `C:\Dev\AssetsShared\Audio\SE\kenney_ui-audio (1)\Audio\`. License shipped at `public/licenses/kenney.txt`. | Renamed byte-identical copies of rollover1, switch1, click2, switch9, click5 respectively. |
| UI icons | [Tabler Icons v3.47.0 official source](https://github.com/tabler/tabler-icons/tree/v3.47.0/icons/outline), MIT. License shipped at `public/licenses/tabler.txt`. | Selected original SVG files, no custom SVG drawings. |
| DM Sans and Fraunces | [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans), [Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces), SIL Open Font License 1.1. OFL texts shipped in `public/licenses/`. | Original variable TTFs hosted locally, unchanged. Japanese uses installed Yu Gothic / Meiryo / Yu Mincho fallback. |

In-game credits name Imagegen, OtoLogic, Kenney and Tabler with source links. The distribution includes `CREDITS.txt` and all third-party license texts. OpenTracks was inspected but no OpenTracks music is shipped; the verified shared OtoLogic track suits the lightweight loop. No itch.io or Tripo assets are shipped.

Game Development Studio's CLI was unavailable. This document is provenance and integrity evidence, not a canonical `game-dev` package receipt or a GPU-performance claim.
