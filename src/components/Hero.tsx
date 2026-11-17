import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import curriculumPdf from "@/assets/archieve/curriculum_jonh.pdf";
import profilePhoto from "@/assets/foto_rosto.jpg";
import Aurora from "./fx/Aurora";
import InkBackground from "./fx/InkBackground";
import RotatingWord from "./fx/RotatingWord";
import Magnetic from "./fx/Magnetic";
import { SplitWords } from "./fx/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  const { t } = useLanguage();
  const h = t.home.hero;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  const fadeUp = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease } };

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background layers */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        {/* Aurora is the fallback if WebGL is unavailable; the ink canvas paints over it */}
        <Aurora />
        <InkBackground />
        <div className="absolute inset-0 tech-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="container flex flex-1 flex-col justify-center pb-10 pt-32 sm:pt-40">
        {/* Status chip with face — trust before anything else */}
        <motion.div {...fadeUp(0.05)} className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border py-1 pl-1 pr-4 text-xs sm:text-sm"
          style={{ borderColor: "hsl(var(--foreground) / 0.12)", background: "hsl(var(--background) / 0.4)", backdropFilter: "blur(10px)" }}>
          <img src={profilePhoto} alt="Jonh Wili" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
          <span className="whitespace-nowrap font-heading font-semibold text-foreground">Jonh Wili</span>
          <span className="h-3 w-px bg-foreground/20" aria-hidden="true" />
          <span className="live-dot" aria-hidden="true" />
          <span className="text-foreground/80">{h.status}</span>
        </motion.div>

        <h1 className="max-w-[16ch] font-heading text-[clamp(2.75rem,8vw,7.25rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
          <SplitWords text={h.line1} animateOnMount delay={0.15} className="block" />
          <span className="block">
            <SplitWords text={h.line2} animateOnMount delay={0.3} />{" "}
            <motion.span {...fadeUp(0.45)} className="inline-block">
              <RotatingWord words={h.words} className="accent-serif" wordClassName="text-aura pr-[0.1em]" />
            </motion.span>
          </span>
        </h1>

        <motion.p {...fadeUp(0.6)} className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {h.sub}
        </motion.p>

        <motion.div {...fadeUp(0.75)} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Link to="/contact" className="btn-signal group">
              {h.ctaProject}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Magnetic>
          <Magnetic>
            <a href={curriculumPdf} download="curriculum_jonh.pdf" className="btn-ghost">
              <Download className="h-4 w-4" /> {h.ctaCV}
            </a>
          </Magnetic>
          <Link to="/projects" className="group ml-1 inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {h.ctaWork}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom meta rail */}
      <motion.div {...fadeUp(0.9)} className="container relative pb-8">
        <div className="flex items-end justify-between gap-6 border-t pt-5" style={{ borderColor: "hsl(var(--foreground) / 0.1)" }}>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {h.meta.map((m) => <li key={m}>{m}</li>)}
          </ul>
          <div className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:flex" aria-hidden="true">
            {h.scroll}
            <span className="relative block h-8 w-px overflow-hidden bg-foreground/15">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-primary"
                animate={reduce ? undefined : { y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
