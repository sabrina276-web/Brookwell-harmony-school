import { motion } from 'framer-motion';
import { school } from '../data/school';
import './Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container contact__grid"> 
        <motion.div
  className="contact__info"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.8 }}
>
          <span className="eyebrow">Contact</span>
          <h2 className="contact__title">We'd love to hear from you.</h2>

          <dl className="contact__details">
            <div>
              <dt>Location</dt>
              <dd>{school.location}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${school.phone}`}>{school.phone}</a>
              </dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a
                  href={`https://wa.me/${school.whatsappDial}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {school.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${school.email}`}>{school.email}</a>
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          className="contact__map-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <iframe
            title="Map showing Nanyuki, Kenya"
            className="contact__map"
            src="https://www.google.com/maps?q=Nanyuki,Kenya&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p className="contact__map-note">
            Brookwell Harmony School is based in Nanyuki, Kenya. Get in touch
            for exact directions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
