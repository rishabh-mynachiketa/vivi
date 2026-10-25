import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { trackCtaClick } from '../../lib/analytics';

type AuthLayoutProps = {
  mode: 'login' | 'signup';
  children: ReactNode;
};

export function AuthLayout({ mode, children }: AuthLayoutProps) {
  const isLogin = mode === 'login';

  return (
    <main className="vivi-auth-page">
      {/* Left: Authentication panel */}
      <section className="vivi-auth-panel">
        <div className="vivi-auth-content">

          {/* Heading */}
          <div className="vivi-auth-heading">
            <h1>
              {isLogin
                ? 'Welcome back to Visl'
                : 'Create your Visl account'}
            </h1>

            <p>
              {isLogin
                ? 'Turn your ideas into cinematic stories.'
                : 'Bring your ideas to life with cinematic AI video.'}
            </p>
          </div>

          {/* Actual form */}
          {children}

          {/* Switch between login/signup */}
          <div className="vivi-auth-switch">
            {isLogin ? (
              <>
                <span>Don't have an account?</span>{' '}
                <Link
                  to={ROUTES.SIGNUP}
                  onClick={() =>
                    trackCtaClick({
                      cta_name: 'signup',
                      destination: 'signup',
                      location: 'auth_switch',
                      button_text: 'Sign up',
                    })
                  }
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <span>Already have an account?</span>{' '}
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() =>
                    trackCtaClick({
                      cta_name: 'login',
                      destination: 'login',
                      location: 'auth_switch',
                      button_text: 'Log in',
                    })
                  }
                >
                  Log in
                </Link>
              </>
            )}
          </div>

          {/* Terms */}
          <p className="vivi-auth-terms">
            By continuing, you agree to Visl's{' '}
            <Link to={ROUTES.TERMS}>Terms of Service</Link>
            {' '}and{' '}
            <Link to={ROUTES.PRIVACY}>Privacy Policy</Link>.
          </p>

        </div>
      </section>

      {/* Right: Video / brand panel */}
      <section className="vivi-auth-visual">

        <div className="vivi-auth-visual-glow vivi-auth-visual-glow-one" />
        <div className="vivi-auth-visual-glow vivi-auth-visual-glow-two" />

        <div className="vivi-auth-video-wrapper">

          {/* 
            VIDEO PLACEHOLDER

            When you have your video, replace this div with:

            <video
              className="vivi-auth-video"
              src="/your-video.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            Or use a remote video URL.
          */}

          <div className="vivi-auth-video-placeholder">
            <div className="vivi-auth-video-content">
              <span className="vivi-auth-video-label">
                VISL
              </span>

              <h2>
                Every story
                <br />
                starts with an idea.
              </h2>

              <p>
                Turn a simple prompt into a cinematic world.
              </p>

              <div className="vivi-auth-play">
                <span>▶</span>
              </div>
            </div>
          </div>

        </div>

        <div className="vivi-auth-visual-caption">
          <span>Visl</span>
          <span>AI storytelling, reimagined.</span>
        </div>

      </section>
    </main>
  );
}