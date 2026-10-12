# BLINK MAZE design QA

final result: passed

Source visual truth: `docs/reference.png`, Imagegen-generated direction target, 1586×992 pixels. Implementation: `docs/qa/production-reference-1586.jpg`, production preview at http://127.0.0.1:5202/, CSS viewport 1586×992. The browser capture backend retained the left 1524×992 pixels, cropping 62 pixels from the right edge. `docs/qa/reference-normalized.png` applies the same left crop to the source for a 1524×992 comparison at density 1. Both depict English Stage 001, phase 0, traveler at S, budget 1/1, no cleared levels. No device bezel. Source and implementation were opened together in one comparison input, then the equal-size normalized pair was reopened.

This is a functional implementation of the supplied written puzzle design. The generated mock is the art direction reference, not a user-provided pixel-cloning contract. Smaller desktop headings, a bounded board width, rounded cover crop and a true four-direction pad are intentional adaptations so the same game fits the specified mobile viewport.

## Findings and comparison history

- **P2 fixed: initial mobile/desktop viewport overflow.** At 360×800 the long seven-row map had a footer at 885 CSS px and a scrollbar; the initial desktop layout also exceeded 900 px. Reduced unused board space, capped desktop board widths and reduced chrome spacing. For the seven-row mobile map the decorative headline collapses and the board caps at 230 px. Revised captures show 360×800 without overflow, footer 782 px for Stage 006; desktop 1440×900 footer 869.58 px.
- **P2 fixed: font source format mismatch.** Initial CSS referenced nonexistent WOFF2 files. Final CSS uses the bundled original TTFs. Production build has no unresolved-font warnings; source font files and OFL licenses are included.
- No remaining actionable P0/P1/P2 issue was observed in the final captures or tested gameplay.

## Required surfaces

- **Typography:** Fraunces serif establishes the title/level/button hierarchy; DM Sans gives concise controls and budgets, local Japanese system fallback. Final mobile title and level names wrap without clipping. English desktop typography is deliberately smaller than the illustrative source to keep gameplay controls visible.
- **Spacing/layout:** source's left narrative / right puzzle split preserved; desktop vertical separator and numbered progression preserved. Mobile prioritizes board and action controls. No overlap between player, board, feedback and controls. The longest map has a compact presentation.
- **Colors/tokens:** warm ivory, sage stone, ink, blue and ochre match the source direction. Eye-open/closed distinction uses shape and text as well as hue. Focus rings and disabled/selected states are visible.
- **Images:** actual Imagegen transparent PNG eyes/traveler/door and textured wall/floor are used. Blue round pupil and amber diamond pupil are distinct. Cover is a separate original Imagegen scene; no screenshot tile substitution or handcrafted illustration. Standard icons are original Tabler SVGs. Raw and processed image sources are preserved separately.
- **Copy/content:** all supplied level names and the core wall/path, budget, safe-floor and undo rules are present in JA/EN. Invalid actions explain the cause. No engineering or jam-workflow text appears in play UI. Optional hints do not reveal solutions.

Full-view evidence: source and production screenshot were inspected together. Focused evidence: `docs/art/tiles-preview.png` was inspected for pupil, eyelid, player and door readability; mobile Stage 001 and Stage 006 captures show the controls, board and labels at actual target widths. No further region comparison was needed for the sparse interface.

Browser evidence: 21 passing CUA checks, all-eight completion, empty warning/error log lists, all inspected images loaded. See `docs/VALIDATION.md` for automated and untested-device boundaries.

## Follow-up polish

P3: test direction-button size and tile readability on a physical phone; assess the synthesized eye-transition timing and the chosen BGM at device volume. Human playtesting remains necessary to assess difficulty and fun.

Implementation checklist: all P2 fixes applied, post-fix screenshots recaptured, final build checked, local preview retained.
