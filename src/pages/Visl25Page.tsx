import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { GOOGLE_FORM_URL } from '../constants';
import { trackCtaClick } from '../lib/analytics';
import '../styles/visl25.css';

// Register required GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin);

// Fallback form URL if not present
const FORM_URL = GOOGLE_FORM_URL || 'https://forms.gle/visl25';

type BenefitFx = 'coins' | 'pie' | 'chat' | 'ticket' | 'laurel';

interface BenefitItem {
  id: string;
  num: string;
  stat: string;
  statLabel: string;
  boldHeading: string;
  bodyText: string;
  fx: BenefitFx;
}

const BENEFITS: BenefitItem[] = [
  {
    id: 'benefit-1',
    num: '01',
    stat: '$130+',
    statLabel: 'FREE CREDITS',
    boldHeading: 'Free credits',
    bodyText: 'to start with to make your first films on Visl, on us.',
    fx: 'coins',
  },
  {
    id: 'benefit-2',
    num: '02',
    stat: '0.10%',
    statLabel: 'FOUNDING EQUITY',
    boldHeading: 'Early access to everything.',
    bodyText:
      'New features and models before anyone else.',
    fx: 'pie',
  },
  {
    id: 'benefit-3',
    num: '03',
    stat: 'DIRECT',
    statLabel: 'VIP COMMUNITY',
    boldHeading: 'Private Discord community',
    bodyText: 'to build alongside the team and fellow creators.',
    fx: 'chat',
  },
  {
    id: 'benefit-4',
    num: '04',
    stat: '25 SEATS',
    statLabel: 'WE GROW TOGETHER',
    boldHeading: 'We feature your work to grow your channel; ',
    bodyText: 'your stories help grow Visl.',
    fx: 'ticket',
  },
  {
    id: 'benefit-5',
    num: '05',
    stat: 'TOP 10',
    statLabel: 'CREATOR LAURELS',
    boldHeading: 'Bonus credits for the top 10.',
    bodyText: `Extra credits for the program's standout creators.`,
    fx: 'laurel',
  },
];

// ── Card interaction tuning ───────────────────────────────────────────────
const MAX_TILT = 6; // degrees
const TILT_PERSPECTIVE = 900;
/** Particles rendered once per card and reused on every hover (no DOM created at hover time). */
const POOL_SIZE: Record<BenefitFx, number> = {
  coins: 14,
  pie: 12,
  chat: 12,
  ticket: 25, // 5x5 seat grid
  laurel: 18,
};
const CHOSEN_SEAT = 13; // the one seat that lights up gold in the grid wave
const CONFETTI_COLORS = ['#fbbf24', '#4387ff', '#ff8a70', '#10b981', '#7c3aed'];

