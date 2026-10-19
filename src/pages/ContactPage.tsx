import type { CSSProperties } from 'react';
import { PageNavigation } from '../components/common/PageNavigation';

export function ContactPage() {
  return (
    <PageNavigation>
      <div id="page-contact" className="page">
  <div className="contact-wrap">
    {/* <a href="#page-resources" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '24px', display: 'inline-block' } as CSSProperties}>← Resources</a> */}
    <div className="section-overline">Contact</div>
    <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(36px,5vw,52px)', fontWeight: '700', color: 'var(--text)', marginBottom: '8px', lineHeight: '1.1' } as CSSProperties}>We read every message.</h1>
    <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '32px' } as CSSProperties}>Typical response time: 24-48 hours.</p>
    <div className="contact-form">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } as CSSProperties}>
        <div className="form-group">        <label className="form-label">Name</label>        <input className="form-input" type="text" placeholder="Your name" /></div>
        <div className="form-group">        <label className="form-label">Email</label>        <input className="form-input" type="email" placeholder="you@email.com" /></div>
      </div>
      <div className="form-group">      <label className="form-label">Type of inquiry</label>      <select className="form-select">      <option>General question</option>      <option>Bug report</option>      <option>Enterprise / team plan</option>      <option>Press / media</option>      <option>Creator partnership</option>      <option>Other</option></select></div>
      <div className="form-group">      <label className="form-label">Message</label>      <textarea className="form-textarea" placeholder="Tell us what is on your mind..."></textarea></div>
      <button className="btn-primary btn-large" style={{ width: '100%' } as CSSProperties}>Send message</button>
    </div>
    {/* <div className="contact-alt">
      <div className="contact-alt-card">
        <div className="contact-alt-icon">💬</div>
        <div className="contact-alt-h">Discord Community</div>
        <p className="contact-alt-p">Join 600+ creators. Get help, share videos, vote on story ideas.</p>
        <a href="#page-community" style={{ fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' } as CSSProperties}>Join server →</a>
      </div>
      <div className="contact-alt-card">
        <div className="contact-alt-icon">📧</div>
        <div className="contact-alt-h">Email</div>
        <p className="contact-alt-p">hello@visl.ai · privacy@visl.ai · legal@visl.ai</p>
      </div>
    </div>
    <div className="contact-alt" style={{ marginTop: '12px' } as CSSProperties}>
      <div className="contact-alt-card" style={{ gridColumn: 'span 2' } as CSSProperties}>
        <div className="contact-alt-icon">🏠</div>
        <div className="contact-alt-h">Registered Office</div>
        <p className="contact-alt-p">Big Bets Private Limited · [Address, City, State, PIN] · India · CIN: [XXXXXXXXX]</p>
      </div>
    </div> */}
  </div>
</div>
    </PageNavigation>
  );
}
