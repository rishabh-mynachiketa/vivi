import type { ReactNode } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

const SECTIONS = [
  { id: 'aup-1', title: '1. What this is' },
  { id: 'aup-2', title: '2. Content we never allow' },
  { id: 'aup-3', title: '3. Real people' },
  { id: 'aup-4', title: '4. Minors' },
  { id: 'aup-5', title: "5. Other people's rights" },
  { id: 'aup-6', title: '6. Protecting the Services' },
  { id: 'aup-7', title: '7. AI markings and disclosure' },
  { id: 'aup-8', title: "8. Other people's rules" },
  { id: 'aup-9', title: '9. Reporting' },
  { id: 'aup-10', title: '10. What happens if the rules are broken' },
  { id: 'aup-11', title: '11. Changes' },
];

function Mail() {
  return (
    <a className="legal-link legal-mail" href="mailto:support@visl.ai">
      support@visl.ai
    </a>
  );
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

export function AcceptableUsePage() {
  return (
    <PageNavigation>
      <div id="page-aup" className="page">
        <div className="legal-wrap terms-wrap">
          <h1>Acceptable Use Policy: Visl AI</h1>

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
              <div className="legal-section" id="aup-1">
                <h2>1. What this is</h2>
                <p>
                  These are the rules for using Visl AI. They apply to
                  everything you input, create, and publish through us. If you
                  break them, we may remove content or end your account (
                  <a className="legal-link" href="#aup-10">
                    Section 10
                  </a>
                  ). These rules are part of our Terms of Service and are
                  published in line with the Indian IT Rules 2021.
                </p>
              </div>

              <div className="legal-section" id="aup-2">
                <h2>2. Content we never allow</h2>
                <p>For every user and every purpose:</p>
                <Clause label="a.">
                  any sexualised depiction of a person under <Key>18</Key>,
                  real or AI-generated, and any child sexual abuse or
                  exploitation (see our Child Safety Policy);
                </Clause>
                <Clause label="b.">
                  sexually explicit or pornographic content, whatever the age
                  of anyone shown;
                </Clause>
                <Clause label="c.">
                  intimate or sexual content of a real person without their
                  consent, including &quot;undressing&quot; and face-swaps
                  into sexual content;
                </Clause>
                <Clause label="d.">
                  threats, harassment, bullying, incitement to violence,
                  graphic violence for shock, terrorism or violent extremism;
                </Clause>
                <Clause label="e.">
                  hate against people because of race, religion, caste,
                  nationality, gender, sexuality, disability or similar
                  traits;
                </Clause>
                <Clause label="f.">
                  content promoting suicide, self-harm or eating disorders;
                </Clause>
                <Clause label="g.">
                  instructions for crimes, weapons or illegal drugs, or
                  content that helps fraud;
                </Clause>
                <Clause label="h.">
                  malware, spam or content built to deceive people for money.
                </Clause>
                <Clause label="i.">
                  content that is unlawful in India or in the country where it
                  is made or published, including content that threatens the
                  unity, integrity, defence, security or sovereignty of India,
                  public order or friendly relations with foreign states, that
                  is defamatory or obscene, or that promotes online money
                  games or other activity that is illegal; and
                </Clause>
                <Clause label="j.">
                  false or misleading information presented as fact that could
                  cause real harm, including about health, safety or public
                  emergencies.
                </Clause>
              </div>

              <div className="legal-section" id="aup-3">
                <h2>3. Real people</h2>
                <p>
                  We do not ban every depiction of a real person. Commentary,
                  parody and clearly signposted satire can be fine. But you
                  must not:
                </p>
                <Clause label="a.">
                  upload a face or voice unless it is your own or you have
                  that person&apos;s permission;
                </Clause>
                <Clause label="b.">
                  impersonate a real person, or show or sound like them saying
                  or doing something they did not, in a way a reasonable
                  viewer could take as real;
                </Clause>
                <Clause label="c.">
                  defame, harass or sexualise a real person;
                </Clause>
                <Clause label="d.">clone a voice you have no right to clone;</Clause>
                <Clause label="e.">
                  create fake identity documents, certificates, official
                  letters, receipts or other false evidence;
                </Clause>
                <Clause label="f.">
                  pose as an official, a business or a brand to deceive; or
                </Clause>
                <Clause label="g.">
                  mislead people about elections, such as false information on
                  when, where or how to vote. You must follow the election and
                  political-advertising laws that apply to you.
                </Clause>
                <p>
                  Do not use the Services to identify or verify who someone
                  is, or to guess race, ethnicity, religion, health, sexuality
                  or other sensitive traits.
                </p>
              </div>

              <div className="legal-section" id="aup-4">
                <h2>4. Minors</h2>
                <p>
                  Do not upload photos, video or voice recordings of anyone
                  under <Key>18</Key>, or create a character based on a real
                  minor. Fictional characters may appear but must never be
                  sexualised including characters who look under{' '}
                  <Key>18</Key> whatever their stated age.
                </p>
              </div>

              <div className="legal-section" id="aup-5">
                <h2>5. Other people&apos;s rights</h2>
                <p>
                  Do not infringe copyright, trademarks or privacy. You need
                  the right to use any music, images, footage, brand, location
                  or script you add.
                </p>
              </div>

              <div className="legal-section" id="aup-6">
                <h2>6. Protecting the Services</h2>
                <p>You must not:</p>
                <Clause label="a.">
                  use jailbreaks, prompt injection or any trick to get around
                  safety filters or limits, ours or an AI provider&apos;s;
                </Clause>
                <Clause label="b.">
                  try to extract our models, prompts or training data, or
                  reverse-engineer the Services;
                </Clause>
                <Clause label="c.">
                  use the Services or Outputs to build or train a competing AI
                  model or product;
                </Clause>
                <Clause label="d.">
                  use bots, scrapers or other automated access;
                </Clause>
                <Clause label="e.">
                  get around credit, trial or plan limits (including with
                  multiple accounts); or
                </Clause>
                <Clause label="f.">
                  share your account or resell access to the Services. You may
                  use Outputs to provide video services to your clients.
                </Clause>
              </div>

              <div className="legal-section" id="aup-7">
                <h2>7. AI markings and disclosure</h2>
                <p>
                  Do not remove or alter watermarks or provenance markings. Do
                  not present Outputs as real footage of real events or people.
                  Disclose AI-generated content where the law or a platform
                  requires.
                </p>
              </div>

              <div className="legal-section" id="aup-8">
                <h2>8. Other people&apos;s rules</h2>
                <p>
                  The rules of our AI providers and of Instagram, TikTok and
                  YouTube also apply. Where they are stricter than ours, the
                  stricter rules govern.
                </p>
              </div>

              <div className="legal-section" id="aup-9">
                <h2>9. Reporting</h2>
                <p>
                  Email <Mail /> with &quot;Report content&quot; in the
                  subject. For child safety, see our Child Safety Policy. A
                  person reviews reports, and we aim to reply within{' '}
                  <Key>24 hours</Key>. Tell us where the content is and why you
                  think it is illegal or breaks these rules. We confirm that we
                  received your report and tell you what we decided.
                </p>
              </div>

              <div className="legal-section" id="aup-10">
                <h2>10. What happens if the rules are broken</h2>
                <p>
                  We may remove content, block requests, limit features, warn
                  you, or suspend or end your account, and we may report to the
                  authorities. We end accounts immediately for child-safety
                  violations and serious illegal content. A person decides on
                  account action. To appeal, email <Mail /> within{' '}
                  <Key>30 days</Key>. A person reviews whether we made a
                  mistake and explains the result. If you think a block was a
                  mistake, email <Mail /> and a person will look at it.
                  Repeated attempts to get prohibited content may lead to
                  suspension, decided by a person.
                </p>
              </div>

              <div className="legal-section" id="aup-11">
                <h2>11. Changes</h2>
                <p>
                  We may update this policy, with notice as set out in our
                  Terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageNavigation>
  );
}

function Key({ children }: { children: ReactNode }) {
  return <span className="legal-key">{children}</span>;
}