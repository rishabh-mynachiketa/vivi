// import { useRef } from 'react';
import Animations from './Animations';
import './Animations.css';

// type GalleryItem = {
//   category: string;
//   title: string;
//   className?: string;
//   background?: string;
// };

// const galleryItems: GalleryItem[] = [
//   {
//     category: 'Microdrama',
//     title: 'The Session · 2:31',
//     className: 'grad-micro',
//   },
//   {
//     category: 'History · India',
//     title: 'The Kakori Conspiracy · 6:48',
//     className: 'grad-history',
//   },
//   {
//     category: 'Kids · Science',
//     title: "Grandpa's Telescope · 4:20",
//     className: 'grad-kids',
//   },
//   {
//     category: 'Adult Animation',
//     title: 'Last Train from Churchgate · 6:12',
//     className: 'grad-ghibli',
//   },
//   {
//     category: 'History · Global',
//     title: 'Chernobyl Divers · 6:55',
//     background: 'linear-gradient(135deg,#0d1a0d,#1a3d1a)',
//   },
//   {
//     category: 'Microdrama',
//     title: 'Borrowed Time · 2:47',
//     background: 'linear-gradient(135deg,#1a0d1a,#2a1a3a)',
//   },
//   {
//     category: 'Kids · Fantasy',
//     title: 'The Painting Came Alive · 4:35',
//     background: 'linear-gradient(135deg,#1a1a0d,#3a3a1a)',
//   },
//   {
//     category: 'History · India',
//     title: 'Smiling Buddha · 6:30',
//     background: 'linear-gradient(135deg,#0d0d1a,#1a1a3d)',
//   },
// ];

export function HomeShowcaseAndGallery() {
  // const galleryTrackRef = useRef<HTMLDivElement>(null);

  // const scrollGallery = (direction: -1 | 1) => {
  //   const track = galleryTrackRef.current;
  //   if (!track) return;

  //   track.scrollBy({
  //     left: direction * track.clientWidth * 0.85,
  //     behavior: 'smooth',
  //   });
  // };

  return (
    <>
      <div id="visl-explore-mount">
        <Animations />
      </div>

      <hr className="divider" />

      {/*
        ============================================================
        VIDEO GALLERY STRIP — TEMPORARILY DISABLED
        ============================================================

        Keeping the complete gallery code here so it can be
        re-enabled later.

        The arrows are also inside this commented block, so they
        will NOT appear on mobile while the gallery is disabled.
      */}

      {/*
      <div className="gallery-strip">
        <div className="gallery-header">
          <div className="gallery-arrows">
            <button
              type="button"
              className="gallery-arrow gallery-arrow-prev"
              aria-label="Previous production"
              onClick={() => scrollGallery(-1)}
            >
              ❮
            </button>

            <button
              type="button"
              className="gallery-arrow gallery-arrow-next"
              aria-label="Next production"
              onClick={() => scrollGallery(1)}
            >
              ❯
            </button>
          </div>
        </div>

        <div className="gallery-track" ref={galleryTrackRef}>
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className={`gallery-item${
                item.className ? ` ${item.className}` : ''
              }`}
              style={
                item.background
                  ? { background: item.background }
                  : undefined
              }
            >
              <div className="gallery-item-cat">
                {item.category}
              </div>

              <div className="gallery-item-title">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      */}

      <hr className="divider" />
    </>
  );
}