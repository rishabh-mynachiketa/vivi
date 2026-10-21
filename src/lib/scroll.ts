import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function scrollToSectionTarget(sectionId: string, smooth = true): () => void {
  const behavior: ScrollBehavior = smooth ? 'smooth' : 'auto';
  let frame1 = 0;
  let frame2 = 0;
  let retryTimer = 0;

  frame1 = window.requestAnimationFrame(() => {
    frame2 = window.requestAnimationFrame(() => {
      if (sectionId === 'Visl-workflow-showcase') {
        ScrollTrigger.refresh();
        const trigger = ScrollTrigger.getById('Visl-workflow-horizontal');
        if (trigger) {
          window.scrollTo({
            top: trigger.start,
            behavior,
          });
          return;
        }

        const fallback = document.getElementById(sectionId);
        if (fallback) {
          fallback.scrollIntoView({ behavior, block: 'start' });
        }

        retryTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
          const t = ScrollTrigger.getById('Visl-workflow-horizontal');
          if (t) {
            window.scrollTo({
              top: t.start,
              behavior,
            });
          }
        }, 150);
        return;
      }

      const target =
        document.getElementById(sectionId) ??
        (sectionId === 'vivi-pricing'
          ? document.querySelector('.pricing-section')
          : null);

      if (target) {
        target.scrollIntoView({
          behavior,
          block: 'start',
        });
      }
    });
  });

  return () => {
    window.cancelAnimationFrame(frame1);
    window.cancelAnimationFrame(frame2);
    if (retryTimer) {
      window.clearTimeout(retryTimer);
    }
  };
}
