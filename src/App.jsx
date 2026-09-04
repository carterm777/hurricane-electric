import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Reviews from './components/Reviews.jsx'
import TrustBanner from './components/TrustBanner.jsx'
import WhyUs from './components/WhyUs.jsx'
import Services from './components/Services.jsx'
import Story from './components/Story.jsx'
import Coverage from './components/Coverage.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import CallBar from './components/CallBar.jsx'

/* Fixed top-of-page order, per the brief:
   Header -> Hero -> Google Reviews -> Trust Badges Banner -> everything else. */

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip To Main Content</a>
      <Header />
      <main id="main">
        <Hero />
        <Reviews />
        <TrustBanner />
        <WhyUs />
        <Services />
        <Story />
        <Coverage />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <CallBar />
    </>
  )
}
