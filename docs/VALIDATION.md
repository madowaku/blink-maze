# BLINK MAZE v0.3 validation

Verified2026-10-12 on Windows. This release adds006–011 to the unchanged five edge puzzles.

## Automated

- npm test: **6 files / 122 tests passed**.
- All11 metadata solutions replay successfully; independent BFS finds the recorded shortest action counts. The original five puzzles equal the archived v0.2 JSON exactly.
- New stages006–011: shortest total actions6,9,8,11,9,15; corresponding blinks0,1,2,1,1,2. Lower blink budgets are unsolvable when the intended minimum is positive.
- Each tempting wrong-order prefix has no continuation within budget. Undo restores a solvable start. Removing a critical discovery-route edge makes each maze unsolvable. These are structural checks, not proof of perceived AHA or uniqueness.
- Existing boundary, reverse movement, perimeter, all-floor blink, history/budget/completion and malformed-data tests remain.010 starts in phase1 and ends in phase0.
- Storage keeps prior001–005 clears, accepts new IDs, rejects invalid IDs, retains v1 data and preserves saved locale. First-visit locale fallback is unit-tested.
- Music container decrypts to the supplied MP3's exact SHA-256. Invalid/truncated/tampered data is rejected. Audio tests cover lazy loading, reuse, mute/hide, canceling a pending load and retry after failure.
- Final build (including TypeScript checking) passed: JS36.71kB (gzip13.58kB), CSS16.34kB (gzip4.29kB). Build sizes are not device performance measurements.

## Browser

CUA native key presses and DOM buttons; no direct game-state mutation or solver invocation. **34 passing checks** saved in docs/qa/v0.3/browser-checks.json.

- All11 routes cleared through native keys, then replay/reset; all-eleven completion appeared.006 showed0 blinks and010 initialized with reversed eyes.
- All six added boards fit360×800 with no overflow and all images loaded. Movement targets44×44; BLINK56px high; Undo/Restart44px high.
- Production5×5 fits1440×900,1280×810,900×900 and720×1280. Two visible height problems were fixed and affected sizes rechecked. The900×900 size is a standalone preview, not proof of an actual itch.io iframe.
- JA three-stage hints reveal only on separate clicks and reset on changing levels. EN final hint was checked. Credits identifyこーち and point to track16572.
- BGM played from a decoded Blob, loop=true, duration141.473673seconds and currentTime advanced. Clear-dialog mute stopped playback; production playback also worked. Runtime volume0.16 is unit-tested because the read-only browser inspection did not expose volume.
- Both development and production warning/error logs were empty.
- Browser reports reduced motion. Full-motion180ms feel remains untested.
- User's production records remained5/11 after the update; handoff selects006 without clearing any new stage. Campaign-test clears are on5201. Main production tab remains available on5202 with sound off.

Screenshots are under docs/qa/v0.3/. The final production desktop and900px screenshots supersede the initial overflowing views.

## Distribution and provenance

- ZIP: artifacts/blink-maze-v0.3.zip, **4,327,102 bytes / 42 entries**.
- SHA-256: **4cfd9f53411c5707f317df178864508d0c5619e079533de6b028fe1ce20bb8db**.
- Root index.html and CREDITS.txt present; CRC check passed. Assets/licenses included; source/docs and raw MP3 excluded. New music is a converted game container. Prior ZIPs remain.
- All64 asset-manifest hashes verified after the marketing cover was added. Original MP3 stays in the user's Downloads, outside the repository and build; exact input/output provenance is recorded. Art generation sources/prompts remain preserved.
- Distribution evidence: docs/qa/v0.3/distribution-checks.json.

## Participation and remaining checks

The user chose to post manually to Trijam393. English description, credits and upload settings are prepared in docs/TRIJAM_393_SUBMISSION.md. Creator reports development within3 hours; there is no independent timer proof. Registration, public game page, actual iframe behavior and jam submission have not been verified.

Human AHA discovery, difficulty/fun, physical-device touch/audio policy, long-term seamless loop listening and full-motion feel remain unverified. No GPU/FPS/latency benchmark or external deployment is claimed. Repository commit/push is handled separately at the user's explicit request.

