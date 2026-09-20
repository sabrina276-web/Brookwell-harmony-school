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
