import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROUTES } from '../../lib/routes';
import { GOOGLE_FORM_URL } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

type SectionNavItem = {
  label: string;
  sectionId: string;
};

const SECTION_NAV_ITEMS: SectionNavItem[] = [
  { label: 'How it works', sectionId: 'Visl-workflow-showcase' },
  { label: 'Explore', sectionId: 'visl-explore-mount' },
  { label: 'Features', sectionId: 'why-vivi' },
  { label: 'Benefits', sectionId: 'vivi-benefits' },
  { label: 'Pricing', sectionId: 'vivi-pricing' },
];

function scrollToTarget(sectionId: string) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (sectionId === 'Visl-workflow-showcase') {
        ScrollTrigger.refresh();
        const trigger = ScrollTrigger.getById('Visl-workflow-horizontal');
        if (trigger) {
          window.scrollTo({
            top: trigger.start,
            behavior: 'smooth',
          });
          return;
        }
      }

      const target =
        document.getElementById(sectionId) ??
        (sectionId === 'vivi-pricing'
          ? document.querySelector('.pricing-section')
          : null);

      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenu();

    const targetHash = `#${sectionId}`;

    // Handle repeat clicks when the user is already at this section.
    if (
      location.pathname === ROUTES.HOME &&
      location.hash === targetHash
    ) {
      scrollToTarget(sectionId);
      return;
    }

    // React Router changes the URL first; the effect below scrolls after
    // the homepage has rendered, including when navigating from another page.
    navigate({
      pathname: ROUTES.HOME,
      hash: targetHash,
    });
  };

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;

    if (location.pathname === ROUTES.HOME && location.hash) {
      const sectionId = decodeURIComponent(location.hash.slice(1));

      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          if (sectionId === 'Visl-workflow-showcase') {
            ScrollTrigger.refresh();
            const trigger = ScrollTrigger.getById('Visl-workflow-horizontal');
            if (trigger) {
              window.scrollTo({
                top: trigger.start,
                behavior: 'smooth',
              });
              return;
            }
          }

          const target =
            document.getElementById(sectionId) ??
            (sectionId === 'vivi-pricing'
              ? document.querySelector('.pricing-section')
              : null);

          target?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
      });
    } else {
      // Every normal page navigation starts at the top of that page.
      firstFrame = window.requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });
      });
    }

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [location.pathname, location.hash]);

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

    if (location.pathname === ROUTES.HOME) {
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
              <button
                type="button"
                className="vivi-nav-link vivi-nav-section-link"
                onClick={() => scrollToSection(item.sectionId)}
              >
                {item.label}
              </button>
            </div>
          ))}

          <div className="vivi-nav-item">
            <Link
              to={ROUTES.FAQ}
              className="vivi-nav-link"
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