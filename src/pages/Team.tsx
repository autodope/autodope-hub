import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DJSection from "@/components/team/DJSection";
import PhotoSection from "@/components/team/PhotoSection";
import VideoSection from "@/components/team/VideoSection";

const tabs = [
  { id: "dj", label: "DJ Orlando" },
  { id: "photo", label: "Suave.sts" },
  { id: "video", label: "J5" },
];

const Team = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dj");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && tabs.some((t) => t.id === hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const sections: Record<string, React.ReactNode> = {
    dj: <DJSection />,
    photo: <PhotoSection />,
    video: <VideoSection />,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header teamTabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Full-width tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="pt-[49px]"
        >
          {sections[activeTab]}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Team;
