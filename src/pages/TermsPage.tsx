import type { ReactNode } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

const SECTIONS = [
  { id: 'terms-1', title: '1. Who we are and what these Terms cover' },
  { id: 'terms-2', title: '2. Eligibility and your account' },
  { id: 'terms-3', title: '3. Plans, free trial, credits and payment' },
  { id: 'terms-4', title: '4. Refunds' },
  { id: 'terms-5', title: '5. Your content, Outputs and ownership' },
  { id: 'terms-6', title: '6. Watermarks, AI markings and disclosure' },
  { id: 'terms-7', title: '7. Third-party services' },
  { id: 'terms-8', title: '8. Acceptable use' },
  { id: 'terms-9', title: '9. Copyright and takedown requests' },
  { id: 'terms-10', title: '10. Changes to the Services' },
  { id: 'terms-11', title: '11. Suspension and termination' },
  { id: 'terms-12', title: '12. Disclaimers' },
  { id: 'terms-13', title: '13. Limitation of liability' },
  { id: 'terms-14', title: '14. Indemnity' },
  { id: 'terms-15', title: '15. Changes to these Terms' },
  { id: 'terms-16', title: '16. Governing law and disputes' },
  { id: 'terms-17', title: '17. General' },
  { id: 'terms-18', title: '18. Contact and grievances' },
];

function Mail() {
  return (
    <a className="legal-link legal-mail" href="mailto:support@visl.ai">
      support@visl.ai
    </a>
  );
}

