import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Offer from '@/components/Offer';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-mud-dark">
      <Header />
      <main className="bg-mud-dark">
        <Hero />
        <Offer />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}