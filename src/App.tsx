import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Values from './components/Values';
import Academics from './components/Academics';
import WhyBrookwell from './components/WhyBrookwell';
import LifeAtBrookwell from './components/LifeAtBrookwell';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Admissions from './components/Admissions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Values />
        <Academics />
        <WhyBrookwell />
        <LifeAtBrookwell />
        <Gallery />
        <Testimonials />
        <Admissions />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
