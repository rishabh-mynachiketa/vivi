import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  trackPageView,
  trackCtaClick,
  trackEvent,
  initGA,
  isGAInitialized,
  getMeasurementId,
  type CtaClickEventParams,
  type PageViewEventParams,
  type AnalyticsEventParams,
} from '../lib/analytics';

export interface UseAnalyticsOptions {
  /**
   * If true, automatically logs pageviews whenever the route changes.
   * Defaults to false when calling useAnalytics(), or true in usePageTracking().
   */
  trackPageViews?: boolean;
}

/**
 * Custom hook providing Google Analytics 4 tracking helpers and optional automatic pageview tracking.
 *
 * @example
 * ```tsx
 * const { trackCtaClick } = useAnalytics();
 *
 * <button onClick={() => trackCtaClick({
 *   cta_name: 'start_creating',
 *   destination: 'visl_25',
 *   location: 'hero_section'
 * })}>
 *   Start Creating
 * </button>
 * ```
 */
export function useAnalytics(options?: UseAnalyticsOptions) {
  const location = useLocation();
  const shouldTrackPageViews = Boolean(options?.trackPageViews);
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!shouldTrackPageViews) {
      return;
    }

    const currentPath =
      location.pathname + location.search + location.hash;

    // Prevent duplicate pageview calls for the exact same path (e.g. React StrictMode in development)
    if (lastTrackedPathRef.current === currentPath) {
      return;
    }
    lastTrackedPathRef.current = currentPath;

    // Ensure GA is initialized
    if (!isGAInitialized()) {
      initGA();
    }

    trackPageView({
      page_path: currentPath,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [
    shouldTrackPageViews,
    location.pathname,
    location.search,
    location.hash,
  ]);

  const onCtaClick = useCallback(
    (params: CtaClickEventParams) => {
      trackCtaClick(params);
    },
    []
  );

  const onPageView = useCallback(
    (params?: Partial<PageViewEventParams>) => {
      trackPageView(params);
    },
    []
  );

  const onEvent = useCallback(
    (eventName: string, params?: AnalyticsEventParams) => {
      trackEvent(eventName, params);
    },
    []
  );

  return {
    trackCtaClick: onCtaClick,
    trackPageView: onPageView,
    trackEvent: onEvent,
    isInitialized: isGAInitialized(),
    measurementId: getMeasurementId(),
  };
}

/**
 * Convenience hook that automatically logs pageviews on route changes.
 * Place inside a component rendered within React Router (e.g., AppShell).
 */
export function usePageTracking(): void {
  useAnalytics({ trackPageViews: true });
}

/**
 * Headless route listener component that automatically logs page views on every client-side route change.
 */
export function AnalyticsRouteTracker(): null {
  usePageTracking();
  return null;
}
