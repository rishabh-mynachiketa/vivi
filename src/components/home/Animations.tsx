import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { GOOGLE_FORM_URL } from "../../constants";
import "./Animations.css";

/* =========================================================
   VIDEO DATA

   Put your videos in:

   public/videos/

   Then list their filenames here.
========================================================= */

interface VideoProduction {
  id: string;
  category: string;
  title: string;
  description: string;
  video: string;
  prompt: string;
  meta: string;
}

const VIDEO_PRODUCTIONS: VideoProduction[] = [
  {
    id: "kids-1",
    category: "KIDS STORIES",
    title: "The Magical Sunflower",
    description:
      "Two children plant a handful of seeds in their backyard and discover something wonderfully unexpected growing from the soil.",
    video: "/videos/kids.mp4",
    prompt:
      "Create a warm animated children's story about a young girl and boy who discover colorful seed packets and decide to plant them together in their backyard. Follow them as they dig the soil, plant and water the seeds, and watch a giant magical sunflower bloom. Make it playful, colorful, wholesome, imaginative, and suitable for children.",
    meta: "Kids · Magical Adventure",
  },

  {
    id: "kids-2",
    category: "KIDS STORIES",
    title: "A Day on the Farm",
    description:
      "A curious little cat and a friendly lamb explore a sunny farm, meeting new animal friends along the way.",
    video: "/videos/kids2.mp4",
    prompt:
      "Create a cheerful animated children's story following a curious orange cat and a friendly little lamb as they explore a beautiful countryside farm. Have them meet ducks, horses, cows, geese, rabbits, frogs, and other farm animals as they wander through fields, ponds, barns, and a nearby forest. Make it bright, playful, colorful, and full of gentle adventure.",
    meta: "Kids · Farm Adventure",
  },

  {
    id: "mythology-1",
    category: "MYTHOLOGY",
    title: "Krishna & The Sage",
    description:
      "A mythological tale unfolding in a luminous kingdom, where a young Krishna shares a moment of wisdom with an elderly sage.",
    video: "/videos/myth.mp4",
    prompt:
      "Create a cinematic Indian mythological story featuring young Krishna and an elderly sage carrying a traditional stringed instrument. Show them meeting in a magnificent celestial kingdom filled with palaces, gardens, temples, and glowing skies. Include Krishna walking through the kingdom, meeting the sage, entering a grand hall, and sharing a peaceful and emotional final moment together. Use rich Indian-inspired architecture, traditional clothing, warm golden lighting, and a magical mythological atmosphere.",
    meta: "Mythology · India",
  },
  {
    id: "mythology-2",
    category: "MYTHOLOGY",
    title: "Hanuman's Journey",
    description:
      "A cinematic mythological adventure following Hanuman through a mysterious underground world filled with ancient warriors and hidden chambers.",
    video: "/videos/myth2.mp4",
    prompt:
      "Create a cinematic Indian mythological adventure centered on Hanuman. Begin with Hanuman emerging from the ocean at sunrise, then follow him into a vast underground cave system where he encounters warriors and mysterious figures. Show dramatic cavern landscapes, ancient stone corridors, underground rivers, monumental doors, temples, and powerful confrontations. Build toward an intense final sequence inside an ancient underground chamber. Use epic Indian mythological visuals, dramatic lighting, detailed costumes, powerful compositions, and a grand cinematic atmosphere.",
    meta: "India · Mythology",
  },

  {
    id: "india-1",
    category: "INDIA",
    title: "A Village Summer",
    description:
      "A warm illustrated story of family, food, school, and everyday life in an Indian village.",
    video: "/videos/india.mp4",
    prompt:
      "Create a warm illustrated Indian family story set in a traditional village. Follow a family sharing a meal together, children going to school, a mother preparing food at home, children spending time with friends under a tree, and the family coming together again at sunset on the rooftop. Show mud-plastered homes, courtyards, village streets, bicycles and scooters, traditional kitchens, local markets, and everyday Indian family life. Use a hand-painted animated storybook style with warm earthy colors and nostalgic lighting.",
    meta: "India · Family Story",
  },

  {
    id: "microdrama-1",
    category: "MICRODRAMA",
    title: "The Last Walk",
    description:
      "A woman spends a restless night working alone before stepping outside and taking a quiet walk into the fading evening.",
    video: "/videos/microdrama.mp4",
    prompt:
      "Create a cinematic psychological microdrama about a woman alone at home late at night. Begin with her sitting on the edge of her bed in a dark bedroom, then show her working alone on a laptop at night. Transition between nighttime and daylight as she sits by a window, gathers her thoughts, and eventually walks alone down a quiet stone path at sunset. Keep the dialogue minimal and let the mood, expressions, lighting, and changing environment carry the story. Make it intimate, atmospheric, contemplative, and emotionally ambiguous.",
    meta: "Microdrama · Psychological",
  },

  {
    id: "microdrama-2",
    category: "MICRODRAMA",
    title: "The Conversation",
    description:
      "A tense conversation unfolds between three people in an intimate room, with a seemingly ordinary exchange growing increasingly uneasy.",
    video: "/videos/microdrama2.mp4",
    prompt:
      "Create a cinematic psychological microdrama set inside a warmly lit, intimate home. Center the story around a tense conversation between three adults: a woman in a dark coat, an older man seated in an armchair, and another woman who watches and later speaks from the room. Use close-ups of their expressions, pauses, body language, and shifting reactions to gradually build tension. Include moments where one woman sits alone thinking before returning to the conversation. End with an emotionally ambiguous final exchange. Use realistic performances, warm low-key lighting, restrained camera movement, and a tense dramatic atmosphere.",
    meta: "Microdrama · Drama",
  },
  {
    id: "microdrama-3",
    category: "MICRODRAMA",
    title: "The Weaver's Secret",
    description:
      "In a medieval village, a young woman encounters figures from the royal court and uncovers a mysterious story tied to a precious necklace.",
    video: "/videos/microdrama3.mp4",
    prompt:
      "Create a cinematic historical drama set in a medieval European-inspired village. Follow a young woman working in a humble stone house as she encounters a mysterious cloaked man, speaks with a young boy, and is eventually brought into a royal palace. Show her meeting the queen and later returning to her village, where she discovers or reveals a beautiful necklace. Use cobblestone streets, stone cottages, candlelit interiors, royal costumes, dramatic palace interiors, and an atmospheric historical visual style.",
    meta: "History · Historical Drama",
  },
];

