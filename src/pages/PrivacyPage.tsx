import type { ReactNode } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

const SECTIONS = [
  { id: 'privacy-1', title: '1. Who We Are' },
  { id: 'privacy-2', title: '2. Personal Data We Collect' },
  { id: 'privacy-3', title: '3. Model Training and Use of Your Content' },
  { id: 'privacy-4', title: '4. How We Use Personal Data and Our Legal Bases' },
  { id: 'privacy-5', title: '5. How We Share Personal Data' },
  { id: 'privacy-6', title: '6. Cookies and Similar Technologies' },
  { id: 'privacy-7', title: '7. International Data Transfers' },
  { id: 'privacy-8', title: '8. How Long We Keep Personal Data' },
  { id: 'privacy-9', title: '9. Your Rights and Choices' },
  { id: 'privacy-10', title: '10. Security' },
  { id: 'privacy-11', title: "11. Children's Data" },
  { id: 'privacy-12', title: '12. Third-Party Websites and Services' },
  { id: 'privacy-13', title: '13. Changes to This Privacy Policy' },
  { id: 'privacy-14', title: '14. Contact' },
  { id: 'privacy-15', title: '15. Regional Information' },
  { id: 'privacy-annex-a', title: 'Annex A. Our Service Providers' },
];

const PURPOSE_ROWS: string[][] = [
  [
    '1',
    'Create your account, sign you in, and provide the Services (generating Outputs, saving projects, characters and series, and the AI editing assistant)',
    'Identifiers, account data, User Content, characters, supporting materials',
    'Contract',
  ],
  [
    '2',
    'Face and voice features (characters from face images, voice references)',
    'Face images, voice references, data derived from them',
    'Explicit consent',
  ],
  [
    '3',
    'Payments, invoicing and tax',
    'Payment and transaction data, billing details',
    'Contract; legal obligation (tax records)',
  ],
  [
    '4',
    'Publish to your connected social accounts',
    'Account identifiers, access tokens, Outputs',
    'Contract (at your request)',
  ],
  [
    '5',
    'Confirm you are 18 or older',
    'Consent taken',
    'Legitimate interests (keeping minors off the Services)',
  ],
  [
    '6',
    'Customer support',
    'Communications, account data',
    'Contract; legitimate interests',
  ],
  [
    '7',
    'Service emails (video ready, receipts, security and policy notices)',
    'Email address, account data',
    'Contract; legal obligation',
  ],
  [
    '8',
    'Marketing emails (product news, tips, reminders), including measuring opens and clicks',
    'Email address, usage data',
    'Consent',
  ],
  [
    '9',
    'Security, fraud prevention, abuse prevention and content moderation, including automated checks on prompts that block requests which appear to break our rules, and review by a person when you ask or someone reports content',
    'IP address, device data, prompts, reported content, moderation results',
    'Legitimate interests',
  ],
  [
    '10',
    'Child safety: detecting, preserving and reporting child sexual abuse material and exploitation',
    'Content, prompts, account and payment data, IP addresses',
    'Legal obligation; substantial public interest. This is not based on consent, and we may keep this data even if you delete your account (see our Child Safety Policy).',
  ],
  [
    '11',
    'Training our models on text prompts',
    'Text prompts and edit instructions',
    'Consent (EEA, UK and Switzerland, India); legitimate interests (other regions, with opt-out); consent with opt-out (India). See Section 3.',
  ],
  [
    '12',
    'Operating and improving the Services, and monitoring AI performance, using server logs, error reports, performance data and AI monitoring traces',
    'Technical and usage data, prompts and Outputs in monitoring traces',
    'Legitimate interests',
  ],
  [
    '13',
    'Understanding how the Services are used (Google Analytics)',
    'Cookie identifiers, pages and features used, device and browser data, approximate location',
    'Consent',
  ],
  [
    '14',
    'Complying with law, and responding to authorities and regulators',
    'As relevant',
    'Legal obligation',
  ],
  [
    '15',
    'Establishing, exercising or defending legal claims, and enforcing our Terms',
    'As relevant',
    'Legitimate interests',
  ],
];

const AUTOMATED_ROWS: string[][] = [
  [
    '1',
    'Content moderation',
    'Blocks a prompt that our checks flag, so you cannot continue with that request. A person reviews it if you ask.',
    'Legitimate interests; legal obligation (child safety)',
  ],
  [
    '2',
    'Age check at sign-up',
    'Refuse an account if you do not confirm that you are 18 or older',
    'Legitimate interests',
  ],
  [
    '3',
    'Location restrictions',
    'Refuse access from restricted countries or regions',
    'Legal compliance; legitimate interests',
  ],
  [
    '4',
    'Payment fraud checks',
    'Razorpay may decline a payment. Razorpay decides this under its own terms, so contact Razorpay or us and we will help.',
    "Razorpay's own basis",
  ],
];

