import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { school } from '../data/school';
import './Testimonials.css';

function Testimonials() {
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [permission, setPermission] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Parent Story — ${name}`
    );

    const body = encodeURIComponent(
      `Parent/Guardian Name: ${name}\n\n` +
        `Experience:\n${story}\n\n` +
        `Permission to share this story: ${
          permission ? 'Yes' : 'No'
        }`
    );

    window.location.href = `mailto:${school.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="testimonials section" id="parent-voices">
      <div className="container">
        <motion.div
          className="testimonials__card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">Parent Voices</span>

          <h2 className="testimonials__title">
            The voices behind the journey.
          </h2>

          <p className="testimonials__body">
            Every Brookwell journey is shared with a family. We invite
            parents and guardians to share their experience with our
            community.
          </p>

          <a href="#parent-story" className="btn btn--dark">
            Share your experience
          </a>
        </motion.div>

        <motion.div
          id="parent-story"
          className="testimonials__form-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="testimonials__form-intro">
            <span className="eyebrow">Your Story</span>

            <h3>Tell us about your Brookwell experience.</h3>

            <p>
              Your words can help other families understand what it
              means to be part of the Brookwell community.
            </p>
          </div>

          <form
            className="testimonials__form"
            onSubmit={handleSubmit}
          >
            <div className="testimonials__field">
              <label htmlFor="parent-name">
                Your Name
              </label>

              <input
                id="parent-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Jane Doe"
                required
              />
            </div>

            <div className="testimonials__field">
              <label htmlFor="parent-story">
                Your Experience
              </label>

              <textarea
                id="parent-story"
                value={story}
                onChange={(event) => setStory(event.target.value)}
                placeholder="Tell us about your experience with Brookwell..."
                rows={7}
                required
              />
            </div>

            <label className="testimonials__consent">
              <input
                type="checkbox"
                checked={permission}
                onChange={(event) =>
                  setPermission(event.target.checked)
                }
              />

              <span>
                I give Brookwell Harmony School permission to consider
                sharing my story on its website and school communications.
              </span>
            </label>

            <button
              type="submit"
              className="btn btn--dark testimonials__submit"
              disabled={!permission}
            >
              Share My Story
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;