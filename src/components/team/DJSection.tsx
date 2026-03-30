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
      <div className="w-full px-6 md:px-16 lg:px-24 pb-20">
        <BookingDialog defaultMember="dj-orlando">
          <Button
            size="lg"
            className="gradient-purple btn-shine text-primary-foreground font-semibold px-12 py-6 text-lg"
          >
            Book DJ Orlando
          </Button>
        </BookingDialog>
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
