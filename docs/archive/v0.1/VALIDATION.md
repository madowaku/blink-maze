# BLINK MAZE v0.1 validation

Verified 2026-10-12 in Codex on Windows. Scope: all eight mazes and the browser UI; no real device or human playtest claim.

## Automated

- `npm test`: **2 files / 35 tests passed**. Eight supplied solutions replayed with their exact action and blink counts. Independent breadth-first search recovered the supplied shortest action counts for all eight. Wall/bounds rejection, complementary eyes, unsafe/budget rejection without consumption/history, immutable undo, restart initialization, zero budget, completion input gate and malformed level checks passed.
- Storage tests: missing, malformed, denied and quota-failing storage fall back safely; saved indices/clear identifiers are sanitized; locale and progress roundtrip passed.
- `npm run typecheck`: passed.
- Final `npm run build`: passed without missing-font warnings. Compiled JS 22.32 kB (gzip 9.26 kB), CSS 14.40 kB (gzip 3.83 kB). These are build sizes, not hardware performance measurements.

## Browser

Codex in-app Browser was used through the CUA API, with actual keyboard presses and pointer clicks. `docs/qa/browser-checks.json` contains **21 passing checks**. No automation directly mutated game state or invoked the solver.

- All eight supplied solutions cleared through the actual UI and advanced to the next level. All-eight completion was displayed.
- Wall rejection, budget overflow, unsafe blink, undo budget recovery, zero budget stage, replay phase/budget reset, help/clear input gates, save across reload, optional hint, audio ON after media load and OFF passed.
- Holding a movement key for 700 ms advanced one tile; an immediate move during BLINK was ignored. The playthrough waits 170 ms after each blink before the next action.
- 360×800: initial stage and the seven-row Stage 006 fit the viewport with no horizontal or vertical overflow (footer bottom 760 / 782 CSS px respectively).
- 390×844: initial stage fit with no overflow.
- 1440×900: initial stage fit; footer bottom 869.58 CSS px. No missing images or console warning/error messages.
- 1586×992: production screenshot matched the generated source viewport and initial stage, English. All observed script, stylesheet and image URLs were relative/local. No missing images or console warning/error messages.
- Production preview at port 5202: boot, move, successful blink, budget/phase update, undo/restart, locale and local asset rendering checked. The handoff origin retains 0 cleared levels; QA campaign progress is confined to port 5201.

Evidence: `mobile-360-stage1.jpg`, `mobile-360-stage6.jpg`, `all-clear-360.jpg`, `desktop-1440.jpg`, `production-reference-1586.jpg` under `docs/qa/`.

## Distribution

- `npm run pack`: `artifacts/blink-maze-v0.1.zip`, **3,670,184 bytes / 40 entries**.
- ZIP inspection: `index.html` at root, `CREDITS.txt` present, no `dist/` wrapper, CRC check clean. License files and local fonts/audio/images are included; raw art, source documents, node_modules and QA images are excluded.
- `docs/asset-manifest.json`: 42 source/shipped files with sizes and SHA-256. Source and processed art preserved separately.

## Remaining playtests

- Physical mobile touch targets, browser audio policies, perceived sound volume and seam/feel of BGM looping.
- Human discovery of the Stage 004 adjacent-eye constraint and Stage 005 detour; puzzle difficulty, readability and fun.
- Device color-vision checks. Round vs diamond pupils, distinct closed-eye lashes and textual legends are implemented.
- Reduced-motion CSS is implemented; OS-level reduced-motion setting was not changed during browser QA.
- Storage-failure behavior has automated evidence; restricted-storage browser mode was not independently exercised.
- No Game Development Studio CLI, sealed telemetry, GPU capture or hardware FPS/latency measurement was available or claimed.