const VIDEO_CATEGORIES = [
  "KIDS STORIES",
  "MYTHOLOGY",
  "INDIA",
  "MICRODRAMA",
];

const CATEGORY_COLORS: Record<string, string> = {
  "KIDS STORIES": "#55b98a",
  MYTHOLOGY: "#d9a45b",
  INDIA: "#e46f7d",
  MICRODRAMA: "#a56be8",
};

const getCategoryColor = (category: string): string =>
  CATEGORY_COLORS[category.toUpperCase()] ?? "#7892b4";


/* =========================================================
   COMPONENT
========================================================= */

function Animations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] =
    useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const autoplayTimer = useRef<number | null>(null);

  const activeVideo =
    VIDEO_PRODUCTIONS[activeIndex];

  const previousIndex =
    (activeIndex -
      1 +
      VIDEO_PRODUCTIONS.length) %
    VIDEO_PRODUCTIONS.length;

  const nextIndex =
    (activeIndex + 1) %
    VIDEO_PRODUCTIONS.length;


  /* =========================================================
     CHANGE VIDEO
  ========================================================= */

  const changeVideo = useCallback(
    (direction: "next" | "previous") => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      setActiveIndex((current) => {
        if (direction === "next") {
          return (
            (current + 1) %
            VIDEO_PRODUCTIONS.length
          );
        }

        return (
          (current -
            1 +
            VIDEO_PRODUCTIONS.length) %
          VIDEO_PRODUCTIONS.length
        );
      });

      setProgressKey((value) => value + 1);

      if (transitionTimer.current) {
        window.clearTimeout(
          transitionTimer.current
        );
      }

      transitionTimer.current =
        window.setTimeout(() => {
          setIsTransitioning(false);
        }, 700);
    },
    [isTransitioning]
  );

  const changeVideoRef = useRef(changeVideo);

  useEffect(() => {
    changeVideoRef.current = changeVideo;
  }, [changeVideo]);


  /* =========================================================
     DIRECT NAVIGATION
  ========================================================= */

  const goToVideo = useCallback(
    (index: number) => {
      if (
        index === activeIndex ||
        isTransitioning
      ) {
        return;
      }

      setIsTransitioning(true);
      setActiveIndex(index);
      setProgressKey((value) => value + 1);

      if (transitionTimer.current) {
        window.clearTimeout(
          transitionTimer.current
        );
      }

      transitionTimer.current =
        window.setTimeout(() => {
          setIsTransitioning(false);
        }, 700);
    },
    [activeIndex, isTransitioning]
  );


  /* =========================================================
     AUTOPLAY
     
     Every 4 seconds:
     
     01 → 02 → 03 → 04 → 05 → 01
     
     Pauses on hover and while the video modal is open.
  ========================================================= */

  useEffect(() => {
    if (!isInView || isPaused || isModalOpen) return;

    autoplayTimer.current =
      window.setTimeout(() => {
        changeVideoRef.current("next");
      }, 4000);

    return () => {
      if (autoplayTimer.current) {
        window.clearTimeout(
          autoplayTimer.current
        );
      }
    };
  }, [
    activeIndex,
    isInView,
    isPaused,
    isModalOpen,
  ]);


  /* =========================================================
     LOAD VIDEOS ONLY NEAR THE VIEWPORT

     Videos are large, so nothing is downloaded until the
     section is about to scroll into view.
  ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);


  /* =========================================================
     MODAL SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);


  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        window.clearTimeout(
          transitionTimer.current
        );
      }

      if (autoplayTimer.current) {
        window.clearTimeout(
          autoplayTimer.current
        );
      }
    };
  }, []);


  /* =========================================================
     PLAY ACTIVE VIDEO
     
     Whenever activeIndex changes, explicitly restart
     the active video from the beginning.
  ========================================================= */

  useEffect(() => {
    const video = document.querySelector(
      ".vivi-video-card-current video"
    ) as HTMLVideoElement | null;

    if (!video) return;

    video.currentTime = 0;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Browser may block autoplay.
        // The video is muted, so this normally succeeds.
      }
    };

    playVideo();
  }, [activeIndex, isInView]);


  /* =========================================================
     KEYBOARD
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const target =
        event.target as HTMLElement;

      /*
       * Don't hijack keyboard navigation while
       * someone is typing in an input.
       */
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight"
      ) {
        event.preventDefault();
        changeVideo("next");
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();
        changeVideo("previous");
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [changeVideo, isModalOpen]);


  /* =========================================================
     TOUCH / SWIPE
  ========================================================= */

  const touchStartY =
    useRef<number | null>(null);

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    touchStartY.current =
      event.touches[0].clientY;
  };

  const handleTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (
      touchStartY.current === null
    ) {
      return;
    }

    const endY =
      event.changedTouches[0].clientY;

    const distance =
      touchStartY.current - endY;

    touchStartY.current = null;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance > 0) {
      changeVideo("next");
    } else {
      changeVideo("previous");
    }
  };


  /* =========================================================
     START CREATING
     
     The CURRENT video's prompt is passed into Studio.
  ========================================================= */

  const startCreating = () => {
  window.open(
    GOOGLE_FORM_URL,
    "_blank",
    "noopener,noreferrer"
  );
};


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
    <section
      ref={sectionRef}
      className="vivi-openart-showcase"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="vivi-showcase-header">
        <div>
          <div className="vivi-showcase-overline">
            Made With Visl
          </div>

          <h2>
            One platform.
            <br />
            <span>
              Every kind of story.
            </span>
          </h2>

          <p>
            Explore what creators can make
            with Visl. Browse the
            productions and start with any
            story that inspires you.
          </p>
        </div>

        <div className="vivi-category-legend" aria-label="Video categories">
          {VIDEO_CATEGORIES.map((category) => (
            <span
              className={`vivi-category-legend-item ${
                activeVideo.category === category ? "active" : ""
              }`}
              key={category}
              style={{ "--category-color": getCategoryColor(category) } as React.CSSProperties}
            >
              <i aria-hidden="true" />
              {category}
            </span>
          ))}
        </div>
      </div>


      {/* =====================================================
          MAIN EXPERIENCE
      ===================================================== */}

      <div className="vivi-showcase">

        {/* ===================================================
            VIDEO SIDE
        =================================================== */}

        <div className="vivi-showcase-stage">

          {/* -----------------------------------------------
              PREVIOUS ARROW
          ------------------------------------------------ */}

          <button
            type="button"
            className="vivi-stage-arrow vivi-stage-arrow-up"
            onClick={() =>
              changeVideo("previous")
            }
            aria-label="Previous video"
          >
            <span>↑</span>
          </button>


          {/* -----------------------------------------------
              VIDEO STACK
          ------------------------------------------------ */}

          <div
            className={`vivi-video-stack ${
              isTransitioning
                ? "is-transitioning"
                : ""
            }`}
          >

            {/* -------------------------------------------
                PREVIOUS VIDEO
            -------------------------------------------- */}

            <div className="vivi-video-card vivi-video-card-previous">
              {isInView && (
                <video
                  src={
                    VIDEO_PRODUCTIONS[
                      previousIndex
                    ].video
                  }
                  muted
                  playsInline
                  preload="metadata"
                />
              )}

              <div className="vivi-video-card-glass" />
            </div>


            {/* -------------------------------------------
                CURRENT VIDEO
            -------------------------------------------- */}

            <div className="vivi-video-card vivi-video-card-current">

              {isInView && (
                <video
                  key={activeVideo.id}
                  src={activeVideo.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              )}

              <div className="vivi-video-overlay" />


              {/* TOP */}

              <div className="vivi-video-top">

                <span
                  className="vivi-video-badge"
                  style={{ "--category-color": getCategoryColor(activeVideo.category) } as React.CSSProperties}
                >
                  {activeVideo.category}
                </span>

                <div className="vivi-video-top-actions">
                  <span className="vivi-video-number">
                  {String(
                    activeIndex + 1
                  ).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    className="vivi-video-expand"
                    onClick={() => setIsModalOpen(true)}
                    aria-label={`Expand ${activeVideo.title} video`}
                    title="Expand video"
                  >
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>

              </div>


              {/* BOTTOM */}

              <div className="vivi-video-bottom">

                <div>
                  <span
                    className="vivi-video-category-label"
                    style={{ "--category-color": getCategoryColor(activeVideo.category) } as React.CSSProperties}
                  >
                    {activeVideo.category}
                  </span>

                  <strong>
                    {activeVideo.title}
                  </strong>
                </div>

              </div>

            </div>


            {/* -------------------------------------------
                NEXT VIDEO
            -------------------------------------------- */}

            <div className="vivi-video-card vivi-video-card-next">

              {isInView && (
                <video
                  src={
                    VIDEO_PRODUCTIONS[
                      nextIndex
                    ].video
                  }
                  muted
                  playsInline
                  preload="metadata"
                />
              )}

              <div className="vivi-video-card-glass" />

            </div>

          </div>


          {/* -----------------------------------------------
              NEXT ARROW
          ------------------------------------------------ */}

          <button
            type="button"
            className="vivi-stage-arrow vivi-stage-arrow-down"
            onClick={() =>
              changeVideo("next")
            }
            aria-label="Next video"
          >
            <span>↓</span>
          </button>


          {/* -----------------------------------------------
              AUTOPLAY STATUS
          ------------------------------------------------ */}

          <div className="vivi-autoplay-indicator">

            <span
              className={
                isPaused
                  ? "vivi-autoplay-dot paused"
                  : "vivi-autoplay-dot"
              }
            />

            <span>
              {isPaused || isModalOpen
                ? "Paused"
                : "Auto playing"}
            </span>

          </div>


          {/* -----------------------------------------------
              DOTS
          ------------------------------------------------ */}

          <div className="vivi-showcase-dots">

            {VIDEO_PRODUCTIONS.map(
              (video, index) => (
                <button
                  key={video.id}
                  type="button"
                  className={
                    index === activeIndex
                      ? "active"
                      : ""
                  }
                  style={{ "--category-color": getCategoryColor(video.category) } as React.CSSProperties}
                  onClick={() =>
                    goToVideo(index)
                  }
                  aria-label={`Show ${video.title}`}
                  aria-current={
                    index === activeIndex
                      ? "true"
                      : undefined
                  }
                />
              )
            )}

          </div>


          {/* -----------------------------------------------
              PROGRESS
          ------------------------------------------------ */}

          <div className="vivi-showcase-progress">

            <div
              key={progressKey}
              className={
                isPaused || isModalOpen
                  ? "vivi-showcase-progress-fill paused"
                  : "vivi-showcase-progress-fill"
              }
            />

          </div>

        </div>


        {/* ===================================================
            INFORMATION PANEL
        =================================================== */}

        <aside className="vivi-showcase-panel">

          <div className="vivi-panel-top">

            <span
              className="vivi-panel-eyebrow"
              style={{ "--category-color": getCategoryColor(activeVideo.category) } as React.CSSProperties}
            >
              {activeVideo.category}
            </span>

            <h3>
              {activeVideo.title}
            </h3>

            <p>
              {activeVideo.description}
            </p>

          </div>


          {/* -----------------------------------------------
              PROMPT
          ------------------------------------------------ */}

          <div className="vivi-prompt-card">

            <div className="vivi-prompt-header">

              <span className="vivi-prompt-icon">
                ✦
              </span>

              <span>
                CREATE THIS WITH VISL
              </span>

            </div>

            <p>
              {activeVideo.prompt}
            </p>

          </div>


          {/* -----------------------------------------------
              META
          ------------------------------------------------ */}

          <div className="vivi-production-meta">

            <span>
              {activeVideo.meta}
            </span>

            <span className="vivi-meta-dot">
              •
            </span>

            <span>
              AI generated
            </span>

          </div>


          {/* -----------------------------------------------
              CTA
          ------------------------------------------------ */}

          <button
            type="button"
            className="vivi-create-button"
            onClick={startCreating}
          >

            <span>
              Start creating
            </span>

            <span className="vivi-create-arrow">
              →
            </span>

          </button>


          <span className="vivi-create-hint">
            The prompt will open in Visl Studio.
          </span>


          {/* -----------------------------------------------
              PANEL FOOTER
          ------------------------------------------------ */}

          <div className="vivi-panel-footer">

            <span>
              {String(
                activeIndex + 1
              ).padStart(2, "0")}
            </span>

            <div />

            <span>
              {String(
                VIDEO_PRODUCTIONS.length
              ).padStart(2, "0")}
            </span>

          </div>

        </aside>

      </div>



    </section>

      {isModalOpen && createPortal(
        <div
          className="vivi-video-modal"
          role="presentation"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="vivi-video-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeVideo.title} video preview`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="vivi-video-modal-header">
              <div className="vivi-video-modal-heading">
                <span
                  className="vivi-video-modal-category"
                  style={{ "--category-color": getCategoryColor(activeVideo.category) } as React.CSSProperties}
                >
                  {activeVideo.category}
                </span>
                <h3>{activeVideo.title}</h3>
              </div>
              <button
                type="button"
                className="vivi-video-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close video"
              >
                ×
              </button>
            </div>

            <div className="vivi-video-modal-player">
              <button
                type="button"
                className="vivi-modal-nav vivi-modal-nav-previous"
                onClick={() => changeVideo("previous")}
                aria-label="Previous video"
              >
                <span aria-hidden="true">‹</span>
              </button>

              <video
                key={`modal-${activeVideo.id}`}
                src={activeVideo.video}
                controls
                autoPlay
                muted
                loop
                playsInline
              />

              <button
                type="button"
                className="vivi-modal-nav vivi-modal-nav-next"
                onClick={() => changeVideo("next")}
                aria-label="Next video"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <div className="vivi-video-modal-details">
              <p>{activeVideo.description}</p>
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(VIDEO_PRODUCTIONS.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default Animations;