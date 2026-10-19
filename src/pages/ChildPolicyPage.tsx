import type { ReactNode } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

const SECTIONS = [
  { id: 'child-1', title: '1. Our commitment' },
  { id: 'child-2', title: '2. What is prohibited' },
  { id: 'child-3', title: '3. Age rules' },
  { id: 'child-4', title: '4. How we find violations' },
  { id: 'child-5', title: '5. Reports and review' },
  { id: 'child-6', title: '6. What we do when we confirm a violation' },
  { id: 'child-7', title: '7. Appeals' },
  { id: 'child-8', title: '8. Getting help' },
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

function Clause({
  label,
  title,
  children,
}: {
  label: string;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="legal-clause">
      <span className="legal-clause-label">{label}</span>
      <p className="legal-clause-body">
        {title && <strong className="legal-clause-title">{title}</strong>}
        {title && children ? ' ' : null}
        {children}
      </p>
    </div>
  );
}

export function ChildPolicyPage() {
  return (
    <PageNavigation>
      <div id="page-child-safety" className="page">
        <div className="legal-wrap terms-wrap">
          <h1>Child Safety Policy: Visl AI</h1>

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
              <div className="legal-section" id="child-1">
                <h2>1. Our commitment</h2>
                <p>
                  Visl AI has zero tolerance for child sexual abuse and
                  exploitation. Children must never be harmed through our
                  Services, including our AI tools. Where this policy is more
                  restrictive than our other documents on any child-safety
                  matter, this policy controls. In this policy a &quot;
                  <Term>minor</Term>&quot; is anyone under <Key>18</Key>.
                </p>
              </div>

              <div className="legal-section" id="child-2">
                <h2>2. What is prohibited</h2>
                <p>
                  You may not use Visl AI to create, upload, store, edit,
                  share, request or link to:
                </p>
                <Clause label="a.">
                  child sexual abuse material, meaning any depiction of a minor
                  in sexually explicit conduct;
                </Clause>
                <Clause label="b.">
                  any content that sexualises, exploits or endangers a minor,
                  including through pose, framing, clothing, captions or
                  context, with or without nudity;
                </Clause>
                <Clause label="c.">
                  sexualised edits of a real minor, including face-swap,
                  &quot;undressing&quot; or avatar creation;
                </Clause>
                <Clause label="d.">
                  grooming or enticement of a minor, or content that normalises
                  the sexual abuse of children;
                </Clause>
                <Clause label="e.">
                  sextortion, or child sex trafficking; or
                </Clause>
                <Clause label="f.">
                  prompts, characters, images or voice references built to
                  produce any of the above, or to test how to get past our
                  safeguards.
                </Clause>
                <p>
                  This applies equally to AI-generated content, whether or not
                  a real child exists. Asking is a violation, even if nothing
                  is produced. Trying to get around our safeguards is a
                  violation. Sexually explicit content is prohibited for
                  everyone.
                </p>
              </div>

              <div className="legal-section" id="child-3">
                <h2>3. Age rules</h2>
                <p>
                  The Services are for people aged <Key>18</Key> and over. Do
                  not upload photos, video or voice recordings of anyone under{' '}
                  <Key>18</Key>, and do not create a character based on a real
                  minor, whether or not you are their parent or have their
                  consent.
                </p>
              </div>

              <div className="legal-section" id="child-4">
                <h2>4. How we find violations</h2>
                <p>
                  Our systems automatically check the text prompts you submit,
                  before they are sent to any AI provider, and block requests
                  that appear to seek prohibited content, so you cannot
                  continue with that request. The safety systems of our AI
                  providers, which we have switched on wherever they can be
                  configured, may also block requests. We do not routinely
                  review your private content. A person reviews a blocked
                  prompt only when you ask for a review or someone reports it,
                  and only to the minimum extent needed. No system is perfect,
                  so we keep testing and improving our checks. We also act on
                  reports (
                  <a className="legal-link" href="#child-5">
                    Section 5
                  </a>
                  ).
                </p>
              </div>

              <div className="legal-section" id="child-5">
                <h2>5. Reports and review</h2>
                <p>
                  Report content or conduct to <Mail /> with &quot;Child
                  safety&quot; in the subject. A person designated by{' '}
                  <strong className="legal-company">
                    Big Bets Private Limited
                  </strong>{' '}
                  handles every report, and we aim to respond within{' '}
                  <Key>24 hours</Key>. Suspected child sexual abuse material is
                  handled by that person only, to the minimum extent needed to
                  confirm and report it. It is not copied or shared.
                </p>
              </div>

              <div className="legal-section" id="child-6">
                <h2>6. What we do when we confirm a violation</h2>
                <ul className="legal-list legal-list-flush">
                  <li>We remove the content immediately.</li>
                  <li>
                    We end the account without prior notice and prevent
                    re-registration.
                  </li>
                  <li>
                    We report to the relevant authorities where the law
                    requires, and whenever we deem it necessary to protect a
                    child. This can include the National Center for Missing
                    &amp; Exploited Children (NCMEC) through its CyberTipline;
                    in India, the Special Juvenile Police Unit, local police or
                    the National Cyber Crime Reporting Portal (
                    <a
                      className="legal-link"
                      href="https://cybercrime.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      cybercrime.gov.in
                    </a>
                    ); and the competent authority in the user&apos;s country.
                    It can also include requests for such material that our
                    checks block, even if nothing was created. We give them the
                    information the law requires or that we consider necessary,
                    which can include the content, account details, IP
                    addresses and timestamps. We also cooperate with lawful
                    requests from law enforcement.
                  </li>
                  <li>
                    We keep reported material only as long as the law requires
                    or an authority asks, in a secure and restricted place.
                  </li>
                  <li>
                    We tell you if we report your account, unless the law
                    forbids it or an authority asks us not to.
                  </li>
                  <li>
                    We do not tell you about a report where that could harm a
                    child or an investigation, and we follow any request from
                    an authority not to tell you.
                  </li>
                </ul>
                <p>
                  <Term>This overrides deletion.</Term> We do not delete
                  preserved material when you ask us to delete your account or
                  your data, or to withdraw consent. We do this because the law
                  requires it and for reasons of substantial public interest,
                  not because of your consent, and you cannot object to it.
                </p>
              </div>

              <div className="legal-section" id="child-7">
                <h2>7. Appeals</h2>
                <p>
                  If we ended your account under this policy and you think we
                  were wrong, email <Mail />. A person reviews it, free of
                  charge, and gives you reasons. The review covers whether we
                  made a factual mistake. It cannot change our reporting
                  obligations, and an appeal does not withdraw a report.
                </p>
              </div>

              <div className="legal-section" id="child-8">
                <h2>8. Getting help</h2>
                <div className="legal-callout">
                  <p>
                    If a child is in danger, contact your local police. In
                    India, call Childline <Key>1098</Key> or report at{' '}
                    <a
                      className="legal-link"
                      href="https://cybercrime.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      cybercrime.gov.in
                    </a>
                    . Elsewhere, report to NCMEC&apos;s CyberTipline at{' '}
                    <a
                      className="legal-link"
                      href="https://report.cybertip.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      report.cybertip.org
                    </a>
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