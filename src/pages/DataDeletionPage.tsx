import { PageNavigation } from '../components/common/PageNavigation';

const SECTIONS = [
  { id: 'deletion-1', title: '1. Disconnect in Visl' },
  { id: 'deletion-2', title: '2. Or remove Visl from the platform' },
  { id: 'deletion-3', title: '3. What gets deleted, and when' },
  { id: 'deletion-4', title: '4. Ask us' },
];

export function DataDeletionPage() {
  return (
    <PageNavigation>
      <div id="page-data-deletion" className="page">
        <div className="legal-wrap terms-wrap">
          <h1>Delete your YouTube and Instagram data from Visl</h1>

          <div className="legal-date">
            <span className="legal-date-pill">
              Last updated: 21st October 2026
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
              {/* 1 */}
              <div className="legal-section" id="deletion-1">
                <h2>1. Disconnect in Visl</h2>
                <p>
                  In the Visl app, open Connected accounts (account menu) → Disconnect. This
                  immediately deletes the access keys and cancels scheduled posts for that account.
                </p>
              </div>

              {/* 2 */}
              <div className="legal-section" id="deletion-2">
                <h2>2. Or remove Visl from the platform</h2>
                <ul className="legal-list legal-list-flush">
                  <li>
                    <strong>Google / YouTube:</strong>{' '}
                    <a
                      className="legal-link legal-ext"
                      href="https://security.google.com/settings/security/permissions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://security.google.com/settings/security/permissions
                    </a>{' '}
                    → Visl AI → Remove access.
                  </li>
                  <li>
                    <strong>Instagram:</strong> Settings → Website permissions → Apps and websites → Visl AI → Remove{' '}
                    (
                    <a
                      className="legal-link legal-ext"
                      href="https://www.instagram.com/accounts/manage_access"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.instagram.com/accounts/manage_access
                    </a>
                    ).
                  </li>
                </ul>
              </div>

              {/* 3 */}
              <div className="legal-section" id="deletion-3">
                <h2>3. What gets deleted, and when</h2>
                <p>
                  Access keys are deleted immediately. Your account name, handle and picture are deleted
                  within 7 days. If you delete your Visl account, we remove all your connected accounts
                  and this data within 7 days.
                </p>
              </div>

              {/* 4 */}
              <div className="legal-section" id="deletion-4">
                <h2>4. Ask us</h2>
                <p>
                  Email{' '}
                  <a className="legal-link legal-mail" href="mailto:support@visl.ai">
                    support@visl.ai
                  </a>{' '}
                  from the email address of your Visl account. We delete your
                  data within 7 days and confirm by email.
                </p>
                <p>
                  If you removed Visl from Instagram and received a confirmation code, you can check the
                  status of your request on the link Instagram gave you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageNavigation>
  );
}
