import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applyHeadToDocument } from "@/seo/head";
import CommandPaletteLauncher from "./CommandPaletteLauncher";
import ConsentBanner from "./ConsentBanner";
import Footer from "./Footer";
import GrainOverlay from "./GrainOverlay";
import Navbar from "./Navbar";

const pageVariants = {
	initial: { opacity: 0, y: 12, filter: "blur(6px)" },
	animate: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transitionEnd: { filter: "none" },
	},
	exit: { opacity: 0, y: -8, filter: "blur(6px)" },
};

const Layout = ({ children }: { children: ReactNode }) => {
	const { pathname } = useLocation();
	const prefersReducedMotion = useReducedMotion();

	// biome-ignore lint/correctness/useExhaustiveDependencies: the effect must re-run on every route change to reset the scroll position
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [pathname]);

	useEffect(() => {
		applyHeadToDocument(pathname);
	}, [pathname]);

	return (
		<div className="relative min-h-screen overflow-x-clip bg-background">
			<GrainOverlay />
			<CommandPaletteLauncher />
			<Navbar />

			{/* initial={false}: the first page shows instantly (pre-rendered HTML must not start hidden) */}
			<AnimatePresence mode="wait" initial={false}>
				<motion.main
					id="main"
					key={pathname}
					variants={prefersReducedMotion ? {} : pageVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
				>
					{children}
				</motion.main>
			</AnimatePresence>

			<Footer />
			<ConsentBanner />
		</div>
	);
};

export default Layout;
