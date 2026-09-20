import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';
import CircularText from './CircularText';

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section id="home" ref={ref} className="hero">
      <motion.div
        className="hero__image-wrap"
        style={{ scale: imageScale, y: imageY }}
      >
        <img
          src="/assets/images/hero-parade.jpg"
          alt="Brookwell Harmony School learners marching together in celebration at a school event"
          className="hero__image"
        />
        <div className="hero__overlay" aria-hidden="true" />
      </motion.div>

        <CircularText
    text="BROOKWELL HARMONY • NANYUKI • KENYA • "
    spinDuration={20}
    className="hero__circle hero__circle--left"
  />

      <motion.div
        className="hero__content container"
        style={{ opacity: contentOpacity, y: contentY }}
      >
       {/*
        <CurvedLoop
    marqueeText="BROOKWELL HARMONY SCHOOL · NANYUKI, KENYA · "
    curveAmount={150}
    speed={1.5}
  />
  */}

        <motion.h1
          className="hero__headline"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Where learning becomes a journey.
        </motion.h1>

        <motion.p
          className="hero__subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          A nurturing home for curious minds — where every learner is known,
          encouraged, and given room to grow beyond the classroom.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <a href="#admissions" className="btn btn--primary">
            Enquire About Admissions
          </a>
                  <a href="#about" className="btn btn--ghost">
            Explore Brookwell
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        aria-hidden="true"
      >
        <span className="hero__scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}

export default Hero;
