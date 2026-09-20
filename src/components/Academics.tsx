import { motion } from 'framer-motion';
import './Academics.css';

const pillars = [
  {
    title: 'Foundations',
    description:
      'Early learning built on strong literacy, numeracy and social skills.',
  },
  {
    title: 'Guided Exploration',
    description:
      'Structured lessons balanced with room for questions, curiosity and discovery.',
  },
  {
    title: 'Personal Growth',
    description:
      'Progress measured not only in results, but in confidence and character.',
  },
];

function Academics() {
  return (
    <section id="academics" className="academics section">
      <div className="container">
        <motion.div
          className="academics__intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">Academics</span>

          <h2 className="academics__title">
            A thoughtful learning journey.
          </h2>

          <p className="academics__lead">
            Our approach to academics is built step by step — helping each
            learner move from foundational skills toward independent,
            confident thinking.
          </p>
        </motion.div>

        <div className="academics__cards">
          {pillars.map((pillar, i) => (
            <motion.div
              className="academics__card"
              key={pillar.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.75,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="academics__card-inner">
                <div className="academics__card-face academics__card-front">
                  <span className="academics__card-number">
                    {`0${i + 1}`}
                  </span>

                  <div className="academics__card-front-content">
                    <h3>{pillar.title}</h3>

                    <span className="academics__card-hint">
                      Explore <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </div>

                <div className="academics__card-face academics__card-back">
                  <span className="academics__card-number">
                    {`0${i + 1}`}
                  </span>

                  <div className="academics__card-back-content">
                    <h3>{pillar.title}</h3>

                    <p>{pillar.description}</p>

                    <span className="academics__card-back-line" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Academics;