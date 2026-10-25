import { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { ROUTES } from '../../lib/routes';
import { GOOGLE_FORM_URL } from "../../constants";
import { trackCtaClick } from "../../lib/analytics";

const DEMO_PROMPTS = [
  {
    label: 'Microdrama',
    text: 'A woman gets into an auto rickshaw at night after her phone dies. The driver takes a wrong turn. Then another.',
  },
  {
    label: 'History',
    text: 'August 1925. A group of revolutionaries plan to rob a British treasury train near Kakori.',
  },
  {
    label: 'Kids story',
    text: 'A boy discovers a dinosaur egg buried in his backyard and secretly tries to keep it warm.',
  },
  {
    label: 'Animation',
    text: 'A 60-year-old dabbawallah makes his final delivery through Mumbai before retiring.',
  },
];

export function HeroPrompt() {
  // const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const typingRef = useRef(true);

  useEffect(() => {
    if (isFocused) return;

    const prompt = DEMO_PROMPTS[promptIndex].text;
    let cancelled = false;

    let timeout: ReturnType<typeof setTimeout>;

    const type = async () => {
      typingRef.current = true;

      // Type
      for (let i = 0; i <= prompt.length; i++) {
        if (cancelled) return;

        setValue(prompt.slice(0, i));

        await new Promise<void>((resolve) => {
          timeout = setTimeout(resolve, 32);
        });
      }

      // Pause after completing the sentence
      await new Promise<void>((resolve) => {
        timeout = setTimeout(resolve, 1800);
      });

      // Delete
      for (let i = prompt.length; i >= 0; i--) {
        if (cancelled) return;

        setValue(prompt.slice(0, i));

        await new Promise<void>((resolve) => {
          timeout = setTimeout(resolve, 16);
        });
      }

      await new Promise<void>((resolve) => {
        timeout = setTimeout(resolve, 500);
      });

      if (!cancelled) {
        setPromptIndex(
          (current) => (current + 1) % DEMO_PROMPTS.length
        );
      }
    };

    type();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [promptIndex, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  const handleStart = () => {
    trackCtaClick({
      cta_name: 'start_creating',
      destination: 'google_form',
      location: 'hero_prompt',
      button_text: 'Start creating',
    });
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="vivi-prompt-wrapper">
      <div className="vivi-prompt-box">
        <div className="vivi-prompt-label">
          What should we create?
        </div>

        <textarea
          className="vivi-prompt-input"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={() => {
            if (!value.trim()) {
              setIsFocused(false);
            }
          }}
          placeholder="Describe the story you want to create..."
          rows={4}
          aria-label="Describe the story you want Visl to create"
        />

        <div className="vivi-prompt-footer">
          <span className="vivi-prompt-hint">
            Starts from the written prompt only
          </span>

          <button
            className="vivi-prompt-button"
            onClick={handleStart}
          >
            <span>Start creating</span>

            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1.5 7.5H13.5M8.5 2.5L13.5 7.5L8.5 12.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}