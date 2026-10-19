import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AccordionItem } from '../components/common/AccordionItem';
import { PageNavigation } from '../components/common/PageNavigation';
import { ROUTES } from '../lib/routes';

type FAQEntry = {
  question: string;
  answer: ReactNode;
};

type FAQGroup = {
  category: string;
  items: FAQEntry[];
};

const faqGroups: FAQGroup[] = [
  {
    category: 'General',
    items: [
      {
        question: 'What is Visl?',
        answer:
          'Visl is an AI video generator built for long-form storytelling. Give it a prompt, your own script, or reference images, and Visl builds the script, characters, locations, voices and video clips, then compiles everything into a finished video. You stay in control at every step.',
      },
      {
        question: 'How is Visl different from other AI video tools?',
        answer:
          'Most AI video tools are built for short clips. Visl is built for complete stories, with no fixed length limit. Your characters keep the same look and voice from the first scene to the last, and you can edit anything, from a single line of dialogue to a whole scene, just by describing the change.',
      },
      {
        question: 'Do I need any creative or technical experience?',
        answer:
          'No. If you can describe a story, Visl can start building it. No screenwriting, animation or editing skills needed, and if you do have them, you will have plenty of room to use them.',
      },
    ],
  },
  {
    category: 'How It Works',
    items: [
      {
        question: 'How does Visl turn an idea into a video?',
        answer:
          'There are four steps. First, you give Visl a prompt, a script, images, or any mix of these. Second, Visl writes the script, which you can edit line by line or replace with your own. Third, it generates your assets: characters, locations and voices. Fourth, it creates the video clips and compiles them into your finished video.',
      },
      {
        question: 'What can I start with?',
        answer:
          'A text prompt, your own script, uploaded images, or any combination of the three. For example, you can upload a character photo and add a prompt describing the story around it.',
      },
      {
        question: 'Can I use my own script?',
        answer:
          'Yes. Paste in your script and Visl builds the assets and clips around it. You can also let Visl write a script from your prompt and then change as much of it as you like.',
      },
      {
        question: 'Can I review things before the video is made?',
        answer:
          'Yes, at every stage. Review and edit everything, from the script line by line to the characters, locations and voices at the asset stage, and the clips after that. Click Continue when you are happy to move on to the next stage. Nothing is locked in.',
      },
    ],
  },
  {
    category: 'Editing & Control',
    items: [
      {
        question: 'What is Vibe Edit?',
        answer:
          'Vibe Edit lets you edit your video by simply describing the change. Type "this dialogue is too short, make it longer", "make her wear a red shirt", or "this clip feels crowded, make it sparser", and Visl makes the change. It works at every stage, whether you are editing the script, the assets or the finished clips.',
      },
      {
        question: 'Will Vibe Edit change things without asking me?',
        answer:
          'No. If your edit affects clips that are already generated, Visl tells you how many clips are affected and asks whether you want to regenerate them or apply the change only to the script or asset. You decide.',
      },
      {
        question: 'Can I change one clip without redoing the whole video?',
        answer:
          'Yes. You can regenerate a single clip with Vibe Edit, and only the parts connected to your change are affected. If you edit a character, for instance, only the clips featuring that character are updated, and you can choose to update the character without touching any clips.',
      },
      {
        question: 'What does "Redo in a new branch" do?',
        answer:
          'It lets you try a different version of any stage without losing the one you already have. It is available at every stage, so you can experiment freely and keep your original safe.',
      },
      {
        question: 'How long do edits take?',
        answer:
          'It depends on what you are changing. A small tweak is quicker than regenerating several clips.',
      },
    ],
  },
  {
    category: 'Characters & Consistency',
    items: [
      {
        question: 'Do characters stay consistent between scenes?',
        answer:
          'Yes, and this is what Visl is built around. At the asset stage, Visl creates a reference for every character, location and voice, then uses that same reference in every clip. Your characters look and sound the same from scene to scene.',
      },
      {
        question: 'How many characters can my story have?',
        answer:
          'As many as your story needs. There is no limit on the number of characters.',
      },
      {
        question: "Can I use a real person's face or voice?",
        answer:
          "Only if it is your own or you have that person's permission. You are responsible for making sure you have the right to use anything you upload.",
      },
    ],
  },
  {
    category: 'Languages & Output',
    items: [
      {
        question: 'Can I make videos in Hindi?',
        answer:
          'Yes. Visl supports both Hindi and English. Write your story in either language and get narration, dialogue and subtitles in that language.',
      },
      {
        question: 'How long can my video be?',
        answer:
          'There is no fixed length limit. Visl is made for stories with a proper beginning, middle and end.',
      },
      {
        question: 'What formats and resolutions can I export?',
        answer:
          'Export in 16:9 (landscape), 9:16 (vertical) or 1:1 (square), at 720p or 1080p.',
      },
      {
        question: 'Can I publish directly to YouTube, Instagram or TikTok?',
        answer:
          'Yes. You can publish straight to YouTube, Instagram and TikTok from Visl, or download your video as an MP4 and upload it anywhere.',
      },
    ],
  },
  {
    category: 'Rights & Ownership',
    items: [
      {
        question: 'Who owns the videos I create?',
        answer:
          'You do. You can use your videos commercially, however you like, including for client work. Just make sure you have the rights to anything you upload, such as scripts, images, voices and music.',
      },
    ],
  },
  {
    category: 'Credits & Billing',
    items: [
      {
        question: 'How do credits work?',
        answer:
          'Generating and editing both use credits, depending on how much is created or regenerated. Every account starts with starter credits so you can start exploring Visl. See the pricing page for plan details.',
      },
      {
        question: 'Can I cancel anytime?',
        answer:
          'Yes. Cancel any time from your account settings and keep access until the end of the period you have paid for.',
      },
    ],
  },
  {
    category: 'Privacy',
    items: [
      {
        question: 'Does Visl train its AI models on my content?',
        answer: (
          <>
            No. Visl does not train its models on the images, voices, audio or
            videos you upload or create. For the full details on how your data is
            handled, see our{' '}
            <Link
              to={ROUTES.PRIVACY}
              style={{ color: 'var(--accent)' }}
            >
              privacy policy
            </Link>
            .
          </>
        ),
      },
    ],
  },
];

export function FAQPage() {
  const [openByGroup, setOpenByGroup] = useState<
    Record<string, string | null>
  >({});

  return (
    <PageNavigation>
      <div id="page-faq" className="page">
        <div className="faq-layout">
          <div className="section-overline">FAQ</div>

          <h1
            style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(38px, 5vw, 56px)',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: 8,
              lineHeight: 1.1,
            }}
          >
            Questions, answered.
          </h1>

          {/* <p
            style={{
              fontSize: 16,
              color: 'var(--muted)',
              marginBottom: 40,
            }}
          >
            Can&apos;t find what you need?{' '}
            <Link
              to={ROUTES.CONTACT}
              style={{ color: 'var(--accent)' }}
            >
              Reach out →
            </Link>
          </p> */}

          {faqGroups.map((group) => (
            <div className="faq-category-group" key={group.category}>
              <div className="faq-category-label">{group.category}</div>

              {group.items.map((item) => (
                <AccordionItem
                  key={item.question}
                  question={item.question}
                  isOpen={openByGroup[group.category] === item.question}
                  onToggle={() =>
                    setOpenByGroup((current) => ({
                      ...current,
                      [group.category]:
                        current[group.category] === item.question
                          ? null
                          : item.question,
                    }))
                  }
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PageNavigation>
  );
}