import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { lifeCards, LifeCard } from '../data/school';
import './LifeAtBrookwell.css';

const AUTOPLAY_DURATION = 5000;

function LifeAtBrookwell() {
  const reduceMotion = useReducedMotion() ?? false;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const total = lifeCards.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
    setProgressKey((key) => key + 1);
  };

  const goNext = () => {
    goTo(activeIndex + 1);
  };

  const goPrevious = () => {
    goTo(activeIndex - 1);
  };

  /*
   * AUTO-SCROLL
   *
   * Every 5 seconds the carousel moves to the next card.
   * It pauses while the user is interacting with the carousel.
   */
  useEffect(() => {
    if (reduceMotion || isPaused || total <= 1) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % total);
      setProgressKey((key) => key + 1);
    }, AUTOPLAY_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, reduceMotion, total]);

  /*
   * KEYBOARD NAVIGATION
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goNext();
      }

      if (event.key === 'ArrowLeft') {
        goPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const getCard = (offset: number): LifeCard => {
    return lifeCards[(activeIndex + offset + total) % total];
  };

  const previousCard = getCard(-1);
  const activeCard = getCard(0);
  const nextCard = getCard(1);

  return (
    <section
      id="life"
      className="life"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="life__intro container">
        <span className="eyebrow eyebrow--light">
          Life at Brookwell
        </span>

        <h2 className="life__headline">
          More Than a Classroom.
        </h2>

        <p className="life__subtext">
          Discover the experiences, talents and moments that make everyday
          life at Brookwell special.
        </p>
      </div>

      <div className="life__carousel container">
        {/* LEFT ARROW */}
        <button
          type="button"
          className="life__arrow life__arrow--left"
          onClick={goPrevious}
          aria-label="Previous experience"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="life__carousel-stage">

          {/* PREVIOUS CARD */}
          <motion.button
            type="button"
            className="life__side-card life__side-card--left"
            onClick={goPrevious}
            aria-label={`View ${previousCard.headline}`}
            animate={{
              x: 0,
              scale: 1,
              opacity: 0.72,
            }}
            whileHover={{
              x: -8,
              scale: 1.03,
              opacity: 1,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              src={previousCard.image}
              alt=""
              className="life__side-image"
            />

            <span className="life__side-shade" />
          </motion.button>

          {/* ACTIVE CARD */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.article
              key={activeCard.id}
              className="life__active-card"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 80,
                      scale: 0.94,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      x: -80,
                      scale: 0.94,
                    }
              }
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="life__active-image-wrap">
                <img
                  src={activeCard.image}
                  alt={activeCard.alt}
                  className="life__active-image"
                />

                <div className="life__active-overlay" />
              </div>

              <div className="life__active-content">
                <div className="life__active-meta">
                  <span className="life__active-index">
                    {activeCard.index}
                  </span>

                  <span className="eyebrow eyebrow--light">
                    {activeCard.category}
                  </span>
                </div>

                <h3>{activeCard.headline}</h3>

                <p>{activeCard.description}</p>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* NEXT CARD */}
          <motion.button
            type="button"
            className="life__side-card life__side-card--right"
            onClick={goNext}
            aria-label={`View ${nextCard.headline}`}
            animate={{
              x: 0,
              scale: 1,
              opacity: 0.72,
            }}
            whileHover={{
              x: 8,
              scale: 1.03,
              opacity: 1,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              src={nextCard.image}
              alt=""
              className="life__side-image"
            />

            <span className="life__side-shade" />
          </motion.button>
        </div>

        {/* RIGHT ARROW */}
        <button
          type="button"
          className="life__arrow life__arrow--right"
          onClick={goNext}
          aria-label="Next experience"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* PROGRESS */}
      <div className="life__controls container">
        <div
          className="life__progress"
          role="tablist"
          aria-label="Life at Brookwell experiences"
        >
          {lifeCards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`View ${card.headline}`}
              className={`life__progress-item ${
                index === activeIndex
                  ? 'life__progress-item--active'
                  : ''
              }`}
              onClick={() => goTo(index)}
            >
              <span className="life__progress-track">
                {index === activeIndex && !reduceMotion && !isPaused && (
                  <motion.span
                    key={progressKey}
                    className="life__progress-fill"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: AUTOPLAY_DURATION / 1000,
                      ease: 'linear',
                    }}
                  />
                )}

                {index === activeIndex && (reduceMotion || isPaused) && (
                  <span className="life__progress-fill life__progress-fill--paused" />
                )}
              </span>
            </button>
          ))}
        </div>

        <span className="life__counter">
          {String(activeIndex + 1).padStart(2, '0')}
          {' / '}
          {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="life__closing container">
        <span className="eyebrow">
          Life at Brookwell
        </span>

        <h3 className="life__closing-line">
          Where every day becomes part of the journey.
        </h3>
      </div>
    </section>
  );
}

export default LifeAtBrookwell;