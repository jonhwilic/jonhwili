import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
	initAnalytics,
	isGa4Configured,
	readConsent,
	saveConsent,
} from "@/lib/analytics";

/** LGPD consent for GA4. Only shows when GA4 is configured and the visitor hasn't chosen yet. */
const ConsentBanner = () => {
	const { t } = useLanguage();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		initAnalytics();
		if (isGa4Configured && readConsent() === null) setIsVisible(true);
	}, []);

	const choose = (choice: "granted" | "denied") => {
		saveConsent(choice);
		setIsVisible(false);
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.section
					aria-label={t.consent.label}
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 24 }}
					className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-xl flex-col gap-4 rounded-2xl border p-5 text-sm sm:flex-row sm:items-center"
					style={{
						borderColor: "hsl(var(--foreground) / 0.12)",
						background: "hsl(var(--background) / 0.92)",
						backdropFilter: "blur(16px)",
					}}
				>
					<p className="flex-1 text-muted-foreground">{t.consent.text}</p>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => choose("denied")}
							className="btn-ghost px-4 py-2"
						>
							{t.consent.decline}
						</button>
						<button
							type="button"
							onClick={() => choose("granted")}
							className="btn-signal px-4 py-2"
						>
							{t.consent.accept}
						</button>
					</div>
				</motion.section>
			)}
		</AnimatePresence>
	);
};

export default ConsentBanner;
