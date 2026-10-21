export const ROUTES = {
  HOME: '/',
  HOW_IT_WORKS: '/how-it-works',
  EXPLORE: '/explore',
  FEATURES: '/features',
  BENEFITS: '/benefits',
  PRICING: '/pricing',
  KIDS: '/kids',
  HISTORY: '/history',
  INDIA: '/in',
  MICRODRAMA: '/microdrama',
  COMMUNITY: '/community',
  STUDIO: '/studio',
  RESOURCES: '/resources',
  CREDITS: '/resources/credits',
  HOW_TO_USE: '/resources/how-to-use',
  BLOG: '/resources/blog',
  FAQ: '/resources/faq',
  CONTACT: '/resources/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  REFUND: '/refund',
  LOGIN: '/login',
  ACC: '/acceptable-use',
  COOKIES: '/cookie-policy',
  SIGNUP: '/signup',
  COMING_SOON: '/coming-soon',
  CHILD_SAFETY: '/child-safety',
  DATA_DELETION: '/data-deletion',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];

export const SECTION_ROUTES = {
  HOW_IT_WORKS: ROUTES.HOW_IT_WORKS,
  EXPLORE: ROUTES.EXPLORE,
  FEATURES: ROUTES.FEATURES,
  BENEFITS: ROUTES.BENEFITS,
  PRICING: ROUTES.PRICING,
} as const;

export const SECTION_PATH_TO_ID: Record<string, string> = {
  '/how-it-works': 'Visl-workflow-showcase',
  '/explore': 'visl-explore-mount',
  '/features': 'why-vivi',
  '/benefits': 'vivi-benefits',
  '/pricing': 'vivi-pricing',
};

export const SECTION_ID_TO_PATH: Record<string, string> = {
  'Visl-workflow-showcase': '/how-it-works',
  'visl-explore-mount': '/explore',
  'why-vivi': '/features',
  'vivi-benefits': '/benefits',
  'vivi-pricing': '/pricing',
};

export const HASH_TO_ROUTE: Record<string, AppRoute> = {
  '#page-home': ROUTES.HOME,
  '#page-kids': ROUTES.KIDS,
  '#page-history': ROUTES.HISTORY,
  '#page-india': ROUTES.INDIA,
  '#page-microdrama': ROUTES.MICRODRAMA,
  '#page-community': ROUTES.COMMUNITY,
  '#page-studio': ROUTES.STUDIO,
  '#page-pricing': ROUTES.PRICING,
  '#page-resources': ROUTES.RESOURCES,
  '#page-credits': ROUTES.CREDITS,
  '#page-how-to-use': ROUTES.HOW_TO_USE,
  '#page-blog': ROUTES.BLOG,
  '#page-faq': ROUTES.FAQ,
  '#page-contact': ROUTES.CONTACT,
  '#page-privacy': ROUTES.PRIVACY,
  '#page-terms': ROUTES.TERMS,
  '#page-refund': ROUTES.REFUND,
  '#page-data-deletion': ROUTES.DATA_DELETION,
  '#Visl-workflow-showcase': ROUTES.HOW_IT_WORKS,
  '#visl-explore-mount': ROUTES.EXPLORE,
  '#why-vivi': ROUTES.FEATURES,
  '#vivi-benefits': ROUTES.BENEFITS,
  '#vivi-pricing': ROUTES.PRICING,
};
