import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { ROUTES } from '../lib/routes';
import { trackCtaClick } from '../lib/analytics';

export function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    trackCtaClick({
      cta_name: 'signup',
      destination: 'studio',
      location: 'signup_page',
      button_text: 'Create account',
    });

    // Temporary frontend-only flow.
    // Replace this with your real authentication logic later.
    navigate(ROUTES.STUDIO);
  };

  return (
    <AuthLayout mode="signup">

      <form
        className="vivi-auth-form"
        onSubmit={handleSubmit}
      >

        {/* Name */}
        <div className="vivi-auth-field">
          <label htmlFor="signup-name">
            Full name
          </label>

          <input
            id="signup-name"
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>

        {/* Email */}
        <div className="vivi-auth-field">
          <label htmlFor="signup-email">
            Email address
          </label>

          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        {/* Password */}
        <div className="vivi-auth-field">
          <label htmlFor="signup-password">
            Password
          </label>

          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        {/* Signup */}
        <button
          type="submit"
          className="vivi-auth-primary"
        >
          Create account
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