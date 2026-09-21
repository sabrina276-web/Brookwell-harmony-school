import { motion } from 'framer-motion';
import './WhyBrookwell.css';

const reasons = [
  {
    title: 'A nurturing environment',
    description: 'Every child is known by name, and by who they are becoming.',
  },
  {
    title: 'Confidence, built daily',
    description: 'Learners are given real opportunities to speak, try and lead.',
  },
  {
    title: 'Creativity with purpose',
    description: 'Dance, art and performance sit alongside the academic day.',
  },
  {
    title: 'A true community',
    description: 'Families, teachers and learners share in the journey together.',
  },
];

function WhyBrookwell() {
  return (
    <section id="why-brookwell" className="why section">
      <div className="container why__grid">
        <motion.div
          className="why__image-wrap"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/assets/images/ballet-performance.jpg"
            alt="Brookwell learners performing ballet in white costumes"
            className="why__image"
          />
        </motion.div>

        <div className="why__content">
          <span className="eyebrow">Why Brookwell</span>
          <h2 className="why__title">Why families choose Brookwell.</h2>

          <div className="why__list">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                className="why__item"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyBrookwell;