/** Small gold coin. All POOL_SIZE.coins instances are rendered once and reused (pooled). */
function Coin() {
  return (
    <svg className="visl25-coin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6.5" stroke="#d97706" strokeWidth="1.2" strokeOpacity="0.7" />
      <path d="M12 8.5v7" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** One pooled particle per index, themed to its benefit. Hidden by CSS until GSAP flies it. */
function Particle({ fx, i }: { fx: BenefitFx; i: number }) {
  switch (fx) {
    case 'coins':
      return <Coin />;
    case 'pie':
      // Equity growth: green up-arrows and blue "%" chips float upward
      return i % 2 === 0 ? (
        <svg className="visl25-fx-p" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l8 10h-5v8H9v-8H4z" fill="#10b981" />
        </svg>
      ) : (
        <svg className="visl25-fx-p" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#245ac4" />
          <path d="M8 16l8-8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="8.5" cy="8.5" r="1.8" fill="#ffffff" />
          <circle cx="15.5" cy="15.5" r="1.8" fill="#ffffff" />
        </svg>
      );
    case 'chat': {
      // Community: live-stream style reactions (heart, spark, message)
      const kind = i % 3;
      if (kind === 0) {
        return (
          <svg className="visl25-fx-p" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#f43f5e"
            />
          </svg>
        );
      }
      if (kind === 1) {
        return (
          <svg className="visl25-fx-p" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 1l2.7 8.3L23 12l-8.3 2.7L12 23l-2.7-8.3L1 12l8.3-2.7z" fill="#f59e0b" />
          </svg>
        );
      }
      return (
        <svg className="visl25-fx-p" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7l-5 4v-4H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" fill="#245ac4" />
          <circle cx="8" cy="11" r="1.2" fill="#ffffff" />
          <circle cx="12" cy="11" r="1.2" fill="#ffffff" />
          <circle cx="16" cy="11" r="1.2" fill="#ffffff" />
        </svg>
      );
    }
    case 'ticket':
      // 25 seats: a tiny cinema-seat grid that ripples in
      return (
        <svg
          className="visl25-fx-p"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 10V8a5 5 0 0 1 10 0v2" />
          <rect x="4" y="10" width="16" height="7" rx="2" fill="currentColor" fillOpacity="0.25" />
          <path d="M7 17v3M17 17v3" />
        </svg>
      );
    case 'laurel': {
      // Top creators: winner confetti (stars, strips, dots)
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      const kind = i % 3;
      return (
        <svg className="visl25-fx-p" viewBox="0 0 24 24" aria-hidden="true">
          {kind === 0 && <path d="M12 1l2.7 8.3L23 12l-8.3 2.7L12 23l-2.7-8.3L1 12l8.3-2.7z" fill={color} />}
          {kind === 1 && <rect x="4" y="8" width="16" height="8" rx="1.5" fill={color} />}
          {kind === 2 && <circle cx="12" cy="12" r="6" fill={color} />}
        </svg>
      );
    }
  }
}

/** Signature icon for each benefit. The rest state is the finished icon (works with no JS/motion). */
function BenefitArt({ fx }: { fx: BenefitFx }) {
  switch (fx) {
    case 'coins':
      return (
        <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="28" cy="38" rx="16" ry="6" fill="rgba(251,191,36,0.35)" stroke="#d97706" />
          <path d="M12 38v-8c0 3.3 7.2 6 16 6s16-2.7 16-6v8" stroke="#d97706" />
          <ellipse cx="28" cy="30" rx="16" ry="6" fill="rgba(251,191,36,0.5)" stroke="#d97706" />
          <path d="M12 30v-8c0 3.3 7.2 6 16 6s16-2.7 16-6v8" stroke="#d97706" />
          <ellipse cx="28" cy="22" rx="16" ry="6" fill="#fbbf24" stroke="#d97706" />
        </svg>
      );
    case 'pie':
      return (
        <svg viewBox="0 0 56 56" fill="none" strokeLinecap="butt">
          <circle className="visl25-pie-disc" cx="28" cy="28" r="20" fill="rgba(36,90,196,0.08)" stroke="currentColor" strokeWidth="2" />
          <circle
            className="visl25-pie-slice"
            cx="28"
            cy="28"
            r="10"
            stroke="#245ac4"
            strokeWidth="20"
            transform="rotate(-90 28 28)"
          />
        </svg>
      );
    case 'chat':
      return (
        <svg viewBox="0 0 56 56" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g className="visl25-bubble visl25-bubble-a">
            <path
              d="M8 10h22a5 5 0 0 1 5 5v7a5 5 0 0 1-5 5H17l-6 5v-5H8a5 5 0 0 1-5-5v-7a5 5 0 0 1 5-5z"
              fill="#ffffff"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="13" cy="18.5" r="1.4" fill="currentColor" />
            <circle cx="19" cy="18.5" r="1.4" fill="currentColor" />
            <circle cx="25" cy="18.5" r="1.4" fill="currentColor" />
          </g>
          <g className="visl25-bubble visl25-bubble-b">
            <path
              d="M29 28h18a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5h-2v5l-6-5H29a5 5 0 0 1-5-5v-5a5 5 0 0 1 5-5z"
              fill="#245ac4"
              stroke="#245ac4"
              strokeWidth="2"
            />
          </g>
        </svg>
      );
    case 'ticket':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3z"
            fill="rgba(36,90,196,0.1)"
          />
          <path d="M12 8v8" strokeDasharray="2 2" />
        </svg>
      );
    case 'laurel':
      return (
        <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className="visl25-laurel-path" d="M22 48C12 42 9 28 15 14" />
          <path className="visl25-laurel-path" d="M34 48C44 42 47 28 41 14" />
          <path className="visl25-laurel-path" d="M14 40C9 40 6 37 5 33" />
          <path className="visl25-laurel-path" d="M11 32C6 31 4 27 4 23" />
          <path className="visl25-laurel-path" d="M11 24C7 22 6 18 7 14" />
          <path className="visl25-laurel-path" d="M14 17C12 14 12 11 13 8" />
          <path className="visl25-laurel-path" d="M42 40C47 40 50 37 51 33" />
          <path className="visl25-laurel-path" d="M45 32C50 31 52 27 52 23" />
          <path className="visl25-laurel-path" d="M45 24C49 22 50 18 49 14" />
          <path className="visl25-laurel-path" d="M42 17C44 14 44 11 43 8" />
        </svg>
      );
  }
}

/** Fade a particle in at the start of its flight and out at the end. */
function fadeFlight(tl: gsap.core.Timeline, el: Element, at: number, dur: number, peak = 1) {
  tl.to(el, { opacity: peak, duration: 0.12, ease: 'none' }, at);
  tl.to(el, { opacity: 0, duration: 0.25, ease: 'none' }, at + dur - 0.25);
}

/**
 * Builds the paused "signature" timeline for a card (icon animation + pooled particles).
 * Built once per card and replayed with invalidate().restart(), so no DOM is created at hover time.
 * Returns null if the expected elements are missing.
 */
function buildSignatureTimeline(card: HTMLElement, fx: BenefitFx): gsap.core.Timeline | null {
  const artBox = card.querySelector<HTMLElement>('.visl25-card-art');
  const art = card.querySelector<SVGSVGElement>('.visl25-card-art svg');
  const w = () => card.clientWidth;
  const h = () => card.clientHeight;
  const tl = gsap.timeline({ paused: true });

  switch (fx) {
    case 'coins': {
      // $130: coins rain down with gravity
      const coins = gsap.utils.toArray<SVGElement>('.visl25-coin', card);
      if (!coins.length) return null;
      const order = gsap.utils.shuffle(coins.map((_, i) => i));
      coins.forEach((coin, i) => {
        const at = order[i] * 0.055;
        const dur = 0.85 + (i % 5) * 0.09;
        tl.fromTo(
          coin,
          {
            x: () => gsap.utils.random(16, Math.max(48, w() * 0.6)),
            y: -28,
            rotation: () => gsap.utils.random(-60, 60),
            scale: () => gsap.utils.random(0.8, 1.15),
            opacity: 0,
          },
          { y: () => h() + 16, rotation: () => gsap.utils.random(200, 420), duration: dur, ease: 'power2.in' },
          at
        );
        fadeFlight(tl, coin, at, dur);
      });
      return tl;
    }

    case 'pie': {
      // Equity: pie slice draws while growth tokens (arrows, % chips) float UP
      const slice = card.querySelector<SVGCircleElement>('.visl25-pie-slice');
      const parts = gsap.utils.toArray<SVGElement>('.visl25-fx-p', card);
      if (!slice || !parts.length) return null;
      tl.fromTo(slice, { drawSVG: '0% 0%' }, { drawSVG: '0% 15%', duration: 0.9, ease: 'power2.out' }, 0);
      if (art) tl.fromTo(art, { rotation: -30 }, { rotation: 0, duration: 0.9, ease: 'back.out(1.7)' }, 0);
      const order = gsap.utils.shuffle(parts.map((_, i) => i));
      parts.forEach((p, i) => {
        const at = 0.1 + order[i] * 0.07;
        const dur = 1.1 + (i % 4) * 0.14;
        tl.fromTo(
          p,
          {
            x: () => gsap.utils.random(16, Math.max(48, w() * 0.9)),
            y: () => h() + 12,
            rotation: () => gsap.utils.random(-20, 20),
            scale: 0.5,
            opacity: 0,
          },
          { y: () => gsap.utils.random(-10, h() * 0.45), scale: () => gsap.utils.random(0.9, 1.25), duration: dur, ease: 'power2.out' },
          at
        );
        fadeFlight(tl, p, at, dur);
      });
      return tl;
    }

    case 'chat': {
      // Community: two bubbles pop, then live-stream style reactions float up and wobble
      const a = card.querySelector<SVGGElement>('.visl25-bubble-a');
      const b = card.querySelector<SVGGElement>('.visl25-bubble-b');
      const parts = gsap.utils.toArray<SVGElement>('.visl25-fx-p', card);
      if (!a || !b || !parts.length) return null;
      tl.fromTo(a, { scale: 0, opacity: 0, transformOrigin: '10% 100%' }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' }, 0);
      tl.fromTo(b, { scale: 0, opacity: 0, transformOrigin: '90% 100%' }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' }, 0.18);
      const order = gsap.utils.shuffle(parts.map((_, i) => i));
      parts.forEach((p, i) => {
        const at = 0.2 + order[i] * 0.09;
        const dur = 1.3 + (i % 4) * 0.2;
        tl.fromTo(
          p,
          { x: () => gsap.utils.random(w() * 0.5, w() - 34), y: () => h() + 12, scale: 0.3, opacity: 0 },
          { y: () => gsap.utils.random(-10, h() * 0.35), scale: () => gsap.utils.random(0.9, 1.3), duration: dur, ease: 'power1.out' },
          at
        );
        // Side-to-side wobble on xPercent so it never fights the x start position
        tl.fromTo(
          p,
          { xPercent: 0 },
          { xPercent: () => gsap.utils.random(-220, 220), duration: dur / 2, ease: 'sine.inOut', repeat: 1, yoyo: true },
          at
        );
        fadeFlight(tl, p, at, dur);
      });
      return tl;
    }

    case 'ticket': {
      // 25 seats: ticket pulses while a 5x5 seat grid ripples out from the centre; one seat turns gold
      const seats = gsap.utils.toArray<SVGElement>('.visl25-fx-p', card);
      if (!art || seats.length < 25) return null;
      const pulse = gsap.timeline({ repeat: 1 });
      pulse.to(art, { scale: 1.2, rotation: -7, duration: 0.2, ease: 'power2.out', transformOrigin: '50% 50%' });
      pulse.to(art, { scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1.2, 0.4)' });
      tl.add(pulse, 0);
      tl.fromTo(
        seats,
        {
          x: (i: number) => w() * (0.08 + (i % 5) * 0.21) - 9,
          y: (i: number) => h() * (0.14 + Math.floor(i / 5) * 0.18) - 9,
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 0.5,
          duration: 0.35,
          ease: 'back.out(2.5)',
          stagger: { each: 0.035, grid: [5, 5], from: 'center' },
        },
        0.05
      );
      tl.to(seats[CHOSEN_SEAT], { color: '#f59e0b', scale: 1.7, opacity: 1, duration: 0.35, ease: 'back.out(3)' }, 0.95);
      tl.to(
        seats.filter((_, i) => i !== CHOSEN_SEAT),
        { opacity: 0, duration: 0.4, ease: 'none', stagger: { each: 0.02, grid: [5, 5], from: 'center' } },
        1.5
      );
      tl.to(seats[CHOSEN_SEAT], { opacity: 0, scale: 0, duration: 0.35, ease: 'back.in(2)' }, 2.1);
      return tl;
    }

    case 'laurel': {
      // Top 10: laurel draws, then a confetti burst fans out of the wreath and falls
      const paths = gsap.utils.toArray<SVGPathElement>('.visl25-laurel-path', card);
      const parts = gsap.utils.toArray<SVGElement>('.visl25-fx-p', card);
      if (!paths.length || !parts.length || !artBox) return null;
      tl.fromTo(
        paths,
        { drawSVG: '0% 0%', opacity: 0 },
        { drawSVG: '0% 100%', opacity: 1, duration: 0.6, ease: 'power2.inOut', stagger: 0.06 },
        0
      );
      const cx = () => artBox.offsetLeft + artBox.offsetWidth / 2 - 9;
      const cy = () => artBox.offsetTop + artBox.offsetHeight / 2 - 9;
      const n = parts.length;
      parts.forEach((p, i) => {
        const at = 0.55 + i * 0.012;
        // Fan out toward the left half of the card (the art sits on the right edge)
        const theta = Math.PI / 2 + (i / (n - 1)) * Math.PI;
        const dist = 70 + (i % 4) * 30;
        const dx = Math.cos(theta) * dist;
        const dy = Math.sin(theta) * dist * 0.9;
        tl.fromTo(
          p,
          { x: cx, y: cy, scale: 0, rotation: 0, opacity: 0 },
          {
            x: () => cx() + dx,
            y: () => cy() + dy,
            scale: () => gsap.utils.random(0.9, 1.3),
            rotation: () => gsap.utils.random(-180, 180),
            duration: 0.5,
            ease: 'power3.out',
          },
          at
        );
        tl.to(p, { opacity: 1, duration: 0.08, ease: 'none' }, at);
        tl.to(p, { y: () => h() + 20, rotation: '+=240', duration: 0.95, ease: 'power2.in' }, at + 0.5);
        tl.to(p, { opacity: 0, duration: 0.3, ease: 'none' }, at + 1.15);
      });
      return tl;
    }
  }
}

// ── Film-reel guide ───────────────────────────────────────────────────────
// A real-looking film strip runs down the page gutters (with loop-the-loops) and crosses the page
// ONLY inside two blank "film break" bands between sections, so it never passes behind any text.
// A cine camera rides its head. All geometry is rebuilt from measured pixel positions on resize.

const TAU = Math.PI * 2;
const clampN = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const SVG_NS = 'http://www.w3.org/2000/svg';

/** Camera artwork extents (local units, facing right): 48 behind the body, 80 in front of it. */
const CAM_BACK = 48;
const CAM_FRONT = 80;
const CAM_ART_W = CAM_BACK + CAM_FRONT;
/** Scroll distance (px) the camera spends on each side of a crossing band. */
const CROSS_LEAD = 90;

interface Band {
  top: number;
  bottom: number;
}

interface ReelLayout {
  W: number;
  H: number;
  left: number; // content column left edge
  right: number; // content column right edge
  gap1: Band | null; // blank band between the hero (with the golden ticket) and the benefits
  gap2: Band | null; // blank band between the benefits and the "Who should apply" section
  yStart: number;
  yEnd: number;
}

interface ReelGeometry {
  pts: number[]; // flat [x0, y0, x1, y1, ...]
  cum: number[]; // cumulative arc length per point
  len: number;
  splits: number[]; // loop apex indices: the later pass of a loop is drawn over the earlier one
  keys: Array<{ y: number; s: number }>; // monotonic (scroll y -> arc length)
  face: Array<{ s: number; f: number }>; // camera facing (+1 right, -1 left) along the route
  strip: number; // film width in px
  camW: number; // camera width in px
}

/**
 * Builds the route. Lanes sit just outside the content column; loops bulge toward the page edge.
 * Crossings are quarter-turn / straight / quarter-turn S-bends confined to a blank band, with a
 * loop in the middle of the straight part.
 */
function buildReel(L: ReelLayout): ReelGeometry {
  const { W } = L;
  const gutter = Math.max(0, Math.min(L.left, W - L.right));
  // Never let the camera shrink below a readable size, even when the gutters are only ~30px (phones).
  const strip = clampN(gutter * 0.11, 11, 26);
  const camW = clampN(gutter * 0.3, 56, 80);
  const k = camW / CAM_ART_W;

  // Lane x: as close to the content as the camera's lens allows. On narrow screens the gutter cannot
  // hold the whole camera, so the rear (viewfinder) may tuck ~30% off the screen edge and the lens hood
  // slides a little behind the content layer (the camera is always under the text, so it never covers it).
  const xL = Math.max(gutter - CAM_FRONT * k - 4, CAM_BACK * k * 0.7, strip / 2 + 2);
  const xR = W - xL;

  // Lane loops (only when the gutter is wide enough to hold them)
  const laneR = Math.min(64, (xL - Math.max(strip / 2, CAM_BACK * k) - 4) / 2);
  const laneLoops = laneR >= 16;
  const laneD = laneR * 3.4;

  const pts: number[] = [];
  const keyIdx: Array<{ y: number; idx: number }> = [];
  const faceIdx: Array<{ idx: number; f: number }> = [{ idx: 0, f: 1 }];
  const splits: number[] = [];
  const last = () => pts.length / 2 - 1;
  const push = (x: number, y: number) => pts.push(x, y);
  const mark = (y: number) => keyIdx.push({ y, idx: last() });

  const lineTo = (x: number, y: number) => {
    const x0 = pts[pts.length - 2];
    const y0 = pts[pts.length - 1];
    const n = Math.max(1, Math.ceil(Math.hypot(x - x0, y - y0) / 20));
    for (let i = 1; i <= n; i += 1) push(x0 + ((x - x0) * i) / n, y0 + ((y - y0) * i) / n);
  };

  /** Loop-the-loop while travelling south, bulging sideways by sigma (toward the page edge). */
  const loopSouth = (sigma: number, R: number, D: number) => {
    const cx = pts[pts.length - 2];
    const cy = pts[pts.length - 1];
    const N = 72;
    for (let t = 1; t <= N; t += 1) {
      const a = (t / N) * TAU;
      push(cx + sigma * R * (1 - Math.cos(a)), cy + (D * a) / TAU + R * Math.sin(a));
      if (t === N / 2) splits.push(last());
    }
  };

  /** Loop-the-loop while travelling east/west (dir), bulging upward. */
  const loopAcross = (dir: number, R: number, D: number) => {
    const sx = pts[pts.length - 2];
    const sy = pts[pts.length - 1];
    const N = 72;
    for (let t = 1; t <= N; t += 1) {
      const a = (t / N) * TAU;
      push(sx + dir * ((D * a) / TAU + R * Math.sin(a)), sy - R * (1 - Math.cos(a)));
      if (t === N / 2) splits.push(last());
    }
  };

  /** Straight run down a lane with evenly spaced loops. Ends at (x, y1). */
  const lane = (x: number, y1: number, sigma: number, endKeyY: number) => {
    const y0 = pts[pts.length - 1];
    const pad = CROSS_LEAD + 40;
    const usable = y1 - y0 - 2 * pad;
    const minFree = 150;
    const n = laneLoops && usable > 0 ? clampN(Math.floor((usable - minFree) / (laneD + minFree)), 0, 3) : 0;
    const free = n > 0 ? (usable - n * laneD) / (n + 1) : 0;
    for (let i = 0; i < n; i += 1) {
      const yLoop = pts[pts.length - 1] + (i === 0 ? pad + free : free);
      lineTo(x, yLoop);
      mark(yLoop);
      loopSouth(sigma, laneR, laneD);
      mark(yLoop + laneD);
    }
    lineTo(x, y1);
    mark(endKeyY);
  };

  /** Crossing from the current lane to xB inside `band`. Path enters/leaves heading south. */
  const cross = (dir: number, xB: number, band: Band) => {
    const xA = pts[pts.length - 2];
    const r = (band.bottom - band.top) / 2;
    const yRun = band.top + r;
    const steps = 28;

    for (let t = 1; t <= steps; t += 1) {
      const ang = (t / steps) * (Math.PI / 2);
      push(xA + dir * r * (1 - Math.cos(ang)), band.top + r * Math.sin(ang));
    }

    const runLen = Math.abs(xB - xA) - 2 * r;
    const Rg = Math.min(46, (r - strip / 2 - 24) / 2, (runLen - 40) / 3.4);
    if (Rg >= 12) {
      const Dg = Rg * 3.4;
      lineTo(W / 2 - (dir * Dg) / 2, yRun);
      loopAcross(dir, Rg, Dg);
    }
    lineTo(xB - dir * r, yRun);

    // The camera turns to face the content as it swings back into the next lane.
    faceIdx.push({ idx: last(), f: dir });
    for (let t = 1; t <= steps; t += 1) {
      const ang = (t / steps) * (Math.PI / 2);
      push(xB - dir * r + dir * r * Math.sin(ang), yRun + r * (1 - Math.cos(ang)));
    }
    faceIdx.push({ idx: last(), f: -dir });
    mark(band.bottom + CROSS_LEAD);
  };

  // ── Assemble the route ──────────────────────────────────────────────
  push(xL, L.yStart);
  mark(L.yStart);

  const gaps = [L.gap1, L.gap2].filter((g): g is Band => g !== null);
  if (gaps.length) {
    // One crossing per film break: hero -> benefits (left to right), then benefits -> "Who should
    // apply" (right back to left). After the last crossing the strip runs down its lane and parks
    // beside the closing "What we expect" block at the end of the page.
    const lastGap = gaps[gaps.length - 1];
    const yFinish = Math.max(L.yEnd, lastGap.bottom + CROSS_LEAD + 240);
    let laneX = xL;
    let dir = 1;
    let sigma = -1;
    gaps.forEach((g) => {
      const nextX = dir === 1 ? xR : xL;
      lane(laneX, g.top, sigma, g.top - CROSS_LEAD);
      cross(dir, nextX, g);
      laneX = nextX;
      dir = -dir;
      sigma = -sigma;
    });
    lane(laneX, yFinish, sigma, yFinish);
  } else {
    lane(xL, Math.max(L.yEnd, L.yStart + 200), -1, Math.max(L.yEnd, L.yStart + 200));
  }

  const cum: number[] = [0];
  for (let i = 2; i < pts.length; i += 2) {
    cum.push(cum[cum.length - 1] + Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]));
  }
  const len = cum[cum.length - 1];

  const keys = keyIdx.map((q) => ({ y: q.y, s: cum[q.idx] }));
  for (let i = 1; i < keys.length; i += 1) keys[i].y = Math.max(keys[i].y, keys[i - 1].y);

  const face = faceIdx.map((q) => ({ s: cum[q.idx], f: q.f }));
  face.push({ s: len, f: face[face.length - 1].f });

  return { pts, cum, len, splits, keys, face, strip, camW };
}

/** Scroll y (page px) -> arc length along the route. */
function reelDistanceForY(geo: ReelGeometry, y: number): number {
  const { keys } = geo;
  if (y <= keys[0].y) return 0;
  for (let i = 1; i < keys.length; i += 1) {
    if (y <= keys[i].y) {
      const a = keys[i - 1];
      const b = keys[i];
      return a.s + ((y - a.y) / (b.y - a.y || 1)) * (b.s - a.s);
    }
  }
  return geo.len;
}

/** Point + direction at arc length s. */
function reelPointAt(geo: ReelGeometry, s: number): { x: number; y: number; dx: number; dy: number } {
  const { cum, pts } = geo;
  const target = clampN(s, 0, geo.len);
  let lo = 0;
  let hi = cum.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] <= target) lo = mid;
    else hi = mid;
  }
  const seg = cum[hi] - cum[lo] || 1;
  const f = (target - cum[lo]) / seg;
  const x0 = pts[lo * 2];
  const y0 = pts[lo * 2 + 1];
  const x1 = pts[hi * 2];
  const y1 = pts[hi * 2 + 1];
  return { x: x0 + (x1 - x0) * f, y: y0 + (y1 - y0) * f, dx: (x1 - x0) / seg, dy: (y1 - y0) / seg };
}

