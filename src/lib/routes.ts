export const ROUTES = {
  HOME: '/', KIDS: '/kids', HISTORY: '/history', INDIA: '/in', MICRODRAMA: '/microdrama', COMMUNITY: '/community', STUDIO: '/studio', PRICING: '/pricing',
  RESOURCES: '/resources', CREDITS: '/resources/credits', HOW_TO_USE: '/resources/how-to-use', BLOG: '/resources/blog', FAQ: '/resources/faq', CONTACT: '/resources/contact',
  PRIVACY: '/privacy', TERMS: '/terms', REFUND: '/refund', LOGIN: '/login', ACC: '/acceptable-use',COOKIES: '/cookie-policy',
SIGNUP: '/signup',COMING_SOON: '/coming-soon',CHILD_SAFETY: '/child-safety',
} as const;
export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
export const HASH_TO_ROUTE: Record<string, AppRoute> = {
  '#page-home': ROUTES.HOME, '#page-kids': ROUTES.KIDS, '#page-history': ROUTES.HISTORY, '#page-india': ROUTES.INDIA, '#page-microdrama': ROUTES.MICRODRAMA,
  '#page-community': ROUTES.COMMUNITY, '#page-studio': ROUTES.STUDIO, '#page-pricing': ROUTES.PRICING, '#page-resources': ROUTES.RESOURCES,
  '#page-credits': ROUTES.CREDITS, '#page-how-to-use': ROUTES.HOW_TO_USE, '#page-blog': ROUTES.BLOG, '#page-faq': ROUTES.FAQ, '#page-contact': ROUTES.CONTACT,
  '#page-privacy': ROUTES.PRIVACY, '#page-terms': ROUTES.TERMS, '#page-refund': ROUTES.REFUND,
};
