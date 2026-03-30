import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  image: string;
  hash: string;
  index: number;
}

const TeamCard = ({ name, role, description, image, hash, index }: TeamCardProps) => {
  // Normalized cursor position relative to the card (-0.5 → 0.5)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smooth the rotation for a premium, weighted feel
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });
  const scale = useSpring(1, { stiffness: 200, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      // Framer Motion merges these transforms with the entrance y translation
      style={{ rotateX, rotateY, scale, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/team#${hash}`}
        className="group block overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:box-glow-sm"
        style={{ display: "block" }}
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            width={800}
            height={1024}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06] ${name === 'J5' ? 'object-[40%_center]' : ''}`}
          />
        </div>
        <div className="p-5">
          <h3 className="font-display text-2xl tracking-wider text-foreground">{name}</h3>
          <p className="text-primary text-sm font-medium mt-1">{role}</p>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default TeamCard;
