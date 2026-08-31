export const HERO_OWNERS = Object.freeze([
  "MOSAIC",
  "CROWD_TILE",
  "CROWD_EXPANDED",
  "APERTURE_TRANSFER",
  "STICKER_PLACEMENT",
  "STICKER_MONTAGE",
  "ROPE",
  "EXITED"
]);

const SEGMENT_SIZE = 1 / HERO_OWNERS.length;

export const HERO_RANGES = Object.freeze(
  HERO_OWNERS.map((owner, index) => Object.freeze({
    owner,
    start: index * SEGMENT_SIZE,
    end: index === HERO_OWNERS.length - 1 ? 1 : (index + 1) * SEGMENT_SIZE
  }))
);

const clamp01 = value => Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));

export function ownerForProgress(progress) {
  const safeProgress = clamp01(progress);
  const index = Math.min(HERO_OWNERS.length - 1, Math.floor(safeProgress * HERO_OWNERS.length));
  return HERO_OWNERS[index];
}

export class HeroSpineOwnershipManager {
  constructor({ root, hooks = {} }) {
    if (!(root instanceof HTMLElement)) throw new TypeError("Hero ownership root must be an HTMLElement.");

    this.root = root;
    this.layers = new Map();
    this.hooks = hooks;
    this.owner = null;
    this.progress = 0;

    root.querySelectorAll("[data-owner]").forEach(layer => {
      const owner = layer.dataset.owner;
      if (!HERO_OWNERS.includes(owner)) throw new Error(`Unknown hero owner: ${owner}`);
      if (this.layers.has(owner)) throw new Error(`Duplicate hero owner layer: ${owner}`);
      this.layers.set(owner, layer);
    });

    const missing = HERO_OWNERS.filter(owner => !this.layers.has(owner));
    if (missing.length) throw new Error(`Missing hero owner layers: ${missing.join(", ")}`);

    // Prime every layer into the same fully inactive state before assigning
    // the first owner. This prevents markup defaults from creating a second
    // visual owner during initialization.
    for (const layer of this.layers.values()) {
      layer.dataset.active = "false";
      layer.setAttribute("aria-hidden", "true");
      layer.inert = true;
      layer.hidden = true;
    }

    this.setOwner(ownerForProgress(0), { reason: "initialization", force: true });
  }

  setProgress(progress) {
    const nextProgress = clamp01(progress);
    const nextOwner = ownerForProgress(nextProgress);
    this.progress = nextProgress;
    this.root.style.setProperty("--hero-progress", nextProgress.toFixed(5));
    this.setOwner(nextOwner, { reason: "progress" });
    return this.snapshot();
  }

  setOwner(nextOwner, { reason = "direct", force = false } = {}) {
    if (!HERO_OWNERS.includes(nextOwner)) throw new Error(`Cannot activate unknown owner: ${nextOwner}`);
    if (!force && nextOwner === this.owner) return this.snapshot();

    const previousOwner = this.owner;
    if (previousOwner) this.#deactivate(previousOwner);
    this.#activate(nextOwner);
    this.owner = nextOwner;
    this.#assertSingleOwner();

    this.root.dispatchEvent(new CustomEvent("hero-spine:owner-change", {
      bubbles: true,
      detail: { owner: nextOwner, previousOwner, progress: this.progress, reason }
    }));

    return this.snapshot();
  }

  snapshot() {
    return Object.freeze({ owner: this.owner, progress: this.progress });
  }

  #activate(owner) {
    const layer = this.layers.get(owner);
    layer.hidden = false;
    layer.inert = false;
    layer.setAttribute("aria-hidden", "false");
    layer.dataset.active = "true";
    this.hooks[owner]?.enter?.({ layer, owner, progress: this.progress });
  }

  #deactivate(owner) {
    const layer = this.layers.get(owner);
    this.hooks[owner]?.exit?.({ layer, owner, progress: this.progress });
    layer.dataset.active = "false";
    layer.setAttribute("aria-hidden", "true");
    layer.inert = true;
    layer.hidden = true;
  }

  #assertSingleOwner() {
    const activeLayers = [...this.layers.values()].filter(layer => !layer.hidden);
    if (activeLayers.length !== 1 || activeLayers[0].dataset.owner !== this.owner) {
      throw new Error(`Hero compositor ownership violation: expected ${this.owner}, found ${activeLayers.map(layer => layer.dataset.owner).join(", ") || "none"}.`);
    }
  }
}
