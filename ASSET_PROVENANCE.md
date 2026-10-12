# BLINK MAZE v0.3 asset provenance

Checked2026-10-12. All runtime assets are local. Sizes and SHA-256: docs/asset-manifest.json. Previous provenance: docs/archive/v0.2/ASSET_PROVENANCE.md.

## Art

The v0.2 Imagegen artwork is reused unchanged. The reference is art direction, never the collision map. Exact prompts, original paths, extraction bounds and hashes remain in docs/TILE_ASSET_PROMPT_v0.2.md, docs/IMAGEGEN_PROMPTS_v0.2.md and docs/art/v02/normalization.json. Sprites: public/assets/art/v02/. Original atlas and cover: docs/art/v02/. Paper is the documented crop of the earlier Imagegen floor. No new generation or paid provider was used.

## Replacement music

New itch.io cover: docs/art/v03/itch-cover.png, built-in Imagegen, using the existing original art as a style reference. Exact prompt: docs/IMAGEGEN_ITCH_COVER_v0.3.md. The629×500 upload export is a proportional downscale only. Original/output dimensions and hashes: docs/art/v03/cover-receipt.json. Marketing only; runtime art and ZIP are unchanged.

- **迷わず進め！迷宮コロコロ**, written by **こーち**. [Track16572](https://opentracks.com/bgm/detail/16572), [creator](https://opentracks.com/creator/detail/328), [license](https://opentracks.com/help/articles/license/), [terms](https://opentracks.com/help/articles/terms/), checked2026-10-12.
- Official track: published2022-04-30,2:21, looping. The creator follows the site license; separate permission and attribution are not required for licensed uses. We include credit voluntarily.
- Commercial game background use is permitted under the license. Standalone redistribution and easy access to unconverted audio files are prohibited. This release converts the input into an AES-128-GCM game container. The browser restores an in-memory Blob for game playback. This discourages casual standalone reuse; it is not DRM.
- User-provided input: C:/Users/hiro/Downloads/迷わず進め！迷宮コロコロ.mp3,2,834,724 bytes, SHA-256 1d04ce3868c29b90ec4f3980b02c5471d1f1dd19d94c1a3a84c1e5ab1aec4dbd. The original stays outside the repository and ZIP.
- Container: public/assets/audio/maze-korokoro.bmau,2,834,761 bytes. No musical editing or re-encoding. Decoded MP3 is byte-identical, verified by hash. Provenance: docs/audio/music-provenance.json. Script: scripts/prepare-music.mjs. Runtime volume0.16, looping, lazy loading after sound opt-in.
- Old OtoLogic Loop03 is removed from runtime and archived at docs/audio/loop03-v0.2.mp3 under CC BY4.0, with original attribution in archived provenance. It is excluded from the v0.3 ZIP. This is a different track from the new OpenTracks music.

## Other licensed assets

| Assets | Source / terms | Processing |
|---|---|---|
| Move/blink/undo/clear/blocked | [Kenney UI Audio](https://kenney.nl/assets/ui-audio), CC0; authorized AssetsShared copy | Unchanged renamed rollover1/switch1/click2/switch9/click5 OGGs |
| UI icons | [Tabler Icons v3.47.0](https://github.com/tabler/tabler-icons/tree/v3.47.0/icons/outline), MIT | Unchanged SVGs |
| DM Sans/Fraunces | [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans), [Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces), OFL1.1 | Unchanged variable TTFs |

Attribution is in-game and public/CREDITS.txt; notices are under public/licenses/ and included in the ZIP. No itch.io or Tripo asset is shipped. The Game Development Studio CLI was unavailable in earlier production; this manifest is an integrity roster, not a package receipt or performance benchmark.

