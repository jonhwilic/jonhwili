import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SAMPLE_EVENTS = [
	{ name: "page_view", detail: "/", tone: "muted" },
	{ name: "scroll_depth", detail: "50%", tone: "muted" },
	{ name: "cta_click", detail: "hero_primary", tone: "accent" },
	{ name: "experiment", detail: "headline · variant_b", tone: "accent" },
	{ name: "form_start", detail: "contact", tone: "muted" },
	{ name: "generate_lead", detail: "whatsapp", tone: "signal" },
] as const;

const VISIBLE_EVENTS = 4;

const toneColor = {
	signal: "hsl(var(--primary))",
	accent: "hsl(var(--accent))",
	muted: "hsl(var(--foreground) / 0.8)",
} as const;

/**
 * Small live "event stream" that makes the MarTech specialisation tangible.
 * Illustrative only — the portfolio itself ships no tracking.
 */
const EventFeed = ({ label }: { label: string }) => {
	const prefersReducedMotion = useReducedMotion();
	const [eventCounter, setEventCounter] = useState(3);

	useEffect(() => {
		if (prefersReducedMotion) return;
		const intervalId = setInterval(
			() => setEventCounter((currentCount) => currentCount + 1),
			1700,
		);
		return () => clearInterval(intervalId);
	}, [prefersReducedMotion]);

	const recentEvents = Array.from({ length: VISIBLE_EVENTS }, (_, age) => {
		const sequenceNumber = eventCounter - age;
		const sampleIndex =
			((sequenceNumber % SAMPLE_EVENTS.length) + SAMPLE_EVENTS.length) %
			SAMPLE_EVENTS.length;
		return { sequenceNumber, age, ...SAMPLE_EVENTS[sampleIndex] };
	});

	return (
		<div
			className="rounded-xl border p-3 font-mono text-[11px]"
			style={{
				borderColor: "hsl(var(--foreground) / 0.08)",
				background: "hsl(var(--background) / 0.6)",
			}}
		>
			<div className="mb-2 flex items-center gap-2 text-muted-foreground">
				<span className="live-dot" aria-hidden="true" />
				<span className="truncate">{label}</span>
			</div>
			<ul
				className="relative flex h-[7.5rem] flex-col gap-1.5 overflow-hidden"
				aria-hidden="true"
			>
				<AnimatePresence initial={false} mode="popLayout">
					{recentEvents.map((trackedEvent) => (
						<motion.li
							key={trackedEvent.sequenceNumber}
							layout
							initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
							animate={{
								opacity: 1 - trackedEvent.age * 0.22,
								y: 0,
								filter: "blur(0px)",
							}}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
							className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5"
							style={{ background: "hsl(var(--foreground) / 0.03)" }}
						>
							<span style={{ color: toneColor[trackedEvent.tone] }}>
								{trackedEvent.name}
							</span>
							<span className="truncate text-muted-foreground">
								{trackedEvent.detail}
							</span>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
		</div>
	);
};

export default EventFeed;
