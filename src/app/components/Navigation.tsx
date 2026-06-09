import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBrand(entry.intersectionRatio < 0.6);
      },
      { root: null, threshold: [0, 0.6, 1] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg py-2.5 md:py-3' : 'bg-black/40 backdrop-blur-sm py-3 md:py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:flex-col md:gap-2 md:justify-center">
        <button
          type="button"
          className="flex min-h-11 min-w-0 max-w-[72vw] items-center gap-2 cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
          onClick={() => scrollToSection('hero')}
          aria-label="Scroll to hero"
        >
          <span
            className={`truncate text-white text-xl sm:text-2xl md:text-4xl font-hero tracking-[0.08em] transition-opacity duration-300 ${
              showBrand ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            Job San Biju
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <button
            type="button"
            onClick={() => scrollToSection('work')}
            className="text-white/80 hover:text-white transition-colors text-[0.7rem] uppercase tracking-[0.4em] font-display focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="text-white/80 hover:text-white transition-colors text-[0.7rem] uppercase tracking-[0.4em] font-display focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="text-white/80 hover:text-white transition-colors text-[0.7rem] uppercase tracking-[0.4em] font-display focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="mt-3 border-t border-white/10 bg-black/90 py-3 backdrop-blur-lg md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4">
            <button type="button" onClick={() => scrollToSection('work')} className="min-h-12 rounded-md px-1 text-left text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80">
              Work
            </button>
            <button type="button" onClick={() => scrollToSection('about')} className="min-h-12 rounded-md px-1 text-left text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80">
              About
            </button>
            <button type="button" onClick={() => scrollToSection('contact')} className="min-h-12 rounded-md px-1 text-left text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80">
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
