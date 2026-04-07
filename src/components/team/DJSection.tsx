import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/BookingDialog";
import VideoModal from "@/components/VideoModal";
import djOrlando from "@/assets/dj-orlando.jpg";

const DJSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="bg-background">

      {/* ── Full-width Hero ────────────────────────────────────────── */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={djOrlando}
          alt="DJ Orlando"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

        {/* Ambient purple haze — breathes to add life to the still hero */}
        <div
          className="absolute inset-0 hero-ambient-glow pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 55% 65%, hsl(270 70% 55% / 0.13) 0%, transparent 65%)",
          }}
        />

        {/* Centered Play Button */}
        <button
          className="hero-play-btn"
          onClick={() => setVideoOpen(true)}
          aria-label="Watch DJ Orlando video"
        >
          <span className="hero-play-btn__circle">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
              className="hero-play-btn__icon"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="absolute bottom-12 left-6 md:left-16 lg:left-24 pointer-events-none"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-2 font-medium">
            DJ & Performer
          </p>
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-foreground text-glow leading-none">
            DJ <span className="text-primary">Orlando</span>
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
            DJ Orlando is a high vibe DJ and performer who knows how to turn any
            event into a full on unforgettable experience. Known for his
            versatility, crowd control and interaction, he can shift between sounds
            effortlessly while keeping the energy high and making sure the dance
            floor is always active.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            His transitions keep people guessing, and his ability to read the room
            ensures the vibe never falls off. Always interacting with the crowd and
            bringing real presence behind the decks, he doesn't just play music but
            he creates moments that people remember.
          </p>
        </div>
      </motion.div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div className="w-full px-6 md:px-16 lg:px-24 pb-20 space-y-6">
        <BookingDialog defaultMember="dj-orlando">
          <Button
            size="lg"
            className="gradient-purple btn-shine text-primary-foreground font-semibold px-12 py-6 text-lg"
          >
            Book DJ Orlando
          </Button>
        </BookingDialog>

        <div className="flex flex-wrap gap-6 items-center">
          <a
            href="tel:+18457759903"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.6 5.08 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +1 (845) 775-9903
          </a>
          <a
            href="https://www.instagram.com/__jeremyrojass?igsh=MWloazd1dHlxa2JzYg=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            @__jeremyrojass
          </a>
        </div>
      </div>

      <VideoModal
        src="/videos/dj-orlando.mp4"
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </div>
  );
};

export default DJSection;
