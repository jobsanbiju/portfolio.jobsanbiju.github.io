import { motion, useReducedMotion } from 'motion/react';
import { Instagram, Mail } from 'lucide-react';
import HalationText from './HalationText';

const email = 'job@jobsanbiju.com';
const instagramUrl = 'https://instagram.com/jobsanbiju';

export function Contact() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="section-surface section-fade px-5 py-16 sm:px-6 sm:py-18 md:py-24">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center"
        >
          <p className="mb-4 font-display text-[0.68rem] uppercase tracking-[0.34em] text-white/58 sm:text-xs sm:tracking-[0.46em]">
            Projects / Collaborations
          </p>
          <h2 className="mx-auto mb-5 max-w-[12ch] text-balance font-display text-[clamp(2.15rem,9vw,4.65rem)] leading-[0.98] tracking-[0.03em] text-white sm:max-w-none">
            <HalationText glowColor="rgba(255,60,60,1)" blurAmount="10px" opacity={0.52}>
              Let's Create Together
            </HalationText>
          </h2>
          <p id="contact-intro" className="mx-auto mb-9 max-w-[60ch] text-base leading-[1.75] text-white/78 sm:text-lg">
            Have a project in mind? Send the brief, the feeling, or the unfinished thought. Feature, commercial, music video, documentary: if it needs light, motion, and a point of view, reach out.
          </p>

          <div className="mx-auto mb-8 grid max-w-2xl grid-cols-1 gap-3 text-white/88 sm:grid-cols-2 sm:gap-4">
            <motion.a
              href={`mailto:${email}?subject=Project%20inquiry`}
              className="group inline-flex min-h-16 min-w-0 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.035] px-5 py-3 text-left transition-colors hover:border-white/42 hover:bg-white/[0.065] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
              aria-label={`Email Job San Biju at ${email}`}
              aria-describedby="contact-intro"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <Mail className="size-5 shrink-0" />
              <span className="min-w-0">
                <span className="block font-display text-[0.68rem] uppercase tracking-[0.28em] text-white/62 transition-colors group-hover:text-white/72">
                  Email
                </span>
                <span className="mt-1 block min-w-0 break-all text-sm leading-snug text-white sm:text-base" dir="auto">
                  {email}
                </span>
              </span>
            </motion.a>
            <motion.a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-16 min-w-0 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.035] px-5 py-3 text-left transition-colors hover:border-white/42 hover:bg-white/[0.065] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
              aria-label="Open Job San Biju on Instagram"
              aria-describedby="contact-intro"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <Instagram className="size-5 shrink-0" />
              <span className="min-w-0">
                <span className="block font-display text-[0.68rem] uppercase tracking-[0.28em] text-white/62 transition-colors group-hover:text-white/72">
                  Instagram
                </span>
                <span className="mt-1 block min-w-0 break-words text-sm leading-snug text-white sm:text-base" dir="auto">
                  @jobsanbiju
                </span>
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
      {/* Footer */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
        className="container mx-auto mt-14 max-w-7xl border-t border-white/15 pt-7 text-center text-sm text-white/70 md:mt-20 md:pt-8 md:text-base"
      >
        <p>&copy; 2026 Job San Biju. All rights reserved.</p>
        <p className="mt-2 text-sm italic font-serif text-white/80">I Love You</p>
      </motion.div>
    </section>
  );
}