/** Which way the camera faces at arc length s (+1 right, -1 left; eases through the turn). */
function reelFacingAt(geo: ReelGeometry, s: number): number {
  const { face } = geo;
  for (let i = 1; i < face.length; i += 1) {
    if (s <= face[i].s) {
      const a = face[i - 1];
      const b = face[i];
      if (a.f === b.f) return a.f;
      return a.f + (b.f - a.f) * smooth(clampN((s - a.s) / (b.s - a.s || 1), 0, 1));
    }
  }
  return face[face.length - 1].f;
}

/** Path data through points i0..i1, optionally offset sideways by `off` px. */
function polyD(pts: number[], i0: number, i1: number, off = 0): string {
  const n = pts.length / 2;
  let d = '';
  for (let i = i0; i <= i1; i += 1) {
    let x = pts[i * 2];
    let y = pts[i * 2 + 1];
    if (off) {
      const a = Math.max(0, i - 1);
      const b = Math.min(n - 1, i + 1);
      let tx = pts[b * 2] - pts[a * 2];
      let ty = pts[b * 2 + 1] - pts[a * 2 + 1];
      const m = Math.hypot(tx, ty) || 1;
      tx /= m;
      ty /= m;
      x += -ty * off;
      y += tx * off;
    }
    d += `${i === i0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
}

function mkPath(cls: string, d: string, attrs: Record<string, string | number> = {}): SVGPathElement {
  const p = document.createElementNS(SVG_NS, 'path');
  p.setAttribute('class', cls);
  p.setAttribute('d', d);
  Object.entries(attrs).forEach(([key, val]) => p.setAttribute(key, String(val)));
  return p;
}

/**
 * Draws the film strip as layered strokes: soft shadow, dark acetate base, polished edges,
 * exposed frame cells with a faint highlight, and rounded perforations along both edges.
 * Each loop splits the strip into chunks so the later pass really crosses OVER the earlier one.
 */
function buildStrip(geo: ReelGeometry, host: SVGGElement) {
  host.textContent = '';
  const { pts, cum, strip: w } = geo;
  const bounds = [0, ...geo.splits, pts.length / 2 - 1];
  const frameLen = w * 0.74;
  const framePitch = w * 0.88;
  const perfPitch = w * 0.22;
  const perfW = Math.max(0.8, w * 0.1);
  const perfDash = Math.max(0.05, w * 0.16 - perfW);
  const perfOff = w / 2 - w * 0.14;

  for (let c = 0; c < bounds.length - 1; c += 1) {
    const i0 = bounds[c];
    const i1 = bounds[c + 1];
    if (i1 <= i0) continue;
    const s0 = cum[i0];
    const phase = (period: number, shift = 0) => ((((s0 - shift) % period) + period) % period).toFixed(2);
    const centre = polyD(pts, i0, i1);
    const g = document.createElementNS(SVG_NS, 'g');

    g.append(
      mkPath('v25-reel-shadow', centre, { 'stroke-width': w + 6, transform: 'translate(1 3)' }),
      mkPath('v25-reel-body', centre, { 'stroke-width': w }),
      mkPath('v25-reel-edge', polyD(pts, i0, i1, w / 2 - 0.7), { 'stroke-width': 1 }),
      mkPath('v25-reel-edge', polyD(pts, i0, i1, -(w / 2 - 0.7)), { 'stroke-width': 1 }),
      mkPath('v25-reel-frames', centre, {
        'stroke-width': w * 0.54,
        'stroke-dasharray': `${frameLen.toFixed(2)} ${(framePitch - frameLen).toFixed(2)}`,
        'stroke-dashoffset': phase(framePitch),
      }),
      mkPath('v25-reel-shine', centre, {
        'stroke-width': w * 0.2,
        'stroke-dasharray': `${(w * 0.3).toFixed(2)} ${(framePitch - w * 0.3).toFixed(2)}`,
        'stroke-dashoffset': phase(framePitch, w * 0.2),
      }),
      mkPath('v25-reel-perf', polyD(pts, i0, i1, perfOff), {
        'stroke-width': perfW,
        'stroke-dasharray': `${perfDash.toFixed(2)} ${(perfPitch - perfDash).toFixed(2)}`,
        'stroke-dashoffset': phase(perfPitch),
      }),
      mkPath('v25-reel-perf', polyD(pts, i0, i1, -perfOff), {
        'stroke-width': perfW,
        'stroke-dasharray': `${perfDash.toFixed(2)} ${(perfPitch - perfDash).toFixed(2)}`,
        'stroke-dashoffset': phase(perfPitch),
      })
    );
    host.appendChild(g);
  }
}

/**
 * Cine camera, side view, facing right. Graphite body, brushed-metal reels with lightening holes
 * (they spin as the camera travels), knurled focus ring, anodised accent ring and a lens hood.
 * Shading comes from gradients and thin highlights rather than heavy outlines.
 */
function CameraArt() {
  const holes = [0, 72, 144, 216, 288];
  const reel = (cx: number) => (
    <g transform={`translate(${cx} -40)`}>
      <circle r="16.5" fill="url(#v25-g-flange)" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
      <circle r="13.8" fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="0.6" />
      <circle r="13.2" fill="none" stroke="rgba(0,0,0,0.16)" strokeWidth="0.6" />
      <g className="v25-cam-spin">
        {holes.map((a) => (
          <g key={a} transform={`rotate(${a}) translate(0 -8.6)`}>
            <circle r="3.5" fill="#0b0d10" />
            <circle r="3.5" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="0.5" />
          </g>
        ))}
        <circle r="3.4" fill="url(#v25-g-hub)" stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" />
        <circle r="1.1" fill="#2f353c" />
      </g>
      <circle r="16.5" fill="url(#v25-g-spec)" />
    </g>
  );

  return (
    <>
      <defs>
        <linearGradient id="v25-g-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b525b" />
          <stop offset="0.1" stopColor="#363b43" />
          <stop offset="0.55" stopColor="#23272d" />
          <stop offset="1" stopColor="#111317" />
        </linearGradient>
        <linearGradient id="v25-g-barrel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#15171b" />
          <stop offset="0.2" stopColor="#5d646f" />
          <stop offset="0.34" stopColor="#2e3238" />
          <stop offset="0.7" stopColor="#14161a" />
          <stop offset="0.9" stopColor="#2a2e34" />
          <stop offset="1" stopColor="#0b0c0e" />
        </linearGradient>
        <linearGradient id="v25-g-hood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2f35" />
          <stop offset="0.5" stopColor="#16181c" />
          <stop offset="1" stopColor="#0b0c0e" />
        </linearGradient>
        <radialGradient id="v25-g-flange" cx="0.34" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#f6f8fa" />
          <stop offset="0.35" stopColor="#c4cad3" />
          <stop offset="0.75" stopColor="#8b94a1" />
          <stop offset="1" stopColor="#5a626e" />
        </radialGradient>
        <radialGradient id="v25-g-hub" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#f1f3f6" />
          <stop offset="1" stopColor="#6c7580" />
        </radialGradient>
        <radialGradient id="v25-g-spec" cx="0.3" cy="0.25" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="v25-g-led" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ff8a8e" />
          <stop offset="1" stopColor="#d93b41" />
        </radialGradient>
        <radialGradient id="v25-g-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0a162c" stopOpacity="0.3" />
          <stop offset="1" stopColor="#0a162c" stopOpacity="0" />
        </radialGradient>
        <pattern id="v25-g-knurl" width="2" height="4" patternUnits="userSpaceOnUse">
          <rect width="0.9" height="4" fill="#ffffff" fillOpacity="0.22" />
        </pattern>
      </defs>

      {/* soft contact shadow */}
      <ellipse cx="4" cy="34" rx="54" ry="6" fill="url(#v25-g-shadow)" />

      {/* rear viewfinder */}
      <rect x="-46" y="-6" width="10" height="16" rx="3" fill="url(#v25-g-barrel)" />
      <rect x="-48" y="-8" width="4" height="20" rx="2" fill="#0c0d0f" />

      {/* reel bracket */}
      <path d="M-34 -22 L-30 -27 H28 L32 -22 Z" fill="url(#v25-g-body)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />

      {/* camera body */}
      <rect x="-38" y="-22" width="72" height="46" rx="7" fill="url(#v25-g-body)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <path d="M-31 -21.4 H27" stroke="rgba(255,255,255,0.3)" strokeWidth="0.9" strokeLinecap="round" />
      <rect x="-31" y="-12" width="50" height="28" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(0,0,0,0.45)" strokeWidth="0.8" />
      <rect x="-30.4" y="-11.4" width="48.8" height="27.2" rx="3.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
      {[
        [-27, -8],
        [15, -8],
        [-27, 12],
        [15, 12],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="1.3" fill="#6f7782" />
          <circle cx={x - 0.35} cy={y - 0.4} r="0.5" fill="#d6dbe2" />
        </g>
      ))}
      <g className="v25-cam-label">
        <text x="-22" y="7.5" fontSize="7" fontWeight="700" letterSpacing="1.2" fill="rgba(205,213,224,0.72)" fontFamily="Poppins, system-ui, sans-serif">
          VISL
        </text>
      </g>
      <circle cx="27" cy="14" r="3.2" fill="url(#v25-g-flange)" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
      <circle cx="26" cy="-14" r="5" fill="#e5484d" fillOpacity="0.25" className="v25-cam-led" />
      <circle cx="26" cy="-14" r="2.3" fill="url(#v25-g-led)" className="v25-cam-led" />
      <rect x="-34" y="23" width="64" height="4.5" rx="1.5" fill="url(#v25-g-barrel)" />

      {/* reels */}
      {reel(-19)}
      {reel(15)}

      {/* lens */}
      <rect x="34" y="-9" width="5" height="26" rx="1" fill="url(#v25-g-barrel)" />
      <rect x="39" y="-12" width="19" height="32" rx="2.5" fill="url(#v25-g-barrel)" stroke="rgba(0,0,0,0.4)" strokeWidth="0.6" />
      <rect x="43" y="-12" width="9" height="32" fill="url(#v25-g-knurl)" />
      <rect x="43" y="-12" width="9" height="32" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" />
      <rect x="57" y="-13" width="3" height="34" rx="1" fill="#4a7fe0" />
      <rect x="57" y="-13" width="3" height="34" rx="1" fill="url(#v25-g-barrel)" opacity="0.55" />
      <path d="M60 -13 L77 -20 V28 L60 21 Z" fill="url(#v25-g-hood)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
      <path d="M77 -20 V28" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      <path d="M62 -12 L76 -18" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" />
    </>
  );
}

// ── "Who should apply" content (copied from the program one-pager) ─────────
type PersonaKind = 'creator' | 'storyteller';
type WorldKind = 'kids' | 'myth' | 'history' | 'drama';

const PERSONAS: Array<{ id: string; label: string; text: string; art: PersonaKind }> = [
  {
    id: 'persona-creator',
    label: 'THE AI VIDEO CREATOR',
    text: 'You already make AI video and want to move into long-form stories that hold an audience — and earn from it.',
    art: 'creator',
  },
  {
    id: 'persona-storyteller',
    label: 'THE STORYTELLER',
    text: 'Writer, author, storyteller or channel owner with a body of work — stories ready to become a series.',
    art: 'storyteller',
  },
];

const STORY_WORLDS: Array<{ label: string; icon: WorldKind }> = [
  { label: "Kids' stories", icon: 'kids' },
  { label: 'Mythology & folklore', icon: 'myth' },
  { label: 'History & real-life stories', icon: 'history' },
  { label: 'Microdramas & fiction', icon: 'drama' },
];

/** Funky line-art badge for each persona. `.v25-draw` paths are drawn in by DrawSVG on scroll. */
function PersonaArt({ kind }: { kind: PersonaKind }) {
  if (kind === 'creator') {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect className="v25-draw" x="4" y="14" width="28" height="22" rx="5" />
        <path className="v25-draw" d="M32 22l11-6v16l-11-6" />
        <path className="v25-draw" d="M15 20.5l8 4.5-8 4.5z" fill="currentColor" fillOpacity="0.25" />
        <path d="M39 3l1.3 3.7L44 8l-3.7 1.3L39 13l-1.3-3.7L34 8l3.7-1.3z" fill="#f59e0b" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path className="v25-draw" d="M5 11c6-2.4 13-1.4 19 3v26c-6-4.4-13-5.4-19-3z" />
      <path className="v25-draw" d="M43 11c-6-2.4-13-1.4-19 3v26c6-4.4 13-5.4 19-3z" />
      <path className="v25-draw" d="M10 19c3-.5 6 0 9 1.5M10 25c3-.5 6 0 9 1.5" />
      <path d="M39 3l1.3 3.7L44 8l-3.7 1.3L39 13l-1.3-3.7L34 8l3.7-1.3z" fill="#f59e0b" stroke="none" />
    </svg>
  );
}

/** Tiny icon inside each story-world chip. */
function WorldIcon({ kind }: { kind: WorldKind }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (kind) {
    case 'kids':
      return (
        <svg {...props} aria-hidden="true">
          <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      );
    case 'myth':
      return (
        <svg {...props} aria-hidden="true">
          <path d="M4 5h16M6 5v13M10 5v13M14 5v13M18 5v13M4 20h16" />
        </svg>
      );
    case 'history':
      return (
        <svg {...props} aria-hidden="true">
          <path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />
        </svg>
      );
    case 'drama':
      return (
        <svg {...props} aria-hidden="true">
          <path d="M3 10h18v10H3zM3 10l2.5-5.5M9 10l2.5-5.5M15 10l2.5-5.5" />
        </svg>
      );
  }
}

/** Golden-ticket pools: rendered once and reused, so no DOM is created while scratching. */
const FLAKE_COUNT = 14;
const CONFETTI_COUNT = 34;
const TRAIL_COUNT = 14;

export function Visl25Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const benefitsTitleRef = useRef<HTMLHeadingElement>(null);
  const reelSvgRef = useRef<SVGSVGElement>(null);
  const camSvgRef = useRef<SVGSVGElement>(null);
  const camRef = useRef<SVGGElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLElement>(null);
  // True while the card entrance animation runs, so hover tilt never fights it.
  const cardsEntering = useRef(false);
  // Golden-ticket scratch card
  const ticketRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealFnRef = useRef<(() => void) | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleApplyNowClick = (sectionName = 'scratch_ticket') => {
    trackCtaClick({
      cta_name: 'apply_now',
      destination: 'google_form',
      location: 'visl_25_page',
      button_text: 'Apply Now',
      section: sectionName,
    });
  };

  useGSAP(
    () => {
      // 1. Title Animation: SplitText staggered drop effect so main title falls & locks into place
      if (titleRef.current) {
        try {
          const split = new SplitText(titleRef.current, {
            type: 'lines, words, chars',
            charsClass: 'v25-title-char',
          });

          gsap.from(split.chars, {
            y: -70,
            rotationX: 45,
            opacity: 0,
            duration: 0.9,
            stagger: 0.02,
            ease: 'back.out(1.7)',
            clearProps: 'transform,opacity',
          });
        } catch {
          gsap.from(titleRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)',
          });
        }
      }

      // 2. Subheadline & Description text falling
      if (subheadlineRef.current) {
        gsap.from(subheadlineRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
          delay: 0.35,
          ease: 'power2.out',
        });
      }

      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          y: -25,
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'power2.out',
        });
      }

      // 2b. Golden ticket glides in right after the description
      const heroTicket = containerRef.current?.querySelector('.visl25-hero-ticket');
      if (heroTicket) {
        gsap.from(heroTicket, {
          y: 28,
          scale: 0.94,
          opacity: 0,
          duration: 0.9,
          delay: 0.7,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      }

      // 3. ScrambleText on numbers & key stats on scroll
      const scrambleTargets = containerRef.current?.querySelectorAll('.v25-scramble-text');
      if (scrambleTargets) {
        scrambleTargets.forEach((el) => {
          const textVal = el.getAttribute('data-text') || el.textContent || '';
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(el, {
                duration: 1.3,
                scrambleText: {
                  text: textVal,
                  chars: '$#@!&%0123456789',
                  speed: 0.45,
                },
              });
            },
          });
        });
      }

      // 4. Large Bold High-Impact Stats: Scale-in Drop + ScrambleText
      const largeStats = containerRef.current?.querySelectorAll('.v25-scramble-stat');
      if (largeStats) {
        largeStats.forEach((el) => {
          const targetText = el.getAttribute('data-text') || el.textContent || '';
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.from(el, {
                y: -32,
                scale: 0.8,
                opacity: 0,
                duration: 0.85,
                ease: 'back.out(2)',
              });
              gsap.to(el, {
                duration: 1.4,
                scrambleText: {
                  text: targetText,
                  chars: '$#@!&%0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                  speed: 0.45,
                },
              });
            },
          });
        });
      }

      // 5. (The scroll-driven film reel + camera now live in their own useGSAP block below.)

      // 6. Benefits Header Falling
      if (benefitsTitleRef.current) {
        try {
          const bSplit = new SplitText(benefitsTitleRef.current, {
            type: 'words',
          });

          gsap.from(bSplit.words, {
            scrollTrigger: {
              trigger: benefitsTitleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            y: -35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          });
        } catch {
          gsap.from(benefitsTitleRef.current, {
            scrollTrigger: {
              trigger: benefitsTitleRef.current,
              start: 'top 85%',
            },
            y: -30,
            opacity: 0,
            duration: 0.7,
          });
        }
      }

      // 7. Dropping Benefits Boxes & Stacking
      if (stackRef.current) {
        const cards = stackRef.current.querySelectorAll('.visl25-card');

        gsap.from(cards, {
          scrollTrigger: {
            trigger: stackRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: -40,
          scale: 0.95,
          opacity: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          onStart: () => {
            cardsEntering.current = true;
          },
          onComplete: () => {
            cardsEntering.current = false;
          },
          onReverseComplete: () => {
            cardsEntering.current = false;
          },
        });
      }

      // 8. Ambient SVGs remain static so they don't distract from the content.

    },
    { scope: containerRef }
  );

  // 9. Benefit card interactions: 3D tilt, cursor spotlight, per-benefit signature effects.
  //    - Fine pointer (mouse/trackpad): spotlight.
  //    - Fine pointer + no reduced-motion preference: tilt, lift, signature effects, coins.
  //    - Touch / reduced motion: none of the motion runs; the static icons are simply shown.
  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>('.visl25-card', root);
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          fine: '(hover: hover) and (pointer: fine)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          const conditions = (ctx.conditions ?? {}) as Record<string, boolean | undefined>;
          if (!conditions.fine) return;
          const motionOk = Boolean(conditions.motion);

          const disposers: Array<() => void> = [];

          cards.forEach((card) => {
            const fx = card.dataset.fx as BenefitFx | undefined;
            let signature: gsap.core.Timeline | null = null;
            let tiltX: ReturnType<typeof gsap.quickTo> | null = null;
            let tiltY: ReturnType<typeof gsap.quickTo> | null = null;
            let tiltOn = false;

            const onEnter = (e: PointerEvent) => {
              if (e.pointerType === 'touch' || !motionOk) return;

              // Don't fight the scroll-in entrance animation.
              tiltOn = !cardsEntering.current;
              if (tiltOn) {
                // clearProps on the entrance wipes perspective + quickTo caches, so rebuild on each enter.
                gsap.set(card, { transformPerspective: TILT_PERSPECTIVE, transformOrigin: '50% 50%' });
                tiltX = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
                tiltY = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
                gsap.to(card, { y: -3, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
              }

              if (fx) {
                if (!signature) signature = buildSignatureTimeline(card, fx);
                // Let a running sequence finish instead of restarting it mid-air.
                if (signature && !signature.isActive()) {
                  signature.invalidate().restart();
                }
              }
            };

            const onMove = (e: PointerEvent) => {
              if (e.pointerType === 'touch') return;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              // Spotlight (CSS ::before reads these)
              card.style.setProperty('--mx', `${x}px`);
              card.style.setProperty('--my', `${y}px`);

              if (tiltOn && tiltX && tiltY) {
                const clamp = gsap.utils.clamp(-MAX_TILT, MAX_TILT);
                tiltY(clamp((x / rect.width - 0.5) * 2 * MAX_TILT));
                tiltX(clamp(-(y / rect.height - 0.5) * 2 * MAX_TILT));
              }
            };

            const onLeave = () => {
              if (tiltOn) {
                tiltX?.(0);
                tiltY?.(0);
                gsap.to(card, { y: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
              }
              tiltOn = false;
            };

            card.addEventListener('pointerenter', onEnter);
            card.addEventListener('pointermove', onMove);
            card.addEventListener('pointerleave', onLeave);

            disposers.push(() => {
              card.removeEventListener('pointerenter', onEnter);
              card.removeEventListener('pointermove', onMove);
              card.removeEventListener('pointerleave', onLeave);
              signature?.revert();
              signature = null;
              gsap.killTweensOf(card);
              gsap.set(card, { clearProps: 'transform' });
              card.style.removeProperty('--mx');
              card.style.removeProperty('--my');
            });
          });

          return () => disposers.forEach((dispose) => dispose());
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // 10. Film-reel guide: a realistic film strip that loops down the page gutters and crosses the page
  //     only inside the blank "film break" bands, revealed as you scroll, with a cine camera riding
  //     its head. Geometry is rebuilt from measured pixel positions on every resize, so it never
  //     stretches, never runs behind text, and stays proportional on any screen.
  useGSAP(
    () => {
      const page = containerRef.current;
      const svg = reelSvgRef.current;
      const camSvg = camSvgRef.current;
      const cam = camRef.current;
      if (!page || !svg || !camSvg || !cam) return;

      const host = svg.querySelector<SVGGElement>('.v25-reel-strip');
      const ghost = svg.querySelector<SVGPathElement>('.v25-reel-ghost');
      const reveal = svg.querySelector<SVGPathElement>('.v25-reel-reveal');
      const grad = svg.querySelector<SVGLinearGradientElement>('#v25-reel-grad');
      const mask = svg.querySelector<SVGMaskElement>('#v25-reel-mask');
      const spinners = Array.from(cam.querySelectorAll<SVGGElement>('.v25-cam-spin'));
      const label = cam.querySelector<SVGGElement>('.v25-cam-label');
      if (!host || !ghost || !reveal || !grad || !mask) return;

      let geo: ReelGeometry | null = null;
      let sCur = 0; // current (smoothed) arc length of the camera
      let reduced = false;
      let applied = false;
      let alive = true;

      const render = (s: number) => {
        if (!geo) return;
        // Reveal the strip up to (just under) the camera
        const sHead = Math.min(geo.len, s + 2);
        reveal.style.strokeDashoffset = `${geo.len - sHead}px`;
        if (reduced) return;

        const p = reelPointAt(geo, s);
        const face = reelFacingAt(geo, s);
        const sx = Math.abs(face) < 0.06 ? (face < 0 ? -0.06 : 0.06) : face;
        const k = geo.camW / CAM_ART_W;
        const lean = clampN(p.dx * 8, -8, 8); // gentle lean into the turns
        cam.setAttribute(
          'transform',
          `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${lean.toFixed(1)}) scale(${(sx * k).toFixed(3)} ${k.toFixed(3)})`
        );
        const spin = `rotate(${(s * 1.1).toFixed(1)})`;
        spinners.forEach((el) => el.setAttribute('transform', spin));
        // Keep the badge readable when the camera is mirrored to face left
        label?.setAttribute('transform', sx < 0 ? 'translate(-30 0) scale(-1 1)' : '');
        cam.style.opacity = '1';
      };

      /** Measure the real layout so the route can stay in the gutters and blank bands. */
      const measure = (): ReelLayout | null => {
        const W = page.clientWidth;
        const H = page.clientHeight;
        if (!W || !H) return null;
        const pr = page.getBoundingClientRect();
        const rel = (sel: string) => {
          const el = page.querySelector(sel);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          if (!r.width && !r.height) return null;
          return { top: r.top - pr.top, bottom: r.bottom - pr.top, left: r.left - pr.left, right: r.right - pr.left };
        };
        const col = rel('.visl25-container');
        const g1 = rel('[data-film-gap="1"]');
        const g2 = rel('[data-film-gap="2"]');
        const tail = rel('.v25-expect-col');
        return {
          W,
          H,
          left: col ? col.left : W * 0.1,
          right: col ? col.right : W * 0.9,
          gap1: g1 ? { top: g1.top, bottom: g1.bottom } : null,
          gap2: g2 ? { top: g2.top, bottom: g2.bottom } : null,
          yStart: -30,
          yEnd: tail ? tail.bottom - 60 : H - 140,
        };
      };

      const targetDistance = () => {
        if (!geo) return 0;
        const rect = page.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrolled = -rect.top;
        const progress = clampN(scrolled / Math.max(1, page.clientHeight - vh), 0, 1);
        // The camera rides ~45% down the screen and drifts to the bottom edge as you reach the end,
        // so it always completes the route and parks beside the final CTA.
        const y = clampN(scrolled + vh * (0.45 + 0.55 * progress), geo.keys[0].y, geo.keys[geo.keys.length - 1].y);
        return reelDistanceForY(geo, y);
      };

      const apply = () => {
        const layout = measure();
        if (!layout) return;
        geo = buildReel(layout);
        const { W, H } = layout;
        const { len, strip } = geo;
        const d = polyD(geo.pts, 0, geo.pts.length / 2 - 1);

        [svg, camSvg].forEach((el) => el.setAttribute('viewBox', `0 0 ${W} ${H}`));
        buildStrip(geo, host);
        ghost.setAttribute('d', d);
        reveal.setAttribute('d', d);
        reveal.setAttribute('stroke-width', String(strip + 10));
        reveal.setAttribute('stroke-dasharray', `${len.toFixed(1)} ${(len + 200).toFixed(1)}`);

        mask.setAttribute('x', '0');
        mask.setAttribute('y', '0');
        mask.setAttribute('width', String(W));
        mask.setAttribute('height', String(H));
        grad.setAttribute('x1', '0');
        grad.setAttribute('y1', '0');
        grad.setAttribute('x2', String(W));
        grad.setAttribute('y2', String(H));

        // First build: the camera "rides in" from the top. Later rebuilds (resize) snap into place.
        sCur = reduced ? len : applied ? targetDistance() : 0;
        applied = true;
        render(sCur);
      };

      apply();
      const ro = new ResizeObserver(() => apply());
      ro.observe(page);

      // Web fonts change text height; re-measure once they are ready and refresh scroll triggers.
      document.fonts?.ready.then(() => {
        if (!alive) return;
        apply();
        ScrollTrigger.refresh();
      });

      const mm = gsap.matchMedia();

      // Full motion: the camera glides along the strip, eased toward where you are on the page
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        reduced = false;
        cam.style.display = '';
        const tick = () => {
          if (!geo) return;
          const diff = targetDistance() - sCur;
          if (Math.abs(diff) < 0.05) return;
          const dt = gsap.ticker.deltaRatio(60);
          // Frame-rate independent easing with a speed cap so the camera never teleports
          const step = diff * (1 - Math.pow(0.9, dt));
          const cap = 30 * dt;
          sCur += clampN(step, -cap, cap);
          render(sCur);
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
      });

      // Reduced motion: show the whole strip statically, no camera, no scroll-linked motion
      mm.add('(prefers-reduced-motion: reduce)', () => {
        reduced = true;
        cam.style.display = 'none';
        if (geo) {
          sCur = geo.len;
          render(sCur);
        }
      });

      return () => {
        alive = false;
        ro.disconnect();
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  // 11. Golden-ticket scratch card.
  //     - A gold foil is painted on a canvas over the headline; pointer events erase it (mouse, touch, pen).
  //     - Coverage is tracked on a coarse grid (cheap, no pixel reads). At ~42% the rest of the foil is
  //       cleared automatically and the "Apply for a Founding Creator Seat" letter animation plays.
  //     - The reveal also fires a confetti burst and wakes up the Apply button (pop, wiggle, rings).
  //     - "Tap to reveal" button = keyboard / assistive-tech path. Reduced motion: instant reveal, no extras.
  useGSAP(
    (_context, contextSafe) => {
      const ticket = ticketRef.current;
      const zone = zoneRef.current;
      const canvas = canvasRef.current;
      if (!ticket || !zone || !canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Anything created later from an event handler is registered with the context so it is cleaned up.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const safe = <F extends (...args: any[]) => any>(fn: F): F => (contextSafe ? contextSafe(fn) : fn);

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      const letters = gsap.utils.toArray<HTMLElement>('.v25-letter:not(.v25-letter-space)', ticket);
      const flakes = gsap.utils.toArray<HTMLElement>('.v25-flake', ticket);
      const confetti = gsap.utils.toArray<HTMLElement>('.v25-confetti', ticket);
      const hint = ticket.querySelector<HTMLElement>('.v25-scratch-hint');
      const shimmer = ticket.querySelector<HTMLElement>('.v25-foil-shimmer');
      const flash = ticket.querySelector<HTMLElement>('.v25-reveal-flash');
      const magnet = ticket.querySelector<HTMLElement>('.v25-apply-wrap');
      const pulse = ticket.querySelector<HTMLElement>('.v25-apply-pulse');
      

      // The headline stays hidden until the reveal plays it in.
      gsap.set(letters, { opacity: 0, transformPerspective: 700, transformOrigin: '50% 70%' });

      const CELL = 12; // coverage grid cell, px
      const TRIGGER = 0.1; // fraction of the foil that must be scratched (10% is enough to reveal)
      let w = 0;
      let h = 0;
      let dpr = 1;
      let cols = 0;
      let rows = 0;
      let hits = new Uint8Array(0);
      let hitCount = 0;
      let drawing = false;
      let started = false;
      let done = false;
      let lastX = 0;
      let lastY = 0;
      let flakeAcc = 0;
      let flakeIdx = 0;
      let hintX: gsap.core.Timeline | null = null;
      let hintY: gsap.core.Tween | null = null;

      const radius = () => clampN(Math.min(w, h) * 0.15, 16, 26);

      const star4 = (x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.moveTo(x, y - r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.quadraticCurveTo(x, y, x, y + r);
        ctx.quadraticCurveTo(x, y, x - r, y);
        ctx.quadraticCurveTo(x, y, x, y - r);
        ctx.fill();
      };

      /** Paint the embossed gold foil with its "SCRATCH TO REVEAL" label. */
      const paintFoil = () => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, w, h);

        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, '#f6d36a');
        g.addColorStop(0.25, '#e6ae33');
        g.addColorStop(0.5, '#fff0a6');
        g.addColorStop(0.75, '#d99a1e');
        g.addColorStop(1, '#f3cd62');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        // fine diagonal grain
        ctx.save();
        ctx.globalAlpha = 0.14;
        ctx.strokeStyle = '#7a4b00';
        ctx.lineWidth = 1;
        for (let x = -h; x < w; x += 6) {
          ctx.beginPath();
          ctx.moveTo(x, h);
          ctx.lineTo(x + h, 0);
          ctx.stroke();
        }
        ctx.restore();

        // speckle
        const specks = Math.floor((w * h) / 70);
        for (let i = 0; i < specks; i += 1) {
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.38)' : 'rgba(120,70,0,0.2)';
          ctx.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4);
        }

        // stitched border + corner stars
        ctx.strokeStyle = 'rgba(122,75,0,0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([7, 5]);
        ctx.strokeRect(7, 7, w - 14, h - 14);
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(255,255,255,0.78)';
        star4(20, 20, 6);
        star4(w - 20, 20, 6);
        star4(20, h - 20, 6);
        star4(w - 20, h - 20, 6);

        // engraved label
        const label = 'SCRATCH TO REVEAL';
        let fs = clampN(w * 0.06, 13, 24);
        const font = (size: number, weight: number) => `${weight} ${size}px Poppins, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = font(fs, 900);
        while (fs > 11 && ctx.measureText(label).width > w - 56) {
          fs -= 1;
          ctx.font = font(fs, 900);
        }
        const cy = h / 2 - fs * 0.35;
        ctx.fillStyle = 'rgba(110,66,0,0.55)';
        ctx.fillText(label, w / 2 + 1.5, cy + 2);
        ctx.fillStyle = '#fff6c9';
        ctx.fillText(label, w / 2, cy);
        ctx.font = font(Math.max(10, fs * 0.52), 700);
        ctx.fillStyle = 'rgba(110,66,0,0.78)';
        ctx.fillText('apply for a chance to join Visl 25', w / 2, cy + fs * 1.05);
      };

      const sizeCanvas = () => {
        const r = zone.getBoundingClientRect();
        const nw = Math.round(r.width);
        const nh = Math.round(r.height);
        if (!nw || !nh || done) return;
        if (nw === w && nh === h && canvas.width) return;
        w = nw;
        h = nh;
        dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        cols = Math.ceil(w / CELL);
        rows = Math.ceil(h / CELL);
        hits = new Uint8Array(cols * rows);
        hitCount = 0;
        paintFoil();
      };

      /** Mark the grid cells the brush just covered. */
      const mark = (x: number, y: number, r: number) => {
        const c0 = Math.max(0, Math.floor((x - r) / CELL));
        const c1 = Math.min(cols - 1, Math.floor((x + r) / CELL));
        const r0 = Math.max(0, Math.floor((y - r) / CELL));
        const r1 = Math.min(rows - 1, Math.floor((y + r) / CELL));
        for (let cy = r0; cy <= r1; cy += 1) {
          for (let cx = c0; cx <= c1; cx += 1) {
            const i = cy * cols + cx;
            if (hits[i]) continue;
            const dx = (cx + 0.5) * CELL - x;
            const dy = (cy + 0.5) * CELL - y;
            if (dx * dx + dy * dy <= r * r) {
              hits[i] = 1;
              hitCount += 1;
            }
          }
        }
      };

      const emitFlake = safe((x: number, y: number) => {
        if (reduced || !flakes.length) return;
        const f = flakes[flakeIdx % flakes.length];
        flakeIdx += 1;
        gsap.fromTo(
          f,
          { x, y, opacity: 1, scale: gsap.utils.random(0.6, 1.1), rotation: gsap.utils.random(0, 90) },
          {
            x: x + gsap.utils.random(-22, 22),
            y: y + gsap.utils.random(18, 46),
            rotation: '+=140',
            opacity: 0,
            duration: 0.65,
            ease: 'power1.in',
            overwrite: true,
          }
        );
      });

      const burst = safe(() => {
        if (reduced || !confetti.length) return;
        const tr = ticket.getBoundingClientRect();
        const zr = zone.getBoundingClientRect();
        const ox = zr.left - tr.left + zr.width / 2 - 5;
        const oy = zr.top - tr.top + zr.height / 2 - 5;
        const maxDist = Math.min(260, tr.width * 0.45);
        confetti.forEach((p, i) => {
          const ang = gsap.utils.random(-Math.PI * 0.95, -Math.PI * 0.05); // fan upward
          const dist = gsap.utils.random(90, maxDist);
          const dx = Math.cos(ang) * dist;
          const dy = Math.sin(ang) * dist;
          gsap
            .timeline({ delay: i * 0.008 })
            .fromTo(
              p,
              { x: ox, y: oy, scale: 0, opacity: 1, rotation: 0 },
              {
                x: ox + dx,
                y: oy + dy,
                scale: gsap.utils.random(0.8, 1.4),
                rotation: gsap.utils.random(-200, 200),
                duration: 0.55,
                ease: 'power3.out',
              }
            )
            .to(
              p,
              {
                y: oy + dy + gsap.utils.random(120, 220),
                x: `+=${gsap.utils.random(-30, 30)}`,
                rotation: '+=260',
                duration: 1.2,
                ease: 'power1.in',
              },
              '>-0.05'
            )
            .to(p, { opacity: 0, duration: 0.35, ease: 'none' }, '>-0.35');
        });
      });

      /** Wake up the Apply button: elastic pop, then a quick wiggle every couple of seconds. */
      const unlock = safe(() => {
        if (reduced || !pulse) return;
        gsap.fromTo(
          pulse,
          { scale: 0.94, y: 5, opacity: 0.75 },
          { scale: 1, y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', clearProps: 'transform' }
        );
      });

      const reveal = safe(() => {
        if (done) return;
        done = true;
        drawing = false;
        started = true;
        hintX?.kill();
        hintY?.kill();
        canvas.style.pointerEvents = 'none';
        setRevealed(true);

        if (reduced) {
          canvas.style.display = 'none';
          if (hint) hint.style.display = 'none';
          if (shimmer) shimmer.style.display = 'none';
          gsap.set(letters, { opacity: 1 });
          return;
        }

        const tl = gsap.timeline();
        tl.to(
          [canvas, hint, shimmer].filter(Boolean),
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              canvas.style.display = 'none';
            },
          },
          0
        );
        if (flash) {
          tl.fromTo(flash, { opacity: 0.95, scale: 0.4 }, { opacity: 0, scale: 1.8, duration: 0.9, ease: 'power2.out' }, 0);
        }
        // The same letter-by-letter "magic" assembly, now triggered by the scratch.
        tl.fromTo(
          letters,
          {
            opacity: 0,
            y: (index: number) => (index % 3 === 0 ? 34 : index % 3 === 1 ? -24 : 16),
            x: (index: number) => (index % 2 === 0 ? -9 : 9),
            rotationZ: (index: number) => (index % 2 === 0 ? -28 : 24),
            rotationY: (index: number) => (index % 4 === 0 ? 95 : index % 4 === 1 ? -75 : 0),
            rotationX: (index: number) => (index % 5 === 0 ? -80 : index % 5 === 1 ? 55 : 0),
            scale: (index: number) => (index % 4 === 0 ? 0.72 : 0.9),
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.82,
            stagger: { each: 0.035, from: 'random' },
            ease: 'back.out(1.65)',
          },
          0.1
        );
        tl.add(burst, 0.05);
        tl.add(unlock, 0.9);
      });
      revealFnRef.current = reveal;

      const scratch = safe((x0: number, y0: number, x1: number, y1: number) => {
        const r = radius();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = r * 2;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1 + 0.01, y1);
        ctx.stroke();

        const dist = Math.hypot(x1 - x0, y1 - y0);
        const step = Math.max(4, r * 0.5);
        const n = Math.max(1, Math.ceil(dist / step));
        for (let i = 0; i <= n; i += 1) mark(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n, r);

        flakeAcc += dist;
        if (flakeAcc > 16) {
          flakeAcc = 0;
          emitFlake(x1, y1);
        }
        if (cols * rows && hitCount / (cols * rows) >= TRIGGER) reveal();
      });

      const pos = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };

      const onDown = safe((e: PointerEvent) => {
        if (done) return;
        e.preventDefault();
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch {
          /* pointer capture is a nicety, not a requirement */
        }
        drawing = true;
        if (!started) {
          started = true;
          hintX?.kill();
          hintY?.kill();
          if (hint) gsap.to(hint, { opacity: 0, duration: 0.25 });
        }
        const p = pos(e);
        lastX = p.x;
        lastY = p.y;
        scratch(p.x, p.y, p.x, p.y);
      });

      const onMove = safe((e: PointerEvent) => {
        if (!drawing || done) return;
        const p = pos(e);
        scratch(lastX, lastY, p.x, p.y);
        lastX = p.x;
        lastY = p.y;
      });

      const onUp = () => {
        drawing = false;
      };

      sizeCanvas();
      const ro = new ResizeObserver(() => sizeCanvas());
      ro.observe(zone);
      let alive = true;
      document.fonts?.ready.then(() => {
        if (alive && !done && !started) {
          // Repaint the label with the web font once it has loaded.
          const keepW = w;
          w = 0;
          if (keepW) sizeCanvas();
        }
      });

      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointercancel', onUp);

      // Hint: a coin scribbles back and forth on the foil until the first touch.
      if (hint && !reduced) {
        gsap.set(hint, { x: 30, y: 0 });
        hintX = gsap.timeline({ repeat: -1, delay: 0.9 });
        hintX
          .to(hint, { x: () => Math.max(70, w - 80), duration: 1.4, ease: 'sine.inOut' })
          .to(hint, { x: 30, duration: 1.4, ease: 'sine.inOut' });
        hintY = gsap.to(hint, { y: 12, duration: 0.35, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.9 });
      }

      // Keep the Apply button calm; its hover and focus styling is handled in CSS.
      let magnetMove: ((e: PointerEvent) => void) | null = null;
      let magnetLeave: (() => void) | null = null;
      if (magnet && finePointer && !reduced) {
        const qx = gsap.quickTo(magnet, 'x', { duration: 0.5, ease: 'power3.out' });
        const qy = gsap.quickTo(magnet, 'y', { duration: 0.5, ease: 'power3.out' });
        magnetMove = (e: PointerEvent) => {
          const r = magnet.getBoundingClientRect();
          qx(clampN((e.clientX - (r.left + r.width / 2)) * 0.18, -10, 10));
          qy(clampN((e.clientY - (r.top + r.height / 2)) * 0.25, -8, 8));
        };
        magnetLeave = () => {
          qx(0);
          qy(0);
        };
        magnet.addEventListener('pointermove', magnetMove);
        magnet.addEventListener('pointerleave', magnetLeave);
      }

      return () => {
        alive = false;
        ro.disconnect();
        revealFnRef.current = null;
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointercancel', onUp);
        if (magnet && magnetMove) magnet.removeEventListener('pointermove', magnetMove);
        if (magnet && magnetLeave) magnet.removeEventListener('pointerleave', magnetLeave);
        hintX?.kill();
        hintY?.kill();
      };
    },
    { scope: containerRef }
  );

  // 12. "Who should apply / What we expect" section.
  //     Everything here is wrapped in matchMedia: with reduced motion nothing is hidden or animated,
  //     so the content simply shows. Hover wiggles only run on fine pointers.
  useGSAP(
    () => {
      const root = applyRef.current;
      if (!root) return;
      const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, root);
      const one = (sel: string) => root.querySelector(sel) as HTMLElement;
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          fine: '(hover: hover) and (pointer: fine)',
        },
        (ctx) => {
          const conditions = (ctx.conditions ?? {}) as Record<string, boolean | undefined>;
          if (!conditions.motion) return;

          const play = 'play none none reverse';
          const disposers: Array<() => void> = [];

          // Headings drop in (same falling language as the rest of the page) + a squiggle that draws itself
          q('.v25-apply-heading, .v25-sub-heading').forEach((h) => {
            gsap.from(h, {
              scrollTrigger: { trigger: h, start: 'top 88%', toggleActions: play },
              y: -34,
              rotation: -2,
              opacity: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
              clearProps: 'transform,opacity',
            });
          });
          q<SVGPathElement>('.v25-squiggle path').forEach((path) => {
            gsap.fromTo(
              path,
              { drawSVG: '0% 0%' },
              {
                drawSVG: '0% 100%',
                duration: 0.9,
                delay: 0.3,
                ease: 'power2.inOut',
                scrollTrigger: { trigger: path.closest('.v25-apply-head, .v25-expect-head') as Element, start: 'top 88%', toggleActions: play },
              }
            );
          });

          // Persona cards: drop in at opposite tilts, icon lines draw themselves
          gsap.from(q('.v25-persona'), {
            scrollTrigger: { trigger: one('.v25-persona-grid'), start: 'top 82%', toggleActions: play },
            y: -60,
            rotation: (i: number) => (i % 2 ? 5 : -5),
            scale: 0.92,
            opacity: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: 'back.out(1.6)',
            clearProps: 'transform,opacity',
          });
          gsap.fromTo(
            q<SVGElement>('.v25-persona .v25-draw'),
            { drawSVG: '0% 0%' },
            {
              drawSVG: '0% 100%',
              duration: 1,
              stagger: 0.1,
              delay: 0.35,
              ease: 'power2.inOut',
              scrollTrigger: { trigger: one('.v25-persona-grid'), start: 'top 82%', toggleActions: play },
            }
          );

          // Story-world chips: tumble in like loose film stickers
          gsap.from(q('.v25-chip-slot, .v25-worlds-label'), {
            scrollTrigger: { trigger: one('.v25-worlds'), start: 'top 90%', toggleActions: play },
            y: -70,
            rotation: () => gsap.utils.random(-18, 18),
            scale: 0.5,
            opacity: 0,
            duration: 0.9,
            stagger: { each: 0.1, from: 'random' },
            ease: 'bounce.out',
            clearProps: 'transform,opacity',
          });

          // What we expect: items slide in, arrows keep nudging forward, key phrases get highlighted
          gsap.from(q('.v25-expect-item'), {
            scrollTrigger: { trigger: one('.v25-expect-list'), start: 'top 86%', toggleActions: play },
            x: -50,
            opacity: 0,
            duration: 0.7,
            stagger: 0.14,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          });
          gsap.to(q('.v25-expect-bullet'), {
            x: 5,
            duration: 0.7,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: 0.18,
          });
          q('.v25-mark').forEach((m) => {
            gsap.fromTo(
              m,
              { backgroundSize: '0% 42%' },
              {
                backgroundSize: '100% 42%',
                duration: 0.8,
                delay: 0.4,
                ease: 'power2.out',
                scrollTrigger: { trigger: m, start: 'top 88%', once: true },
              }
            );
          });

          // WIN-WIN note: box rises, badge pops with an elastic bounce, trend line draws
          gsap.from(q('.v25-winwin'), {
            scrollTrigger: { trigger: one('.v25-winwin'), start: 'top 95%', toggleActions: play },
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          });
          gsap.from(q('.v25-winwin-badge'), {
            scrollTrigger: { trigger: one('.v25-winwin'), start: 'top 95%', toggleActions: play },
            scale: 0,
            rotation: -24,
            duration: 0.9,
            delay: 0.35,
            ease: 'elastic.out(1, 0.5)',
            clearProps: 'transform',
          });
          gsap.fromTo(
            q<SVGPathElement>('.v25-winwin-trend'),
            { drawSVG: '0% 0%' },
            {
              drawSVG: '0% 100%',
              duration: 0.8,
              delay: 0.7,
              ease: 'power2.inOut',
              scrollTrigger: { trigger: one('.v25-winwin'), start: 'top 95%', toggleActions: play },
            }
          );

          // Closing Apply button: pops up with an elastic bounce, then keeps a slow "come on in" wobble + shine sweep
          const endBtn = one('.v25-end-apply');
          if (endBtn) {
            // The wobble only starts once the entrance has finished, so the two never fight over rotation.
            const wobble = gsap
              .timeline({ paused: true, repeat: -1, repeatDelay: 2.2 })
              .to(endBtn, { rotation: -3, duration: 0.09, ease: 'power1.inOut' })
              .to(endBtn, { rotation: 3, duration: 0.18, ease: 'power1.inOut' })
              .to(endBtn, { rotation: -2, duration: 0.15, ease: 'power1.inOut' })
              .to(endBtn, { rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.35)' });
            gsap.from(endBtn, {
              scrollTrigger: { trigger: endBtn, start: 'top 96%', toggleActions: play },
              y: 60,
              scale: 0.6,
              rotation: -6,
              opacity: 0,
              duration: 1,
              ease: 'elastic.out(1, 0.55)',
              clearProps: 'transform,opacity',
              onComplete: () => {
                wobble.delay(1.5).restart();
              },
              onReverseComplete: () => {
                wobble.pause(0);
              },
            });
            disposers.push(() => {
              wobble.kill();
              gsap.set(endBtn, { clearProps: 'transform' });
            });
          }

          // Expect items: the arrows "stamp" in with a little overshoot, one after another
          gsap.from(q('.v25-expect-bullet'), {
            scrollTrigger: { trigger: one('.v25-expect-list'), start: 'top 86%', toggleActions: play },
            scale: 0,
            rotation: -90,
            duration: 0.6,
            delay: 0.25,
            stagger: 0.14,
            ease: 'back.out(3)',
          });

          // Fine pointers only: wiggle the persona icons and the story-world chips on hover
          if (conditions.fine) {
            q('.v25-persona').forEach((card) => {
              const art = card.querySelector('.v25-persona-art');
              if (!art) return;
              const wiggle = gsap
                .timeline({ paused: true })
                .to(art, { rotation: -14, scale: 1.18, duration: 0.15, ease: 'power2.out' })
                .to(art, { rotation: 12, duration: 0.15, ease: 'power2.inOut' })
                .to(art, { rotation: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
              const over = () => {
                wiggle.restart();
                gsap.to(card, { y: -5, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
              };
              const out = () => gsap.to(card, { y: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
              card.addEventListener('pointerenter', over);
              card.addEventListener('pointerleave', out);
              disposers.push(() => {
                card.removeEventListener('pointerenter', over);
                card.removeEventListener('pointerleave', out);
                wiggle.kill();
                gsap.set([card, art], { clearProps: 'transform' });
              });
            });

            q('.v25-chip-slot').forEach((slot) => {
              const over = () =>
                gsap.to(slot, { rotation: gsap.utils.random([-7, 7]), scale: 1.1, duration: 0.35, ease: 'back.out(3)', overwrite: 'auto' });
              const out = () =>
                gsap.to(slot, { rotation: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
              slot.addEventListener('pointerenter', over);
              slot.addEventListener('pointerleave', out);
              disposers.push(() => {
                slot.removeEventListener('pointerenter', over);
                slot.removeEventListener('pointerleave', out);
                gsap.set(slot, { clearProps: 'transform' });
              });
            });
          }

          return () => {
            disposers.forEach((dispose) => dispose());
          };
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // 13. Playful extras (full-motion visitors only; fine-pointer bits only run with a mouse/trackpad):
  //     - title letters squish and spring back when the pointer runs across them
  //     - a short sparkle trail follows the pointer around the hero
  //     - the "ONLY 25 SEATS" badge floats, the background glows drift
  //     - the genre pill and its words pop in on scroll
  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          fine: '(hover: hover) and (pointer: fine)',
        },
        (ctx) => {
          const conditions = (ctx.conditions ?? {}) as Record<string, boolean | undefined>;
          if (!conditions.motion) return;
          const disposers: Array<() => void> = [];

          // Floating badge + drifting glows
          const badge = root.querySelector<HTMLElement>('.visl25-badge-box');
          if (badge) gsap.to(badge, { y: -5, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
          const glow2 = root.querySelector<HTMLElement>('.visl25-light-glow-2');
          const glow3 = root.querySelector<HTMLElement>('.visl25-light-glow-3');
          if (glow2) gsap.to(glow2, { x: -70, y: 50, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
          if (glow3) gsap.to(glow3, { x: 80, y: -40, duration: 11, ease: 'sine.inOut', yoyo: true, repeat: -1 });

          // Genre pill: the pill and each word bounce in
          const tag = root.querySelector<HTMLElement>('.visl25-footer-tag');
          if (tag) {
            gsap.from(Array.from(tag.children), {
              scrollTrigger: { trigger: tag, start: 'top 92%', toggleActions: 'play none none reverse' },
              y: 30,
              scale: 0.7,
              rotation: () => gsap.utils.random(-6, 6),
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'back.out(2)',
              clearProps: 'transform,opacity',
            });
          }

          if (conditions.fine) {
            // Title letters: squish up, spring back. Letters inside the gradient word are skipped because
            // background-clip:text does not follow transformed children reliably.
            const title = root.querySelector<HTMLElement>('.visl25-main-title');
            if (title) {
              const onOver = (e: PointerEvent) => {
                const t = (e.target as HTMLElement).closest<HTMLElement>('.v25-title-char');
                if (!t || t.closest('.v25-gradient-shimmer') || gsap.isTweening(t)) return;
                gsap
                  .timeline()
                  .to(t, { y: -14, scaleX: 0.85, scaleY: 1.25, rotation: gsap.utils.random(-12, 12), duration: 0.14, ease: 'power2.out' })
                  .to(t, { y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.35)' });
              };
              title.addEventListener('pointerover', onOver);
              disposers.push(() => {
                title.removeEventListener('pointerover', onOver);
                gsap.set(root.querySelectorAll('.v25-title-char'), { clearProps: 'transform' });
              });
            }

            // Sparkle trail (pooled stars, reused). Skipped over the scratch foil so it never competes with the flakes.
            const header = root.querySelector<HTMLElement>('.visl25-header');
            const stars = header ? gsap.utils.toArray<HTMLElement>('.v25-trail-star', header) : [];
            if (header && stars.length) {
              let idx = 0;
              let lx = 0;
              let ly = 0;
              let acc = 0;
              const onEnter = (e: PointerEvent) => {
                const r = header.getBoundingClientRect();
                lx = e.clientX - r.left;
                ly = e.clientY - r.top;
                acc = 0;
              };
              const onMove = (e: PointerEvent) => {
                if ((e.target as Element).closest('.v25-scratch-zone')) return;
                const r = header.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                acc += Math.hypot(x - lx, y - ly);
                lx = x;
                ly = y;
                if (acc < 46) return;
                acc = 0;
                const star = stars[idx % stars.length];
                idx += 1;
                gsap.fromTo(
                  star,
                  { x: x - 6, y: y - 6, scale: gsap.utils.random(0.7, 1.3), rotation: gsap.utils.random(0, 90), opacity: 1 },
                  {
                    x: x - 6 + gsap.utils.random(-18, 18),
                    y: y - 6 + gsap.utils.random(14, 40),
                    rotation: '+=160',
                    scale: 0,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power2.out',
                    overwrite: true,
                  }
                );
              };
              header.addEventListener('pointerenter', onEnter);
              header.addEventListener('pointermove', onMove);
              disposers.push(() => {
                header.removeEventListener('pointerenter', onEnter);
                header.removeEventListener('pointermove', onMove);
                gsap.killTweensOf(stars);
                gsap.set(stars, { opacity: 0 });
              });
            }
          }

          return () => disposers.forEach((dispose) => dispose());
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div className="visl25-page" ref={containerRef}>
      {/* ─────────────────────────────────────────────────────────────
          1. LIGHT THEME AMBIENCE, 3 FLOATING STAT WIDGETS & 42 FUNKY SVGS
          ───────────────────────────────────────────────────────────── */}
      <div className="visl25-ambient-decor" aria-hidden="true">
        {/* Soft background glow orbs */}
        <div className="visl25-light-glow visl25-light-glow-1" />
        <div className="visl25-light-glow visl25-light-glow-2" />
        <div className="visl25-light-glow visl25-light-glow-3" />
        

        {/* ── 3 FLOATING STAT MICRO-WIDGETS (GLASSMORPHISM PILLS) ── */}

        <div className="v25-ambient-widget v25-amb-widget-3 v25-ambient-drift">
          <span className="v25-amb-widget-dot" />
          <span>25 Seats</span>
        </div>

        {/* ── 42 FUNKY CONTENT-RELEVANT FLOATING SVGS ── */}
        {/* 1. Film Clapperboard SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-1" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <path d="M2 9h20" />
          <path d="M6 4l2 5" />
          <path d="M12 4l2 5" />
          <path d="M18 4l2 5" />
        </svg>

        {/* 2. AI Magic Sparkle SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-2" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
          <path d="M19 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
        </svg>

        {/* 3. Play Button Vector */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" fillOpacity="0.25" />
        </svg>

        {/* 4. Laurel Crown SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-4" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 14c0 3 2 5.5 5 6.5" />
          <path d="M19 14c0 3-2 5.5-5 6.5" />
          <path d="M4 10c1-2 3.5-3 6-2" />
          <path d="M20 10c-1-2-3.5-3-6-2" />
          <path d="M6 5c2-1 5 0 6 3" />
          <path d="M18 5c-2-1-5 0-6 3" />
          <circle cx="12" cy="20" r="1.5" fill="currentColor" />
        </svg>

        {/* 5. Dollar Coin SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-5" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9c-.5-.7-1.4-1.2-2.5-1.2-1.7 0-2.8.9-2.8 2.2 0 2.5 5.5 1.4 5.5 4 0 1.4-1.2 2.2-2.8 2.2-1.3 0-2.3-.6-2.9-1.4" />
          <path d="M12 6.5v11" />
        </svg>

        {/* 6. Equity Shield SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-6" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L4 5v6c0 5.5 3.5 10.5 8 12 4.5-1.5 8-6.5 8-12V5l-8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>

        {/* 7. Discord Chat Bubble SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-7" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          <circle cx="9" cy="12" r="1.2" fill="currentColor" />
          <circle cx="15" cy="12" r="1.2" fill="currentColor" />
        </svg>

        {/* 8. Open Book SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-8" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6s3-2 7-2 7 2 7 2v13s-3-2-7-2-7 2-7 2V6z" />
          <path d="M16 6s3-2 7-2v13s-4 0-7 2V6z" />
        </svg>

        {/* 9. Ancient Pillar Silhouette SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-9" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16" />
          <path d="M5 7h14" />
          <path d="M7 7v11" />
          <path d="M11 7v11" />
          <path d="M13 7v11" />
          <path d="M17 7v11" />
          <path d="M5 18h14" />
          <path d="M4 21h16" />
        </svg>

        {/* 10. Seat Ticket Badge SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-10" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3z" />
          <path d="M12 8v8" strokeDasharray="2 2" />
        </svg>

        {/* 11. Classic 4-Point Star SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-11" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>

        {/* 12. Geometric Cross (+) SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-12" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 4v16M4 12h16" />
        </svg>

        {/* 13. Floating UI Pill Tag "✨ Microdramas" */}
        <div className="v25-ambient-svg v25-ambient-drift v25-svg-13 v25-floating-genre-tag">
          <span>✨ Microdramas</span>
        </div>

        {/* 14. Camera Lens Aperture SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-14" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M14.31 8l5.74 9.94" />
          <path d="M9.69 8h11.48" />
          <path d="M7.38 12l5.74-9.94" />
          <path d="M9.69 16L3.95 6.06" />
          <path d="M14.31 16H2.83" />
          <path d="M16.62 12l-5.74 9.94" />
        </svg>

        {/* 15. Script Quill SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-15" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 2c-4 2-7 6-8 10l-2 2-3-1-3 3 4 1 1 4 3-3-1-3 2-2c4-1 8-4 10-8V2z" />
          <path d="M14 8l2 2" />
        </svg>

        {/* ── 12 MORE FLOATING STORYTELLING / CREATOR SVGs ── */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-16" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><circle cx="8" cy="7" r="1" /><circle cx="17" cy="8" r="1" /><circle cx="7" cy="16" r="1" /><circle cx="17" cy="16" r="1" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-17" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L15 9" /><path d="M14 3v3M20 9h-3M18 3l-1 2M21 14l-2 1" /><path d="M3 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-18" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L3 20l1.7-4.4A7.5 7.5 0 1 1 20 11.5z" /><path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="2.5" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-19" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M10 8l6 4-6 4z" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-20" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-21" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13v-1a9 9 0 0 1 18 0v1" /><rect x="3" y="12" width="4" height="7" rx="2" /><rect x="17" y="12" width="4" height="7" rx="2" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-22" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z" /><path d="M4 5.5v16.5M8 7h8M8 11h7M8 15h5" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-23" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-24" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.7 8.3L23 12l-8.3 2.7L12 23l-2.7-8.3L1 12l8.3-2.7z" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-25" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5v14M20 5v14M4 8h16M4 16h16" /><circle cx="9" cy="8" r="2" fill="currentColor" fillOpacity=".2" /><circle cx="15" cy="16" r="2" fill="currentColor" fillOpacity=".2" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-26" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l5 4 4-7 4 7 5-4-2 12H5z" /><path d="M6 22h12" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-27" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h4l2-3h4l2 3h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" /><circle cx="12" cy="13" r="3.5" /></svg>
        {/* Additional ambient SVG accents (28–42) */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-28" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="7"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-29" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16v16H4zM8 8h8M8 12h5M8 16h7"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-30" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-31" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 5h18v14H3zM7 9h10M7 13h6"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-32" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-33" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M9 8l7 4-7 4z"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-34" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-35" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 19V5M4 19h16M7 15l4-4 3 2 5-6"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-36" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h10M4 17h13"/><circle cx="18" cy="12" r="2"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-37" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2zM19 16v5M16.5 18.5h5"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-38" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6l9-4 9 4-9 4zM3 6v12l9 4 9-4V6M12 10v12"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-39" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16v16H4zM5 17l5-4 3 2 3-3 3 5"/><circle cx="9" cy="9" r="2"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-40" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3a7 7 0 0 0-4 12.7V19h8v-3.3A7 7 0 0 0 12 3zM9 22h6M9 16h6"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-41" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16v16H4zM8 8l8 8M16 8l-8 8"/><circle cx="12" cy="12" r="3"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-42" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3l2.8 5.7L21 12l-6.2 3.3L12 21l-2.8-5.7L3 12l6.2-3.3z"/></svg>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          SCROLL-DRIVEN FILM STRIP GUIDE (behind the content)
          Built by JS from measured pixel positions. It runs in the side gutters and crosses the
          page only inside the blank film-break bands, so it never sits behind any text.
          ───────────────────────────────────────────────────────────── */}
      <svg ref={reelSvgRef} className="v25-reel-canvas" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="v25-reel-grad" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5c5aa6" />
            <stop offset="50%" stopColor="#3f68ad" />
            <stop offset="100%" stopColor="#2f8299" />
          </linearGradient>
          <mask id="v25-reel-mask" maskUnits="userSpaceOnUse">
            <path className="v25-reel-reveal" stroke="#ffffff" fill="none" strokeLinecap="butt" strokeLinejoin="round" />
          </mask>
        </defs>

        {/* Faint dotted preview of the route ahead */}
        <path className="v25-reel-ghost" />

        {/* The film strip itself, revealed up to the camera */}
        <g className="v25-reel-strip" mask="url(#v25-reel-mask)" />
      </svg>

      {/* The camera travels under the content layer, so it can never cover text or cards */}
      <svg ref={camSvgRef} className="v25-reel-cam-layer" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g ref={camRef} className="v25-cam">
          <CameraArt />
        </g>
      </svg>

      <div className="visl25-container">
        {/* =========================================================
            HEADER SECTION (STRICTLY FROM POSTERS ONLY)
            ========================================================= */}
        <header className="visl25-header" aria-label="Header">
          {/* Pooled sparkle-trail stars (moved by GSAP, hidden by default) */}
          <div className="v25-trail-layer" aria-hidden="true">
            {Array.from({ length: TRAIL_COUNT }, (_, i) => (
              <span className={`v25-trail-star v25-trail-c${i % 4}`} key={i} />
            ))}
          </div>
          {/* Badge: "ONLY 25 SEATS" */}
          <div className="visl25-badge-box">
            <div className="visl25-badge">
              <span className="visl25-badge-dot" />
              <span
                className="visl25-badge-text v25-scramble-text"
                data-text="ONLY 25 SEATS"
              >
                ONLY 25 SEATS
              </span>
            </div>
          </div>

          {/* Title: "VISL 25 FOUNDING CREATORS PROGRAM" */}
          <div className="visl25-title-wrap">
            <h1 className="visl25-main-title" ref={titleRef}>
              VISL 25 FOUNDING <span className="v25-gradient-shimmer">CREATORS</span> PROGRAM
            </h1>
          </div>

          {/* Subheadline: "Your stories deserve more than 60 seconds." */}
          <p className="visl25-subheadline" ref={subheadlineRef}>
            Your stories deserve more than{' '}
            <span className="v25-scramble-text" data-text="60 seconds" style={{ fontWeight: 800 }}>
              60 seconds
            </span>
            .
          </p>

          {/* Description: "25 founding seats for storytellers & AI creators building long-form stories." */}
          <p className="visl25-description" ref={descriptionRef}>
            25 founding seats for storytellers &amp; AI creators building long-form stories.
          </p>

          {/* Golden ticket: scratch ~10% of the gold foil to reveal the offer and the Apply button */}
          <div className="visl25-hero-ticket">
            <div className="v25-ticket-wrap" ref={ticketRef} data-revealed={revealed ? 'true' : 'false'}>
              <div className="v25-ticket-main">
                <div className="v25-ticket-topbar" aria-hidden="true">
                  <span>★ Golden Ticket</span>
                  <span>Admit One</span>
                  <span>No. 025</span>
                </div>

                <div className="v25-scratch-zone" ref={zoneRef}>
                  <h3 className="visl25-cta-headline v25-letter-headline" aria-label="Apply for a Founding Creator Seat">
                    {['Apply', 'for', 'a', 'Founding', 'Creator', 'Seat'].map((word, wordIndex) => (
                      <span className={`v25-letter-word${wordIndex > 1 ? ' v25-gradient-shimmer' : ''}`} aria-hidden="true" key={word}>
                        {word.split('').map((letter, index) => (
                          <span className={`v25-letter v25-letter-${(index + wordIndex) % 6}${wordIndex > 1 ? ' v25-letter-gradient-glyph' : ''}`} key={`${word}-${index}`}>{letter}</span>
                        ))}
                        {' '}
                      </span>
                    ))}
                  </h3>

                  {/* These elements live UNDER the scratch foil, so the surprise stays hidden until scratched. */}
                  <p className="visl25-cta-sub v25-scratch-copy">
                    Make your first films on us. Open to ambitious storytellers and AI creators building long-form stories.
                  </p>

                  <div className="v25-apply-wrap v25-scratch-apply">
                    <div className="v25-apply-pulse">
                      <a
                        href={FORM_URL}
                        className="visl25-apply-btn v25-apply-golden"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Apply to be considered for Visl 25"
                        onClick={() => handleApplyNowClick('scratch_ticket')}
                      >
                        <span>Apply Now</span>
                        <span className="visl25-btn-arrow">→</span>
                      </a>
                    </div>
                  </div>

                  {/* Golden flash that pops when the foil comes off */}
                  <div className="v25-reveal-flash" aria-hidden="true" />

                  {/* The gold foil. Painted and scratched on a canvas by the effect above. */}
                  <canvas ref={canvasRef} className="v25-scratch-canvas" aria-hidden="true" />
                  <div className="v25-foil-shimmer" aria-hidden="true" />

                  {/* Gold flakes that fly off while scratching (pooled, reused) */}
                  <div className="v25-flake-layer" aria-hidden="true">
                    {Array.from({ length: FLAKE_COUNT }, (_, i) => (
                      <span className="v25-flake" key={i} />
                    ))}
                  </div>

                  {/* A coin that scribbles on the foil until the first touch, as a hint */}
                  <div className="v25-scratch-hint" aria-hidden="true">
                    <svg viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="17" fill="#fbbf24" stroke="#b45309" strokeWidth="2.5" />
                      <circle cx="20" cy="20" r="11" stroke="#b45309" strokeWidth="1.8" strokeOpacity="0.7" />
                      <path d="M20 12l2.6 5.2 5.7.8-4.1 4 1 5.7-5.2-2.7-5.1 2.7 1-5.7-4.2-4 5.8-.8z" fill="#b45309" fillOpacity="0.85" />
                    </svg>
                  </div>
                </div>

                <div className="v25-ticket-note">
                  {revealed ? (
                    <p className="v25-unlocked-note" role="status">Applications are reviewed on a rolling basis. Applying does not guarantee selection.</p>
                  ) : (
                    <button type="button" className="v25-reveal-skip" onClick={() => revealFnRef.current?.()}>
                      Scratch the gold, or tap here to reveal
                    </button>
                  )}
                </div>
              </div>

              {/* Confetti burst layer (pooled, hidden until the reveal) */}
              <div className="v25-confetti-layer" aria-hidden="true">
                {Array.from({ length: CONFETTI_COUNT }, (_, i) => (
                  <span className={`v25-confetti v25-confetti-c${i % 5} v25-confetti-s${i % 3}`} key={i} />
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Blank "film break" band: the film strip crosses the page here, never behind text */}
        <div className="v25-film-gap" data-film-gap="1" aria-hidden="true" />

        {/* =========================================================
            BENEFITS SECTION: "25 seats. Here's what you get."
            (High-Impact Typography & Scramble Animation Upgrade)
            ========================================================= */}
        <section className="visl25-benefits-section" aria-label="Benefits">
          <div className="visl25-benefits-header">
            <h2 className="visl25-benefits-title" ref={benefitsTitleRef}>
              25 seats. <span className="v25-gradient-shimmer">Here&apos;s what you get.</span>
            </h2>
          </div>

          {/* Dropping Benefits Boxes / Cards Stack */}
          <div className="visl25-cards-stack" ref={stackRef}>
            {BENEFITS.map((item) => (
              <div key={item.id} className="visl25-card" data-fx={item.fx}>
                {/* Decorative signature icon (replayed on hover) */}
                <div className="visl25-card-art" aria-hidden="true">
                  <BenefitArt fx={item.fx} />
                </div>

                {/* Pooled particles (coins, growth tokens, reactions, seats, confetti):
                    rendered once per card and reused on every hover */}
                <div className="visl25-card-fx" aria-hidden="true">
                  {Array.from({ length: POOL_SIZE[item.fx] }, (_, i) => (
                    <Particle key={i} fx={item.fx} i={i} />
                  ))}
                </div>

                {/* Large Bold High-Impact Stat Column */}
                <div className="visl25-card-stat-col">
                  <div
                    className="visl25-stat-huge v25-scramble-stat"
                    data-text={item.stat}
                  >
                    {item.stat}
                  </div>
                  <span className="visl25-stat-sublabel">{item.statLabel}</span>
                </div>

                {/* Benefit Statement Body Column */}
                <div className="visl25-card-body-col">
                  <div className="visl25-card-num-badge">BENEFIT {item.num}</div>
                  <div className="visl25-card-statement">
                    <strong>{item.boldHeading}</strong> {item.bodyText}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer tag strictly from posters */}
          {/* <div className="visl25-footer-tag-wrap">
            <div className="visl25-footer-tag">
              <span className="genres">KIDS · MYTHOLOGY · HISTORY · MICRODRAMAS</span>
              <span className="divider">—</span>
              <span>Storytellers &amp; AI creators welcome</span>
            </div>
          </div> */}
        </section>

        {/* Blank "film break" band #2: the film strip swings back to the left lane here */}
        <div className="v25-film-gap" data-film-gap="2" aria-hidden="true" />

        {/* =========================================================
            WHO SHOULD APPLY / WHAT WE EXPECT
            (all copy taken from the program one-pager)
            ========================================================= */}
        <section className="v25-apply-section" ref={applyRef} aria-label="Who should apply">
          {/* 1. WHO SHOULD APPLY */}
          <div className="v25-who">
            <div className="v25-apply-head">
              <h2 className="v25-apply-heading">
                Who should <span className="v25-gradient-shimmer">apply</span>
              </h2>
              <svg className="v25-squiggle" viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8C20 0 36 14 54 7S90 1 108 8s36 6 54-1 36-5 56 1" />
              </svg>
            </div>

            <div className="v25-persona-grid">
              {PERSONAS.map((p) => (
                <article className="v25-persona" key={p.id}>
                  <div className="v25-persona-art" aria-hidden="true">
                    <PersonaArt kind={p.art} />
                  </div>
                  <p className="v25-eyebrow">{p.label}</p>
                  <p className="v25-persona-text">{p.text}</p>
                </article>
              ))}
            </div>

            <div className="v25-worlds">
              <p className="v25-worlds-label">Story worlds we&apos;re looking for</p>
              <ul className="v25-chip-list">
                {STORY_WORLDS.map((w) => (
                  
<li className="v25-chip-slot" key={w.label}>
  <span className="v25-chip">
    <WorldIcon kind={w.icon} />
    {w.label}
  </span>
</li>

                ))}
              </ul>
            </div>
          </div>

          {/* 2. WHAT WE EXPECT */}
          <div className="v25-expect-col">
            <div className="v25-expect-head">
              <h3 className="v25-sub-heading">What we expect</h3>
              <svg className="v25-squiggle v25-squiggle-sm" viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8C20 0 36 14 54 7S90 1 108 8s36 6 54-1 36-5 56 1" />
              </svg>
            </div>

            <div className="v25-expect-grid">
              <ul className="v25-expect-list">
                <li className="v25-expect-item">
                  <span className="v25-expect-bullet" aria-hidden="true" />
                  <span>
                    Create <strong className="v25-mark">at least 3 videos</strong> with Visl during the program.
                  </span>
                </li>
                <li className="v25-expect-item">
                  <span className="v25-expect-bullet" aria-hidden="true" />
                  <span>Publish these videos on your own channel.</span>
                </li>
                <li className="v25-expect-item">
                  <span className="v25-expect-bullet" aria-hidden="true" />
                  <span>
                    Credit <strong className="v25-mark">&ldquo;Made with Visl&rdquo;</strong> and tag Visl in the caption.
                  </span>
                </li>
                <li className="v25-expect-item">
                  <span className="v25-expect-bullet" aria-hidden="true" />
                  <span>Share honest feedback — what worked, what broke.</span>
                </li>
              </ul>

              <div className="v25-winwin">
                <span className="v25-winwin-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path className="v25-winwin-trend" d="M3 17l6-6 4 4 8-8" />
                    <path d="M15 7h6v6" />
                  </svg>
                  WIN-WIN
                </span>
                <p>Every video you make grows your channel and shows what Visl can do — a win for both of us.</p>
              </div>
            </div>

            <div className="v25-end-cta">
              <a
                href={FORM_URL}
                className="visl25-apply-btn v25-end-apply"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apply to be considered for Visl 25"
                onClick={() => handleApplyNowClick('end_cta')}
              >
                <span>Apply Now</span>
                <span className="visl25-btn-arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Visl25Page;