import { motion, useReducedMotion } from 'motion/react';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import bgVideo from '../../../videos/Visual Storyteller.mp4';
import heroPoster from '../../../images/thumb.webp';
import HalationText from './HalationText';

export function Hero() {
  const [hasVideoError, setHasVideoError] = useState(false);
  const [prefersReducedData, setPrefersReducedData] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const shouldUsePosterOnly = prefersReducedData;
  const shouldUseVideo = !hasVideoError && !prefersReducedMotion && !shouldUsePosterOnly;

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;

    setPrefersReducedData(Boolean(connection?.saveData));
  }, []);

  return (
    <section id="hero" className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden pb-0 pt-20 md:min-h-[720px] md:pt-20">
      <div className="absolute inset-0">
        <img
          src={heroPoster}
          alt=""
          className="hero-media hero-media--drift absolute inset-0 z-0 h-full w-full object-cover"
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
        {shouldUseVideo && (
          <video
            src={bgVideo}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setHasVideoError(true)}
            className="hero-media hero-media--drift absolute inset-0 z-[1] h-full w-full object-cover"
            aria-hidden="true"
          />
        )}
        {/* softer overlay above video but below camera layers/content */}
        <div style={{ zIndex: 5 }} className="absolute inset-0 bg-black/45 pointer-events-none md:bg-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/85 via-black/42 to-transparent pointer-events-none md:h-48 md:from-black/70 md:via-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl -translate-y-[clamp(0.75rem,4svh,2rem)] px-5 text-center sm:px-6 md:translate-y-0">
        <div className="relative inline-block w-full">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            className="relative z-20 mb-4 text-[clamp(2.45rem,13.5vw,4rem)] leading-[1.04] text-white md:mb-6 md:text-7xl font-hero tracking-[0.045em] sm:tracking-[0.06em] md:tracking-[0.08em]"
          >
            <HalationText glowColor="rgba(255,60,60,1)" blurAmount="12px" opacity={0.68}>
              Job San Biju
            </HalationText>
          </motion.h1>
        </div>

        <div className="relative inline-block w-full max-w-2xl mx-auto">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="relative z-20 mb-6 text-lg text-white/80 md:mb-8 md:text-2xl"
          >
            <HalationText glowColor="rgba(255,80,70,0.98)" blurAmount="12px" opacity={0.62}>
              <span className="mx-auto flex max-w-full items-center justify-center gap-x-1.5 whitespace-nowrap text-[clamp(0.55rem,2.45vw,0.72rem)] uppercase leading-none tracking-[0.08em] text-white/75 min-[390px]:gap-x-2 min-[390px]:text-[clamp(0.6rem,2.5vw,0.8rem)] min-[390px]:tracking-[0.11em] sm:max-w-[min(100%,42rem)] sm:flex-wrap sm:gap-x-4 sm:gap-y-2 sm:text-[clamp(0.7rem,2.2vw,1.15rem)] sm:tracking-[0.28em] md:tracking-[0.32em]">
                <span>Filmmaker</span>
                <span aria-hidden="true">&middot;</span>
                <span>Cinematographer</span>
                <span aria-hidden="true">&middot;</span>
                <span>Colorist</span>
              </span>
              <span className="mx-auto mt-4 block max-w-[18rem] text-sm leading-relaxed text-white/85 sm:max-w-none md:text-base">
                Visual storytelling shaped through light, motion, and tone.
              </span>
            </HalationText>
          </motion.p>
        </div>

        <div className="relative inline-block">
          <motion.button
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.4 }}
            whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={() => {
              const element = document.getElementById('work');
              if (element) {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
              }
            }}
            type="button"
            className="relative z-20 inline-flex min-h-12 min-w-[11rem] items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-white transition-all hover:border-white/70 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80 sm:px-8 sm:py-4 group"
          >
            <Play className="size-5 transition-transform group-hover:scale-110" />
            <HalationText glowColor="rgba(255,80,70,0.95)" blurAmount="6px" opacity={0.38}>
              View My Work
            </HalationText>
          </motion.button>
        </div>

      </div>
      {/* Scroll Indicator (section-level so X/Y positioning matches previous layout) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 1 }}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 sm:block md:bottom-8"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2 halation-halo scroll-indicator-glow"
        >
          <HalationText glowColor="rgba(255,80,70,0.9)" blurAmount="8px" opacity={0.5}>
            <span className="w-1 h-2 bg-white/50 rounded-full block" />
          </HalationText>
        </motion.div>
      </motion.div>
    </section>
  );
}
