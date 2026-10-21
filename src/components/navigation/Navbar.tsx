import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, SECTION_PATH_TO_ID } from '../../lib/routes';
import { scrollToSectionTarget } from '../../lib/scroll';
import { GOOGLE_FORM_URL } from '../../constants';

type SectionNavItem = {
  label: string;
  path: string;
  sectionId: string;
};

const SECTION_NAV_ITEMS: SectionNavItem[] = [
  { label: 'How it works', path: ROUTES.HOW_IT_WORKS, sectionId: 'Visl-workflow-showcase' },
  { label: 'Explore', path: ROUTES.EXPLORE, sectionId: 'visl-explore-mount' },
  { label: 'Features', path: ROUTES.FEATURES, sectionId: 'why-vivi' },
  { label: 'Benefits', path: ROUTES.BENEFITS, sectionId: 'vivi-benefits' },
  { label: 'Pricing', path: ROUTES.PRICING, sectionId: 'vivi-pricing' },
];

const isHomeRoute = (pathname: string) =>
  pathname === ROUTES.HOME || Boolean(SECTION_PATH_TO_ID[pathname]);

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (path: string, sectionId: string) => {
    closeMenu();

    // Handle repeat clicks when the user is already at this section.
    if (location.pathname === path) {
      scrollToSectionTarget(sectionId, true);
      return;
    }

    navigate(path);
  };

  const handleFaqClick = () => {
    closeMenu();

    // Clicking FAQs again while already on the FAQ page should return to its top.
    if (location.pathname === ROUTES.FAQ) {
      window.requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });
      });
    }
  };

  const handleLogoClick = () => {
    closeMenu();

    if (isHomeRoute(location.pathname)) {
      window.requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
    }
  };

  return (
    <header id="main-nav" className="vivi-navbar">
      <div
        className={`vivi-navbar-inner ${
          mobileMenuOpen ? 'mobile-open' : ''
        }`}
      >
        {/* LOGO */}
        <Link
          to={ROUTES.HOME}
          className="vivi-navbar-logo"
          onClick={handleLogoClick}
        >
          Vi<span>sl</span>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="vivi-mobile-menu-button"
          aria-label={
            mobileMenuOpen ? 'Close navigation' : 'Open navigation'
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* MAIN NAVIGATION */}
        <nav
          id="main-navigation"
          className="vivi-navbar-links"
          aria-label="Main navigation"
        >
          {SECTION_NAV_ITEMS.map((item) => (
            <div className="vivi-nav-item" key={item.label}>
              <Link
                to={item.path}
                className={`vivi-nav-link vivi-nav-section-link${
                  location.pathname === item.path ? ' active' : ''
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.path, item.sectionId);
                }}
              >
                {item.label}
              </Link>
            </div>
          ))}

          <div className="vivi-nav-item">
            <Link
              to={ROUTES.FAQ}
              className={`vivi-nav-link${
                location.pathname === ROUTES.FAQ ? ' active' : ''
              }`}
              onClick={handleFaqClick}
            >
              FAQs
            </Link>
          </div>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="vivi-navbar-actions">
          <a
            href={GOOGLE_FORM_URL}
            className="vivi-navbar-login"
            onClick={closeMenu}
            target="_blank"
            rel="noopener noreferrer"
          >
            Log in
          </a>

          <a
            href={GOOGLE_FORM_URL}
            className="vivi-navbar-signup"
            onClick={closeMenu}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}
