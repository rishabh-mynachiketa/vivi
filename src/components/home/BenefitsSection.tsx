
import { useRef } from "react";
import "./BenefitsSection.css";

const benefits = [
  {
    id: "01",
    label: "TIME, REIMAGINED",
    metric: "80%",
    metricLabel: "LESS PRODUCTION TIME",
    title: "Create in minutes, not days.",
    description:
      "Turn days of editing into a simple creative process. Visl helps creators who stitch together clips, assets, and edits save up to 80% of their production time.",
    className: "benefit-time",
  },
  {
    id: "02",
    label: "READY FROM THE START",
    metric: "01",
    metricLabel: "FIRST DRAFT",
    title: "Your first draft feels production-ready.",
    description:
      "Skip endless iterations. Visl understands your intent and creates polished, cinematic videos that are ready to refine and share.",
    className: "benefit-ready",
  },
  {
    id: "03",
    label: "CREATIVE FREEDOM",
    metric: "∞",
    metricLabel: "POSSIBILITIES",
    title: "Professional storytelling without professional tools.",
    description:
      "Make cinematic long-form videos without learning complex editing software, production workflows, or animation tools.",
    className: "benefit-creative",
  },
  {
    id: "04",
    label: "INTELLIGENT PRODUCTION",
    metric: "AI",
    metricLabel: "MODEL SELECTION",
    title: "Pay for what you need.",
    description:
      "Visl automatically chooses the right AI models for every task — balancing quality, speed, and cost so you get the best output without overspending.",
    className: "benefit-smart",
  },
];

function BenefitVisual({ id }: { id: string }) {
  switch (id) {
    case "01":
      return (
        <div className="benefit-visual visual-time" aria-hidden="true">
          <div className="time-clock">
            <span className="clock-hand clock-hand-hour" />
            <span className="clock-hand clock-hand-minute" />
            <span className="clock-center" />
          </div>
          <div className="time-timeline">
            <div className="timeline-label">TRADITIONAL</div>
            <div className="timeline-track traditional-track">
              <span />
            </div>
            <div className="timeline-label">WITH VISL</div>
            <div className="timeline-track vivi-track">
              <span />
            </div>
            <div className="time-saved-tag">80% faster</div>
          </div>
          <span className="time-sparkle sparkle-one">✦</span>
          <span className="time-sparkle sparkle-two">✧</span>
        </div>
      );

    
case "02":
  return (
    <div className="benefit-visual visual-ready" aria-hidden="true">
      <div className="draft-window">
        <div className="draft-window-top">
          <span /><span /><span />
          <small>YOUR VIDEO</small>
        </div>

        <div className="draft-scene">
          <img
            src="/benefits/production-ready.png"
            alt=""
          />
          <div className="scene-play">▶</div>
          <div className="scene-shine" />
        </div>

        <div className="draft-progress">
          <span />
        </div>
      </div>

      <div className="ready-check">✓</div>
      <span className="ready-sparkle">✦</span>
    </div>
  );


    
case "03":
  return (
    <div className="benefit-visual visual-creative" aria-hidden="true">
      <div className="creative-orbit orbit-one" />
      <div className="creative-orbit orbit-two" />

      <div className="creative-center">
        <span>✦</span>
        <small>YOUR IDEA</small>
      </div>

      <div className="creative-scene scene-a">
        <img src="/benefits/creative-scene-1.png" alt="" />
      </div>

      <div className="creative-scene scene-b">
        <img src="/benefits/creative-scene-2.png" alt="" />
      </div>

      <div className="creative-scene scene-c">
        <img src="/benefits/creative-scene-3.png" alt="" />
      </div>

      <div className="creative-scene scene-d">
        <img src="/benefits/creative-scene-4.png" alt="" />
      </div>
    </div>
  );


    case "04":
      return (
        <div className="benefit-visual visual-smart" aria-hidden="true">
          <div className="smart-panel">
            <div className="smart-panel-heading">
              <span className="smart-ai-icon">✳</span>
              <div>
                <strong>Visl AI</strong>
                <small>MODEL OPTIMIZATION</small>
              </div>
              <span className="smart-status" />
            </div>
            <div className="smart-option">
              <span>QUALITY</span>
              <div className="smart-bar"><i className="quality-bar" /></div>
              <b>High</b>
            </div>
            <div className="smart-option">
              <span>SPEED</span>
              <div className="smart-bar"><i className="speed-bar" /></div>
              <b>Fast</b>
            </div>
            <div className="smart-option">
              <span>COST</span>
              <div className="smart-bar"><i className="cost-bar" /></div>
              <b>Smart</b>
            </div>
            <div className="smart-selected">
              <span>✓</span> Optimal model selected
            </div>
          </div>
          <span className="smart-sparkle">✦</span>
        </div>
      );

    default:
      return null;
  }
}

export function BenefitsSection() {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    if (window.matchMedia("(hover: none)").matches) return;

    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 5;
    const rotateX = (0.5 - y) * 5;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${x * 100}%`);
    card.style.setProperty("--mouse-y", `${y * 100}%`);
  };

  const resetCard = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <section  id="vivi-benefits" className="benefits-section">
      <div className="benefits-inner">
        <div className="benefits-header">
          <div className="section-overline">
            The Visl Advantage
          </div>

          <h2 className="benefits-heading">
            Create more.
            <span> Spend less time producing.</span>
          </h2>

          <p className="benefits-subheading">
            What changes when you create with Visl.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`benefit-card ${benefit.className}`}
              onMouseMove={(event) => handleMouseMove(event, index)}
              onMouseLeave={() => resetCard(index)}
              tabIndex={0}
            >
              <div className="benefit-card-top">
                <span className="benefit-number">
                  {benefit.id}
                </span>

                <span className="benefit-label">
                  {benefit.label}
                </span>
              </div>

              <BenefitVisual id={benefit.id} />

              <div className="benefit-metric">
                <span className="benefit-metric-value">
                  {benefit.metric}
                </span>

                <span className="benefit-metric-label">
                  {benefit.metricLabel}
                </span>
              </div>

              <div className="benefit-content">
                <h3 className="benefit-title">
                  {benefit.title}
                </h3>

                <p className="benefit-description">
                  {benefit.description}
                </p>
              </div>

              <div className="benefit-card-accent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
