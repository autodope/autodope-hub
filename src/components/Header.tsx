import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface HeaderProps {
  teamTabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

const Header = ({ teamTabs, activeTab, onTabChange }: HeaderProps) => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      {/* Logo — subtle scale on hover */}
      <Link
        to="/"
        className="font-display text-xl tracking-wider text-foreground shrink-0 transition-opacity duration-200 hover:opacity-80"
      >
        AUTO<span className="text-primary">DOPE</span>
      </Link>

      <nav className="flex gap-2 md:gap-4 items-center">
        <Link
          to="/"
          className={`nav-link-underline text-sm font-medium transition-colors duration-200 hover:text-primary ${
            location.pathname === "/" ? "text-primary active" : "text-muted-foreground"
          }`}
        >
          Home
        </Link>
        <Link
          to="/team"
          className={`nav-link-underline text-sm font-medium transition-colors duration-200 hover:text-primary ${
            location.pathname === "/team" ? "text-primary active" : "text-muted-foreground"
          }`}
        >
          Team
        </Link>

        {teamTabs && onTabChange && (
          <>
            <div className="w-px h-5 bg-border/50 mx-1" />
            {teamTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "gradient-purple text-primary-foreground box-glow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
