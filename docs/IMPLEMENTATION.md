# BLINK MAZE v0.3 implementation

The user's new request authorizes an additive discovery chapter and replacement BGM. Earlier v0.2 documents remain reference material; their earlier five-level limit is superseded by the explicit request for new stages. Engine rules and the original five puzzles stay unchanged.

- Six authored connection graphs test route comparison, global same-color switching, exit-state planning, gate order, a reversed initial phase and approaching a central exit from the far side.
- Optional chapter metadata labels new stages. Localized titles, three-stage hints and post-clear notes live in text.ts. No generator or solver is invoked by the player flow.
- Progress stays on the v2 schema because001–005 keep their identity. IDs derive from actual level data. Existing clears and locale remain. First-visit language follows browser locale.
- Discovery boards account for grid ratio and viewport height, including5×5. Desktop navigation can wrap; mobile uses a modal. Hint expansion can add scrolling while all controls remain reachable.
- BGM uses an authenticated game container to avoid shipping an easily playable source audio file. Decode begins only on opt-in. Load failure leaves sound off and permits retry; cancellation during load prevents playback. Hidden documents pause audio. SE is unchanged.
- Windows packing uses .NET ZipFile instead of the optional PowerShell module that failed to load here. index.html remains at ZIP root; older ZIPs are preserved.
- Source/decoded music identity, hashes and unit/browser evidence are recorded. Actual itch.io iframe validation and participation/publication are separate external steps; the user chose manual posting.

See VALIDATION.md and AHA_STAGE_DESIGN_v0.3.md for evidence and hypotheses.

