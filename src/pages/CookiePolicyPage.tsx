import type { ReactNode } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

const SECTIONS = [
  { id: 'cookie-1', title: '1. What this covers' },
  { id: 'cookie-2', title: '2. The rules that apply' },
  { id: 'cookie-3', title: '3. Two kinds only' },
  { id: 'cookie-4', title: '4. Strictly necessary' },
  { id: 'cookie-5', title: '5. Analytics' },
  { id: 'cookie-6', title: '6. Marketing emails' },
  { id: 'cookie-7', title: '7. Your choices' },
  { id: 'cookie-8', title: '8. Third-party cookies' },
  { id: 'cookie-9', title: '9. Children' },
  { id: 'cookie-10', title: '10. Changes' },
  { id: 'cookie-11', title: '11. Contact' },
];

function Mail() {
  return (
    <a className="legal-link legal-mail" href="mailto:support@visl.ai">
      support@visl.ai
    </a>
  );
}

function Key({ children }: { children: ReactNode }) {
  return <span className="legal-key">{children}</span>;
}

function Term({ children }: { children: ReactNode }) {
  return <strong className="legal-term">{children}</strong>;
}

export function CookiePolicyPage() {
  return (
    <PageNavigation>
      <div id="page-cookies" className="page">
        <div className="legal-wrap terms-wrap">
          <h1>Cookie Policy: Visl AI</h1>

          <div className="legal-date">
            <span className="legal-date-pill">
              Effective date: 14th October 2026
            </span>
          </div>

          <div className="terms-layout">
            <nav className="terms-toc" aria-label="Contents">
              <p className="terms-toc-label">Contents</p>
              <ol>
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.title}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="terms-content">
              <div className="legal-section" id="cookie-1">
                <h2>1. What this covers</h2>
                <p>
                  This Cookie Policy explains how Visl AI uses cookies and
                  similar technologies (small files and identifiers stored on
                  your device, including local storage and tracking pixels in
                  emails) on our website and web app. It supplements our
                  Privacy Policy. If the two conflict on personal data, the
                  Privacy Policy prevails.
                </p>
              </div>

              <div className="legal-section" id="cookie-2">
                <h2>2. The rules that apply</h2>
                <p>Two sets of rules apply:</p>
                <ul className="legal-list legal-list-flush">
                  <li>
                    <Term>Rules on your device.</Term> Laws such as the EU
                    ePrivacy Directive and the UK&apos;s PECR govern storing or
                    reading information on your device. They require your
                    consent, except for cookies that are strictly necessary.
                  </li>
                  <li>
                    <Term>Rules on personal data.</Term> Data protection laws
                    (the GDPR, UK GDPR, India&apos;s DPDP Act and US state laws)
                    govern the personal data these technologies collect. Our
                    legal bases are in Section 4 of the Privacy Policy.
                  </li>
                </ul>
              </div>

              <div className="legal-section" id="cookie-3">
                <h2>3. Two kinds only</h2>
                <p>
                  We use strictly necessary technologies, which are always on,
                  and analytic technologies. We do not use advertising,
                  retargeting or social-media tracking cookies.
                </p>
              </div>

              <div className="legal-section" id="cookie-4">
                <h2>4. Strictly necessary</h2>
                <p>
                  These keep you signed in, protect the Services, control
                  access to your private content, balance load, complete
                  payments, and remember your cookie choice. You cannot switch
                  them off in our banner. If you block them in your browser,
                  you may not be able to sign in, view your videos or pay.
                </p>

                <div className="legal-table-wrap">
                  <table className="legal-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Set by</th>
                        <th>What it does</th>
                        <th>Lifetime</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sign-in session</td>
                        <td>Us</td>
                        <td>Keeps you signed in</td>
                        <td>Up to 30 days, or until you sign out</td>
                      </tr>
                      <tr>
                        <td>Security token</td>
                        <td>Amazon Cognito, on our sign-in page</td>
                        <td>Prevents forged requests</td>
                        <td>Session (deleted when you close your browser); one lasts up to 1 hour</td>
                      </tr>
                      <tr>
                        <td>Cookie choice</td>
                        <td>Us, through CookieYes</td>
                        <td>Remembers your cookie choice</td>
                        <td>12 months</td>
                      </tr>
                      <tr>
                        <td>Local storage items</td>
                        <td>Us</td>
                        <td>Keep you signed in and remember your settings</td>
                        <td>Until you sign out or clear your browser data</td>
                      </tr>
                      {/* <tr>
                        <td>
                          CloudFront-Policy, CloudFront-Signature,
                          CloudFront-Key-Pair-Id
                        </td>
                        <td>Us, through Amazon CloudFront</td>
                        <td>Prove you may view your private videos and files</td>
                        <td>[duration; CP3]</td>
                      </tr> */}
                      <tr>
                        <td>
                          Load-balancer and bot-protection cookies (such as
                          AWSALB, aws-waf-token), only if we use them
                        </td>
                        <td>Amazon Web Services</td>
                        <td>Spread traffic and block automated abuse</td>
                        <td>Up to 7 days</td>
                      </tr>
                      <tr>
                        <td>Payment cookies</td>
                        <td>Razorpay</td>
                        <td>
                          Complete your payment and detect fraud, on the payment page only and remember your
                          details 
                        </td>
                        <td>Set by Razorpay; see Razorpay&apos;s cookie policy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="legal-section" id="cookie-5">
                <h2>5. Analytics</h2>
                <p>
                  We use Google Analytics to understand how the Services are
                  used.
                </p>
                <p>
                  We have switched off Google&apos;s advertising features and
                  data sharing with other Google products, and we do not send
                  Google your name, email, prompts, uploads, or face or voice
                  data. We keep Google Analytics reports for up to{' '}
                  <Key>14 months</Key>.
                </p>
              </div>

              <div className="legal-section" id="cookie-6">
                <h2>6. Marketing emails</h2>
                <p>
                  If you have agreed to marketing emails, they contain a small
                  image (a tracking pixel) that tells us whether you opened the
                  email and which links you clicked. Service emails do not.
                </p>
              </div>

              <div className="legal-section" id="cookie-7">
                <h2>7. Your choices</h2>
                <ul className="legal-list legal-list-flush">
                  <li>
                    <Term>Banner.</Term> Analytics stay off, in every country,
                    until you accept them. Reject is as easy to choose as
                    Accept, and nothing is pre-selected.
                  </li>
                  <li>
                    <Term>Change your mind.</Term> Use Cookie settings in the
                    footer at any time.
                  </li>
                  <li>
                    <Term>Re-asking.</Term> We ask again every{' '}
                    <Key>12 months</Key> and keep a record of your choice (what
                    you chose, when, and which version of this policy) for{' '}
                    <Key>12 months</Key>.
                  </li>
                  <li>
                    <Term>Browser controls.</Term> You can block or delete
                    cookies in your browser. Blocking necessary cookies may
                    stop parts of the Services working.
                  </li>
                  <li>
                    <Term>Privacy signals.</Term> We treat Global Privacy
                    Control as an opt-out signal. We do not respond to
                    &quot;Do Not Track&quot;.
                  </li>
                </ul>
              </div>

              <div className="legal-section" id="cookie-8">
                <h2>8. Third-party cookies</h2>
                <p>
                  Google and Razorpay set cookies under their own policies.
                  Read the Google Privacy Policy and Razorpay&apos;s privacy
                  policy to see how they use data.
                </p>
              </div>

              <div className="legal-section" id="cookie-9">
                <h2>9. Children</h2>
                <p>
                  The Services are for people aged <Key>18</Key> and over, and
                  we do not direct cookies at minors.
                </p>
              </div>

              <div className="legal-section" id="cookie-10">
                <h2>10. Changes</h2>
                <p>
                  If we add a new type of cookie or a new purpose, we ask for
                  your consent before it is used and update this page. For
                  material changes we give at least <Key>30 days</Key>&apos;
                  notice by email and in the Services.
                </p>
              </div>

              <div className="legal-section" id="cookie-11">
                <h2>11. Contact</h2>
                <div className="legal-callout">
                  <p>
                    <Mail />.{' '}
                    <strong className="legal-company">
                      Big Bets Private Limited
                    </strong>
                    , CIN <span className="legal-chip">U73100DL2022PTC394224</span>
                    ,{' '}
                    <span className="legal-address">
                      3/28, Top Floor, Shanti Niketan, South Moti Bagh, New Delhi
                      – 110021, India
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageNavigation>
  );
}