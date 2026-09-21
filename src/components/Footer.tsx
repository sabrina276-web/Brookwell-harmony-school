import { nav, school } from '../data/school';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="footer__brand-name">{school.name}</span>
          <p>{school.location}</p>
          <a href="#admissions" className="btn btn--primary footer__cta">
            Enquire About Admissions
          </a>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <span className="footer__heading">Navigation</span>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contact">
          <span className="footer__heading">Contact</span>

          <a href={`tel:${school.phone}`}>{school.phone}</a>

          <a
            href={`https://wa.me/${school.whatsappDial}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp: {school.whatsapp}
          </a>

          <a href={`mailto:${school.email}`}>{school.email}</a>

          <div className="footer__socials">
            <span className="footer__heading">Follow Us</span>

            <div className="footer__social-links">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/brookwellharmonyschool"
                target="_blank"
                rel="noreferrer"
                aria-label="Brookwell Harmony School on Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/brookwellharmonyschoolnanyuki/"
                target="_blank"
                rel="noreferrer"
                aria-label="Brookwell Harmony School on Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a22 22 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1V10H8v3h2.4v8h3.1Z"
                  />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@brookwell.harmony.school"
                target="_blank"
                rel="noreferrer"
                aria-label="Brookwell Harmony School on TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M15.5 4c.4 1.9 1.5 3.1 3.5 3.2v3a7 7 0 0 1-3.4-1v6.3a5.1 5.1 0 1 1-4.4-5v3a2.2 2.2 0 1 0 1.4 2V4h2.9Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {school.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;