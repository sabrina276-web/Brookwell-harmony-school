import { motion } from 'framer-motion';
import './Testimonials.css';

function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        <motion.div
          className="testimonials__card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">Parent Voices</span>
          <h2 className="testimonials__title">The voices behind the journey</h2>
          <p className="testimonials__body">
            Every Brookwell journey is shared with a family. If you're a parent and would like to share your
            experience, we'd love to hear from you.
          </p>
          <a href="#contact" className="btn btn--dark">
            Share your experience
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
