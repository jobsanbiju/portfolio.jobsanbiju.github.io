import { motion, useReducedMotion } from 'motion/react';
import { Play, Award, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import thumb from '../../../images/thumb.webp';
import HalationText from './HalationText';

const films = [
  {
    id: 1,
    title: 'Airbnb - Find Your Somewhere',
    category: 'Spec Commercial',
    duration: '1 min',
    year: '2026',
    thumbnail: thumb,
    awards: 'Personal Project',
    vimeoId: '1144231456',
    vimeoHash: '1a141fa847',
  },
];

export function FilmShowcase() {
  const [activeFilmId, setActiveFilmId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const cardRefs = useRef(new Map<number, HTMLDivElement | null>());
  const hasFilms = films.length > 0;

  useEffect(() => {
    if (!isPlaying || activeFilmId === null) return;

    const target = cardRefs.current.get(activeFilmId) || null;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsPlaying(false);
          setActiveFilmId(null);
        }
      },
      { root: null, threshold: 0.2, rootMargin: '0px 0px -120px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [activeFilmId, isPlaying]);

  return (
    <section id="work" className="section-surface section-fade px-4 py-14 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mb-10 text-center md:mb-16"
        >
          <h2 className="mb-4 text-3xl text-white sm:text-4xl md:text-5xl"><HalationText glowColor="rgba(255,60,60,1)" blurAmount="16px" opacity={0.85}>Selected Works</HalationText></h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            A collection of films and videos that showcase my passion for visual storytelling
          </p>
        </motion.div>

        {hasFilms ? (
        <div className="mb-12 grid grid-cols-1 gap-5 md:mb-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {films.map((film, index) => {
            const isActive = activeFilmId === film.id;
            return (
            <motion.div
              key={film.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[16/10] min-w-0 overflow-hidden rounded-lg focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-white/80 sm:aspect-[16/9]"
              ref={(node) => cardRefs.current.set(film.id, node)}
            >
              {isActive && isPlaying && film.vimeoId ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <iframe
                    src={`https://player.vimeo.com/video/${film.vimeoId}?h=${film.vimeoHash}&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full"
                    title={`${film.title} - Job San Biju`}
                    allowFullScreen
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 z-30 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
                    aria-label={`Close ${film.title}`}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveFilmId(null);
                    }}
                  >
                    <X className="size-5" />
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity"></div>
                </>
              )}
              
              {/* Whole-card play target */}
              {!(isActive && isPlaying) && (
                <button
                  type="button"
                  className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
                  aria-label={`Play ${film.title}`}
                  onClick={() => {
                    setActiveFilmId(film.id);
                    setIsPlaying(true);
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex min-h-14 min-w-14 items-center justify-center rounded-full bg-white/20 p-4 opacity-100 backdrop-blur-sm transition duration-200 group-hover:scale-105 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
                  >
                    <Play className="size-8 text-white fill-white" />
                  </span>
                </button>
              )}

              {/* Film info */}
              <div
                className={`pointer-events-none absolute bottom-0 left-0 right-0 z-10 p-4 transition-opacity sm:p-6 ${
                  isActive && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-white/70 text-sm">{film.category}</span>
                  <span className="text-white/70 text-sm" aria-hidden="true">&middot;</span>
                  <span className="text-white/70 text-sm">{film.duration}</span>
                  <span className="text-white/70 text-sm" aria-hidden="true">&middot;</span>
                  <span className="text-white/70 text-sm">{film.year}</span>
                </div>
                <h3 className="mb-2 break-words text-lg text-white sm:text-xl"><HalationText glowColor="rgba(255,70,70,0.95)" blurAmount="10px" opacity={0.72}>{film.title}</HalationText></h3>
                <p className="text-white/70 text-sm flex items-center gap-1">
                  <Award className="size-4 shrink-0" />
                  <span className="min-w-0 break-words">{film.awards}</span>
                </p>
              </div>
            </motion.div>
          )})}
        </div>
        ) : (
          <div className="mx-auto mb-16 max-w-xl rounded-lg border border-white/15 bg-white/[0.04] px-6 py-10 text-center text-white/75">
            <p className="text-lg text-white">Selected work is being prepared.</p>
            <p className="mt-2 text-sm">For current reels and project availability, use the contact links below.</p>
          </div>
        )}

        {/* Stats removed */}
      </div>
    </section>
  );
}
