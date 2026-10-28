import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WorkflowShowcase.css";

// import idea from "../../../public/assets/idea.png";
import location from "../../../public/assets/location.png";
import characterPhil from "../../../public/assets/character-phil.png";
import characterTolman from "../../../public/assets/character-mr-tolman.png";
import setupImage from "../../../public/assets/setup.png";
import vibeEditOne from "../../../public/assets/vibe_edit_1.png";
import vibeEditTwo from "../../../public/assets/vibe_edit_2.png";

gsap.registerPlugin(ScrollTrigger);

/**
 * TURNAROUND FRAMES
 * Drop your rendered turnaround frames in:
 *   public/assets/turnaround/phil/      (phil-00.png, phil-01.png, ... in order)
 *   public/assets/turnaround/tolman/
 * Frame 00 must be the FRONT view; frames then continue around the body
 * (front → side → back → other side) at equal angle steps (e.g. 24 frames = 15° each).
 * If a folder is empty / missing, the character falls back to the single image
 * with a faux-3D tilt, so nothing breaks while you generate the frames.
 * (On Vite < 5 replace `query: "?url", import: "default"` with `as: "url"`.)
 */
const philGlob = import.meta.glob("../../../public/assets/turnaround/phil/*.{png,webp,jpg}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const tolmanGlob = import.meta.glob("../../../public/assets/turnaround/tolman/*.{png,webp,jpg}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

const toFrames = (glob: Record<string, string>, fallback: string): string[] => {
  const urls = Object.keys(glob)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((key) => glob[key]);
  return urls.length ? urls : [fallback];
};
const philFrames = toFrames(philGlob, characterPhil);
const tolmanFrames = toFrames(tolmanGlob, characterTolman);

type Stage = {
  number: string;
  name: string;
  kicker: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  description: string;
};

const stages: Stage[] = [
  {
    number: "01", name: "IDEA", kicker: "EVERYTHING STARTS SOMEWHERE",
    titleBefore: "Start With an", titleHighlight: "Idea", titleAfter: "",
    description: "Share a link or brief story concept—Visl takes your prompt and handles the rest.",
  },
  {
    number: "02", name: "SETUP", kicker: "GIVE IT A WORLD",
    titleBefore: "", titleHighlight: "Setup", titleAfter: "Your Direction",
    description: "Set your format, language, duration, pacing, and visual style to build your blueprint.",
  },
  {
    number: "03", name: "SCRIPT", kicker: "LET THE STORY TALK",
    titleBefore: "Visl Writes Your", titleHighlight: "Script", titleAfter: "",
    description: "Visl automatically writes your screenplay—review and tweak scenes only if you want to.",
  },
  {
    number: "04", name: "ASSETS", kicker: "MAKE IT REAL",
    titleBefore: "Visl Generates", titleHighlight: "Assets", titleAfter: "",
    description: "Visl automatically creates characters, locations, props, and unique voiceovers.",
  },
  {
    number: "05", name: "VIBE EDIT", kicker: "THE FEELING IS EVERYTHING",
    titleBefore: "", titleHighlight: "Vibe-Edit", titleAfter: "Anything",
    description: "Describe any adjustment in plain words to easily edit clips by chatting.",
  },
  {
    number: "06", name: "PUBLISH", kicker: "AND THEN, THE WORLD",
    titleBefore: "Visl Prepares", titleHighlight: "Your Release", titleAfter: "",
    description: "Visl renders your complete masterpiece, ready for you to review and publish to the world.",
  },
];

const ideaExamples = [
  "Create a video of a girl who finds her late dad's old mixtape and follows the songs like a treasure map across the city",
  "Create a coming-of-age story about two besties on one last road trip to catch a sunset before college splits them up",
  "Create a cozy fantasy where a sleepy cat runs the night shift at a 24/7 ramen shop for ghosts with unfinished business",
  "Create a mockumentary about the office printer's villain era, and the intern who gives it a redemption arc.",
];

function TypewriterPrompt() {
  const [typed, setTyped] = useState("");
  const [mode, setMode] = useState<"prompt" | "script">("prompt");
  const [used, setUsed] = useState(false);
  const [activePrompt, setActivePrompt] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (mode !== "prompt" || paused) return;
    let index = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const current = ideaExamples[activePrompt];
      if (!deleting) {
        index += 1;
        setTyped(current.slice(0, index));
        if (index >= current.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
        } else timer = setTimeout(tick, 23);
      } else {
        index -= 1;
        setTyped(current.slice(0, Math.max(0, index)));
        if (index <= 0) {
          setActivePrompt((value) => (value + 1) % ideaExamples.length);
        } else timer = setTimeout(tick, 8);
      }
    };
    setTyped("");
    timer = setTimeout(tick, 450);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [activePrompt, mode, paused]);

  return (
    <div className="wf-chat-card" aria-label="Interactive example prompt">
      <div className="wf-chat-tabs" role="tablist" aria-label="Input type">
        <button type="button" role="tab" aria-selected={mode === "prompt"} className={`wf-chat-tab ${mode === "prompt" ? "wf-chat-tab-active" : ""}`} onClick={() => { setMode("prompt"); setPaused(false); setUsed(false); }}>✧ Describe your video</button>
        <button type="button" role="tab" aria-selected={mode === "script"} className={`wf-chat-tab ${mode === "script" ? "wf-chat-tab-active" : ""}`} onClick={() => { setMode("script"); setPaused(true); setUsed(false); setTyped(""); }}>▤ Use my own script</button>
      </div>
      <div className="wf-chat-prompt">
        {mode === "prompt" ? <span>{typed}</span> : <textarea className="wf-chat-script-input" aria-label="Your script" placeholder="Paste your script here and let Visl bring it to life." />}
        {mode === "prompt" && <i className="wf-chat-cursor" aria-hidden="true" />}
      </div>
      <div className="wf-chat-bottom">
        <span className="wf-chat-hint">{used ? "Your starting point is ready" : "Starts from the written prompt only"}</span>
        <button type="button" className="wf-chat-start" onClick={() => { setUsed(true); setPaused(true); }}>{used ? "✓ Idea selected" : "➜  Start creating"}</button>
      </div>
    </div>
  );
}

const setupOptions = {
  Duration: ["3 min", "5 min", "10 min"],
  Resolution: ["720p", "1080p", "4K"],
  Genre: ["Microdrama", "Kids", "History", "Mythology"],
  Pacing: ["Slow", "Balanced", "Fast"],
} as const;

function SetupControls() {
  const [values, setValues] = useState<Record<keyof typeof setupOptions, number>>({
    Duration: 0, Resolution: 1, Genre: 0, Pacing: 1,
  });
  const cards = [
    { key: "Duration" as const, icon: "◷", className: "wf-setting-duration" },
    { key: "Genre" as const, icon: "✳", className: "wf-setting-genre" },
    { key: "Pacing" as const, icon: "⌁", className: "wf-setting-pacing" },
    { key: "Resolution" as const, icon: "▣", className: "wf-setting-resolution" },
  ];
  return (
    <div className="wf-setup-controls" aria-label="Interactive video settings">
      <div className="wf-setup-falling-icons" aria-hidden="true">
        <span>✦</span><span>◈</span><span>✳</span><span>＋</span><span>✧</span><span>◌</span><span>✦</span>
      </div>
      {cards.map((card) => (
        <button
          type="button"
          key={card.key}
          className={`wf-setting-card ${card.className}`}
          onClick={() => setValues((current) => ({ ...current, [card.key]: (current[card.key] + 1) % setupOptions[card.key].length }))}
          aria-label={`${card.key}: ${setupOptions[card.key][values[card.key]]}. Click to change.`}
        >
          <span className="wf-setting-icon" aria-hidden="true">{card.icon}</span>
          <span className="wf-setting-copy"><small>{card.key}</small><strong>{setupOptions[card.key][values[card.key]]}</strong><em>CLICK TO CHANGE ↗</em></span>
          <span className="wf-setting-check" aria-hidden="true">↻</span>
        </button>
      ))}
      <div className="wf-setup-style" aria-label="Visual style picker: Disney Renaissance 2D selected">
        <div className="wf-setup-style-label">
          <span className="wf-setup-style-label-icon" aria-hidden="true">◐</span>
          <span className="wf-setup-style-label-copy">
            <small>VISUAL STYLE</small>
            <strong>Choose how your video looks</strong>
          </span>
        </div>
        <div className="wf-setup-style-deck">
          {/* Blank card backs fan out behind the image to hint at a library of styles. */}
          <span className="wf-setup-style-ghost wf-setup-style-ghost-one" aria-hidden="true"><i>3D CARTOON</i></span>
          <span className="wf-setup-style-ghost wf-setup-style-ghost-two" aria-hidden="true"><i>CLAYMATION</i></span>
          <div className="wf-setup-style-card">
            <img className="wf-setup-image" src={setupImage} alt="Recommended Disney Renaissance 2D visual style for fairy tales and musical numbers" />
            <span className="wf-setup-style-ring" aria-hidden="true" />
            <span className="wf-setup-style-check" aria-hidden="true">✓</span>
          </div>
          <svg className="wf-setup-style-cursor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3l14 7.2-6.1 1.6L10 18z" />
          </svg>
          <span className="wf-setup-style-toast" aria-hidden="true"><b>✓</b> Style applied to every scene</span>
        </div>
      </div>
    </div>
  );
}

