import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { ROUTES } from '../lib/routes';
import { trackCtaClick } from '../lib/analytics';

export function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    trackCtaClick({
      cta_name: 'login',
      destination: 'studio',
      location: 'login_page',
      button_text: 'Log in',
    });

    // Temporary frontend-only flow.
    // Replace this with your real authentication logic later.
    navigate(ROUTES.STUDIO);
  };

  return (
    <AuthLayout mode="login">

      <form
        className="vivi-auth-form"
        onSubmit={handleSubmit}
      >

        {/* Email */}
        <div className="vivi-auth-field">
          <label htmlFor="login-email">
            Email address
          </label>

          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        {/* Password */}
        <div className="vivi-auth-field">
          <div className="vivi-auth-label-row">
            <label htmlFor="login-password">
              Password
            </label>

            <button
              type="button"
              className="vivi-auth-forgot"
            >
              Forgot password?
            </button>
          </div>

          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>

        {/* Login */}
        <button
          type="submit"
          className="vivi-auth-primary"
        >
          Log in
          <span aria-hidden="true">→</span>
        </button>

        {/* Divider */}
        <div className="vivi-auth-divider">
          <span />
          <p>OR</p>
          <span />
        </div>

        {/* Google */}
        <button
          type="button"
          className="vivi-auth-google"
        >
          <span className="vivi-google-icon">G</span>
          Continue with Google
        </button>

      </form>

    </AuthLayout>
  );
}