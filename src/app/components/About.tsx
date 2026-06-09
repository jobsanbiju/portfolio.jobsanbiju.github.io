import { motion, useReducedMotion } from 'motion/react';
import aboutImg from '../../../images/about.webp';
import HalationText from './HalationText';

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative min-h-[720px] overflow-hidden section-fade md:min-h-[85vh]">
      <img
        src={aboutImg}
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 px-5 py-16 sm:px-6 sm:py-20 md:py-28">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            <h2 className="mb-6 text-3xl text-white sm:text-4xl md:text-5xl font-display tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.2em] uppercase">
              <HalationText glowColor="rgba(255,60,60,1)" blurAmount="9px" opacity={0.42}>
                Meet Job
              </HalationText>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
              I'm Job San Biju, a filmmaker and cinematographer focused on capturing honest moments
              with a cinematic edge. I care about texture, pacing, and the quiet details that make
              a story feel real.
            </p>
            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              From documentaries and commercials to music videos and narrative work, my goal is
              always the same: make each frame feel intentional and emotionally grounded.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/70 sm:gap-6 sm:text-xs sm:tracking-[0.45em] font-display">
              <span>Documentary</span>
              <span>Commercial</span>
              <span>Narrative</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
