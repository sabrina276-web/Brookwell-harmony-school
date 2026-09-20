import { ChangeEvent, FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { school } from '../data/school';
import './Admissions.css';

type FormState = {
  parentName: string;
  childName: string;
  phone: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  parentName: '',
  childName: '',
  phone: '',
  email: '',
  message: '',
};

function Admissions() {
  const [form, setForm] = useState<FormState>(initialState);

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleWhatsApp = () => {
  const message =
    `*Admissions Enquiry — Brookwell Harmony School*\n\n` +
    `Parent/Guardian Name: ${form.parentName}\n` +
    `Child's Name: ${form.childName}\n` +
    `Phone: ${form.phone}\n` +
    `${form.email ? `Email: ${form.email}\n` : ''}\n` +
    `Message:\n${form.message}`;

  const whatsappNumber = school.whatsapp.replace(/\D/g, '');

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    '_blank'
  );
};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Admissions Enquiry — ${form.childName || 'New Learner'}`
    );
    const body = encodeURIComponent(
      `Parent/Guardian Name: ${form.parentName}\n` +
        `Child's Name: ${form.childName}\n` +
        `Phone: ${form.phone}\n` +
        `Email: ${form.email}\n\n` +
        `Message:\n${form.message}`
    );

    window.location.href = `mailto:${school.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="admissions" className="admissions section">
      <div className="container admissions__grid">
        <motion.div
          className="admissions__intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">Admissions</span>
          <h2 className="admissions__title">Begin the Brookwell journey.</h2>
          <p className="admissions__body">
            We'd love to welcome your family. Send us an enquiry and our
            admissions team will be in touch to guide you through the next
            steps.
          </p>
          <ul className="admissions__contact-list">
  <li>
    <span className="admissions__contact-label">Location</span>
    <span>{school.location}</span>
  </li>

  <li>
    <span className="admissions__contact-label">Phone</span>
    <a href={`tel:${school.phone}`}>{school.phone}</a>
  </li>

  <li>
    <span className="admissions__contact-label">WhatsApp</span>
    <a
      href={`https://wa.me/${school.whatsapp.replace(/\D/g, '')}`}
      target="_blank"
      rel="noreferrer"
    >
      {school.whatsapp}
    </a>
  </li>

  <li>
    <span className="admissions__contact-label">Email</span>
    <a href={`mailto:${school.email}`}>{school.email}</a>
  </li>
</ul>
        </motion.div>

        <motion.form
          className="admissions__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >

          <div className="admissions__form-header">
  <span className="admissions__form-eyebrow">Start an enquiry</span>
  <h3>Let's begin your Brookwell journey.</h3>
  <p>
    Tell us a little about your child and our admissions team will guide you
    through the next steps.
  </p>
</div>
         <div className="admissions__field">
  <label htmlFor="parentName">Parent / Guardian Name</label>
  <input
    id="parentName"
    name="parentName"
    type="text"
    placeholder="e.g. Jane Doe"
    required
    value={form.parentName}
    onChange={handleChange('parentName')}
  />
</div>

<div className="admissions__field">
  <label htmlFor="childName">Child's Name</label>
  <input
    id="childName"
    name="childName"
    type="text"
    placeholder="e.g. John Doe"
    required
    value={form.childName}
    onChange={handleChange('childName')}
  />
</div>

          <div className="admissions__row">
            <div className="admissions__field">
              <label htmlFor="phone">Phone</label>
              <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="e.g. 0712 345 678"
          required
          value={form.phone}
          onChange={handleChange('phone')}
        />
            </div>

            <div className="admissions__field">
              <label htmlFor="email">Email (Optional)</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. jane@example.com"
                value={form.email}
                onChange={handleChange('email')}
              />
            </div>
          </div>

          <div className="admissions__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us how we can help..."
              value={form.message}
              onChange={handleChange('message')}
            />
          </div>

          <div className="admissions__actions">
  <button
    type="button"
    className="btn btn--primary admissions__submit"
    onClick={handleWhatsApp}
  >
    Send via WhatsApp
  </button>

  <button
    type="submit"
    className="btn btn--secondary admissions__submit"
  >
    Send via Email
  </button>
</div>
          <p className="admissions__note">
  Choose WhatsApp or email to send your enquiry to Brookwell's admissions team.
</p>
        </motion.form>
      </div>
    </section>
  );
}

export default Admissions;
