import { motion } from 'framer-motion';
import { values } from '../data/school';
import './Values.css';

function Values() {
  return (
    <section className="values section">
      <div className="container">
        <motion.div
          className="values__intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">What we stand for</span>
          <h2 className="values__title">The values that shape every day.</h2>
        </motion.div>

        <ul className="values__list">
          {values.map((value, i) => (
            <motion.li
              key={value.number}
              className="values__row"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
            >
              <span className="values__number">{value.number}</span>
              <h3 className="values__name">{value.title}</h3>
              <p className="values__desc">{value.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Values;
