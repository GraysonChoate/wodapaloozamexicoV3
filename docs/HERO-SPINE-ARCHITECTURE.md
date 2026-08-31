# Hero Spine Architecture

## Purpose

The hero spine is one contained cinematic module inside the broader event website. It is not the entire page. The module has clear content above and below it, and it owns the viewport only while its scroll runway is active.

## Ownership sequence

1. `MOSAIC`
2. `CROWD_TILE`
3. `CROWD_EXPANDED`
4. `APERTURE_TRANSFER`
5. `STICKER_PLACEMENT`
6. `STICKER_MONTAGE`
7. `ROPE`
8. `EXITED`

Each checkpoint occupies one eighth of normalized hero progress. Boundary ownership is deterministic in both directions: at an exact boundary, the incoming owner receives control.

## Non-negotiable ownership rule

Only one `[data-owner]` layer may be visible. The manager deactivates the outgoing owner before activating the incoming owner. Deactivation means:

- `hidden = true`, which produces `display: none`;
- `aria-hidden = true`;
- `inert = true`;
- the owner's future `exit` lifecycle hook runs before the incoming `enter` hook.

The manager asserts this invariant after every ownership change and throws an error if the compositor ever exposes zero or multiple owners.

## Future footage connection

Approved media will be connected through owner-specific lifecycle hooks, not free-running global playback. Each owner adapter will:

1. prepare only its approved source;
2. map the approved time range to normalized local progress;
3. pause/reset its source on exit;
4. leave masks and geometry to CSS or a later approved renderer;
5. never create a duplicate playback owner during a handoff.

The current placeholders must be replaced owner-by-owner. Do not add a background video beneath the entire hero.

## Deliberately deferred

The Mexico-flag opening remains a separate intro owner before this spine. It is not represented as a ninth hero owner. Footage, final typography, WebGL transitions, full page sections, and responsive/mobile tuning remain deferred until this ownership foundation is accepted.