function Ext({ href }: { href: string }) {
  return (
    <a
      className="legal-link legal-ext"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {href}
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

export function TermsPage() {
  return (
    <PageNavigation>
      <div id="page-terms" className="page">
        <div className="legal-wrap terms-wrap">
          <h1>Terms of Service: Visl AI</h1>

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
              <div className="legal-section" id="terms-1">
                <h2>1. Who we are and what these Terms cover</h2>
                <p>
                  These Terms of Service are an agreement between you and{' '}
                  <strong className="legal-company">
                    Big Bets Private Limited
                  </strong>{' '}
                  (CIN <span className="legal-chip">U73100DL2022PTC394224</span>
                  ),{' '}
                  <span className="legal-address">
                    3/28, Top Floor, Shanti Niketan, South Moti Bagh, New Delhi –
                    110021, India
                  </span>
                  , the company that provides Visl AI at{' '}
                  <a
                    className="legal-link"
                    href="https://visl.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    visl.ai
                  </a>{' '}
                  (&quot;<Term>Visl AI</Term>&quot;, &quot;<Term>we</Term>&quot;,
                  &quot;<Term>us</Term>&quot;). They govern your use of visl.ai,
                  our web app and related services (the &quot;
                  <Term>Services</Term>&quot;) including beta features, the AI
                  editing assistant and publishing to your connected social
                  accounts.
                </p>
                <p>
                  By creating an account or using the Services, you agree to
                  these Terms and to our Privacy Policy, Acceptable Use Policy,
                  Cookie Policy and Child Safety Policy, which form part of
                  them. If documents conflict, the Privacy Policy prevails on
                  personal data, the Acceptable Use Policy on prohibited
                  conduct, the Child Safety Policy on child safety, and these
                  Terms in all other cases.
                </p>
              </div>

              <div className="legal-section" id="terms-2">
                <h2>2. Eligibility and your account</h2>
                <Clause label="a." title="Age.">
                  You must be at least <Key>18</Key> to use the Services. You
                  confirm that you are 18 or older when you sign up
                </Clause>
                <Clause label="b." title="Availability.">
                  The Services are not offered in countries or regions where we
                  do not operate, or that are subject to comprehensive sanctions
                  or embargoes, including Cuba, Iran, North Korea, Syria, and
                  the Crimea, Donetsk and Luhansk regions of Ukraine. You may
                  not use the Services if you are located in or ordinarily
                  resident in such a place, or if you appear on a US, UN, EU or
                  UK sanctions list or are owned or controlled by, or acting
                  for, anyone on such a list. We may restrict access from these
                  places. If you use the Services from anywhere else, you are
                  responsible for complying with local law.
                </Clause>
                <Clause label="c." title="Your account.">
                  Give us accurate information and keep your login secure. You
                  are responsible for activity on your account. Do not share
                  your account. One person may hold one account, and you may not
                  open new accounts to get more free trials.
                </Clause>
                <Clause
                  label="d."
                  title="Uploaded Content and Face and Voice Consent."
                >
                  When uploading any image, document, voice recording, or other
                  reference material to the Services, you must confirm that you
                  own the content or have all rights, permissions, and consents
                  necessary to upload it and use it with Visl. You must not
                  upload content that infringes another person&apos;s rights or
                  that you are not authorised to use. We may require you to
                  confirm this through a separate checkbox before proceeding
                  with an upload.
                </Clause>
              </div>

              <div className="legal-section" id="terms-3">
                <h2>3. Plans, free trial, credits and payment</h2>
                <Clause label="a." title="Plans.">
                  We offer subscriptions, billed monthly or annually, that
                  include credits. You can also buy extra credits. Prices and
                  credit amounts are shown at checkout in USD and INR
                </Clause>
                <Clause label="b." title="Free trial.">
                  The free trial gives you <Key>300</Key> one time free credits.
                  Outputs from the free trial carry a visible Visl AI watermark.
                  The trial needs no payment card and does not convert to a paid
                  plan automatically. One trial per person.
                </Clause>
                <Clause label="c." title="Credits.">
                  Credits are used to generate Outputs through the Services. The
                  number of credits required may vary by feature, model, or
                  generation settings, and we may change credit costs from time
                  to time with notice in the Services before the change takes
                  effect. Subscription credits are allocated for each billing
                  period and, except where rollover is expressly included in
                  your subscription plan, expire at the end of that period and
                  do not carry over to the next billing period. Where a plan
                  permits rollover, unused credits may carry over subject to the
                  limits and conditions specified for that plan.
                </Clause>
                <p className="legal-cont">
                  Purchased credits are valid for the period applicable to the
                  plan under which they are purchased: thirty (
                  <Key>30</Key>) days for monthly plans and twelve (
                  <Key>12</Key>) months for annual plans, beginning on the date
                  of purchase, unless otherwise specified at the time of
                  purchase. Unused credits expire at the end of the applicable
                  validity period. Credits have no cash value, are
                  non-transferable, and are not redeemable for cash.
                </p>
                <Clause label="d." title="Billing and Renewal.">
                  Subscription fees are charged in advance for the applicable
                  billing period. Your subscription will renew automatically at
                  the end of each monthly or annual billing period only if you
                  have authorised recurring payments through an applicable
                  payment method or mandate. If no valid recurring payment
                  authorisation is in place, your subscription will expire at
                  the end of the period paid for, and you must manually renew or
                  purchase a new subscription to continue using paid features.
                  Automatic renewals are charged at the then-current applicable
                  price, subject to any notice required by law. You may cancel
                  your subscription at any time through your account settings or
                  by emailing <Mail />. Upon cancellation, you will retain
                  access to paid features until the end of your current paid
                  period, unless otherwise required by law. We will provide
                  renewal reminders and notifications where required by
                  applicable law or payment network rules.
                </Clause>
                <Clause label="e." title="Price Changes.">
                  Prices are subject to change. Any changes to subscription
                  prices will apply to existing subscriptions from the next
                  renewal period, subject to any notice required by applicable
                  law. If you do not agree to the revised price, you may cancel
                  your subscription before the new price takes effect.
                </Clause>
                <Clause label="f." title="Taxes.">
                  Where the law requires prices to be shown including tax
                  (including GST in India, and VAT or similar taxes for
                  consumers in the EEA, the UK and other countries), the price
                  shown at checkout includes tax. Otherwise, applicable taxes
                  are shown separately at checkout and charged in addition. We
                  issue tax invoices where required. If you are a business and
                  give us a valid tax registration number, we treat the sale as
                  the law requires.
                </Clause>
                <Clause label="g." title="Payment Processing.">
                  Payments are processed by third-party payment providers,
                  including Razorpay, subject to their applicable terms and
                  policies. Recurring payments may require your authorisation
                  and may be subject to additional authentication, advance
                  notification, or other requirements under applicable law or
                  payment network rules. We may decline or reverse a payment
                  that we reasonably suspect is fraudulent or that comes from a
                  location we do not serve
                </Clause>
                <Clause label="h." title="Failed Payments.">
                  If a payment fails or cannot be processed, we may notify you
                  and attempt to collect the outstanding amount again. If the
                  payment remains unresolved for seven (<Key>7</Key>) days, we
                  may suspend access to paid features until payment is
                  successfully completed. We may also suspend or terminate your
                  subscription in accordance with these Terms.
                </Clause>
              </div>

              <div className="legal-section" id="terms-4">
                <h2>4. Refunds</h2>
                <Clause label="a.">
                  Payments are non-refundable, except as set out here or
                  required by law. You can cancel at any time and keep access
                  until the end of the period you paid for. The free trial lets
                  you try the Services before you pay.
                </Clause>
                <Clause label="b.">
                  If you are a consumer in the EEA or UK, you may have a
                  statutory right to withdraw from your purchase within{' '}
                  <Key>14 days</Key>, without giving a reason, subject to
                  applicable law. Where permitted by law, if you request that we
                  begin providing the Services during this period, you may be
                  required to pay a proportionate amount for the Services
                  provided before withdrawal. For digital content, your right of
                  withdrawal may be lost once supply begins only where the
                  applicable legal requirements for your express consent and
                  acknowledgment have been satisfied. To exercise your right,
                  contact <Mail />. Nothing in these Terms limits any mandatory
                  consumer rights you may have under applicable law.
                </Clause>
                <Clause label="c.">
                  We refund billing errors and duplicate charges.
                </Clause>
                <Clause label="d.">
                  If we close your account without cause, or remove or
                  discontinue a paid feature you actively use, we refund the
                  unused part of what you prepaid.
                </Clause>
                <Clause label="e.">
                  Your rights under consumer laws that apply to you are not
                  affected.
                </Clause>
              </div>

              <div className="legal-section" id="terms-5">
                <h2>5. Your content, Outputs and ownership</h2>
                <Clause label="a." title="Terms we use.">
                  &quot;<Term>Inputs</Term>&quot; are the prompts, edit
                  instructions, scripts, documents, images, audio, face images,
                  voice references and supporting materials you give us. &quot;
                  <Term>Outputs</Term>&quot; are what the Services create from
                  them. &quot;<Term>User Content</Term>&quot; is your Inputs and
                  Outputs.
                </Clause>
                <Clause label="b.">You own your User Content.</Clause>
                <Clause label="c." title="Outputs.">
                  As between us, you own the Outputs. We assign to you all our
                  rights in them, to the extent we are able, and give you a
                  perpetual, irrevocable, worldwide, royalty-free licence to use
                  them. You may use Outputs commercially on every plan,
                  including to provide video services to your clients. This
                  survives cancellation. This is subject to third-party rights,
                  our providers&apos; restrictions (
                  <a className="legal-link" href="#terms-7">
                    Section 7
                  </a>
                  ) and{' '}
                  <a className="legal-link" href="#terms-6">
                    Section 6
                  </a>
                  .
                </Clause>
                <Clause label="d." title="What AI Outputs are.">
                  Outputs may not be unique, may contain errors or bias, and may
                  resemble existing works. They are not professional advice. You
                  must review them before relying on or publishing them. Similar
                  Outputs for other users do not give you exclusive rights in
                  common elements. Copyright law may not protect Outputs created
                  mainly by AI in some countries, and we do not promise that you
                  can enforce rights in them.
                </Clause>
                <Clause label="e." title="The licence you give us.">
                  You give us a worldwide, non-exclusive, royalty-free licence
                  to host, store, process, display and moderate your User
                  Content, and to send it to our service providers, only to run
                  and protect the Services. We use text prompts and edit
                  instructions for training only as set out in Section 3 of the
                  Privacy Policy (opt-in in the EEA, UK Switzerland and India,
                  opt-out elsewhere). We do not use your content in our
                  marketing without your consent. The licence ends when you
                  delete the content, subject to backups and legal retention
                  (Privacy Policy, Section 8).
                </Clause>
                <Clause label="f." title="Your promises.">
                  You promise that you own or have the right to use your Inputs;
                  that anyone whose face, voice or likeness appears in them has
                  permitted this use; that you have the rights to any music,
                  images or locations you add; that no real person in them is
                  under <Key>18</Key>; and that your use follows the Acceptable
                  Use Policy and the law.
                </Clause>
                <Clause label="g." title="Characters.">
                  We keep characters you create for your series until you delete
                  them or your account, as described in Privacy Policy Section
                  2(d). Deletion is permanent.
                </Clause>
                <Clause label="h." title="Feedback.">
                  If you suggest improvements, we may use them freely and
                  without payment.
                </Clause>
              </div>

              <div className="legal-section" id="terms-6">
                <h2>6. Watermarks, AI markings and disclosure</h2>
                <Clause label="a." title="Watermark.">
                  Do not remove or hide the visible watermark on free-trial
                  Outputs. Paid plans remove it.
                </Clause>
                <Clause label="b." title="AI markings.">
                  We may add machine-readable provenance markings and a visible
                  “AI-generated” label to Outputs, including where the law
                  requires. We may change or expand these markings over time. Do
                  not remove, hide or alter any marking we add, except that paid
                  plans may remove the visible watermark
                </Clause>
                <Clause label="c." title="Your disclosure duty.">
                  Where the law or a platform&apos;s rules require you to tell
                  your audience that content is AI-generated, you must do so
                  (including any labelling rules for political, election-related
                  or realistic synthetic content). You must not present Outputs
                  as real footage of real events or people.
                </Clause>
              </div>

              <div className="legal-section" id="terms-7">
                <h2>7. Third-party services</h2>
                <Clause label="a." title="AI providers.">
                  We use third-party AI models. Their acceptable-use rules also
                  apply to your use of a feature they power. Where those rules
                  are stricter than ours, the stricter rules apply. A
                  provider&apos;s safety system may block a request, and we do
                  not control it. We may change or replace models if the
                  Services stay substantially as useful.
                </Clause>
                <Clause
                  label="b."
                  title="Publishing to YouTube, Instagram and TikTok."
                />
                <div className="legal-sub">
                  <p>
                    <strong className="legal-clause-title">
                      Platform terms.
                    </strong>{' '}
                    By connecting an account to Visl AI or publishing through
                    Visl AI: to YouTube, you agree to be bound by the YouTube
                    Terms of Service (<Ext href="https://www.youtube.com/t/terms" />
                    ); to Instagram, you agree to the Instagram Terms of Use (
                    <Ext href="https://help.instagram.com/581066165581870" />)
                    and the Instagram Community Guidelines (
                    <Ext href="https://help.instagram.com/477434105621119" />);
                    to TikTok, you agree to the TikTok Terms of Service that
                    apply to you (United States:{' '}
                    <Ext href="https://www.tiktok.com/legal/page/us/terms-of-service/en" />
                    ; European Economic Area, Switzerland and the United
                    Kingdom:{' '}
                    <Ext href="https://www.tiktok.com/legal/page/eea/terms-of-service/en" />
                    ; all other countries:{' '}
                    <Ext href="https://www.tiktok.com/legal/page/row/terms-of-service/en" />
                    ) and the TikTok Community Guidelines (
                    <Ext href="https://www.tiktok.com/community-guidelines/en" />
                    ). Each time you publish to TikTok, you also agree to
                    TikTok&apos;s Music Usage Confirmation (
                    <Ext href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" />
                    ) and, if you mark the video as branded content,
                    TikTok&apos;s Branded Content Policy (
                    <Ext href="https://www.tiktok.com/legal/page/global/bc-policy/en" />
                    ).
                  </p>
                  <p>
                    We publish only on your instruction. You authorise us to
                    publish to a connected account only when you tell us to, or
                    at the time you schedule.
                  </p>
                  <p>
                    <strong className="legal-clause-title">Availability.</strong>{' '}
                    Publishing to TikTok is offered only in countries where
                    TikTok is available. The availability of each platform
                    through Visl AI depends on that platform and may change or
                    be withdrawn at any time.
                  </p>
                  <p>
                    <strong className="legal-clause-title">
                      Your responsibility.
                    </strong>{' '}
                    You are solely responsible for the content you publish
                    through Visl AI. You confirm that you hold all rights needed
                    to publish it, including rights in any music it contains;
                    that you will comply with each platform&apos;s terms and
                    policies; that you will correctly state whether a video is
                    made for kids; and that you will disclose when a video
                    promotes a brand, product or service.
                  </p>
                  <p>
                    <strong className="legal-clause-title">
                      AI-generated content.
                    </strong>{' '}
                    Videos created with Visl AI are generated using artificial
                    intelligence. Where a platform allows it, we label them as
                    AI-generated when we publish them (on YouTube, as altered or
                    synthetic content). You must comply with each
                    platform&apos;s rules on labelling AI-generated content.
                  </p>
                  <p>
                    <strong className="legal-clause-title">
                      Platform decisions.
                    </strong>{' '}
                    Each platform decides whether and how a post is published. A
                    platform may reject, restrict or remove a post, and we are
                    not responsible for its decisions. Until Google has
                    completed its review of Visl AI, videos uploaded to YouTube
                    through Visl AI may be published as private. Until TikTok
                    has completed its review, videos posted to TikTok through
                    Visl AI are visible only to the account holder.
                  </p>
                  <p>
                    <strong className="legal-clause-title">
                      Disconnecting.
                    </strong>{' '}
                    You can disconnect your accounts at any time, as described
                    in our Privacy Policy under &quot;Keeping and deleting&quot;
                    and &quot;Revoking access&quot;.
                  </p>
                </div>
                <Clause label="c." title="AI editing assistant.">
                  The assistant is an AI, not a person, and can be wrong. Its
                  answers about the Services, prices or policies are
                  information only and do not change these Terms. You remain
                  responsible for reviewing any change it makes before you
                  publish.
                </Clause>
              </div>

              <div className="legal-section" id="terms-8">
                <h2>8. Acceptable use</h2>
                <p>
                  The Acceptable Use Policy applies to everything you do with
                  the Services. We may remove content, block requests, suspend
                  or end accounts, and report to the authorities where it is
                  broken or the law requires. Our automated checks may block
                  prompts that appear to break these rules. Trying to get
                  around them breaches the Acceptable Use Policy. We may also
                  act on lawful orders from courts and government authorities,
                  including takedown and disclosure orders under Indian law,
                  and we tell you about them where the law allows. We remind
                  you of these rules and our Privacy Policy at least once a
                  year, as the Indian IT Rules require.
                </p>
              </div>

              <div className="legal-section" id="terms-9">
                <h2>9. Copyright and takedown requests</h2>
                <p>
                  To report copyright infringement, email <Mail /> with
                  &quot;Copyright&quot; in the subject. Include: the work you
                  say is infringed; where the infringing material is; your
                  contact details; a statement that you believe in good faith
                  the use is not authorised; a statement, under penalty of
                  perjury, that your notice is accurate and you are authorised
                  to act; and your signature. We handle notices under
                  applicable law, including the EU Digital Services Act, the
                  Indian Copyright Act 1957, and the Indian IT Act and rules.
                  We will tell the user, who may send a counter-notice. We end
                  the accounts of repeat infringers.
                </p>
                <p>
                  If your face, voice or personal data appears in content
                  without your permission, follow Section 9 of our Privacy
                  Policy. We aim to remove intimate or sexual imagery of a real
                  person made without their consent (including AI-generated or
                  altered imagery) and content that impersonates a real person
                  within <Key>48 hours</Key> of a valid complaint
                </p>
              </div>

              <div className="legal-section" id="terms-10">
                <h2>10. Changes to the Services</h2>
                <p>
                  We may change, suspend or discontinue features, including
                  beta features, with notice where practical. Beta features are
                  provided as is.
                </p>
              </div>

              <div className="legal-section" id="terms-11">
                <h2>11. Suspension and termination</h2>
                <Clause label="a." title="You.">
                  You can close your account at any time. We then delete your
                  data as in Privacy Policy Section 8. Unused credits are lost,
                  apart from refunds under{' '}
                  <a className="legal-link" href="#terms-4">
                    Section 4
                  </a>
                  .
                </Clause>
                <Clause label="b." title="Us.">
                  We may suspend or end your access if you breach these Terms,
                  the law requires it, or your use risks harm to others or to
                  the Services. We give notice where practical. For child-safety
                  violations and serious illegal content, we may end your
                  account immediately and without notice.
                </Clause>
                <Clause label="c." title="Effect.">
                  Your right to use the Services ends. Outputs you have already
                  created and exported remain yours. Sections that by nature
                  continue (ownership, payment, disclaimers, liability,
                  disputes) survive.
                </Clause>
              </div>

              <div className="legal-section" id="terms-12">
                <h2>12. Disclaimers</h2>
                <p>
                  The Services and Outputs are provided &quot;as is&quot; and
                  &quot;as available&quot;. To the extent the law allows, we do
                  not promise uninterrupted service, error-free Outputs, or
                  that Outputs are original or free of third-party rights. This
                  does not limit rights you have under consumer law that cannot
                  be excluded.
                </p>
              </div>

              <div className="legal-section" id="terms-13">
                <h2>13. Limitation of liability</h2>
                <p>
                  To the extent the law allows, we are not liable for indirect
                  or consequential loss, or for lost profits, revenue, data or
                  goodwill. Our total liability to you for all claims relating
                  to the Services or these Terms is limited to the greater of
                  (a) <Key>US$100</Key> or (b) the amount you paid us in the
                  six months before the claim arose.
                </p>
                <p>
                  Nothing in these Terms excludes or limits liability that
                  cannot lawfully be excluded or limited, including liability
                  for death or personal injury caused by negligence, for fraud,
                  gross negligence or wilful misconductor or fraudulent
                  misrepresentation, or under consumer protection laws that
                  apply to you.
                </p>
              </div>

              <div className="legal-section" id="terms-14">
                <h2>14. Indemnity</h2>
                <p>
                  To the extent the law allows, you will cover our reasonable
                  losses (including legal fees) from third-party claims arising
                  from your User Content, your breach of these Terms or the
                  Acceptable Use Policy, or your breach of someone&apos;s
                  rights.
                </p>
              </div>

              <div className="legal-section" id="terms-15">
                <h2>15. Changes to these Terms</h2>
                <p>
                  For material changes (including fees, refunds, disputes,
                  licences or your rights) we give at least <Key>30 days</Key>
                  &apos; notice by email and in the Services. If you do not
                  agree, you can cancel before the change takes effect. Minor
                  changes take effect when published.
                </p>
              </div>

              <div className="legal-section" id="terms-16">
                <h2>16. Governing law and disputes</h2>
                <Clause label="a." title="Governing law.">
                  Indian law governs these Terms, subject to your mandatory
                  consumer rights.
                </Clause>
                <Clause label="b." title="Talk to us first.">
                  Before starting a claim, email <Mail /> describing it, and
                  allow <Key>30 days</Key> to resolve it.
                </Clause>
                <Clause
                  label="c."
                  title="India and the rest of the world (except the US)."
                >
                  Unresolved disputes go to arbitration at the Delhi
                  International Arbitration Centre, in New Delhi, in English,
                  before a sole arbitrator, and the courts at New Delhi
                  supervise the arbitration. This arbitration clause does not
                  apply if you are a consumer in the EEA, the UK, Switzerland
                  or any other place where the law does not allow consumers to
                  be bound by it. In that case you may bring proceedings in the
                  courts of the country where you live, and we may bring
                  proceedings only there. Nothing limits your right to use a
                  consumer commission under the Consumer Protection Act 2019,
                  or to bring proceedings in your home courts where mandatory
                  consumer law gives you that right.
                </Clause>
                <Clause label="d." title="United States.">
                  Unresolved disputes go to individual binding arbitration
                  under the American Arbitration Association&apos;s Consumer
                  Rules, held by video or in your county of residence. The
                  Federal Arbitration Act governs this agreement. Either of us
                  may use small-claims court. You and we each waive class,
                  collective and representative actions and jury trial. You may
                  opt out of arbitration within <Key>30 days</Key> of first
                  accepting these Terms by emailing <Mail /> with{' '}
                  &quot;Arbitration opt-out&quot;, your name and your account email.
                  If you opt out, or this agreement is found unenforceable,
                  disputes go to the courts of New Delhi, subject to your
                  mandatory rights.
                </Clause>
                <Clause label="e.">
                  Either of us may seek urgent court relief to protect
                  intellectual property or enforce the Acceptable Use Policy.
                </Clause>
              </div>

              <div className="legal-section" id="terms-17">
                <h2>17. General</h2>
                <p>
                  These Terms and the documents they incorporate are the whole
                  agreement. If a provision is unenforceable, the rest stands.
                  Not enforcing a right is not a waiver. You may not assign
                  these Terms. We may assign them in a merger, acquisition or
                  sale. Neither of us is liable for delays caused by events
                  beyond our control. We give notices by email or in the
                  Services, and you can write to us at <Mail /> or at our
                  registered office. These Terms are in English. No one else
                  has rights under them. You confirm you are not on any
                  sanctions list and will follow export and sanctions laws.
                  These Terms are an electronic record under the Information
                  Technology Act 2000 and need no physical or digital
                  signature.
                </p>
              </div>

              <div className="legal-section" id="terms-18">
                <h2>18. Contact and grievances</h2>
                <div className="legal-callout">
                  <p>
                    Grievance Officer (India): <Mail />, with{' '}
                    &quot;Grievance&quot; in the subject.
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