import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/BookingDialog";
import suaveSts from "@/assets/suave-sts.jpg";

const portfolioImages = [
  "/54714191642_027527d4fa_b.jpg",
  "/DSC05775.jpg",
  "/DSC06511-Enhanced-NR-2.jpg",
  "/DSC07857.jpg",
  "/DSC07881.jpg",
  "/DSC09481.jpg",
];

// Tilt-enabled portfolio photo tile
const TiltPhoto = ({ url, index }: { url: string; index: number }) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.04,1.04,1.04)`;
  };

  const onMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
    >
      <div
        ref={tiltRef}
        className="rounded-md overflow-hidden bg-muted"
        style={{ willChange: "transform", breakInside: "avoid" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <img
          src={url}
          alt={`Suave.sts portfolio ${index + 1}`}
          loading="lazy"
          className="w-full h-auto block transition-transform duration-700 hover:scale-[1.04]"
        />
      </div>
    </motion.div>
  );
};

const PhotoSection = () => (
  <div className="bg-surface-light">

    {/* ── Full-width Hero ──────────────────────────────────────────── */}
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      <img
        src={suaveSts}
        alt="Suave.sts"
        className="w-full h-full object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_95%)] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0_0%_95%)]/60 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="absolute bottom-12 left-6 md:left-16 lg:left-24"
      >
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-2 font-medium">
          Photographer
        </p>
        <h2 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-surface-light-foreground leading-none">
          Suave<span className="text-primary">.sts</span>
        </h2>
      </motion.div>
    </div>

    {/* ── About ────────────────────────────────────────────────────── */}
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65 }}
      className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-24"
    >
      <div className="max-w-3xl">
        <h3 className="font-display text-4xl md:text-5xl tracking-wider text-surface-light-foreground mb-8">
          About
        </h3>
        <p className="text-[hsl(0_0%_30%)] text-lg leading-relaxed mb-6">
          Suave.sts is a cameraman that can always catch the vibe in any
          scenario you put him in. Not only is he a great time to be around, but
          he always knows how to get the right angle at the right time.
        </p>
        <p className="text-[hsl(0_0%_30%)] text-lg leading-relaxed">
          His duality between taking photos/videos for events makes him
          versatile for any type of moment that comes his way. He is always well
          equipped to capture the perfect moment at any given time.
        </p>
      </div>
    </motion.div>

    {/* ── Portfolio Grid ───────────────────────────────────────────── */}
    <div className="w-full px-6 md:px-16 lg:px-24 pb-16">
      <motion.h3
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="font-display text-4xl md:text-5xl tracking-wider text-surface-light-foreground mb-10"
      >
        Portfolio
      </motion.h3>
      <div className="columns-2 md:columns-3 gap-3 md:gap-4">
        {portfolioImages.map((url, i) => (
          <div key={i} className="break-inside-avoid mb-3 md:mb-4">
            <TiltPhoto url={url} index={i} />
          </div>
        ))}
      </div>
    </div>

    {/* ── Flickr ───────────────────────────────────────────────────── */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="w-full px-6 md:px-16 lg:px-24 pb-14"
    >
      <a
        href="https://www.flickr.com/photos/202447537@N08/"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-4 border-t border-[hsl(0_0%_80%)] pt-8 w-full"
      >
        <span className="text-xs tracking-[0.25em] uppercase text-[hsl(0_0%_50%)] transition-colors duration-300 group-hover:text-primary">
          Full Portfolio
        </span>
        <span className="h-px flex-1 bg-[hsl(0_0%_80%)] transition-colors duration-300 group-hover:bg-primary/40" />
        <span className="text-xs tracking-[0.2em] uppercase text-[hsl(0_0%_50%)] transition-colors duration-300 group-hover:text-primary">
          Flickr →
        </span>
      </a>
    </motion.div>

    {/* ── CTA ──────────────────────────────────────────────────────── */}
    <div className="w-full px-6 md:px-16 lg:px-24 pb-20 space-y-6">
      <BookingDialog defaultMember="suave">
        <Button
          size="lg"
          className="gradient-purple btn-shine text-primary-foreground font-semibold px-12 py-6 text-lg"
        >
          Book Photographer
        </Button>
      </BookingDialog>

      <div className="flex flex-wrap gap-6 items-center">
        <a
          href="tel:+18458578284"
          className="flex items-center gap-2 text-sm text-[hsl(0_0%_40%)] hover:text-primary transition-colors duration-200"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.6 5.08 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +1 (845) 857-8284
        </a>
        <a
          href="https://www.instagram.com/suave.sts?igsh=cjZyZ2F0NHJucTZo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[hsl(0_0%_40%)] hover:text-primary transition-colors duration-200"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          @suave.sts
        </a>
      </div>
    </div>
  </div>
);

export default PhotoSection;
