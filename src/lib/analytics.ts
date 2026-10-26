import ReactGA from 'react-ga4';

/**
 * GA4 Measurement ID for this application.
 * Defaults to 'G-VSMZCYHTT9', but can also be overridden via VITE_GA_MEASUREMENT_ID.
 */
export const GA_MEASUREMENT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
  'G-VSMZCYHTT9';

/**
 * Known CTA names for button click tracking.
 * Uses (string & {}) to preserve strict autocomplete while allowing custom extensions.
 */
export type CtaName =
  | 'login'
  | 'signup'
  | 'start_creating'
  | 'apply_now'
  | (string & {});

/**
 * Known CTA redirect destinations.
 */
export type CtaDestination =
  | 'visl_25'
  | 'google_form'
  | 'studio'
  | 'login'
  | 'signup'
  | (string & {});

/**
 * Type-safe parameters for the 'cta_click' event.
 */
export interface CtaClickEventParams {
  cta_name: CtaName;
  destination: CtaDestination;
  location?: string;
  button_text?: string;
  [key: string]: unknown;
}

/**
 * Parameters for the 'page_view' event.
 */
export interface PageViewEventParams {
  page_path: string;
  page_title?: string;
  page_location?: string;
  [key: string]: unknown;
}

/**
 * Generic GA4 custom event parameters.
 */
export type AnalyticsEventParams = Record<string, unknown>;

declare global {
  interface Window {
    __GA4_INITIALIZED__?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let gaInitialized = false;
let lastTrackedEventKey: string | null = null;
let lastTrackedEventTimestamp = 0;

/**
 * Checks if a non-pageview event is a duplicate within the deduplication window (400ms).
 * Prevents multiple firings from React StrictMode, rapid double-clicks,
 * or concurrent route transitions.
 */
function isDuplicateEvent(eventKey: string, windowMs = 400): boolean {
  const now = Date.now();
  if (lastTrackedEventKey === eventKey && now - lastTrackedEventTimestamp < windowMs) {
    return true;
  }
  lastTrackedEventKey = eventKey;
  lastTrackedEventTimestamp = now;
  return false;
}

/**
 * Checks whether GA4 is initialized.
 */
export function isGAInitialized(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return Boolean(
    gaInitialized ||
    window.__GA4_INITIALIZED__ ||
    ReactGA.isInitialized ||
    document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)
  );
}

/**
 * Returns the active GA4 Measurement ID.
 */
export function getMeasurementId(): string {
  return GA_MEASUREMENT_ID;
}

/**
 * Initializes Google Analytics 4 with the provided or default Measurement ID.
 * Safe to call multiple times (idempotent).
 * Ensures gtag.js script is only injected once globally across production and development/HMR.
 * Enables default Enhanced Measurement for automatic page view and history change tracking.
 */
export function initGA(measurementId: string = GA_MEASUREMENT_ID): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (isGAInitialized()) {
    return;
  }

  try {
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js"]`
    );

    if (existingScript) {
      gaInitialized = true;
      window.__GA4_INITIALIZED__ = true;
      return;
    }

    // Initialize with default Enhanced Measurement enabled.
    // Do not set send_page_view: false so initial pageview and history change events fire automatically.
    ReactGA.initialize(measurementId);
    gaInitialized = true;
    window.__GA4_INITIALIZED__ = true;

    if (import.meta.env?.DEV) {
      console.info(`[GA4] Initialized with measurement ID: ${measurementId}`);
    }
  } catch (error) {
    console.error('[GA4] Failed to initialize Google Analytics:', error);
  }
}

/**
 * Automatically ensures GA4 is initialized before firing an event.
 */
function ensureInitialized(): void {
  if (!isGAInitialized()) {
    initGA();
  }
}

/**
 * Page view tracking function.
 *
 * NOTE: Manual pageview tracking is DISABLED because GA4's default Enhanced Measurement
 * is enabled for "Page views" and "Page changes based on browser history events".
 * Manual gtag('event', 'page_view') calls would conflict and cause duplicate/overcounting pageviews.
 *
 * @param params Optional pageview parameters (preserved for interface compatibility).
 */
export function trackPageView(params?: Partial<PageViewEventParams>): void {
  // Disabled: GA4 default Enhanced Measurement automatically records page_view
  // on initial load (gtag config) and on all client-side history navigation events.
  // Manual dispatch is suppressed to ensure exactly ONE page_view per route change.
  if (import.meta.env?.DEV && params) {
    console.debug(
      '[GA4] Manual trackPageView skipped — GA4 Enhanced Measurement handles page views automatically.',
      params
    );
  }
}

/**
 * Tracks a critical CTA button click.
 * Emits a custom 'cta_click' event to GA4 with strictly typed parameters.
 * Includes deduplication to ensure events fire strictly ONCE per action even across
 * rapid clicks, StrictMode, or navigation transitions.
 *
 * @param params Details about the CTA (cta_name, destination, location, button_text, etc.)
 */
export function trackCtaClick(params: CtaClickEventParams): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Deduplicate identical CTA clicks fired within 400ms
  const eventKey = `cta_click:${params.cta_name}:${params.destination}:${params.location || ''}:${params.button_text || ''}`;
  if (isDuplicateEvent(eventKey)) {
    if (import.meta.env?.DEV) {
      console.debug('[GA4 CTA Click] Suppressed duplicate event trigger:', params);
    }
    return;
  }

  ensureInitialized();

  try {
    ReactGA.event('cta_click', params);

    if (import.meta.env?.DEV) {
      console.log('[GA4 CTA Click]', params);
    }
  } catch (error) {
    console.warn('[GA4] Failed to track CTA click:', error);
  }
}

/**
 * Tracks a custom GA4 event with arbitrary typed parameters.
 * Includes deduplication to ensure events fire strictly ONCE per action.
 *
 * @param eventName Name of the event in GA4.
 * @param params Event parameters object.
 */
export function trackEvent(
  eventName: string,
  params?: AnalyticsEventParams
): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Deduplicate identical custom events fired within 400ms
  const serialized = params ? JSON.stringify(params) : '';
  const eventKey = `custom:${eventName}:${serialized}`;
  if (isDuplicateEvent(eventKey)) {
    if (import.meta.env?.DEV) {
      console.debug(`[GA4 Event: ${eventName}] Suppressed duplicate event trigger:`, params);
    }
    return;
  }

  ensureInitialized();

  try {
    ReactGA.event(eventName, params);

    if (import.meta.env?.DEV) {
      console.log(`[GA4 Event: ${eventName}]`, params);
    }
  } catch (error) {
    console.warn(`[GA4] Failed to track event '${eventName}':`, error);
  }
}
