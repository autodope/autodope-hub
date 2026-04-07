import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/BookingDialog";
import VideoModal from "@/components/VideoModal";
import { useTilt } from "@/hooks/useTilt";
import j5 from "@/assets/j5.jpg";
import j5WorkThumb from "@/assets/j5-work-thumbnail.jpg";

const VideoSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  // 3D tilt for the featured work card — max 5° rotation, subtle scale
  const { ref: cardRef, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>({
    maxDeg: 5,
    scale: 1.018,
    perspective: 950,
  });

  return (
    <div className="bg-background">

      {/* ── Full-width Hero ────────────────────────────────────────── */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={j5}
          alt="J5"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

        {/* Ambient purple haze — breathes in background */}
        <div
          className="absolute inset-0 hero-ambient-glow pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 70%, hsl(270 70% 55% / 0.12) 0%, transparent 65%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="absolute bottom-12 left-6 md:left-16 lg:left-24"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-2 font-medium">
            Videographer / Editor
          </p>
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-foreground text-glow leading-none">
            J<span className="text-primary">5</span>
          </h2>
        </motion.div>
      </div>

      {/* ── About ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65 }}
        className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-24"
      >
        <div className="max-w-3xl">
          <h3 className="font-display text-4xl md:text-5xl tracking-wider text-foreground mb-8">
            About
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            I specialize in video editing that transforms moments into immersive
            visual experiences. My editing style blends cinematic storytelling with
            a strong thematic direction, often inspired by video game aesthetics
            and nostalgic VHS-style visuals.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I focus on building momentum throughout each video layering pacing,
            sound, and visual effects to create a steady buildup that leads to a
            powerful highlight moment. Whether it's capturing the energy of a live
            event, enhancing entertainment content, or crafting engaging visual
            narratives, my goal is to deliver edits that feel dynamic, memorable,
            and uniquely styled.
          </p>
        </div>
      </motion.div>

      {/* ── Featured Work ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65 }}
        className="w-full px-6 md:px-16 lg:px-24 pb-16"
      >
        <h3 className="font-display text-4xl md:text-5xl tracking-wider text-foreground mb-2">
          Work
        </h3>
        <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase mb-10">
          Featured Edit
        </p>

        {/* Thumbnail card — 3D tilt on hover, click opens video */}
        <div
          ref={cardRef}
          className="j5-work-card"
          onClick={() => setVideoOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Watch J5 featured edit"
          onKeyDown={(e) => e.key === "Enter" && setVideoOpen(true)}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <img
            src={j5WorkThumb}
            alt="J5 featured edit — nightlife visual"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          {/* Cinematic dark overlay — brightens slightly on hover */}
          <div className="absolute inset-0 bg-black/35 transition-opacity duration-300 hover:opacity-[0.25]" />

          {/* Centered play button */}
          <div className="hero-play-btn" aria-hidden="true">
            <span className="hero-play-btn__circle hero-play-btn__circle--lg">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="white"
                className="hero-play-btn__icon"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Descriptor */}
        <div className="mt-6 space-y-1">
          <p className="text-foreground text-base font-medium tracking-wide">
            Nightlife Visual Experience
          </p>
          <p className="text-muted-foreground text-sm tracking-wide">
            Cinematic pacing&nbsp;&nbsp;·&nbsp;&nbsp;Mood lighting&nbsp;&nbsp;·&nbsp;&nbsp;Story-driven editing
          </p>
        </div>
      </motion.div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div className="w-full px-6 md:px-16 lg:px-24 pb-20 space-y-6">
        <BookingDialog defaultMember="j5">
          <Button
            size="lg"
            className="gradient-purple btn-shine text-primary-foreground font-semibold px-12 py-6 text-lg"
          >
            Book Videographer
          </Button>
        </BookingDialog>

        <div className="flex flex-wrap gap-6 items-center">
          <a
            href="tel:+12039013353"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.6 5.08 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +1 (203) 901-3353
          </a>
          <a
            href="https://www.instagram.com/fiveproductionss?igsh=ZmFydXNvcXgwYTNu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            @fiveproductionss
          </a>
        </div>
      </div>

      <VideoModal
        src="/videos/last-shot-lounge.mp4"
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </div>
  );
};

export default VideoSection;
