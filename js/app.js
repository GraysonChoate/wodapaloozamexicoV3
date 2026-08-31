import { HERO_OWNERS, HeroSpineOwnershipManager } from "./hero-spine-ownership.js";

const runway = document.querySelector("[data-hero-runway]");
const viewport = document.querySelector("[data-hero-viewport]");
const openingFlag = document.querySelector("[data-opening-flag]");
const ownerVideos = new Map([...document.querySelectorAll("[data-owner-video]")].map(video => [video.dataset.ownerVideo, video]));

if (!runway || !viewport) throw new Error("V3 hero-spine shell is incomplete.");

// The flag belongs only to the opening identity. It is never registered as a
// hero-spine owner and therefore cannot bleed into the contained film module.
if (openingFlag) {
  const opening = openingFlag.closest(".opening-hero");
  const updateOpeningPlayback = () => {
    if (!openingFlag.duration) return;
    const rect = opening.getBoundingClientRect();
    const visible = rect.bottom > 0 && rect.top < window.innerHeight;
    if (visible && openingFlag.paused) openingFlag.play().catch(() => {});
    if (!visible && !openingFlag.paused) openingFlag.pause();
  };
  window.addEventListener("scroll", updateOpeningPlayback, { passive: true });
  window.addEventListener("resize", updateOpeningPlayback, { passive: true });
  openingFlag.addEventListener("loadedmetadata", updateOpeningPlayback, { once: true });
}

// These lifecycle hooks are intentionally empty until footage is approved.
// Future media adapters will pause/reset an outgoing source and prepare the incoming
// source here, preserving one visual and playback owner at every checkpoint.
const futureMediaHooks = Object.fromEntries(
  HERO_OWNERS.map(owner => [owner, {
    enter({ layer }) {
      const video = layer.querySelector("[data-owner-video]");
      if (video) video.play().catch(() => {});
    },
    exit({ layer }) {
      const video = layer.querySelector("[data-owner-video]");
      if (video) video.pause();
    }
  }])
);

const ownership = new HeroSpineOwnershipManager({ root: viewport, hooks: futureMediaHooks });
const debugEnabled = new URLSearchParams(window.location.search).get("debug") === "1";
const debugPanel = document.querySelector("[data-ownership-debug]");
const debugOwner = document.querySelector("[data-debug-owner]");
const debugProgress = document.querySelector("[data-debug-progress]");

// The rail is one adaptive glass object. Its contrast follows the actual page
// surface instead of behaving like a permanent opaque header.
const nav = document.querySelector(".site-nav");
if (nav) {
  const surfaceObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const light = visible.target.classList.contains("page-boundary--intro");
    nav.dataset.surface = light ? "light" : "dark";
    nav.style.setProperty("--nav-surface", light ? "#f1eee6" : "#090909");
    nav.style.setProperty("--nav-ink", light ? "#090909" : "#f1eee6");
  }, { threshold: [0.2, 0.55, 0.8] });
  document.querySelectorAll(".opening-hero, .page-boundary, .hero-spine").forEach(section => surfaceObserver.observe(section));
}

if (debugPanel) debugPanel.hidden = !debugEnabled;

let updateQueued = false;

function heroProgress() {
  const rect = runway.getBoundingClientRect();
  const travel = Math.max(1, runway.offsetHeight - window.innerHeight);
  return Math.min(1, Math.max(0, -rect.top / travel));
}

function renderOwnership() {
  updateQueued = false;
  const progress = heroProgress();
  const snapshot = ownership.setProgress(progress);
  const activeRange = Math.min(HERO_OWNERS.length - 1, Math.floor(progress * HERO_OWNERS.length));
  const localProgress = Math.min(1, Math.max(0, progress * HERO_OWNERS.length - activeRange));
  const activeVideo = ownerVideos.get(snapshot.owner);
  if (activeVideo && Number.isFinite(activeVideo.duration) && activeVideo.duration > 0) {
    const target = Math.max(0, activeVideo.duration - 0.04) * localProgress;
    if (Math.abs(activeVideo.currentTime - target) > 0.03) activeVideo.currentTime = target;
  }
  if (debugEnabled && debugOwner && debugProgress) {
    debugOwner.textContent = snapshot.owner;
    debugProgress.textContent = snapshot.progress.toFixed(3);
  }
}

function requestOwnershipUpdate() {
  if (updateQueued) return;
  updateQueued = true;
  requestAnimationFrame(renderOwnership);
}

window.addEventListener("scroll", requestOwnershipUpdate, { passive: true });
window.addEventListener("resize", requestOwnershipUpdate, { passive: true });
window.addEventListener("pageshow", requestOwnershipUpdate);

renderOwnership();

// Exposed for deterministic QA and future integration—not for production animation.
window.__WZA_V3_HERO__ = Object.freeze({
  owners: HERO_OWNERS,
  getSnapshot: () => ownership.snapshot(),
  setProgressForTest: progress => ownership.setProgress(progress)
});
