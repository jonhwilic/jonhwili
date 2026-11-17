import { motion } from "framer-motion";

/** Browser-chrome frame around a project capture. Shares `layoutId` with the detail view. */
const BrowserFrame = ({
	id,
	src,
	alt,
	url,
	className = "",
	eager = false,
}: {
	id: string;
	src: string;
	alt: string;
	url: string | null;
	className?: string;
	eager?: boolean;
}) => (
	<motion.div
		layoutId={`media-${id}`}
		transition={{ type: "spring", stiffness: 260, damping: 32 }}
		className={`overflow-hidden rounded-2xl border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] ${className}`}
		style={{
			borderColor: "hsl(var(--foreground) / 0.12)",
			background: "hsl(var(--card))",
		}}
	>
		<div
			className="flex items-center gap-2 border-b px-4 py-2.5"
			style={{ borderColor: "hsl(var(--foreground) / 0.08)" }}
		>
			<span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
			<span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
			<span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
			<span className="ml-3 truncate rounded-full bg-foreground/5 px-3 py-0.5 font-mono text-[10px] text-muted-foreground">
				{url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "preview"}
			</span>
		</div>
		<img
			src={src}
			alt={alt}
			loading={eager ? "eager" : "lazy"}
			decoding="async"
			className="block aspect-[16/10] w-full object-cover object-top"
		/>
	</motion.div>
);

export default BrowserFrame;
