import { motion } from 'framer-motion';
import './About.css';

function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">

        <motion.div
          className="about__image-wrap"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/assets/images/early-years-circle.jpg"
            alt="Early years learners at Brookwell Harmony School gathered together during an activity"
            className="about__image"
          />
          <div className="about__image-frame" aria-hidden="true" />
        </motion.div>

        <motion.div
          className="about__content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
        >
          <div className="about__number" aria-hidden="true">
            <span>01</span>
            <span>About Brookwell</span>
          </div>

          <h2 className="about__title">
            Nurturing talents.
            <br />
            Building futures.
          </h2>

          <p className="about__lead">
            Where every child shines.
          </p>

          <p className="about__body">
            Brookwell Harmony School brings together learning, talent and
            opportunity in an environment where every child can discover and
            develop their potential.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default About;