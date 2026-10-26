import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { trackCtaClick } from '../../lib/analytics';
import './WhyVivi.css';
const features = [
  {
    number: '01',
    title: (
  <>
    <span className="title-line title-blue-line">
      Long-form AI videos
    </span>
    <span className="title-line title-black-line">
      in one click
    </span>
  </>
),
    description:
      'Turn a simple idea into a complete, long-form video. Visl handles the story, scenes, characters and pacing for you.',
    type: 'longform',
  },
  {
    number: '02',
    title: (
  <>
    <span className="title-line title-black-line">
      Characters that
    </span>
    <span className="title-line title-blue-line">
      stay consistent
    </span>
  </>
),
    description:
      'Keep your characters looking the same across every scene, even as the story, location and camera angle change.',
    type: 'characters',
  },
  {
    number: '03',
    title: (
  <>
    <span className="title-line title-black-line">
      Seamless
    </span>
    <span className="title-line title-blue-line">
      shot-to-shot continuity
    </span>
  </>
),
    description:
      'Create connected scenes that flow naturally from one shot to the next, without losing the visual thread of your story.',
    type: 'continuity',
  },
  {
    number: '04',
    title: (
  <>
    <span className="title-line title-blue-line">
      Cinematic scenes
    </span>
    <span className="title-line title-black-line">
      automatically
    </span>
  </>
),
    description:
      'Generate multiple shots, camera angles and compositions that make your story feel like a real production.',
    type: 'cinematic',
  },
  {
    number: '05',
    title: (
  <>
    <span className="title-line title-blue-line">
      Voices & music
    </span>
    <span className="title-line title-black-line">
      that fit the story
    </span>
  </>
),
    description:
      'Give every scene the right voice, music, mood and sound — all working together with the story.',
    type: 'audio',
  },
  {
    number: '06',
   title: (
  <>
    <span className="title-line title-blue-line">
      Edit your video
    </span>
    <span className="title-line title-black-line">
      by chatting
    </span>
  </>
),
    description:
      'Just tell Visl what to change. No timeline, no complicated controls and no editing experience required.',
    type: 'chat',
  },
];
export function WhyVivi() {
  return (
    <section id="why-vivi" className="why-vivi">
      <div className="why-vivi-intro">
        <div className="why-vivi-overline">
          Why Visl
        </div>
        <h2>
          From idea to story.
          <br />
          <em>Without the busywork.</em>
        </h2>
        <p>
          Visl takes care of the production details so you can focus on
          the story you want to tell.
        </p>
<div className="why-vivi-create-demo">
  {/* ambient particles */}
  <span className="demo-particle p1" />
  <span className="demo-particle p2" />
  <span className="demo-particle p3" />
  <span className="demo-particle p4" />
  <span className="demo-particle p5" />
  <span className="demo-particle p6" />
  {/* PROMPT */}
  <div className="demo-prompt-card">
    <div className="demo-prompt-top">
      <span>Visl PROMPT</span>
      <span className="demo-live">
        <i />
        LIVE
      </span>
    </div>
    <div className="demo-prompt-text">
      <span className="typed-line">
        A paper boat slips from a child's
window into a flooded city...
      </span>
      <span className="typed-cursor" />
    </div>
    <div className="demo-prompt-footer">
  <span>emotional</span>
  <span>cinematic</span>
  <span>16:9</span>
</div>
  </div>
  {/* PROCESSING BEAM */}
  <div className="demo-processing">
    <span className="processing-dot" />
    <div className="processing-line">
      <i />
    </div>
    <span className="processing-label">
      Visl is creating
    </span>
  </div>
  {/* FILM STRIP */}
{/* FILM STRIP — ACTUAL STORY SCENES */}
<div className="demo-filmstrip">
  <div className="film-frame frame-1">
    <img src="/images/paper-boat-scene-01.png" alt="Girl folding a paper boat" />
    <span>01</span>
  </div>
  <div className="film-frame frame-2">
    <img src="/images/paper-boat-scene-02.png" alt="Flooded city at sunset" />
    <span>02</span>
  </div>
  <div className="film-frame frame-3">
    <img src="/images/paper-boat-scene-03.png" alt="Girl releasing a paper boat" />
    <span>03</span>
  </div>
  {/* <div className="film-frame frame-4">
    <img src="/images/paper-boat-scene-01.png" alt="The paper boat story opening" />
    <span>04</span>
  </div>
  <div className="film-frame frame-5">
    <img src="/images/paper-boat-scene-02.png" alt="The flooded city" />
    <span>05</span>
  </div>
  <div className="film-frame frame-6">
    <img src="/images/paper-boat-scene-03.png" alt="The paper boat on the street" />
    <span>06</span>
  </div> */}
</div>
  {/* CAMERA SCAN */}
  <div className="demo-camera">
    <div className="camera-corners">
      <span />
      <span />
      <span />
      <span />
    </div>
    <div className="camera-crosshair">
      <i />
      <i />
    </div>
    <span className="camera-label">
      24 FPS
    </span>
  </div>
{/* FINAL VIDEO */}
<div className="demo-video">
  <div className="video-glow" />
  <div className="video-image">
    <img
      className="finished-video-gif"
      src="/videos/rain_boat.gif"
      alt="The Paper Boat — AI generated animated video"
    />
    <div className="video-mist" />
  </div>
  <div className="video-ui">
    <span>SCENE 03</span>
    <div className="video-progress">
      <i />
    </div>
    <span>00:08</span>
  </div>
  <div className="video-badge">
    <i />
    VIDEO READY
  </div>
</div>
  {/* LITTLE STORY LABELS */}
  <div className="demo-label label-prompt">
    <span>01</span>
    YOUR IDEA
  </div>
  <div className="demo-label label-story">
    <span>02</span>
    STORY
  </div>
  <div className="demo-label label-video">
    <span>03</span>
    FINISHED VIDEO
  </div>
</div>
      </div>
      <div className="why-vivi-features">
        {features.map((feature) => (
          <article
            className={`why-vivi-feature why-vivi-feature--${feature.type}`}
            key={feature.number}
          >
            <div className="why-vivi-feature-inner">
              {/* LEFT — COPY */}
              <div className="why-vivi-copy">
  <div className="why-vivi-number">
    {feature.number}
  </div>

  <h3>{feature.title}</h3>
  <p>{feature.description}</p>

  <Link
    to={ROUTES.VISL_25}
    className="feature-create-btn"
    onClick={() => {
      trackCtaClick({
        cta_name: 'start_creating',
        destination: 'visl_25',
        location: 'why_vivi_features',
        button_text: 'Start Creating',
        feature_number: feature.number,
      });
    }}
  >
    <span className="feature-btn-sparkle">✦</span>
    <span>Start Creating</span>
    <span className="feature-btn-arrow">↗</span>
  </Link>

  <div className="why-vivi-line" />
</div>
              {/* RIGHT — VISUAL */}
              <div className="why-vivi-visual">
                {feature.type === 'longform' && (
                  <LongFormVisual />
                )}
                {feature.type === 'characters' && (
                  <CharactersVisual />
                )}
                {feature.type === 'continuity' && (
                  <ContinuityVisual />
                )}
                {feature.type === 'cinematic' && (
                  <CinematicVisual />
                )}
                {feature.type === 'audio' && (
                  <AudioVisual />
                )}
                {feature.type === 'chat' && (
                  <ChatVisual />
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
/* =========================================================
   FEATURE 01 — LONG FORM
   ========================================================= */
function LongFormVisual() {
  return (
    <div className="longform-visual">
      <div className="longform-prompt">
        <span className="visual-label">YOUR IDEA</span>
        <p>
          A detective arrives in Mumbai
          on a rainy night...
        </p>
        <span className="prompt-cursor" />
      </div>
      <div className="longform-arrow">→</div>
      <div className="longform-output">
  <img
    src="/images/longform-grid.png"
    alt="Visl generating multiple scenes for a long-form video"
    className="longform-grid-image"
  />
</div>
    </div>
  );
}
/* =========================================================
   FEATURE 02 — CHARACTERS
   ========================================================= */
function CharactersVisual() {
  return (
    <div className="characters-visual">

      {/* MUMBAI — NIGHT */}
      <div className="character-scene">
        <span className="scene-number">SCENE 01</span>

        <img
          src="/images/detective-mumbai-night.png"
          alt="Detective in Mumbai at night"
          className="character-scene-image"
        />

        <span className="scene-location">
          MUMBAI · NIGHT
        </span>
      </div>

      <div className="character-connector">
        <span>same character</span>
        <div />
      </div>

      {/* DELHI — MORNING */}
      <div className="character-scene">
        <span className="scene-number">SCENE 08</span>

        <img
          src="/images/detective-delhi-day.png"
          alt="Same detective in Delhi during the morning"
          className="character-scene-image"
        />

        <span className="scene-location">
          DELHI · MORNING
        </span>
      </div>

      <div className="consistency-pill">
        <span />
        CHARACTER CONSISTENCY
      </div>

    </div>
  );
}
/* =========================================================
   FEATURE 03 — CONTINUITY
   ========================================================= */
function ContinuityVisual() {
  return (
    <div className="continuity-visual">
      <div className="continuity-track">
        <div className="continuity-shot">
          <span>SHOT 01</span>
          <div className="shot-image shot-one">
  <img
    src="/images/detective-wide.png"
    alt="Detective in a wide camera shot"
  />
</div>
          <strong>Wide</strong>
        </div>
        <div className="continuity-link">
          <span />
          <span />
          <span />
        </div>
        <div className="continuity-shot">
          <span>SHOT 02</span>
          <div className="shot-image shot-two">
  <img
    src="/images/detective-medium.png"
    alt="Detective in a medium camera shot"
  />
</div>
          <strong>Medium</strong>
        </div>
        <div className="continuity-link">
          <span />
          <span />
          <span />
        </div>
        <div className="continuity-shot">
          <span>SHOT 03</span>
          <div className="shot-image shot-three">
  <img
    src="/images/detective-close.png"
    alt="Detective in a close camera shot"
  />
</div>
          <strong>Close</strong>
        </div>
      </div>
      <div className="continuity-caption">
        <span>CONTINUITY LOCKED</span>
        <div className="continuity-progress">
          <i />
        </div>
      </div>
    </div>
  );
}
/* =========================================================
   FEATURE 04 — CINEMATIC
   ========================================================= */
function CinematicVisual() {
  return (
    <div className="cinematic-visual">

      {/* MAIN WIDE SHOT */}
      <div className="cinematic-frame cinematic-frame-large">
        <img
          src="/images/detective-wide.png"
          alt="Wide cinematic detective scene"
        />

        <div className="cinematic-overlay">
          <span>24mm</span>
          <span>WIDE</span>
        </div>
      </div>

      {/* MEDIUM SHOT */}
      <div className="cinematic-frame cinematic-frame-small top">
        <img
          src="/images/detective-medium.png"
          alt="Medium cinematic shot"
        />
        <span>50mm</span>
      </div>

      {/* CLOSE SHOT */}
      <div className="cinematic-frame cinematic-frame-small bottom">
        <img
          src="/images/detective-close.png"
          alt="Close cinematic shot"
        />
        <span>85mm</span>
      </div>

      <div className="cinematic-crosshair">
        <span />
        <span />
      </div>

    </div>
  );
}
/* =========================================================
   FEATURE 05 — AUDIO
   ========================================================= */
function AudioVisual() {
  return (
    <div className="audio-visual">
      <div className="audio-card">
        <div className="audio-header">
          <span>SCENE 04</span>
          <span>00:17</span>
        </div>
        <div className="audio-row">
          <div className="audio-icon">VO</div>
          <div className="audio-info">
            <strong>Detective · Calm</strong>
            <span>Voice</span>
          </div>
          <div className="audio-wave voice-wave">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="audio-row">
          <div className="audio-icon music-icon">♪</div>
          <div className="audio-info">
            <strong>Midnight City</strong>
            <span>Music</span>
          </div>
          <div className="audio-wave music-wave">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="audio-row">
          <div className="audio-icon">FX</div>
          <div className="audio-info">
            <strong>Rain · Street</strong>
            <span>Sound design</span>
          </div>
          <div className="audio-wave fx-wave">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="audio-tags">
        <span>VOICE</span>
        <span>MUSIC</span>
        <span>MOOD</span>
        <span>SFX</span>
      </div>
    </div>
  );
}
/* =========================================================
   FEATURE 06 — CHAT EDITING
   ========================================================= */
function ChatVisual() {
  return (
    <div className="chat-visual">
      <img
        src="/images/chat-editor.png"
        alt="Visl AI video editor with conversational editing and before-and-after previews"
        className="chat-editor-image"
      />
    </div>
  );
}