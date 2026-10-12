# BLINK MAZE v0.2 implementation

User-provided v0.2 documents define the product direction; workflow/timing/tool suggestions are treated as guidance. The implementation replaces the old tile maze with exactly the supplied five edge mazes and preserves the existing minimal Vite/TypeScript stack.

- Every cell is floor. R edges connect (x,y) to (x+1,y), D edges to (x,y+1); omitted connections and exterior boundaries are fixed stone.
- `core.ts` normalizes reverse movement, owns pure state changes, immutable undo, phase/budget and completion. BLINK is independent of player location.
- `board.ts` renders floor, wall strips, carved-eye medallions and actors in separate layers. Each eye is centered on the relevant boundary; closed gates retract into two end posts and retain a translucent small emblem.
- Actual collision/layout comes from JSON. The visual reference is used for texture, color, typography and composition, not maze geometry.
- `storage.ts` uses a versioned v2 key; v1 progress is retained and only language migrates. Five new IDs are validated before counting clears.
- Both languages, optional hints, unrestricted level selection, mute and all keyboard/pointer controls remain functional. Header/movement/action targets are >=44px at 360px wide; mobile levels are collapsible.
- Ordinary phase changes have a180ms gate; reduced motion uses instant state/render updates without that delay. Audio always remains optional; it can also be muted inside dialogs.
- Pure core and storage tests, five independent BFS checks, actual UI solution replays, boundary-coordinate measurement and a separate horizontal-eye render fixture cover the rule migration.
- v0.1 source/visual evidence and assets are archived; current documents and v0.2 ZIP refer to the new game.

See `VALIDATION.md` for evidence and untested-device boundaries.

