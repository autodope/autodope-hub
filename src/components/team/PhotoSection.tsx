import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/BookingDialog";
import suaveSts from "@/assets/suave-sts.jpg";

const portfolioImages = [
  "https://live.staticflickr.com/65535/55097716644_eaa6559faa_b.jpg",
  "https://live.staticflickr.com/65535/55096568032_70ef439685_b.jpg",
  "https://live.staticflickr.com/65535/55096567982_b953af37d3_b.jpg",
  "https://live.staticflickr.com/65535/55097814795_59e4def548_b.jpg",
  "https://live.staticflickr.com/65535/55096568137_3c85a384c4_b.jpg",
  "https://live.staticflickr.com/65535/55097716759_7122848b31_b.jpg",
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
        className="aspect-square rounded-md overflow-hidden bg-muted"
        style={{ willChange: "transform" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <img
          src={url}
          alt={`Suave.sts portfolio ${index + 1}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.06]"
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {portfolioImages.map((url, i) => (
          <TiltPhoto key={i} url={url} index={i} />
        ))}
      </div>
    </div>

    {/* ── CTA ──────────────────────────────────────────────────────── */}
    <div className="w-full px-6 md:px-16 lg:px-24 pb-20">
      <BookingDialog defaultMember="suave">
        <Button
          size="lg"
          className="gradient-purple btn-shine text-primary-foreground font-semibold px-12 py-6 text-lg"
        >
          Book Photographer
        </Button>
      </BookingDialog>
    </div>
  </div>
);

export default PhotoSection;
