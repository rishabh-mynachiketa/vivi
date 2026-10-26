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

let gaInitialized = false;
let lastTrackedPage: string | null = null;
let lastTrackedTimestamp = 0;

/**
 * Checks whether GA4 is initialized.
 */
export function isGAInitialized(): boolean {
  return gaInitialized || ReactGA.isInitialized;
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
 */
export function initGA(measurementId: string = GA_MEASUREMENT_ID): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (isGAInitialized()) {
    return;
  }

  try {
    ReactGA.initialize(measurementId, {
      gtagOptions: {
        send_page_view: false,
      },
    });
    gaInitialized = true;

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
 * Logs a page view to GA4.
 *
 * @param params Optional pageview parameters (defaults to current window location and document title).
 */
export function trackPageView(params?: Partial<PageViewEventParams>): void {
  if (typeof window === 'undefined') {
    return;
  }

  ensureInitialized();

  const page =
    params?.page_path ||
    window.location.pathname + window.location.search + window.location.hash;

  // Deduplicate identical pageviews within 500ms (prevents React 18/19 StrictMode double-fire in development)
  const now = Date.now();
  if (lastTrackedPage === page && now - lastTrackedTimestamp < 500) {
    return;
  }
  lastTrackedPage = page;
  lastTrackedTimestamp = now;

  const title = params?.page_title || document.title;
  const location = params?.page_location || window.location.href;

  try {
    ReactGA.send({
      hitType: 'pageview',
      page,
      title,
      location,
      ...params,
    });

    if (import.meta.env?.DEV) {
      console.log('[GA4 Pageview]', { page, title, location, ...params });
    }
  } catch (error) {
    console.warn('[GA4] Failed to track page view:', error);
  }
}

/**
 * Tracks a critical CTA button click.
 * Emits a custom 'cta_click' event to GA4 with strictly typed parameters.
 *
 * @param params Details about the CTA (cta_name, destination, location, button_text, etc.)
 */
export function trackCtaClick(params: CtaClickEventParams): void {
  if (typeof window === 'undefined') {
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
