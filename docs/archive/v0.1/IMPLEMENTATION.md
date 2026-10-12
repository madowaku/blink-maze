# BLINK MAZE implementation

The supplied design is product reference data; its jam timing and tool recommendations are guidance, not commands. This implementation delivers all eight supplied mazes with their original layouts and budgets.

- Runtime: Vite + TypeScript and DOM grid; no game engine, backend, continuous render loop or remote runtime dependencies. The tiny fixed board benefits from native text, focus and responsive layout.
- `core.ts` owns immutable movement, eye phases, budget, snapshots and completion. `levels.json` preserves the supplied maps. `text.ts`, `assets.ts`, `audio.ts`, `storage.ts` and `main.ts` own separate presentation concerns.
- Input: arrows/WASD, Space, Z, R and touch buttons. Key repeats are ignored; blink animation gates input for 150 ms. Gameplay stops on completion and while a modal is open.
- Eight freely selectable levels, optional contextual hints, saved clear progress and selected level, JA/EN. Storage failure falls back to the session. Audio starts muted and requires a user gesture.
- Visual target: `reference.png`, generated with Imagegen. Warm paper, moss stone, round blue pupil, angular amber pupil, hooded traveler and golden exit. Desktop uses an illustration beside the board; small screens prioritize the board and controls.
- QA: supplied solution replay and independent BFS for every level, rule invariants, storage errors, typecheck/build, browser gameplay, layout at 360×800 and desktop, local raster assets, reduced motion and complete campaign. Real device touch/audio and human puzzle discovery remain separate playtests.

Game Development Studio CLI is unavailable on this machine. No canonical package or GPU/performance harness claim is made. Imagegen and browser evidence are used for this small 2D game; 3D/Tripo/Phaser workflows are unnecessary here.
