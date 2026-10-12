# BLINK MAZE v0.2 validation

Verified 2026-10-12 in Codex on Windows. All counts below refer to the new five edge mazes, not the archived eight tile mazes.

## Automated

- `npm test`: **3 files / 57 tests passed**. Includes all five supplied solution replays, five independent BFS shortest-route checks, forward/reverse edge normalization, fixed perimeter/undefined edges, both eye families, BLINK from every non-goal floor cell, immutable undo, budget/zero-budget guards, phase-1 initialization, completion gates, unsolvable data and malformed edge validation.
- BFS shortest action counts: Stage001=4, 002=6, 003=5, 004=7, 005=9. Matching blink counts:1,2,1,1,1. Unique solutions and perceived difficulty are not claimed.
- Horizontal-eye fixture independently verifies above/below approaches and both phases.
- Storage tests preserve the v1 key, migrate only locale, reject stale versions/invalid identifiers, and handle denied/corrupt/quota-failing storage.
- `npm run typecheck` passed; final `npm run build` passed without warnings. JS25.86kB (gzip10.37kB), CSS15.43kB (gzip4.08kB). These are build sizes, not measured hardware frame performance.

## Browser

Codex in-app Browser through CUA; real DOM buttons/native keyboard events, no direct state mutation or invocation of game solver. **25 passing checks** in `docs/qa/v0.2/browser-checks.json`.

- All five supplied routes cleared through the UI and advanced to all-five completion.
- Outer wall rejection, budget overflow, undo including intervening movement, replay/reset, help/clear input gates, selected level/clear progress and locale persistence, optional hints and dialog-accessible sound ON/OFF passed.
- 360×800 Stage001/004 and English Stage005 fit without scrolling. All movement/action buttons measure at least44×44px. BLINK56px high; Undo/Restart44px high; directional controls44×44px.
- 720×1280 Stage005, 1280×810 Stage004, 1440×900 Stage004 fit without overflow after responsive fixes.
- Floor count stays width×height. No eye is a descendant of a floor cell; medallion centers match their boundary centers within0.021 CSS px in the inspected board.
- A separate render-only fixture at `scripts/qa/edge-orientation.html` verified horizontal eyes for both phases. Their center error was0 CSS px and blocking/passable attributes reversed correctly. This fixture is excluded from production; no extra gameplay level was added.
- The browser reported reduced motion. BLINK was instant, with the next rapid key accepted, as required. Normal-motion180ms input gating and CSS wall animation are implemented but were not exercised with reduced motion disabled.
- Warning/error log queries were empty. Images loaded in the production preview.
- Production preview at port5202 refreshed from the old eight-level screen to v0.2 with0/5 clears and inherited JA. Movement, BLINK, phase/budget update, undo/restart, assets and both target screenshots were checked. Handoff returns to Stage001 with0 new clears; campaign QA progress is on port5201.

Evidence is under `docs/qa/v0.2/`: mobile Stage001/004 before/after, English Stage005, 720px Stage005, desktop Stage004, all-clear, horizontal-eye fixture, production desktop/mobile.

## Distribution and provenance

- `npm run pack`: `artifacts/blink-maze-v0.2.zip`, **4,170,256 bytes / 42 ZIP entries**.
- SHA-256: `53a40044f3085483c6a604094eba8cc1278ffa86081615a86716749cb69cf8e8`.
- ZIP root has index.html and CREDITS.txt; CRC check passed; no dist/ wrapper. Runtime images, audio, fonts and licenses are included. Old v0.1 sprites, QA fixture and source/raw documents are excluded.
- `docs/asset-manifest.json`: all58 file hashes were verified. v0.1 sprites/source/ZIP are preserved; v0.2 Imagegen originals, exact prompts and processed sprites are recorded separately.

## Remaining human/device checks

Physical mobile touch and audio volume/policy, full-motion feel, color-vision readability at device scale, initial rule discovery, difficulty and fun remain unverified. Storage-failure behavior has automated evidence, not a restricted-storage browser run. No GPU/FPS/latency benchmark, sealed game-dev run, commit, push or external deployment was performed.

