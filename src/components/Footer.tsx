import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../lib/routes';
import { scrollToSectionTarget } from '../lib/scroll';
import '../styles/footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  // Also handles clicks when the user is already on the destination page.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const handleFooterSectionClick = (path: string, sectionId: string) => {
    if (location.pathname === path) {
      scrollToSectionTarget(sectionId, true);
      return;
    }
    navigate(path);
  };

  return (
    <footer className="vivi-footer">
      <div className="vivi-footer-inner">
        {/* Brand */}
        <div className="vivi-footer-brand">
          <Link
            to={ROUTES.HOME}
            className="vivi-footer-logo"
            onClick={scrollToTop}
          >
            Vi<span>sl</span>
          </Link>

          <p>
            You tell the story. Visl AI is the tool.
            No camera. No crew. No excuse.
          </p>

          <p className="footer-contact">
  <strong>Contact Us:</strong>{" "}
  <a href="mailto:support@visl.ai">support@visl.ai</a>
</p>
        </div>

        {/* Product */}
        <div className="vivi-footer-column">
          <h3>Product</h3>

          <Link
            to={ROUTES.HOW_IT_WORKS}
            onClick={(e) => {
              e.preventDefault();
              handleFooterSectionClick(ROUTES.HOW_IT_WORKS, 'Visl-workflow-showcase');
            }}
          >
            How it works
          </Link>

          <Link
            to={ROUTES.PRICING}
            onClick={(e) => {
              e.preventDefault();
              handleFooterSectionClick(ROUTES.PRICING, 'vivi-pricing');
            }}
          >
            Pricing
          </Link>

          <Link to={ROUTES.FAQ} onClick={scrollToTop}>
            FAQs
          </Link>

          {/* <Link to={ROUTES.CONTACT} onClick={scrollToTop}>
            Contact Us
          </Link> */}
        </div>

        {/* Company */}
        <div className="vivi-footer-column">
          <h3>Company</h3>

          <Link to={ROUTES.PRIVACY} onClick={scrollToTop}>
            Privacy Policy
          </Link>

          <Link to={ROUTES.TERMS} onClick={scrollToTop}>
            Terms of service
          </Link>

          <Link to={ROUTES.DATA_DELETION} onClick={scrollToTop}>
            Data deletion
          </Link>

          <Link to={ROUTES.ACC} onClick={scrollToTop}>
            Acceptable use policy
          </Link>

          <Link to={ROUTES.COOKIES} onClick={scrollToTop}>
            Cookie policy
          </Link>

          <Link to={ROUTES.CHILD_SAFETY} onClick={scrollToTop}>
            Child safety policy
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="vivi-footer-bottom">
        <span>
          © {currentYear} Big Bets Private Limited. Made in India.
        </span>

        <div className="vivi-footer-socials">
          <a href="https://www.linkedin.com/company/visl-ai/" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
