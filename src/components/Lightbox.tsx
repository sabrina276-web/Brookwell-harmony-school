import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Lightbox.css';

type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  images: LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

function Lightbox({ images, activeIndex, onClose, onNavigate }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && activeIndex !== null) {
        onNavigate((activeIndex + 1) % images.length);
      } else if (event.key === 'ArrowLeft' && activeIndex !== null) {
        onNavigate((activeIndex - 1 + images.length) % images.length);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, activeIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && activeIndex !== null && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="lightbox__close"
            onClick={onClose}
            aria-label="Close image viewer"
          >
            ×
          </button>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>

          <motion.figure
            key={activeIndex}
            className="lightbox__figure"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={images[activeIndex].src} alt={images[activeIndex].alt} />
            {images[activeIndex].caption && (
              <figcaption>{images[activeIndex].caption}</figcaption>
            )}
          </motion.figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex + 1) % images.length);
            }}
          >
            ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Lightbox;
