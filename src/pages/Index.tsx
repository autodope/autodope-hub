import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import TeamCard from "@/components/TeamCard";
import BookingDialog from "@/components/BookingDialog";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";
import djOrlando from "@/assets/dj-orlando.jpg";
import suaveSts from "@/assets/suave-sts.jpg";
import j5 from "@/assets/j5.jpg";

const teamMembers = [
  {
    name: "DJ Orlando",
    role: "DJ & Performer",
    description: "Setting the vibe with high-energy mixes and unforgettable live performances.",
    image: djOrlando,
    hash: "dj",
  },
  {
    name: "Suave.sts",
    role: "Photographer / Videographer",
    description: "Capturing moments with a clean, artistic eye and timeless visual storytelling.",
    image: suaveSts,
    hash: "photo",
  },
  {
    name: "J5",
    role: "Editor / Engineer",
    description: "Cinematic visuals and sharp edits that bring every story to life on screen.",
    image: j5,
    hash: "video",
  },
];

const Index = () => {
  // Parallax motion values — background drifts opposite to cursor
  const bgRawX = useMotionValue(0);
  const bgRawY = useMotionValue(0);
  const bgX = useSpring(bgRawX, { stiffness: 45, damping: 18, mass: 0.8 });
  const bgY = useSpring(bgRawY, { stiffness: 45, damping: 18, mass: 0.8 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    // Small offset: image shifts up to ±14px horizontally, ±9px vertically
    bgRawX.set(((clientX / width) - 0.5) * -28);
    bgRawY.set(((clientY / height) - 0.5) * -18);
  };

  const handleHeroMouseLeave = () => {
    bgRawX.set(0);
    bgRawY.set(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Background image — drifts with cursor for depth */}
        <motion.img
          src={heroBg}
          alt="AutoDope Entertainment live event"
          width={1920}
          height={1080}
          style={{ x: bgX, y: bgY, scale: 1.06 }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark base overlay */}
        <div className="absolute inset-0 bg-background/60" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-overlay" />

        {/* Ambient breathing glow — extremely subtle purple haze */}
        <div
          className="absolute inset-0 hero-ambient-glow pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 60%, hsl(270 70% 55% / 0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl tracking-widest text-foreground text-glow"
          >
            AUTO<span className="text-primary">DOPE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl mt-4 tracking-[0.3em] uppercase font-light"
          >
            Where Sound Meets Vision
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <BookingDialog>
              <Button
                size="lg"
                className="gradient-purple btn-shine text-primary-foreground font-semibold text-base px-8 animate-pulse-glow"
              >
                Book Us
              </Button>
            </BookingDialog>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary/80 transition-all duration-300 text-base px-8"
            >
              <Link to="/team">View Team</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Meet the Team ────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-foreground">
              Meet The <span className="text-primary">Team</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Three creatives. One collective. Unlimited vision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.hash} {...member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
