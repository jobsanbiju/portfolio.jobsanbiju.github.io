import { Navigation } from '@/app/components/Navigation';
import { Hero } from '@/app/components/Hero';
import { FilmShowcase } from '@/app/components/FilmShowcase';
import { About } from '@/app/components/About';
import { Contact } from '@/app/components/Contact';

export default function App() {
  return (
    <div className="min-h-screen site-bg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <FilmShowcase />
        <About />
        <Contact />
      </main>
    </div>
  );
}
