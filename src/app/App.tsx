import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnalyticsRouteTracker } from '../hooks/useAnalytics';
import { SiteChrome } from '../components/SiteChrome';
import { ROUTES, SECTION_PATH_TO_ID } from '../lib/routes';
import { scrollToSectionTarget } from '../lib/scroll';
import { HomePage } from '../pages/HomePage'; 
import { KidsPage } from '../pages/KidsPage'; 
import { HistoryPage } from '../pages/HistoryPage'; 
import { IndiaPage } from '../pages/IndiaPage'; 
import { MicrodramaPage } from '../pages/MicrodramaPage'; 
import { StudioPage } from '../pages/StudioPage'; 
import { ResourcesPage } from '../pages/ResourcesPage'; 
import { HowToUsePage } from '../pages/HowToUsePage'; 
import { BlogPage } from '../pages/BlogPage'; 
import { ContactPage } from '../pages/ContactPage'; 
import { CommunityPage } from '../pages/CommunityPage'; 
// import { PricingPage } from '../pages/PricingPage'; 
import { FAQPage } from '../pages/FAQPage'; 
import { PrivacyPage } from '../pages/PrivacyPage'; 
import { CreditsPage } from '../pages/CreditsPage'; 
import { TermsPage } from '../pages/TermsPage'; 
import { RefundPage } from '../pages/RefundPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
// import { Vivi25Banner } from '../components/Vivi25Banner';
import { Footer } from '../components/Footer';
import ComingSoon from "../pages/ComingSoon";
import { AcceptableUsePage } from '../pages/AcceptableUsePage';
import { CookiePolicyPage } from '../pages/CookiePolicyPage';
import { ChildPolicyPage } from '../pages/ChildPolicyPage';
import { DataDeletionPage } from '../pages/DataDeletionPage';

const titles: Record<string, string> = {
  [ROUTES.HOME]: 'Visl — AI Video Storytelling',
  [ROUTES.HOW_IT_WORKS]: 'Visl — How It Works',
  [ROUTES.EXPLORE]: 'Visl — Explore',
  [ROUTES.FEATURES]: 'Visl — Features',
  [ROUTES.BENEFITS]: 'Visl — Benefits',
  [ROUTES.KIDS]: 'Visl — Kids Stories',
  [ROUTES.HISTORY]: 'Visl — History Stories',
  [ROUTES.INDIA]: 'Visl — India Stories',
  [ROUTES.MICRODRAMA]: 'Visl — Microdramas',
  [ROUTES.STUDIO]: 'Visl Studio',
  [ROUTES.RESOURCES]: 'Visl — Resources',
  [ROUTES.HOW_TO_USE]: 'Visl — How to Use',
  [ROUTES.BLOG]: 'Visl — Blog',
  [ROUTES.CONTACT]: 'Visl — Contact',
  [ROUTES.COMMUNITY]: 'Visl — Community',
  [ROUTES.PRICING]: 'Visl — Pricing',
  [ROUTES.FAQ]: 'Visl — FAQ',
  [ROUTES.PRIVACY]: 'Visl — Privacy Policy',
  [ROUTES.CREDITS]: 'Visl — Credit Calculator',
  [ROUTES.TERMS]: 'Visl — Terms & Conditions',
  [ROUTES.REFUND]: 'Visl — Refund & Cancellation',
  [ROUTES.ACC]: 'Visl — Acceptable Use Policy',
  [ROUTES.LOGIN]: 'Visl — Log In',
  [ROUTES.SIGNUP]: 'Visl — Sign Up',
  [ROUTES.COMING_SOON]: 'Visl — Coming Soon',
  [ROUTES.COOKIES]: 'Visl — Cookie Policy',
  [ROUTES.CHILD_SAFETY]: 'Visl — Child Safety Policy',
  [ROUTES.DATA_DELETION]: 'Visl — Data Deletion',
};

function MetaTitle(){const {pathname}=useLocation(); const title=titles[pathname]??'Visl AI'; document.title=title; const description='Visl AI creates long-form videos with consistent characters and complete story arcs.'; let meta=document.querySelector('meta[name=description]') as HTMLMetaElement|null; if(!meta){meta=document.createElement('meta');meta.name='description';document.head.appendChild(meta);} meta.content=description; let canonical=document.querySelector('link[rel=canonical]') as HTMLLinkElement|null; if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);} canonical.href=window.location.origin+pathname; return null;}
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let frameId = 0;

    // Let React render the destination route before resolving the anchor.
    const sectionId = SECTION_PATH_TO_ID[pathname];

    if (sectionId) {
      const cancelFn = scrollToSectionTarget(sectionId, true);
      return () => {
        if (cancelFn) cancelFn();
      };
    }
    frameId = window.requestAnimationFrame(() => {
      frameId = window.requestAnimationFrame(() => {
        if (hash) {
          const targetId = decodeURIComponent(hash.slice(1));
          const target = document.getElementById(targetId);

          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            return;
          }
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
}

export function AppShell() {
  return (
    <>
      <MetaTitle />
      <ScrollManager />
      <AnalyticsRouteTracker />

      <SiteChrome />
  {/* <Vivi25Banner /> */}

      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.HOW_IT_WORKS}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.EXPLORE}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.FEATURES}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.BENEFITS}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.KIDS}
          element={<KidsPage />}
        />

        <Route
          path={ROUTES.HISTORY}
          element={<HistoryPage />}
        />

        <Route
          path={ROUTES.INDIA}
          element={<IndiaPage />}
        />

        <Route
          path={ROUTES.MICRODRAMA}
          element={<MicrodramaPage />}
        />

        <Route
          path={ROUTES.STUDIO}
          element={<StudioPage />}
        />

        <Route
          path={ROUTES.RESOURCES}
          element={<ResourcesPage />}
        />

        <Route
          path={ROUTES.HOW_TO_USE}
          element={<HowToUsePage />}
        />

        <Route
          path={ROUTES.BLOG}
          element={<BlogPage />}
        />

        <Route
          path={ROUTES.CONTACT}
          element={<ContactPage />}
        />

        <Route
          path={ROUTES.COMMUNITY}
          element={<CommunityPage />}
        />

        <Route
          path={ROUTES.PRICING}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.FAQ}
          element={<FAQPage />}
        />

        <Route
          path={ROUTES.PRIVACY}
          element={<PrivacyPage />}
        />

        <Route
          path={ROUTES.CREDITS}
          element={<CreditsPage />}
        />

        <Route
          path={ROUTES.TERMS}
          element={<TermsPage />}
        />

        <Route
          path={ROUTES.REFUND}
          element={<RefundPage />}
        />
<Route path={ROUTES.ACC} element={<AcceptableUsePage />} />

<Route path={ROUTES.CHILD_SAFETY} element={<ChildPolicyPage />} />
<Route path={ROUTES.DATA_DELETION} element={<DataDeletionPage />} />
        {/* AUTH */}
        <Route
          path={ROUTES.LOGIN}
          element={<LoginPage />}
        />

        <Route
          path={ROUTES.SIGNUP}
          element={<SignupPage />}
        />
<Route path={ROUTES.COOKIES} element={<CookiePolicyPage />} />
        <Route
  path={ROUTES.COMING_SOON}
  element={<ComingSoon />}
/>

        <Route
          path="/404"
          element={
            <div className="not-found">
              <h1>Page not found</h1>
              <p>
                The page you're looking for doesn't exist.
              </p>
            </div>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/404" replace />}
        />
      </Routes>
      <Footer />

    </>
    
  );
}
export function App(){return <BrowserRouter><AppShell/></BrowserRouter>}
