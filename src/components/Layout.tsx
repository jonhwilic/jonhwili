import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GrainOverlay from "./GrainOverlay";
import CommandPalette from "./CommandPalette";

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } },
  exit: { opacity: 0, y: -8, filter: "blur(6px)" },
};

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <GrainOverlay />
      <CommandPalette />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          variants={prefersReduced ? {} : pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Layout;