const US_ROWS: string[][] = [
  [
    'Identifiers',
    'Name, email, IP address, account ID, cookie IDs (only if you accept analytics)',
    'You; automatically',
    'Hosting, email and analytics providers',
  ],
  [
    'Customer records',
    'Billing address, plan, transaction details',
    'You; Razorpay',
    'Razorpay; accounting and legal advisers',
  ],
  ['Commercial information', 'Plan and purchase history', 'You', 'Same'],
  [
    'Internet or network activity',
    'Pages and features used, logs, analytics',
    'Automatically',
    'Hosting, monitoring and analytics providers',
  ],
  [
    'Geolocation',
    'Approximate location from IP',
    'Automatically',
    'Hosting and security providers',
  ],
  [
    'Audio, visual or similar',
    'Images, video, audio, voice references, Outputs',
    'You',
    'AI providers; social platforms you connect',
  ],
  [
    'Sensitive personal information',
    'Account log-in credentials; face and voice data (biometric information)',
    'You',
    'AI providers acting for us',
  ],
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

function Sec({ n, children }: { n: number | string; children: ReactNode }) {
  return (
    <a className="legal-link" href={`#privacy-${n}`}>
      {children}
    </a>
  );
}

function Key({ children }: { children: ReactNode }) {
  return <span className="legal-key">{children}</span>;
}

function Term({ children }: { children: ReactNode }) {
  return <strong className="legal-term">{children}</strong>;
}

function Lead({ children }: { children: ReactNode }) {
  return <strong className="legal-clause-title">{children}</strong>;
}

function Em({ children }: { children: ReactNode }) {
  return <em className="legal-em">{children}</em>;
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

function DataTable({
  head,
  rows,
  narrowFirst,
}: {
  head: string[];
  rows: string[][];
  narrowFirst?: boolean;
}) {
  return (
    <div className="legal-table-wrap">
      <table
        className={narrowFirst ? 'legal-table legal-table-num' : 'legal-table'}
      >
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0] + r[1]}>
              {r.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <PageNavigation>
      <div id="page-privacy" className="page">
        <div className="legal-wrap terms-wrap">
          <h1>Privacy Policy: Visl AI</h1>

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
              <div className="legal-section" id="privacy-1">
                <h2>1. Who We Are</h2>
                <p>
                  This Privacy Policy explains how Visl AI collects, uses, shares and otherwise processes personal data when you access or use our websites, applications and related services (together, the &quot;<Term>Services</Term>&quot;). Capitalised terms not defined here have the same meaning as in our Terms of Service.
                </p>
                <p>
                  Visl AI (visl.ai) is a product of <strong className="legal-company">Big Bets Private Limited</strong>, a private limited company incorporated in India under the Companies Act, 2013 (CIN: <span className="legal-chip">U73100DL2022PTC394224</span>), with its registered office at <span className="legal-address">3/28, Top Floor, Shanti Niketan, South Moti Bagh, New Delhi – 110021, India</span> (&quot;<Term>Visl AI</Term>&quot;, &quot;<Term>we</Term>&quot;, &quot;<Term>us</Term>&quot; and &quot;<Term>our</Term>&quot;).
                </p>
                <Clause label="a." title="Our role.">
                  When you create an account, use our Services, visit our website or contact us, Big Bets Private Limited is the controller of your personal data under the GDPR and UK GDPR, and the data fiduciary under India&apos;s Digital Personal Data Protection Act 2023 (the &quot;<Term>DPDP Act</Term>&quot;), or the equivalent under any other applicable law. We use service providers who process personal data on our behalf under contracts that limit what they can do with it. Some, such as Razorpay and the social platforms you connect, decide for themselves how to use some of your data and handle it under their own privacy policies (see <Sec n={5}>Section 5</Sec>).
                </Clause>
                <Clause label="b." title="Scope.">
                  This Privacy Policy applies to personal data we process about everyone who visits our websites or uses our Services, wherever they are located. Region-specific information is in <Sec n={15}>Section 15</Sec> (Regional Information). Where a regional section addresses the same topic as the main body, the regional section applies to residents of that region. Our Services are not offered in countries or regions where we do not operate or that are subject to comprehensive sanctions (see our Terms of Service).
                </Clause>
                <Clause label="c." title="Aggregated and de-identified data.">
                  We generate and use aggregated, de-identified technical and usage data, such as performance metrics, error logs and feature usage patterns. This data does not identify you. We use it to operate, secure and improve the Services.
                </Clause>
                <Clause label="d." title="How our documents fit together.">
                  This Privacy Policy is part of a set of documents that govern your use of the Services:
                </Clause>
                <ul className="legal-list">
                  <li>our <Lead>Terms of Service</Lead>, which govern the commercial relationship between you and us;</li>
                  <li>this <Lead>Privacy Policy</Lead>, which governs how we handle your personal data;</li>
                  <li>our <Lead>Acceptable Use Policy</Lead>, which sets out what you may and may not do with the Services;</li>
                  <li>our <Lead>Cookie Policy</Lead>, which governs cookies and similar tracking technologies; and</li>
                  <li>our <Lead>Child Safety Policy</Lead>, which governs how we prevent harm to children on our Services.</li>
                </ul>
                <p className="legal-cont">
                  If there is a conflict, this Privacy Policy prevails on matters of personal data, the Acceptable Use Policy prevails on prohibited conduct and enforcement, the Child Safety Policy prevails on child-safety matters, and in all other cases the Terms of Service prevail. If you do not agree with this Privacy Policy, you must not use the Services.
                </p>
                <Clause label="e." title="Contact.">
                  For any question or request about this Privacy Policy, or to exercise your rights, contact <Mail />.
                </Clause>
                <div className="legal-callout">
                  <p>
                    <Lead>Grievance Officer (India).</Lead> Users in India who wish to raise a grievance under the DPDP Act, the Information Technology Act 2000, or the rules made under them, can write to our Grievance Officer at <Mail />, with &quot;Grievance&quot; in the subject line. We acknowledge complaints within <Key>24 hours</Key> and aim to resolve them within <Key>15 days</Key>.
                  </p>
                  <p>Name of Grievance Officer: Jitesh Bhasin</p>
                  <p>Designation: Chief of Staff</p>
                </div>
              </div>

              {/* 2 */}
              <div className="legal-section" id="privacy-2">
                <h2>2. Personal Data We Collect</h2>
                <Clause label="a." title="Information you give us." />
                <div className="legal-sub">
                  <Clause label="i." title="Identifiers and contact details.">
                    Your name, email address, and billing address and country and your phone number, or company name and GSTIN, if you give them for invoicing.
                  </Clause>
                  <Clause label="ii." title="Account and profile data.">
                    Your login credentials (passwords are stored in hashed form), profile details and settings.
                  </Clause>
                  <Clause label="iii." title="Age confirmation.">
                    When you sign up, you tick a box to confirm that you are at least <Key>18</Key>. We keep a record of that confirmation, with the date, time and version of our terms. We do not ask for or keep your date of birth.
                  </Clause>
                  <Clause label="iv." title="Payment and transaction data.">
                    Your plan, amounts paid or refunded, billing country, invoice details, and transaction reference and status. Payments are processed by Razorpay under its own terms and privacy policy. We use Razorpay&apos;s hosted checkout, so we do not receive or store your full card number, CVV or UPI PIN.
                  </Clause>
                  <Clause label="v." title="User Content.">
                    Prompts, scripts, PDFs and other documents, images, audio and video you upload or enter, and the videos, edits, series, projects and other outputs you create (&quot;<Term>Outputs</Term>&quot;), with metadata such as creation time and file format.
                  </Clause>
                  <Clause label="vi." title="Characters and series.">
                    If you create a character, the face image or photo and any voice reference (audio) you upload, your description of the character, and the series, scenes and settings built around it. We keep these so you can reuse them. See <Sec n={2}>2(d)</Sec>.
                  </Clause>
                  <Clause label="vii." title="Supporting materials.">
                    Location images, background music, reference clips and similar files you add to a video or series.
                  </Clause>
                  <Clause label="viii." title="Other people's information in your content.">
                    Your content may include other people, such as a face, a voice or names in a script. When you upload content, you confirm that you own it or have permission to use it, including permission from anyone whose face, voice or likeness appears in it and from the owners of any music, images or locations. See our Terms of Service and Acceptable Use Policy.
                  </Clause>
                  <Clause label="ix." title="Communications, support and feedback.">
                    Messages you send us, attachments, and survey or feedback responses.
                  </Clause>
                </div>

                <Clause label="b." title="Sign-in and connected platform accounts.">
                  You can sign in with Google. You can also connect your YouTube channel, your Instagram professional account and your TikTok account (each a &quot;<Term>Connected Account</Term>&quot;; together, the &quot;<Term>Platforms</Term>&quot;) to publish videos you create in Visl AI. This section describes what we collect when you do, and how we use, share, keep and delete it. If you sign in with Google, we also receive your email address.
                </Clause>
                <div className="legal-sub">
                  <p>
                    <Em>YouTube API Services.</Em> Visl AI uses YouTube API Services. If you connect a YouTube channel, the Google Privacy Policy also applies: <Ext href="http://www.google.com/policies/privacy" />. We handle Instagram data in line with the Meta Platform Terms and TikTok data in line with TikTok&apos;s developer terms.
                  </p>
                  <p>
                    <Lead>Information we collect</Lead>
                  </p>
                  <ul className="legal-list">
                    <li><Lead>YouTube:</Lead> your channel ID, channel name, handle and profile picture, and your authorisation for Visl AI to upload videos to your channel, to read your channel&apos;s basic details and, if you choose to publish subtitles as a caption track, to add that caption track to the video you publish.</li>
                    <li><Lead>Instagram:</Lead> your Instagram account ID, username, display name, profile picture and account type, and your authorisation for Visl AI to publish Reels to your account.</li>
                    <li><Lead>TikTok:</Lead> your TikTok account ID, display name, username and profile picture, and your authorisation for Visl AI to post videos to your account. Each time you publish to TikTok, we also retrieve the posting options available to your account (the permitted privacy settings, whether comments, Duets and Stitches may be enabled, and the maximum video length) so we can show them to you.</li>
                    <li><Lead>Access tokens:</Lead> the access credentials each Platform issues to Visl AI. We store them in encrypted form.</li>
                    <li><Lead>Publishing information:</Lead> for each video you publish or schedule: the video file; its title, description, tags, category and caption; the thumbnail or cover image; the privacy setting; the &quot;made for kids&quot; designation; on TikTok, the comment, Duet and Stitch settings and the commercial content disclosure; the scheduled time; the publishing status; and the link to the published post where the Platform provides one.</li>
                  </ul>
                  <p>
                    <Em>Information we do not collect.</Em> We do not access the comments, messages, followers or analytics of your Connected Accounts, or any videos or posts other than those you publish through Visl AI.
                  </p>
                  <p>
                    <Em>How we use it.</Em> We use this information only to publish the videos you select, when you instruct us or at the time you schedule, and to show you your Connected Accounts and publishing history. We never publish content without your instruction. We do not sell this information, use it for advertising, or use it to train AI models, and we do not send information received from the Platforms to AI providers. Where the GDPR or UK GDPR applies, we process it because it is necessary to provide the publishing feature you request (contract).
                  </p>
                  <p>
                    <Em>Who receives it.</Em> We disclose this information only to the Platform you publish to, to Amazon Web Services and to MongoDB Atlas (see <Sec n={5}>Section 5(d)</Sec>). We do not disclose it to anyone else, except where required by law.
                  </p>
                  <p>
                    <Em>Google API Services: Limited Use.</Em> Visl AI&apos;s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy (<Ext href="https://developers.google.com/terms/api-services-user-data-policy" />), including the Limited Use requirements.
                  </p>
                  <p>
                    <Em>Keeping and deleting.</Em>
                  </p>
                  <ul className="legal-list">
                    <li>When you disconnect a Connected Account in Visl AI, we cancel its scheduled posts, and we delete its stored tokens and platform data within <Key>7 days</Key> (and from our backups within a further <Key>30 days</Key>, as in <Sec n={8}>Section 8</Sec>).</li>
                    <li>If you revoke our access through the Platform instead, we delete the same information within <Key>7 days</Key> of learning of the revocation.</li>
                    <li>We refresh or delete the YouTube channel information we store at least every <Key>30 days</Key>.</li>
                    <li>We keep your publishing history until you delete your Visl AI account, and we refresh or remove links to YouTube posts in that history after <Key>30 days</Key>.</li>
                    <li>When you delete your Visl AI account, we disconnect all your Connected Accounts and delete this information as set out in <Sec n={8}>Section 8</Sec>.</li>
                  </ul>
                  <p>
                    <Em>Revoking access.</Em> In Visl AI: Account → Connected accounts → Disconnect. Google / YouTube: <Ext href="https://security.google.com/settings/security/permissions" /> → Visl AI → Remove access. Instagram: Settings → Website permissions → Apps and websites → Visl AI → Remove, or <Ext href="https://www.instagram.com/accounts/manage_access" />. TikTok: in the TikTok app, Profile → Menu → Settings and privacy → Security → Manage app permissions → Visl AI → Remove access (menu labels may vary between app versions).
                  </p>
                  <p>
                    <Em>Deletion requests.</Em> You can ask us to delete this information at <Ext href="https://visl.ai/data-deletion" /> or by email to <Mail />. We respond within <Key>7 days</Key> and confirm by email. Other requests are handled as set out in <Sec n={9}>Section 9</Sec>.
                  </p>
                </div>

                <Clause label="c." title="Information collected automatically." />
                <div className="legal-sub">
                  <Clause label="i." title="Technical and device data.">
                    When you use the Services, our servers and hosting providers log your IP address, browser type and version, device and operating system type, language, and the pages and features you request. We use your IP address to work out your approximate location (country or city), to apply our location restrictions and to keep the Services secure.
                  </Clause>
                  <Clause label="ii." title="Usage and analytics data.">
                    Pages visited, features used, clicks, session duration, access times, error logs and performance metrics; analytics identifiers such as a Google Analytics client ID, if you accept analytics cookies; and, for marketing emails you have agreed to receive, whether you open them and which links you click.
                  </Clause>
                  <Clause label="iii." title="Cookies.">
                    See <Sec n={6}>Section 6</Sec> and our Cookie Policy.
                  </Clause>
                  <Clause label="iv." title="Moderation data.">
                    If our checks block a prompt because it appears to seek child sexual abuse material, we record the prompt, your account, the time and your IP address so that a person can review it and, if necessary, report it.
                  </Clause>
                </div>

                <Clause label="d." title="Faces, voices and biometric information." />
                <div className="legal-sub">
                  <Clause label="i." title="Uploads in general.">
                    We process images, video and audio you upload only to create the Output you ask for. We do not use facial or voice recognition to identify anyone, and we do not use your content to infer characteristics such as race, ethnicity, religion, health or sexual orientation.
                  </Clause>
                  <Clause label="ii." title="Characters from a face image.">
                    When you create a character from a face image or photo, we, and AI providers acting for us, process the facial features in it so the character looks consistent across your scenes. We keep the image and the facial data derived from it so you can reuse the character in your series.
                  </Clause>
                  <Clause label="iii." title="Voice references.">
                    When you upload audio so a character sounds a particular way, we, and AI providers acting for us, process the voice characteristics in it to generate speech in that style. We keep the audio and the voice data derived from it so you can reuse the voice.
                  </Clause>
                  <Clause label="iv." title="How we treat this data.">
                    We treat face and voice data as sensitive biometric information. Images may show faces and audio may contain voices, so we ask for your explicit consent, separately from our Terms, the first time you upload an image or a voice reference. We record the date, time and policy version of your consent. We process facial or voice features only if your upload contains them, and only to provide the feature you asked for. You can withdraw consent in your settings. If you do not consent, you will not be able to upload images or voice references. We do not sell, lease or trade this data, and we do not use it to train AI models.
                  </Clause>
                  <Clause label="v." title="Keeping and deleting.">
                    We keep this data until you delete the character or close your account. Deletion is permanent, and we do not offer a recovery period. We remove deleted data from our live systems within <Key>30 days</Key> and from our backups within a further <Key>30 days</Key>. If you do not sign in for <Key>12 months</Key>, we will email you and then delete your characters. This paragraph is our written retention and destruction policy for biometric information.
                  </Clause>
                  <Clause label="vi." title="Whose face or voice you can upload.">
                    You may upload a face or voice only if it is your own or you have that person&apos;s permission to use it. By uploading, you confirm you have that permission. Our Acceptable Use Policy sets out what is not allowed.
                  </Clause>
                  <Clause label="vii." title="New uses.">
                    If we introduce features that use this data in a new way, we will update this Privacy Policy and ask for your consent first.
                  </Clause>
                </div>

                <Clause label="e." title="Information we receive from others.">
                  From Google, Instagram, TikTok and YouTube (see <Sec n={2}>2(b)</Sec>); from Razorpay, confirmation and status of your payments and the last four digits of your card; and from analytics, security and service providers, aggregated or derived data about how the Services are used.
                </Clause>
                <Clause label="f." title="Please do not submit sensitive information.">
                  Please do not put government ID numbers, financial account numbers, passwords or health information into prompts or scripts. If it appears in your content, we may delete it.
                </Clause>
              </div>

              {/* 3 */}
              <div className="legal-section" id="privacy-3">
                <h2>3. Model Training and Use of Your Content</h2>
                <Clause label="a." title="Providing the Services.">
                  We use your Inputs (prompts, edit instructions, scripts, documents, images, audio, face images, voice references and supporting materials) to create the Outputs you ask for, and to store your projects, characters and series so you can return to them.
                </Clause>
                <Clause label="b." title="Training our own models." />
                <div className="legal-sub">
                  <Clause label="i." title="What we use.">
                    We train, fine-tune and evaluate our own AI models to improve the Services. For this we may use the text you type into prompts and edit instructions. That text can include personal data if you type it, so please do not put sensitive information about yourself or others into prompts (see <Sec n={2}>Section 2(f)</Sec>).
                  </Clause>
                  <Clause label="ii." title="What we never use for training.">
                    Images, video, audio and music (yours, or the Outputs we create); face images, photos, voice references and characters; documents you upload; supporting materials; your support conversations and questions about our Services; and your account, contact, billing and payment data.
                  </Clause>
                  <Clause label="iii." title="Your consent and choices." />
                  <ul className="legal-list">
                    <li><Lead>If you are in the EEA, the UK or Switzerland,</Lead> we use your text for training only if you agree. We ask separately, and you can change your choice at any time in Settings. If you do not agree, we do not use your text for training and the Services work the same.</li>
                    <li><Lead>If you are in India,</Lead> we use your text for training only if you agree. We ask separately from this Privacy Policy and our Terms, and you can change your choice at any time by writing to us at <Mail />.</li>
                    <li><Lead>Everywhere else,</Lead> we may use your text for training as described here, based on our legitimate interest in improving our models. You can opt out at any time by emailing <Mail /> with &quot;Training opt-out&quot; in the subject.</li>
                  </ul>
                  <Clause label="iv." title="What opting out does.">
                    We stop using your text for training and remove it from our training sets within <Key>30 days</Key>. If you delete content, we will not use it for training going forward. Text already used to train a model cannot be removed from a model that is already trained.
                  </Clause>
                </div>
                <Clause label="c." title="Fixing problems.">
                  Authorised staff may look at prompts and other Inputs when needed to diagnose errors, fix bugs, investigate abuse or answer your support request. Access is limited to people who need it. We do not open face images or voice references for this unless you ask us to in a support request or safety review requires it (see <Sec n={4}>Section 4</Sec>).
                </Clause>
                <Clause label="d." title="Third-party AI providers.">
                  To create Outputs we use third-party AI providers and the models they host. These providers write and edit scripts and other text, generate images and video, generate and convert voices and music, transcribe speech, and separate voices from background audio. When you generate something, we send them the Inputs needed for that request. For character, voice and editing features, this includes face images, voice references and project files. They return the Output to us. We do not send information we receive from YouTube, Instagram or TikTok to any AI provider. Providers&apos; own safety systems may block prompts, uploads or Outputs, and we do not control those decisions. Some of these providers process data outside India, the EU, the UK and the US. We give you the names of our providers on request (see <Sec n={9}>Section 9</Sec>).
                </Clause>
                <p className="legal-cont">
                  Providers keep content only as long as needed to provide the service or as their terms state.
                </p>
                <Clause label="e." title="AI editing assistant.">
                  Our assistant lets you edit a project by chat, for example by changing a script, a scene or an image, and it answers general questions about video editing and about us. It is an AI system, not a person, and it can make mistakes. When you use it, your messages and the parts of your project it needs for the request (such as script text, images or clips) are sent to the AI provider and models for each kind of edit. Its answers about our Services, prices or policies are for information only and do not change our Terms. Please do not share sensitive information in chat.
                </Clause>
                <Clause label="f." title="Aggregated data.">
                  We use aggregated, de-identified data about performance, errors and usage to run and improve the Services. It does not identify you.
                </Clause>
              </div>

              {/* 4 */}
              <div className="legal-section" id="privacy-4">
                <h2>4. How We Use Personal Data and Our Legal Bases</h2>
                <p>
                  The table sets out why we process personal data, which data is involved, and our legal basis under the GDPR and UK GDPR. Where other laws apply, the basis is the closest equivalent. For users in India, we rely on your consent or on a legitimate use permitted by the DPDP Act, such as providing a service you asked for or complying with law.
                </p>
                <DataTable
                  head={['#', 'Purpose', 'Data involved', 'Legal basis']}
                  rows={PURPOSE_ROWS}
                  narrowFirst
                />
                <Clause label="a." title="Emails.">
                  We send service emails to everyone with an account. We send marketing emails only if you have agreed, and you can unsubscribe at any time from any marketing email or by writing to <Mail />.
                </Clause>
                <Clause label="b." title="What we do not do.">
                  We do not sell your personal data. We do not share it for cross-context behavioural advertising, and we do not run advertising pixels or retargeting on our websites. We promote our Services on social platforms from our own accounts, without using your personal data: no custom audiences, no uploading of email lists, no conversion tracking. Visl AI does not display third-party advertisements.
                </Clause>
                <Clause label="c." title="Automated systems.">
                  We use automated systems to check prompts and to enforce our age and location rules. A moderation block stops that request from going ahead. A person reviews a blocked request when you ask, or when someone reports content. You can ask for human review of a decision that affects you (<Sec n={9}>Section 9</Sec>).
                </Clause>
              </div>

              {/* 5 */}
              <div className="legal-section" id="privacy-5">
                <h2>5. How We Share Personal Data</h2>
                <p>
                  We do not sell or rent your personal data, and we do not share it for cross-context behavioural advertising. Your content is private: we do not make it public. We share personal data only as follows.
                </p>
                <Clause label="a." title="Service providers.">
                  We use providers who process personal data on our behalf, under contracts that limit what they can do with it. They provide hosting and storage, content delivery, system and AI monitoring, a database, email delivery, analytics (if you accept analytics cookies), and AI model processing.
                </Clause>
                <Clause label="b." title="AI providers.">
                  We send AI providers the Inputs needed to generate your Output, including face images and voice references where you use those features. See <Sec n={3}>Section 3(d)</Sec> for how we classify providers.
                </Clause>
                <Clause label="c." title="Payments.">
                  Payments are processed by Razorpay under its own terms and privacy policy. Razorpay may act as an independent controller of payment and fraud-prevention data.
                </Clause>
                <Clause label="d." title="Social platforms you connect.">
                  When you publish a video to YouTube, Instagram or TikTok, we send that Platform the video and the publishing information you choose, at your request. The Platform handles it under its own terms. We store the information described in <Sec n={2}>Section 2(b)</Sec> on <Term>Amazon Web Services</Term>, our hosting provider, which holds our database and file storage. To publish to Instagram, we store a temporary copy of the video and its cover image and give Instagram a private link to them that expires within <Key>7 days</Key>; we delete these copies when publishing has finished or failed. <Term>MongoDB Atlas</Term>, our database provider, stores for up to <Key>7 days</Key> copies of our responses to requests made in Visl AI, so that the same action (such as publishing a video) is not carried out twice. These copies can include a Connected Account&apos;s name, username and profile picture and publishing information, and are deleted automatically after <Key>7 days</Key>. We do not disclose information from your Connected Accounts to anyone else, except where required by law.
                </Clause>
                <Clause label="e." title="Professional advisers.">
                  Lawyers, accountants and auditors, where needed to give us professional services.
                </Clause>
                <Clause label="f." title="Legal, safety and child protection.">
                  Where we believe disclosure is required by law or legal process, or necessary to protect our users or the public, including reporting apparent child sexual abuse material to the National Center for Missing &amp; Exploited Children (NCMEC), the Special Juvenile Police Unit, local police or the National Cyber Crime Reporting Portal in India, or the competent authority (see our Child Safety Policy).
                </Clause>
                <Clause label="g." title="Business transfers.">
                  In connection with a merger, acquisition, financing, reorganisation or sale of assets, or in insolvency.
                </Clause>
                <Clause label="h." title="With your consent.">
                  Where you ask us to share your data or have agreed to it.
                </Clause>
              </div>

              {/* 6 */}
              <div className="legal-section" id="privacy-6">
                <h2>6. Cookies and Similar Technologies</h2>
                <p>We use two kinds of cookies and similar technologies.</p>
                <Clause label="a." title="Strictly necessary.">
                  These keep you signed in, protect the Services from attacks and misuse, control access to the private content you create, balance load across our servers, and complete your payments. We also use your browser&apos;s local storage and session storage to keep you signed in and to remember your choices, such as your display theme, layout and notification settings. Our payment provider Razorpay may also set its own cookies on the payment page, including for fraud prevention and one that remembers your details across sites. These do not need your consent, and blocking them may stop you from signing in, viewing your content or paying.
                </Clause>
                <Clause label="b." title="Analytics.">
                  To understand how users interact with the Services, including which features are used, how often and for how long, so that we can identify issues and improve the user experience.
                </Clause>
                <p className="legal-cont">
                  We do not use advertising cookies. Because we do not sell or share personal data for advertising, there is nothing to opt out of, and we treat Global Privacy Control signals as opt-out requests where the law requires. See our Cookie Policy for details.
                </p>
              </div>

              {/* 7 */}
              <div className="legal-section" id="privacy-7">
                <h2>7. International Data Transfers</h2>
                <p>
                  We are based in India and keep personal data on Amazon Web Services servers in Mumbai, India. Our service providers also process personal data in other countries including the United States and Japan, and in any other country where an AI model provider or its hosting partner operates, so your personal data may be transferred to, stored in and processed in countries whose data protection laws differ from those where you live.
                </p>
                <p>Where the law requires safeguards for these transfers, we use:</p>
                <ul className="legal-list legal-list-flush">
                  <li>adequacy decisions by the European Commission, the UK or another competent authority;</li>
                  <li>the EU-US Data Privacy Framework and its UK Extension, for providers certified under it;</li>
                  <li>Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914) and the UK International Data Transfer Addendum, in our contracts with providers; and</li>
                  <li>other mechanisms the law allows, such as your explicit consent where it applies.</li>
                </ul>
                <p>
                  If you are in India, we transfer your personal data outside India only as permitted by the DPDP Act and any restrictions the Government of India notifies. For the safeguard that applies to a particular transfer, write to <Mail />.
                </p>
              </div>

              {/* 8 */}
              <div className="legal-section" id="privacy-8">
                <h2>8. How Long We Keep Personal Data</h2>
                <p>
                  We keep personal data only as long as we need it for the purposes in this Privacy Policy, including to provide the Services, meet legal obligations and resolve disputes.
                </p>
                <p>
                  <Lead>Your account and content.</Lead> We keep your account data, prompts, uploads, projects, series, Outputs, supporting materials, characters (face images, voice references and data derived from them), connected-account tokens, connected-account details and publishing history until you delete them or close your account. We then erase them from our live systems within <Key>30 days</Key> and from our backups within a further <Key>30 days</Key>, so they are gone within <Key>60 days</Key>. Text we have added to our training sets is removed within <Key>30 days</Key> of you deleting it or opting out (but not from models already trained). If you do not sign in for <Key>12 months</Key>, we email you and then delete your characters. Deleted face and voice data cannot be recovered.
                </p>
                <p>
                  <Lead>Records we keep for a set time.</Lead>
                </p>
                <ul className="legal-list legal-list-flush">
                  <li>Payment and transaction records: <Key>8 years</Key>, as required by law.</li>
                  <li>Server and security logs: <Key>12 months</Key>.</li>
                  <li>Support emails and messages: <Key>36 months</Key> after the last contact.</li>
                  <li>Marketing consent records: while you are subscribed and for <Key>3 years</Key> afterwards. Marketing email data: until you unsubscribe and for <Key>30 days</Key> afterwards.</li>
                  <li>Biometric consent records: <Key>5 years</Key> after the related data is deleted or consent is withdrawn.</li>
                  <li>Material preserved for child safety, including records of prompts blocked for child-safety reasons: for as long as the law requires or an authority asks (see our Child Safety Policy).</li>
                </ul>
                <p>
                  <Lead>Short-lived data.</Lead> Analytics data (Google Analytics): up to <Key>14 months</Key>. AI monitoring traces: <Key>30 days</Key>. Cookie banner choices: <Key>12 months</Key>, then we ask again. Temporary copies used to publish to Instagram, and database copies of our responses to requests: up to <Key>7 days</Key>.
                </p>
                <p>
                  We may keep data longer where the law requires or to defend legal claims. Our service providers delete data under our contracts with them.
                </p>
              </div>

              {/* 9 */}
              <div className="legal-section" id="privacy-9">
                <h2>9. Your Rights and Choices</h2>
                <p>
                  Depending on where you live, you have some or all of the rights below. We apply them to everyone where we reasonably can.
                </p>
                <Clause label="a." title="Access:">
                  a copy of the personal data we hold about you, and information about how we use it.
                </Clause>
                <Clause label="b." title="Correction:">
                  correct inaccurate or incomplete data.
                </Clause>
                <Clause label="c." title="Deletion:">
                  have your data deleted, subject to legal exceptions (see <Sec n={8}>Section 8</Sec> and our Child Safety Policy, under which material reported as child sexual abuse is preserved).
                </Clause>
                <Clause label="d." title="Restriction:">
                  limit how we use your data in certain cases.
                </Clause>
                <Clause label="e." title="Portability:">
                  receive your data in a structured, machine-readable format.
                </Clause>
                <Clause label="f." title="Objection:">
                  object to processing based on our legitimate interests, including the use of your text for training outside the EEA, UK and Switzerland (<Sec n={3}>Section 3</Sec>).
                </Clause>
                <Clause label="g." title="Withdraw consent">
                  at any time:
                </Clause>
                <ul className="legal-list">
                  <li>face and voice features: in Settings. If you withdraw, we delete your characters and voice references within <Key>30 days</Key>, and they cannot be recovered;</li>
                  <li>training on your text (EEA, UK, India and Switzerland): in Settings;</li>
                  <li>marketing emails: use the unsubscribe link; and</li>
                  <li>analytics cookies: &quot;Cookie settings&quot; in the footer.</li>
                </ul>
                <p className="legal-cont">Withdrawal does not affect processing done before it.</p>
                <Clause label="h." title="Sale and sharing:">
                  we do not sell personal data or share it for cross-context behavioural advertising, so there is nothing to opt out of. We treat Global Privacy Control signals as opt-out requests where the law requires.
                </Clause>
                <Clause label="i." title="Sensitive information:">
                  we use face and voice data only to provide the features you ask for, so there is nothing further to limit. Withdraw your consent (g) to stop it.
                </Clause>
                <Clause label="j." title="Human review:">
                  of the automated decisions below.
                </Clause>
                <Clause label="k." title="Grievance (India):">
                  write to our Grievance Officer at <Mail /> with &quot;Grievance&quot; in the subject. We acknowledge within <Key>24 hours</Key> and aim to resolve within <Key>15 days</Key>.
                </Clause>
                <Clause label="l." title="Nomination (India):">
                  nominate someone to exercise your rights if you die or cannot act.
                </Clause>
                <Clause label="m." title="Non-discrimination:">
                  we do not treat you worse for using these rights.
                </Clause>
                <p>
                  <Lead>How to use your rights.</Lead> Use your account settings where available, or email <Mail /> with &quot;Privacy request&quot; in the subject. We verify your identity through your account email, and may ask for more if you have no account. An authorised agent can act for you with proof of authority. We respond within <Key>30 days</Key>. Where the law gives us longer (up to <Key>45 days</Key> for US requests, which can be extended), we tell you. We do not charge a fee unless a request is clearly unfounded or excessive.
                </p>
                <p>
                  <Lead>If we say no, and complaints.</Lead> We tell you why. You can appeal by replying to our decision, and we respond to appeals within <Key>45 days</Key>. If you are still unhappy, you can complain to your authority: your EU data protection authority (edpb.europa.eu), the UK ICO (ico.org.uk), the Swiss FDPIC (edoeb.admin.ch), your state attorney general (US), or, in India, the Data Protection Board once its complaint process starts (after you have used our grievance process).
                </p>
                <p>
                  <Lead>Automated decisions.</Lead> We use automated systems in these cases. You can ask a person to review any of them by emailing <Mail />.
                </p>
                <DataTable
                  head={['#', 'Automated decision', 'What it can do', 'Legal basis']}
                  rows={AUTOMATED_ROWS}
                  narrowFirst
                />
                <p>
                  We do not suspend or terminate accounts by automated decision alone. A moderation block never suspends an account by itself, and a person decides any action on an account.
                </p>
                <p>
                  AI providers&apos; own safety systems may also block a prompt, upload or Output. We do not control those decisions, but you can ask us to look into a blocked request.
                </p>
                <p>
                  <Lead>If you appear in someone else&apos;s content.</Lead> If your face, voice or personal data appears in content a user made without your permission, write to <Mail /> with details. We review it promptly and remove content that breaks our Acceptable Use Policy or the law. We acknowledge reports within <Key>24 hours</Key> and aim to remove intimate, sexual or impersonating content within <Key>48 hours</Key> of a valid complaint.
                </p>
              </div>

              {/* 10 */}
              <div className="legal-section" id="privacy-10">
                <h2>10. Security</h2>
                <p>
                  We use technical and organisational measures designed to protect personal data against accidental or unlawful loss, alteration, disclosure or access. These include encrypted connections (TLS) for data in transit; encryption at rest for our primary data stores; storing passwords in hashed form; limiting access to personal data to staff who need it for their work; and training our staff on data protection.
                </p>
                <p>
                  No system is completely secure, and we cannot guarantee the security of your data. If a personal data breach is likely to put your rights or interests at risk, we will notify you and the relevant authorities without undue delay, as the law requires. If you believe you have found a security vulnerability, please report it to <Mail />.
                </p>
              </div>

              {/* 11 */}
              <div className="legal-section" id="privacy-11">
                <h2>11. Children&apos;s Data</h2>
                <p>
                  The Services are for adults. You must be at least <Key>18</Key> years old to use them, and we do not knowingly collect personal data from anyone under 18. When you sign up, you confirm that you are 18 or older. Please do not upload photos, video or recordings of anyone under 18. Our Acceptable Use Policy and Child Safety Policy prohibit it.
                </p>
                <p>
                  If we learn that we have collected personal data from a person under 18, or have processed a child&apos;s image or voice, we will delete it promptly, except where we must preserve material under our Child Safety Policy. If you believe a child has used the Services or appears in content, contact <Mail />.
                </p>
              </div>

              {/* 12 */}
              <div className="legal-section" id="privacy-12">
                <h2>12. Third-Party Websites and Services</h2>
                <p>
                  The Services link to or connect with third-party services such as Instagram, TikTok, YouTube, Google and Razorpay. This Privacy Policy does not apply to them, and we are not responsible for their privacy practices. Please read their policies before giving them your personal data.
                </p>
              </div>

              {/* 13 */}
              <div className="legal-section" id="privacy-13">
                <h2>13. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time, for example when our services, tools or the law change, and we will update the &quot;Last updated&quot; date when we do. Minor changes (such as formatting or clarifications) take effect when we publish them. For material changes, including changes that reduce your rights or expand how we use your data, we give at least <Key>30 days</Key>&apos; notice by email and in the Services. Where the law requires your consent to a change (for example, using your face or voice data in a new way, or using your text for training if you are in the EEA, UK, India or Switzerland), we ask for it before the change applies to you.
                </p>
                <p>
                  <Lead>Effective date:</Lead> <Key>14th October 2026</Key>. <Lead>Last updated:</Lead> <Key>14th October 2026</Key>.
                </p>
              </div>

              {/* 14 */}
              <div className="legal-section" id="privacy-14">
                <h2>14. Contact</h2>
                <p>
                  For questions, requests or complaints about this Privacy Policy or our handling of your personal data, contact <Mail />.
                </p>
                <p>
                  Visl AI is a product of <strong className="legal-company">Big Bets Private Limited</strong>.
                </p>
                <ul className="legal-list legal-list-flush">
                  <li>Corporate Identity Number (CIN): <span className="legal-chip">U73100DL2022PTC394224</span></li>
                  <li>GSTIN: <span className="legal-chip">07AAKCB5465D1ZO</span></li>
                  <li>Registered office: <span className="legal-address">3/28, Top Floor, Shanti Niketan, South Moti Bagh, New Delhi – 110021, India</span></li>
                  <li>Email: <Mail /></li>
                  <li>Phone: <a className="legal-link" href="tel:+918979712281">+91 89797 12281</a></li>
                  <li>Website: <Ext href="https://visl.ai/" /></li>
                </ul>
                <div className="legal-callout">
                  <p>
                    <Lead>Grievance Officer (India):</Lead> <Mail />, with &quot;Grievance&quot; in the subject line.
                  </p>
                </div>
              </div>

              {/* 15 */}
              <div className="legal-section" id="privacy-15">
                <h2>15. Regional Information</h2>
                <p>
                  These sections add to the rest of this Privacy Policy. Where a regional section covers the same topic as the main body, the regional section applies to residents of that region.
                </p>

                <Clause label="a." title="European Economic Area, United Kingdom and Switzerland" />
                <div className="legal-sub">
                  <Clause label="i." title="Controller.">
                    The controller of your personal data is Big Bets Private Limited, based in India (see <Sec n={1}>Section 1</Sec>).
                  </Clause>
                  <Clause label="ii." title="Legal bases.">
                    <Sec n={4}>Section 4</Sec> sets out our legal bases. We process face and voice data only with your explicit consent, and we use your text for training only if you agree (<Sec n={3}>Section 3</Sec>).
                  </Clause>
                  <Clause label="iii." title="Providing data.">
                    You do not have to give us personal data, but we need your email address and billing details to provide an account, and without face or voice data we cannot offer character and voice features.
                  </Clause>
                  <Clause label="iv." title="Your rights.">
                    You have the rights in <Sec n={9}>Section 9</Sec>, including the right to withdraw consent at any time.
                  </Clause>
                  <Clause label="v." title="Complaints.">
                    You can complain to your data protection authority: your national authority in the EEA (list at edpb.europa.eu), the UK Information Commissioner (ico.org.uk), or the Swiss FDPIC (edoeb.admin.ch).
                  </Clause>
                  <Clause label="vi." title="Transfers.">
                    See <Sec n={7}>Section 7</Sec>.
                  </Clause>
                </div>

                <Clause label="b." title="United States" />
                <div className="legal-sub">
                  <Clause label="i." title="What we collect.">
                    The table shows the categories of personal information we collected in the past <Key>12 months</Key>, where they come from, and who receives them for business purposes. <Sec n={8}>Section 8</Sec> sets out how long we keep each.
                  </Clause>
                  <DataTable
                    head={['Category', 'Examples', 'Source', 'Disclosed to']}
                    rows={US_ROWS}
                  />
                  <Clause label="ii." title="No sale or sharing.">
                    We do not sell personal information and do not share it for cross-context behavioural advertising. We use sensitive personal information only to provide the features you request, and not to infer characteristics about you, so there is no right to limit it beyond withdrawing your consent.
                  </Clause>
                  <Clause label="iii." title="Your rights">
                    (California and other states with privacy laws, such as Colorado, Connecticut, Texas and Virginia). You can ask to know or access your personal information, delete it, correct it, and receive a portable copy. We do not discriminate against you for using these rights. To make a request, follow the steps in <Sec n={9}>Section 9</Sec>. We respond within <Key>45 days</Key>, extendable by <Key>45 more days</Key>, and you can appeal a refusal by replying to our decision. If you are still unhappy, you can contact your state attorney general.
                  </Clause>
                  <Clause label="iv." title="Biometric information laws.">
                    Face and voice data may be covered by biometric privacy laws such as the Illinois Biometric Information Privacy Act, the Texas Capture or Use of Biometric Identifier Act and Washington&apos;s biometric law. We ask for your written consent (electronic, in the product) before we first process it, explaining the purpose. We do not sell, lease or trade it, and we keep it until you delete it or close your account. We delete it if you do not sign in for <Key>12 months</Key>, and always within <Key>3 years</Key> of your last interaction with us. <Sec n={2}>Section 2(d)</Sec> and <Sec n={8}>Section 8</Sec> are our written retention and destruction policy.
                  </Clause>
                  <Clause label="v." title="Signals and marketing.">
                    We do not respond to &quot;Do Not Track&quot; signals, but we treat Global Privacy Control as an opt-out signal as described in <Sec n={6}>Section 6</Sec>. We do not disclose personal information to third parties for their own direct marketing (California Civil Code §1798.83).
                  </Clause>
                </div>

                <Clause label="c." title="India" />
                <div className="legal-sub">
                  <Clause label="i." title="Data fiduciary.">
                    Big Bets Private Limited (CIN <span className="legal-chip">U73100DL2022PTC394224</span>), <span className="legal-address">3/28, Top Floor, Shanti Niketan, South Moti Bagh, New Delhi – 110021</span>, is the data fiduciary under the Digital Personal Data Protection Act 2023.
                  </Clause>
                  <Clause label="ii." title="Consent.">
                    We ask for your consent separately for training on your text and for face and voice data (Sections <Sec n={2}>2(d)</Sec> and <Sec n={3}>3(b)</Sec>). You can ask for this notice in English or in any language listed in the Eighth Schedule to the Constitution of India. You can withdraw consent at any time (<Sec n={9}>Section 9</Sec>). Face and voice data is handled as sensitive personal data, with your electronic written consent under the Information Technology Act and its rules.
                  </Clause>
                  <Clause label="iii." title="Grievances.">
                    Write to our Grievance Officer at <Mail /> with &quot;Grievance&quot; in the subject. If you are not satisfied, you may approach the Data Protection Board of India once its complaint process is available.
                  </Clause>
                  <Clause label="iv." title="Age.">
                    Our Services are for people aged <Key>18</Key> and over (<Sec n={11}>Section 11</Sec>).
                  </Clause>
                </div>

                <Clause label="d." title="Other countries" />
                <p className="legal-cont">
                  If you live elsewhere, such as Canada, Brazil, Australia, Japan, South Korea, Singapore or Thailand, you may have rights under your local law, including to access, correct and delete your data. We apply the rights in <Sec n={9}>Section 9</Sec> to you where we reasonably can, and you can contact us at <Mail />. You may also complain to your local data protection authority.
                </p>
              </div>

              {/* Annex A */}
              <div className="legal-section" id="privacy-annex-a">
                <h2>Annex A. Our Service Providers</h2>
                <p>
                  This list shows the providers that process personal data for us at launch. We update it when it changes. The list of service providers is available on request. Please write to us at <Mail />.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageNavigation>
  );
}