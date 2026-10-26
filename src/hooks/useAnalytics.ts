import { useCallback } from 'react';
import {
  trackPageView,
  trackCtaClick,
  trackEvent,
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
   *
   * @deprecated GA4 default Enhanced Measurement automatically tracks page changes
   * based on browser history events. Manual tracking is disabled to avoid duplicate hits.
   */
  trackPageViews?: boolean;
}

/**
 * Custom hook providing Google Analytics 4 tracking helpers.
 * Note: Route change pageview tracking is handled automatically by GA4 Enhanced Measurement.
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
export function useAnalytics(_options?: UseAnalyticsOptions) {
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
 * Convenience hook that was previously used to log pageviews on route changes.
 * Retained for backwards compatibility as a no-op; GA4 Enhanced Measurement
 * handles page views on browser history events automatically.
 */
export function usePageTracking(): void {
  // No-op: GA4 Enhanced Measurement is active and tracks history changes automatically.
}

/**
 * Headless route listener component.
 * Retained for backwards compatibility as a clean no-op component returning null.
 * GA4 Enhanced Measurement handles route transition page views automatically.
 */
export function AnalyticsRouteTracker(): null {
  return null;
}
