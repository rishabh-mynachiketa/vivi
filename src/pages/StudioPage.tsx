import { useEffect, useState, type KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageNavigation } from '../components/common/PageNavigation';
import { ROUTES } from '../lib/routes';
import { trackCtaClick } from '../lib/analytics';

export function StudioPage() {
  const [prompt, setPrompt] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialPrompt = params.get('prompt');
    if (initialPrompt) setPrompt(initialPrompt);
  }, [location.search]);

  const startCreating = () => {
    trackCtaClick({
      cta_name: 'start_creating',
      destination: 'visl_25',
      location: 'studio_page',
      button_text: 'Start creating',
    });
    navigate(ROUTES.VISL_25);
  };

  const handlePromptKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      startCreating();
    }
  };

  return (
    <PageNavigation>
      <div id="page-studio" className="page">
        <div className="studio-header">
          <a href="#page-home" className="studio-logo">
            <div className="studio-logo-icon">V</div>
            <span className="studio-logo-name">Visl</span>
          </a>
          <span className="studio-product-label">A Visl AI Product</span>
          <div style={{ flex: 1 }} />
          <button type="button" className="studio-top-btn">✦ Visl Studio</button>
        </div>

        <div className="studio-creation">
          <h1 className="studio-headline">
            What should we <span className="handwrite-card"><span className="handwrite-text">create?</span></span>
          </h1>
          <p className="studio-sub">Describe the story or paste a link. Visl will guide the rest.</p>
          <div className="studio-input-box">
            <textarea
              className="studio-textarea"
              placeholder="A woman gets into a rickshaw at night after her phone dies. The driver keeps taking wrong turns. The door is child-locked."
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={handlePromptKeyDown}
            />
            <div className="studio-input-footer">
              <span className="studio-hint">Starts from the written prompt only</span>
              <button type="button" className="studio-create-btn" onClick={startCreating}>
                → Start creating
              </button>
            </div>
          </div>
          <p className="studio-keyboard-hint">Enter to submit&nbsp; · &nbsp;Shift+Enter for a new line</p>
        </div>

        <div className="studio-recent">
          <div className="studio-recent-overline">From your studio</div>
          <div className="studio-recent-h">Recent productions</div>
          <div className="studio-productions">
            <div className="studio-prod-card">
              <div className="studio-prod-thumb grad-history">🚂<span className="studio-prod-status">Ready</span></div>
              <div className="studio-prod-body"><div className="studio-prod-title">The Kakori Conspiracy</div><div className="studio-prod-meta">History · 6:48 · Cinematic</div></div>
            </div>
            <div className="studio-prod-card">
              <div className="studio-prod-thumb grad-micro">🎭<span className="studio-prod-status">Ready</span></div>
              <div className="studio-prod-body"><div className="studio-prod-title">The Session</div><div className="studio-prod-meta">Microdrama · 2:31 · Psych thriller</div></div>
            </div>
            <div className="studio-prod-card">
              <div className="studio-prod-thumb grad-kids">🔭<span className="studio-prod-status">Ready</span></div>
              <div className="studio-prod-body"><div className="studio-prod-title">Grandpa Telescope</div><div className="studio-prod-meta">Kids · 4:20 · Pixar 3D</div></div>
            </div>
          </div>
        </div>
      </div>
    </PageNavigation>
  );
}
