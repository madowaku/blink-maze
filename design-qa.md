# BLINK MAZE v0.3 visual QA

Checked2026-10-12 with Game Playtest and Hiro Frontend QA. Reuses the selected Imagegen stone/paper art; layouts come from edge data.

- Six discovery mazes fit360×800 with hints closed. Directions44×44, BLINK56 high, Undo/Restart44 high.5×5 needed a smaller board to keep controls visible; fixed and inspected.
- Production5×5 fits1440×900,1280×810,900×900 and720×1280. The900×900 overflow was fixed before final screenshots.
- Wall geometry and legend match the reversed initial phase of010. Horizontal eyes in007 and010 are part of actual playable mazes.
- Chapter labels appear on-screen and in selection. Eleven desktop targets fit or wrap; mobile uses the scrollable level dialog.
- Hints start hidden and reveal one step at a time. Specific route guidance requires an explicit third reveal. Both languages were checked.
- BGM credits link to the requested track and identifyこーち. Muting works inside the clear dialog. Decoded Blob playback advanced in production.
- Production proof: docs/qa/v0.3/production-stage6-desktop.jpg, production-stage9-desktop-en.jpg, production-stage10-1440.jpg, production-stage10-900.jpg, production-stage10-720.jpg. Mobile: mobile-stage10.jpg and mobile-hint3.jpg.

The browser reports reduced motion. Full-motion feel, physical-device touch/audio, actual itch.io iframe rendering and subjective AHA are unverified.

