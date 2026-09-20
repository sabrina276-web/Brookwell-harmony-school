import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, school } from '../data/school';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__bar container">
        <a href="#home" className="header__brand">
  <img
    src="/assets/images/brookwell-logo.png"
    alt="Brookwell Harmony School"
    className="header__logo"
  />

  <span className="header__brand-name">
    {school.name}
  </span>
</a>

        <nav className="header__nav" aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a href="#admissions" className="btn btn--primary header__cta">
            Enquire
          </a>
          <button
            type="button"
            className="header__toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`header__toggle-line ${menuOpen ? 'is-open' : ''}`} />
            <span className={`header__toggle-line ${menuOpen ? 'is-open' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="header__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                 <a
  href={item.href}
  onClick={(e) => {
    e.preventDefault();

    const target = document.querySelector(item.href);

    setMenuOpen(false);

    setTimeout(() => {
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        window.history.replaceState(null, '', item.href);
      }
    }, 150);
  }}
>
  {item.label}
</a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#admissions"
              className="btn btn--primary"
              onClick={() => setMenuOpen(false)}
            >
              Enquire About Admissions
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