function ScriptEditorDemo() {
  const [scene, setScene] = useState(1);
  const [editPhase, setEditPhase] = useState(0);

  // A looping, staged edit: draft → edit → revised → save click → saved.
  useEffect(() => {
    const phases = [0, 1, 2, 3, 4];
    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % phases.length;
      setEditPhase(phases[index]);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const isEditing = editPhase === 1;
  const isUpdated = editPhase >= 2;
  const isSaving = editPhase === 3;
  const isSaved = editPhase === 4;

  const saveChanges = () => {
    setEditPhase(3);
    window.setTimeout(() => setEditPhase(4), 650);
  };

  return (
    <>
      <div className={`wf-script-ui ${isEditing ? "is-editing" : ""} ${isUpdated ? "has-script-edit" : ""} ${isSaving ? "is-saving" : ""} ${isSaved ? "is-saved" : ""}`} aria-label="Animated screenplay editor demo">
        <div className="wf-script-ui-top">
          <span className="wf-window-dots"><i /><i /><i /></span>
          <b>Visl / SCRIPT EDITOR</b>
          <span className={`wf-script-status ${isSaved ? "is-saved" : isSaving ? "is-saving-status" : isEditing ? "is-editing-status" : ""}`}>
            <i /> {isSaved ? "SAVED" : isSaving ? "SAVING" : isEditing ? "EDITING" : "DRAFT"}
          </span>
        </div>
        <div className="wf-script-ui-toolbar">
          <span>☷ Scenes</span>
          <div className="wf-script-toolbar-actions">
            <button type="button" onClick={() => { setScene((current) => current === 1 ? 2 : 1); setEditPhase(0); }}>
              Scene {String(scene).padStart(2, "0")} ↗
            </button>
            <button type="button" className={`wf-script-save-button ${isSaving ? "is-clicked" : ""} ${isSaved ? "is-complete" : ""}`} onClick={saveChanges}>
              {isSaved ? "✓ Saved" : isSaving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
        <div className="wf-script-ui-body">
          <span className="wf-script-scene-label">EXT. {scene === 1 ? "OLD ROAD — SUNSET" : "LOOKOUT POINT — DUSK"}</span>
          <p className="wf-script-action">
            {scene === 1 ? (
              <>
                The last light spills across the empty road. Two best friends{" "}
                {isUpdated ? <span className="wf-script-replacement">chase the last streak of daylight.</span> :
                  isEditing ? <span className="wf-script-selection">race the setting sun<span className="wf-script-edit-caret" /></span> :
                  "race the setting sun."}
              </>
            ) : (
              <>
                They reach the lookout just as the sky turns violet.{" "}
                {isUpdated ? <span className="wf-script-replacement">Neither wants this moment to end.</span> :
                  isEditing ? <span className="wf-script-selection">For once, neither of them has anything to say<span className="wf-script-edit-caret" /></span> :
                  "For once, neither of them has anything to say."}
              </>
            )}
          </p>
          <span className="wf-script-character">PHIL</span>
          <p className="wf-script-dialogue">
            {scene === 1 ? "You said we'd make it before dark." : "Promise me we won't become strangers."}
            <i className="wf-script-blink" />
          </p>
          <span className="wf-script-character">TOLMAN</span>
          <p className="wf-script-dialogue">{scene === 1 ? "We still have the sunset." : "Not a chance. You're stuck with me."}</p>
          <div className={`wf-script-added-line ${isUpdated ? "is-visible" : ""}`}>
            <span className="wf-script-character">NARRATION <em>NEW LINE</em></span>
            <p className="wf-script-narration">{scene === 1 ? "And for one more moment, neither of them hurried." : "The silence said everything they couldn't."}</p>
            <span className="wf-script-added-caret" />
          </div>
          <div className={`wf-script-edit-toast ${isEditing ? "is-visible" : ""}`}>✎ Editing scene text</div>
        </div>
        {isSaving && <span className="wf-script-click-ripple" aria-hidden="true" />}
        <span className={`wf-script-cursor-pointer ${isSaving ? "is-clicking" : ""}`} aria-hidden="true">↖</span>
        <div className="wf-script-ui-bottom">
          <span>SCENE {scene} / 06</span>
          <span className="wf-script-runtime"><i className={isUpdated ? "is-updated" : ""} /></span>
          <span>{isUpdated ? "00:31" : scene === 1 ? "00:27" : "00:54"} / 03:00</span>
        </div>
      </div>

      <aside className={`wf-script-save-card ${isSaving || isSaved ? "is-confirmed" : ""}`} aria-live="polite">
        <div className="wf-script-save-card-orbit" aria-hidden="true">✦</div>
        <div className="wf-script-save-card-head">
          <span className="wf-script-save-icon">{isSaved ? "✓" : isSaving ? "↻" : "✎"}</span>
          <span className="wf-script-save-eyebrow">{isSaved ? "CHANGES SAVED" : isSaving ? "SAVING YOUR EDIT" : "READY TO SAVE"}</span>
        </div>
        <strong>{isSaved ? "Scene updated!" : isSaving ? "One moment…" : "A better version, already."}</strong>
        <p>{isSaved ? "Your revised action and new narration are now part of the script." : "Tightened the scene description and added a narration beat."}</p>
        <div className="wf-script-change-row">
          <span className="wf-script-change-check">{isSaved ? "✓" : "＋"}</span>
          <span><b>Scene {String(scene).padStart(2, "0")}</b><small>Action text revised</small></span>
          <span className="wf-script-change-status">{isSaved ? "SAVED" : "EDITED"}</span>
        </div>
        <div className="wf-script-change-row">
          <span className="wf-script-change-check">{isSaved ? "✓" : "＋"}</span>
          <span><b>Narration added</b><small>1 new story beat</small></span>
          <span className="wf-script-change-status">{isSaved ? "SAVED" : "NEW"}</span>
        </div>
        <div className="wf-script-save-progress"><i className={isSaved ? "is-complete" : isSaving ? "is-saving" : ""} /></div>
        <div className="wf-script-save-footer"><span><i /> {isSaved ? "All changes are up to date" : isSaving ? "Writing changes to script…" : "2 changes waiting"}</span><span>{isSaved ? "100%" : isSaving ? "78%" : "READY"}</span></div>
      </aside>

      <div className={`wf-script-floating-note wf-script-note-one ${isUpdated ? "is-dimmed" : ""}`}><span>✧</span> Better pacing</div>
      <div className={`wf-script-floating-note wf-script-note-two ${isUpdated ? "is-dimmed" : ""}`}><span>＋</span> Add narration</div>
    </>
  );
}

const vibeConversation = [
  { user: "Make this scene feel more cinematic.", bot: "Done — deeper contrast and a wider, filmic grade.", changes: ["Colour grade", "Letterbox"] },
  { user: "Warm up the lighting and slow the pacing.", bot: "Warmer tones added and the cut eased by 1.2s.", changes: ["Lighting", "Pacing"] },
  { user: "Add a soft piano under the narrator.", bot: "Layered a gentle piano bed, ducked under the voice.", changes: ["Music", "Audio mix"] },
];

// Each exchange plays in three beats: user message → Visl thinking → Visl reply.
const VIBE_BEATS_PER_EXCHANGE = 3;
const VIBE_TOTAL_STEPS = vibeConversation.length * VIBE_BEATS_PER_EXCHANGE + 2; // +2 = hold on the full thread

function VibeEditDemo() {
  const [applied, setApplied] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(VIBE_TOTAL_STEPS - 1);
      return;
    }
    const timer = window.setInterval(() => setStep((value) => (value + 1) % VIBE_TOTAL_STEPS), 1500);
    return () => window.clearInterval(timer);
  }, []);

  const visibleExchanges = vibeConversation
    .map((exchange, index) => ({ ...exchange, index, beat: step - index * VIBE_BEATS_PER_EXCHANGE }))
    .filter((exchange) => exchange.beat >= 0);
  const activeClip = Math.min(vibeConversation.length - 1, Math.floor(step / VIBE_BEATS_PER_EXCHANGE));

  return (
    <div className={`wf-vibe-composition ${applied ? "is-applied" : ""}`} aria-label="Vibe editing examples">
      <figure className="wf-vibe-art wf-vibe-art-reel">
        <img src={vibeEditTwo} alt="Visual clip and editing timeline for a generated video" />
        <figcaption><span className="wf-vibe-live-dot" /> YOUR FILM, FRAME BY FRAME</figcaption>
      </figure>

      <figure className="wf-vibe-art wf-vibe-art-options">
        <img src={vibeEditOne} alt="Vibe editing controls for selecting clips, keyframes, audio and music" />
        <figcaption>EDIT WITH WORDS, NOT MENUS</figcaption>
      </figure>

      <div className="wf-vibe-chat" aria-label="Animated conversation with the Visl editor">
        <span className="wf-vibe-chat-sticker" aria-hidden="true">CUT. COLOUR. SOUND.</span>
        <div className="wf-vibe-chat-head">
          <span className="wf-vibe-chat-mark">✦</span>
          <span><b>Visl Editor</b><small>Ready for your review</small></span>
          <i aria-hidden="true" />
        </div>
        <div className="wf-vibe-chat-context" aria-hidden="true">
          <span className="wf-vibe-chat-context-label">EDITING</span>
          {["Clip 1", "Clip 2", "Clip 4"].map((clip, index) => (
            <span key={clip} className={`wf-vibe-chat-clip ${index === activeClip ? "is-active" : ""}`}>@ {clip}</span>
          ))}
        </div>
        <div className="wf-vibe-chat-body" aria-live="polite">
          <div className="wf-vibe-chat-thread">
            {visibleExchanges.map((exchange) => (
              <div className="wf-vibe-exchange" key={exchange.index}>
                <div className="wf-vibe-user-message">
                  <small>YOU</small>
                  <span>{exchange.user}</span>
                </div>
                {exchange.beat >= 1 && (
                  <div className={`wf-vibe-bot-message ${exchange.beat === 1 ? "is-thinking" : "is-responding"}`}>
                    <small>Visl</small>
                    {exchange.beat === 1
                      ? <span className="wf-vibe-thinking-dots"><i /><i /><i /></span>
                      : <>
                          <span>{exchange.bot}</span>
                          <span className="wf-vibe-change-chips">
                            {exchange.changes.map((change) => <em key={change}>✓ {change}</em>)}
                          </span>
                        </>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="wf-vibe-chat-input">
          <span>＋</span><span>Tell Visl what to change…</span><b>↑</b>
        </div>
        <button className="wf-vibe-apply" type="button" onClick={() => setApplied((value) => !value)}>
          {applied ? "✓ Changes applied" : "✧ Apply vibe edit"}
        </button>
        <span className="wf-vibe-applied-note">{applied ? "Scene updated · colour, pacing & mood" : "Your intent. Your creative control."}</span>
      </div>
    </div>
  );
}

function PublishDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const ids = ["sm1", "sm2", "sm3", "sm4"];
    const timers: ReturnType<typeof window.setTimeout>[] = [];
    ids.forEach((id, index) => {
      timers.push(window.setTimeout(() => {
        setSelected((current) => current.includes(id) ? current : [...current, id]);
        setActiveIcon(id);
        timers.push(window.setTimeout(() => setActiveIcon((current) => current === id ? null : current), 600));
      }, 250 + index * 350));
    });
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const channels = [
    { id: "sm1", src: "/assets/sm1.png", alt: "Social media channel one" },
    { id: "sm2", src: "/assets/sm2.png", alt: "Social media channel two" },
    { id: "sm3", src: "/assets/sm3.png", alt: "Social media channel three" },
    { id: "sm4", src: "/assets/sm4.png", alt: "Social media channel four" },
  ];

  const toggleChannel = (id: string) => {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setActiveIcon(id);
    window.setTimeout(() => setActiveIcon((current) => current === id ? null : current), 500);
  };

  const renderChannel = (channel: typeof channels[number]) => (
    <button
      type="button"
      key={channel.id}
      className={`wf-publish-social-icon ${selected.includes(channel.id) ? "is-selected" : ""} ${activeIcon === channel.id ? "is-selecting" : ""}`}
      onClick={() => toggleChannel(channel.id)}
      aria-label={`${selected.includes(channel.id) ? "Deselect" : "Select"} ${channel.alt}`}
      aria-pressed={selected.includes(channel.id)}
    >
      <img src={channel.src} alt={channel.alt} />
      <span aria-hidden="true">✓</span>
    </button>
  );

  return (
    <div className="wf-publish-edge-art" aria-label="Publishing to social platforms">
      <div className="wf-publish-social-stack wf-publish-social-left" aria-label="Social platform selections">
        {channels.slice(0, 2).map(renderChannel)}
      </div>

      <div className="wf-publish-output-wrap">
        <img className="wf-publish-output" src="/assets/output.png" alt="Finished video ready to publish" />
        <span className="wf-publish-output-label">FINISHED VIDEO · READY TO SHARE</span>
      </div>

      <div className="wf-publish-social-stack wf-publish-social-right" aria-label="More social platform selections">
        {channels.slice(2).map(renderChannel)}
      </div>

      <div className="wf-publish-right-composition" aria-label="Publish controls">
        <div className="wf-publish-action-card">
          <div className="wf-publish-action-heading"><span className="wf-publish-action-spark">✦</span><span>YOUR VIDEO IS READY</span></div>
          <div className="wf-publish-action-row">
            <button type="button" className="wf-publish-now" onClick={() => setActionMessage("Your video is ready to publish.")}><span aria-hidden="true">↗</span> Publish now</button>
            <button type="button" className="wf-publish-schedule" onClick={() => setActionMessage("Scheduling options are ready to configure.")}><span aria-hidden="true">▦</span> Schedule</button>
          </div>
          <div className="wf-publish-channel-summary"><span className="wf-publish-summary-dot" /> <span>{selected.length} OF 4 CHANNELS SELECTED</span><b>{selected.length}/4</b></div>
          {actionMessage && <p className="wf-publish-action-feedback" role="status">{actionMessage}</p>}
        </div>
      </div>
    </div>
  );
}

/**
 * Cursor-driven character turnaround.
 * Cursor X across the card maps to a rotation angle (centre = front, edges = back).
 * Angle is eased with GSAP so the spin feels weighty instead of jittery.
 * - Multiple frames  → swaps frames (true 360° turnaround).
 * - Single frame     → faux 3D: perspective rotateY/rotateX tilt of the flat image.
 */
function CharacterTurntable({ frames, alt, className }: { frames: string[]; alt: string; className: string }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const shadowRef = useRef<HTMLSpanElement | null>(null);

  // Preload every frame so the swap never flashes.
  useEffect(() => {
    frames.forEach((src) => { const image = new Image(); image.src = src; });
  }, [frames]);

  useEffect(() => {
    const root = rootRef.current, stage = stageRef.current, img = imgRef.current, shadow = shadowRef.current;
    if (!root || !stage || !img) return;

    const multi = frames.length > 1;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { angle: 0, tilt: 0 };   // angle: -180..180, 0 = front
    let lastFrame = -1;

    const render = () => {
      if (multi) {
        const turn = (((state.angle % 360) + 360) % 360) / 360;
        const index = Math.round(turn * frames.length) % frames.length;
        if (index !== lastFrame) { img.src = frames[index]; lastFrame = index; }
      } else {
        gsap.set(stage, { rotationY: state.angle, rotationX: state.tilt });
      }
      if (shadow) gsap.set(shadow, { scaleX: 1 - Math.abs(Math.sin((state.angle * Math.PI) / 180)) * 0.28 });
    };

    render();

    // Keep both generated characters in a continuous vertical-axis turnaround.
    // With a single source image this is a faux-3D spin; supplied turnaround
    // frames are swapped in sequence for a more faithful full 360° rotation.
    const spin = reduced ? null : gsap.to(state, {
      // Gentle side-to-side vertical-axis turn, like the original reveal hover.
      // The character eases 60° left, then 60° right, without completing a full spin.
      angle: 60,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: render,
    });

    return () => {
      spin?.kill();
      gsap.killTweensOf(state);
    };
  }, [frames]);

  return (
    <div ref={rootRef} className={`wf-float wf-character wf-turntable ${className}`} tabIndex={0} role="img" aria-label={`${alt}. Continuously rotating character turnaround.`}>
      <div ref={stageRef} className="wf-turntable-stage">
        <img ref={imgRef} src={frames[0]} alt="" draggable={false} />
      </div>
      <span ref={shadowRef} className="wf-turntable-shadow" aria-hidden="true" />
    </div>
  );
}


function IdeaBulbScene() {
  return (
    <div className="wf-idea-bulb-scene" aria-label="A glowing lightbulb surrounded by creative ideas">
      <div className="wf-bulb-halo" aria-hidden="true" />
      <div className="wf-bulb-orbit wf-bulb-orbit-one" aria-hidden="true" />
      <div className="wf-bulb-orbit wf-bulb-orbit-two" aria-hidden="true" />
      <div className="wf-bulb-wrap" aria-hidden="true">
        <svg className="wf-bulb-svg" viewBox="0 0 220 280" role="presentation">
          <defs>
            <linearGradient id="wf-bulb-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".98" />
              <stop offset="36%" stopColor="#d8f4ff" stopOpacity=".9" />
              <stop offset="70%" stopColor="#7bbcff" stopOpacity=".72" />
              <stop offset="100%" stopColor="#4b70f4" stopOpacity=".92" />
            </linearGradient>
            <linearGradient id="wf-bulb-base" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8abfff" />
              <stop offset="48%" stopColor="#f7fdff" />
              <stop offset="100%" stopColor="#5e82f5" />
            </linearGradient>
            <radialGradient id="wf-bulb-core">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="48%" stopColor="#dff8ff" />
              <stop offset="100%" stopColor="#74b8ff" stopOpacity=".08" />
            </radialGradient>
            <filter id="wf-bulb-blur">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>
          <ellipse cx="110" cy="114" rx="67" ry="73" fill="#63a8ff" opacity=".48" filter="url(#wf-bulb-blur)" />
          <path d="M110 20 C65 20 34 55 38 98 C40 124 57 139 72 158 C82 171 84 184 85 197 L135 197 C136 184 138 171 148 158 C163 139 180 124 182 98 C186 55 155 20 110 20Z" fill="url(#wf-bulb-glass)" stroke="#ffffff" strokeOpacity=".9" strokeWidth="2.5" />
          <path d="M62 77 C66 53 84 39 103 36" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeOpacity=".88" />
          <path d="M58 95 C59 119 75 132 85 150 C92 162 94 178 94 194" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeOpacity=".55" />
          <ellipse cx="110" cy="112" rx="40" ry="48" fill="url(#wf-bulb-core)" />
          <path d="M90 103 C90 88 99 80 110 80 C121 80 130 88 130 103 L124 135 L96 135Z" fill="#ffffff" opacity=".9" />
          <path d="M96 135 L96 159 Q110 174 124 159 L124 135" fill="none" stroke="#f7fdff" strokeWidth="4" strokeLinecap="round" />
          <path d="M86 196 L134 196 L131 211 L89 211Z" fill="url(#wf-bulb-base)" stroke="#e7f6ff" strokeWidth="2" />
          <path d="M89 216 L131 216 L127 229 L93 229Z" fill="url(#wf-bulb-base)" stroke="#d9edff" strokeWidth="2" />
          <path d="M96 234 L124 234 L119 245 L101 245Z" fill="#4e77e9" stroke="#a7d9ff" strokeWidth="1.5" />
          <path d="M101 250 L119 250 L114 258 L106 258Z" fill="#2d4fa8" />
          <path d="M104 268 L116 268" stroke="#9bcfff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <span className="wf-bulb-icon wf-bulb-icon-spark" aria-hidden="true">✦</span>
      <span className="wf-bulb-icon wf-bulb-icon-star" aria-hidden="true">✧</span>
      <span className="wf-bulb-icon wf-bulb-icon-play" aria-hidden="true">▶</span>
      <span className="wf-bulb-icon wf-bulb-icon-film" aria-hidden="true">▤</span>
      <span className="wf-bulb-icon wf-bulb-icon-diamond" aria-hidden="true">◇</span>
      <span className="wf-bulb-icon wf-bulb-icon-plus" aria-hidden="true">＋</span>
      <span className="wf-bulb-particle wf-bulb-particle-one" aria-hidden="true" />
      <span className="wf-bulb-particle wf-bulb-particle-two" aria-hidden="true" />
      <span className="wf-bulb-particle wf-bulb-particle-three" aria-hidden="true" />
      <span className="wf-bulb-particle wf-bulb-particle-four" aria-hidden="true" />
      <span className="wf-bulb-prompt wf-bulb-prompt-one">A magical kingdom <i>✧</i></span>
      <span className="wf-bulb-prompt wf-bulb-prompt-two">A mystery in 1921</span>
      <span className="wf-bulb-prompt wf-bulb-prompt-three">Cinematic 3D animation</span>
    </div>
  );
}

function FloatingArt({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <>
        <IdeaBulbScene />
        <div className="wf-idea-chat-right"><TypewriterPrompt /></div>
        <span className="wf-orbit-word wf-word-thought">what if…</span>
        <span className="wf-orbit-word wf-word-story">A STORY</span>
        <span className="wf-orbit-word wf-word-spark">✳</span>
      </>;
    case 1:
      return <>
        <SetupControls />
        <span className="wf-orbit-word wf-word-format">FORMAT / FEEL / FRAME</span>
      </>;
    case 2:
      return <>
        <ScriptEditorDemo />
        <span className="wf-orbit-word wf-word-scene">SCENE 01</span>
      </>;
    case 3:
      return <>
        <CharacterTurntable className="wf-character-phil" frames={philFrames} alt="Generated character Phil" />
        <CharacterTurntable className="wf-character-tolman" frames={tolmanFrames} alt="Generated character Mr. Tolman" />
        <img className="wf-float wf-assets-mini" src={location} alt="Character asset library" />
        <span className="wf-orbit-word wf-word-world">CHARACTERS · LOCATIONS · PROPS</span>
        <span className="wf-asset-tag wf-asset-tag-one">PHIL / VOICE READY</span>
        <span className="wf-asset-tag wf-asset-tag-two">MR. TOLMAN / VOICE READY</span>
      </>;
    case 4:
      return <>
        <VibeEditDemo />
      </>;
    default:
      return <>
        <PublishDemo />
        <span className="wf-orbit-word wf-word-done">READY WHEN YOU ARE ↗</span>
        <span className="wf-publish-star">✳</span>
      </>;
  }
}

export default function WorkflowShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  // Holds the eased "jump to stage" scroll so user input can interrupt it.
  const jumpTweenRef = useRef<gsap.core.Tween | null>(null);

  // Any manual scrolling (wheel / touch / keyboard) cancels an in-progress stage jump.
  useEffect(() => {
    const stopJump = () => {
      jumpTweenRef.current?.kill();
      jumpTweenRef.current = null;
    };
    window.addEventListener("wheel", stopJump, { passive: true });
    window.addEventListener("touchstart", stopJump, { passive: true });
    window.addEventListener("keydown", stopJump);
    return () => {
      window.removeEventListener("wheel", stopJump);
      window.removeEventListener("touchstart", stopJump);
      window.removeEventListener("keydown", stopJump);
      stopJump();
    };
  }, []);

  // Keep dynamic inline styles explicitly typed with React's CSSProperties.
  const activeStageScaleStyle: CSSProperties = {
    transform: `scaleX(${active / (stages.length - 1)})`,
  };
  const workflowProgressScaleStyle: CSSProperties = {
    transform: `scaleX(${(active + 1) / stages.length})`,
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const pointerCleanups: Array<() => void> = [];

    // The site navbar is sticky, so the section pins just below it instead of
    // sliding underneath. Its height is exposed to CSS so the pinned stage is
    // exactly "viewport minus navbar" tall.
    const navHeight = () => document.getElementById("main-nav")?.offsetHeight ?? 0;
    const syncNavHeight = () => section.style.setProperty("--wf-nav-h", `${navHeight()}px`);
    syncNavHeight();
    ScrollTrigger.addEventListener("refreshInit", syncNavHeight);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".wf-panel");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      // Start moving horizontally as soon as the pinned section starts.
      // A short end hold gives the final stage a moment to be read without
      // creating a long stretch where scrolling appears to do nothing.
      const travelDuration = 1;
const outroHold = 0.035;
const totalTimelineDuration = travelDuration + outroHold;
const scrollSlowdown = 1.8;

      const horizontal = gsap.timeline({
        scrollTrigger: {
          id: "Visl-workflow-horizontal",
          trigger: section,
          pin: true,
          start: () => `top ${navHeight()}px`,
          end: () => `+=${distance() * totalTimelineDuration * scrollSlowdown}`,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // The horizontal movement starts immediately; the final 10% is
            // reserved for reading Stage 6 before the pin releases.
            const travelProgress = Math.max(0, Math.min(1,
              (self.progress * totalTimelineDuration) / travelDuration
            ));
            setActive(Math.min(5, Math.floor(travelProgress * 6)));
          },
        },
      });
      horizontal
        .to(track, { x: () => -distance(), duration: travelDuration, ease: "none" })
        .to({}, { duration: outroHold });

      panels.forEach((panel, panelIndex) => {
        const settingCards = panel.querySelectorAll<HTMLElement>(".wf-setting-card");
        if (settingCards.length) {
          if (panelIndex === 1) {
            gsap.fromTo(settingCards,
              { x: -40.5, y: 25, rotate: (i) => i % 2 ? 7 : -7, scale: 0.82, autoAlpha: 0 },
              { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.35)",
                scrollTrigger: { trigger: panel, containerAnimation: horizontal as unknown as gsap.core.Tween, start: "left 82%", toggleActions: "play none none reverse" } }
            );
            // Keep all four settings visible throughout the Setup stage; no exit/fade animation.
            // The little symbols fall into place as the user scrolls through Setup.
            const fallingIcons = panel.querySelectorAll<HTMLElement>(".wf-setup-falling-icons span");
            if (fallingIcons.length) {
              gsap.fromTo(fallingIcons,
                { y: (i) => -135 - (i % 3) * 43, x: (i) => (i % 2 ? 50 : -50), rotate: (i) => i % 2 ? 110 : -95, scale: 0.45, autoAlpha: 0 },
                { y: (i) => [83, 133, 185, 234, 286, 329, 378][i], x: (i) => [0, -11, 12, -6, 9, -7, 0][i], rotate: (i) => [12, -16, 8, -12, 18, -8, 4][i], scale: 1, autoAlpha: 0.8, ease: "none",
                  scrollTrigger: { trigger: panel, containerAnimation: horizontal as unknown as gsap.core.Tween, start: "left 92%", end: "left 38%", scrub: 0.65 } }
              );
            }
          } else {
            gsap.fromTo(settingCards,
              { y: (i) => i % 2 === 0 ? -70 : 90, x: (i) => i % 2 === 0 ? -24 : 24, rotate: (i) => i % 2 === 0 ? -12 : 12, scale: 0.78, autoAlpha: 0 },
              { y: 0, x: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 0.85, stagger: 0.11, ease: "back.out(1.45)",
                scrollTrigger: { trigger: panel, containerAnimation: horizontal as unknown as gsap.core.Tween, start: "left 82%", toggleActions: "play none none reverse" } }
            );
          }
        }
        if (panelIndex === 1) {
          const setupVisual = panel.querySelector<HTMLElement>(".wf-setup-style");
          if (setupVisual) gsap.fromTo(setupVisual, { x: 50, y: 31, scale: 0.92, autoAlpha: 0 }, {
            x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: panel, containerAnimation: horizontal as unknown as gsap.core.Tween, start: "left 78%", toggleActions: "play none none reverse" }
          });
        }
        const interfaceCards = panel.querySelectorAll<HTMLElement>(".wf-script-ui, .wf-vibe-ui, .wf-publish-ui");
        if (interfaceCards.length) {
          gsap.fromTo(interfaceCards,
            { y: 31, rotate: -3, scale: 0.94, autoAlpha: 0 },
            { y: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: panel, containerAnimation: horizontal as unknown as gsap.core.Tween, start: "left 82%", toggleActions: "play none none reverse" } }
          );
        }
        const typography = panel.querySelector<HTMLElement>(".wf-typography");
        const titleWords = panel.querySelectorAll<HTMLElement>(".wf-title-word");
        const accent = panel.querySelector<HTMLElement>(".wf-title-accent");
        const accentText = panel.querySelector<HTMLElement>(".wf-title-accent-text");

        if (typography) {
          gsap.fromTo(typography, { autoAlpha: 0.72 }, {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal as unknown as gsap.core.Tween,
              start: "left 88%",
              end: "left 48%",
              scrub: 0.6,
            },
          });
        }

        // Each surrounding word rises in with a staggered 3D reveal.
        if (titleWords.length) {
          gsap.fromTo(titleWords,
            { yPercent: 115, rotateX: -48, autoAlpha: 0, transformOrigin: "50% 100%" },
            {
              yPercent: 0,
              rotateX: 0,
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.075,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal as unknown as gsap.core.Tween,
                start: "left 79%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // The charcoal label pops in, while its lettering gently floats.
        if (accent) {
          gsap.fromTo(accent,
            { scale: 0.76, rotate: -8, autoAlpha: 0, transformOrigin: "50% 50%" },
            {
              scale: 1,
              rotate: -2,
              autoAlpha: 1,
              duration: 0.72,
              ease: "back.out(1.65)",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal as unknown as gsap.core.Tween,
                start: "left 77%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (accentText) {
          gsap.to(accentText, {
            y: -2.7,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        const swarm = panel.querySelectorAll<HTMLElement>(".wf-transition-swarm span");
        if (swarm.length) {
          gsap.fromTo(swarm,
            { x: (i) => (i % 2 ? 81 : -81), y: (i) => (i % 3 - 1) * 68, rotate: (i) => i % 2 ? 170 : -170, scale: 0.3, autoAlpha: 0 },
            { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 0.6, duration: 0.95, stagger: 0.045, ease: "power3.out",
              scrollTrigger: { trigger: panel, containerAnimation: horizontal as unknown as gsap.core.Tween, start: "left 90%", toggleActions: "play none none reverse" } }
          );
          gsap.to(swarm, { y: (i) => (i % 2 ? -8 : 7), rotate: (i) => i % 2 ? 12 : -12, duration: 2.5, ease: "sine.inOut", stagger: 0.15, repeat: -1, yoyo: true });
        }
        if (panelIndex === 0) {
          const chat = panel.querySelector<HTMLElement>(".wf-idea-chat-right");
          if (chat) gsap.to(chat, { y: -7, rotate: 1.5, duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true });

          const bulbScene = panel.querySelector<HTMLElement>(".wf-idea-bulb-scene");
          const bulb = panel.querySelector<HTMLElement>(".wf-bulb-wrap");
          const halo = panel.querySelector<HTMLElement>(".wf-bulb-halo");
          const icons = panel.querySelectorAll<HTMLElement>(".wf-bulb-icon");
          const prompts = panel.querySelectorAll<HTMLElement>(".wf-bulb-prompt");
          const particles = panel.querySelectorAll<HTMLElement>(".wf-bulb-particle");
          const orbits = panel.querySelectorAll<HTMLElement>(".wf-bulb-orbit");

          if (bulbScene && bulb && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            // Keep the idea bulb visible from the moment the workflow appears.
            // Only the title uses a scroll-triggered entrance; the bulb itself
            // should never fade or scale in as the user scrolls.
            gsap.set(bulbScene, { autoAlpha: 1, scale: 1, y: 0 });
            gsap.to(bulb, { y: -7, rotate: 1.5, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });
            if (halo) gsap.to(halo, { scale: 1.13, autoAlpha: 0.88, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true });
            if (orbits.length) gsap.to(orbits, { rotation: (i) => i ? -8 : 8, scale: (i) => i ? 1.025 : 1.04, duration: (i) => i ? 7 : 5.5, ease: "sine.inOut", stagger: 0.25, repeat: -1, yoyo: true });
            if (icons.length) {
              gsap.fromTo(icons, { autoAlpha: 0, scale: 0.45, y: 13, rotate: (i) => i % 2 ? -35 : 35 }, {
                autoAlpha: 1, scale: 1, y: 0, rotate: 0, duration: 0.85, stagger: 0.08, ease: "back.out(1.7)",
                scrollTrigger: { trigger: panel, containerAnimation: horizontal as unknown as gsap.core.Tween, start: "left 87%", toggleActions: "play none none reverse" }
              });
              icons.forEach((icon, i) => gsap.to(icon, { y: i % 2 ? -11 : 9, x: i % 3 === 0 ? 4.5 : -3.5, rotate: i % 2 ? 10 : -9, duration: 2.7 + (i % 3) * 0.55, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.12 }));
            }
            if (prompts.length) {
              gsap.fromTo(prompts, { autoAlpha: 0, y: 13, scale: 0.92 }, {
                autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.16, ease: "power2.out",
                scrollTrigger: { trigger: panel, containerAnimation: horizontal as unknown as gsap.core.Tween, start: "left 84%", toggleActions: "play none none reverse" }
              });
              prompts.forEach((prompt, i) => gsap.to(prompt, { y: i === 1 ? -6 : 5, rotate: i === 1 ? -1.5 : 1.2, duration: 3.2 + i * 0.45, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.2 }));
            }
            if (particles.length) gsap.to(particles, { y: (i) => i % 2 ? -17 : 13, x: (i) => i % 2 ? 11 : -9, scale: (i) => i % 2 ? 1.3 : 0.75, autoAlpha: (i) => i % 2 ? 0.9 : 0.35, duration: (i) => 2.3 + i * 0.45, ease: "sine.inOut", stagger: 0.25, repeat: -1, yoyo: true });

            // QuickTo keeps cursor-reactive parallax cheap: no tween per pointer event.
            const quickX = gsap.quickTo(bulbScene, "x", { duration: 0.65, ease: "power3.out" });
            const quickY = gsap.quickTo(bulbScene, "y", { duration: 0.65, ease: "power3.out" });
            const onPointerMove = (event: PointerEvent) => {
              const bounds = panel.getBoundingClientRect();
              const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
              const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
              quickX(nx * 9);
              quickY(ny * 7);
            };
            const onPointerLeave = () => { quickX(0); quickY(0); };
            panel.addEventListener("pointermove", onPointerMove, { passive: true });
            panel.addEventListener("pointerleave", onPointerLeave, { passive: true });
            pointerCleanups.push(() => {
              panel.removeEventListener("pointermove", onPointerMove);
              panel.removeEventListener("pointerleave", onPointerLeave);
            });
          }
        }
      });
    }, section);

    // No refresh on mobile toolbar show/hide: on phones the pinned stage is
    // sized with `lvh` (see the CSS), which doesn't change when the browser's
    // address bar collapses, so there is nothing to recalculate mid-scroll.

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", syncNavHeight);
      pointerCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };

  }, []);

  const jumpTo = (index: number) => {
    const trigger = ScrollTrigger.getById("Visl-workflow-horizontal");
    if (!trigger) return;

    // Stage navigation follows the immediate horizontal travel. Stage 6
    // lands at the end of that travel, leaving the short end hold for reading.
    const travelDuration = 1;
const outroHold = 0.035;
const totalTimelineDuration = travelDuration + outroHold;

const progress =
  ((index / (stages.length - 1)) * travelDuration) /
  totalTimelineDuration;
    const target = trigger.start + (trigger.end - trigger.start) * progress;

    jumpTweenRef.current?.kill();
    jumpTweenRef.current = null;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: target, left: 0, behavior: "instant" as unknown as ScrollBehavior });
      return;
    }

    const startY = window.scrollY;
    const delta = Math.abs(target - startY);
    if (delta < 2) return;

    // Eased, distance-aware glide instead of the browser's fast native smooth scroll,
    // so the panels slide across calmly and every stage stays readable on the way.
    const proxy = { y: startY };
    jumpTweenRef.current = gsap.to(proxy, {
      y: target,
      duration: gsap.utils.clamp(1.2, 2.8, 0.8 + delta / 2200),
      ease: "power3.inOut",
      onUpdate: () => window.scrollTo({ top: proxy.y, left: 0, behavior: "instant" as unknown as ScrollBehavior }),
      onComplete: () => { jumpTweenRef.current = null; },
    });
  };

  return (
    <section id="Visl-workflow-showcase" className="wf-section" ref={sectionRef} aria-label="How Visl works">
      <div className="wf-pin">
        <header className="wf-topline">
          
          <span className="wf-top-caption">FROM THE FIRST THOUGHT TO THE FINAL FRAME</span>
          <span className="wf-top-count">A CREATOR'S JOURNEY / 6 STAGES</span>
        </header>
        <div className="wf-track-viewport">
          <nav className="wf-mobile-timeline" aria-label="Jump to workflow stage">
            <div className="wf-mobile-timeline-line" aria-hidden="true">
              <span style={activeStageScaleStyle} />
            </div>
            {stages.map((stage, index) => (
              <button
                key={stage.number}
                type="button"
                className={`wf-mobile-timeline-dot ${active === index ? "is-active" : ""} ${active > index ? "is-past" : ""}`}
                onClick={() => jumpTo(index)}
                aria-label={`Go to stage ${index + 1}: ${stage.name}`}
                aria-current={active === index ? "step" : undefined}
              >
                {index + 1}
              </button>
            ))}
          </nav>
          <div className="wf-track" ref={trackRef}>
            {stages.map((stage, index) => (
              <article className={`wf-panel wf-panel-${index + 1}`} key={stage.number}>
                <div className="wf-panel-backdrop"><div className="wf-art-glow" /><div className="wf-orbit wf-orbit-one" /><div className="wf-orbit wf-orbit-two" /></div>
                <div className={`wf-art-field wf-art-field-${index + 1}`}>
                  <div className="wf-transition-swarm" aria-hidden="true">
  <span>✦</span><span>✳</span><span>◈</span>
  <span>＋</span><span>✧</span><span>◌</span>
  <span>✧</span><span>✳</span><span>◇</span>
  <span>⋆</span><span>⊹</span><span>✦</span>
</div>
                  <FloatingArt index={index} />
                </div>
                <div className="wf-typography">
                  <p className="wf-kicker"><span><small>Stage</small>{stage.number}</span><b>{stage.name}</b><i>/</i><em>{stage.kicker}</em></p>
                  <h2 className="wf-title">
                    {stage.titleBefore && stage.titleBefore.split(" ").map((word, wordIndex) => (
                      <span className="wf-title-word" key={`before-${wordIndex}`}>
                        {word}
                      </span>
                    ))}
                    {index === 2 && <span className="wf-title-break" aria-hidden="true" />}
                    <span className={`wf-title-accent wf-accent-${index + 1}`}>
                      <span className="wf-title-accent-text">{stage.titleHighlight}</span>
                    </span>
                    {stage.titleAfter && stage.titleAfter.split(" ").map((word, wordIndex) => (
                      <span className="wf-title-word" key={`after-${wordIndex}`}>
                        {word}
                      </span>
                    ))}
                  </h2>
                  <p className="wf-description">{index === 0
                    ? <>Share a link or brief story concept—<br />Visl guides you through the rest.</>
                    : index === 2
                      ? <>Visl automatically writes your screenplay—<br />review and tweak scenes only if you want to.</>
                      : stage.description}</p>
                  <span className="wf-small-note">SCROLL TO EXPLORE <span>↓</span></span>
                </div>
                <span className="wf-panel-index">{stage.number} — 06</span>
              </article>
            ))}
          </div>
        </div>
        <div className="wf-bottomline">
          <div className="wf-stage-nav" aria-label="Workflow stages">
            {stages.map((stage, index) => <button key={stage.number} type="button" className={`wf-stage-button ${active === index ? "is-active" : ""} ${active > index ? "is-past" : ""}`} onClick={() => jumpTo(index)} aria-current={active === index ? "step" : undefined}>
              <span className="wf-nav-num">{stage.number}</span><span>{stage.name}</span>
            </button>)}
          </div>
          <div className="wf-progress-track"><span style={workflowProgressScaleStyle} /></div>
        </div>
      </div>
    </section>
  );
}