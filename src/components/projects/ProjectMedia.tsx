import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type ProjectMediaProps = {
	video: string;
	poster: string;
	label: string;
	className?: string;
};

/**
 * Silent looping screen recording that only downloads and plays while on screen.
 * preload="none" + poster: nothing heavy loads until the visitor actually reaches it.
 * With reduced motion it stays on the poster frame.
 */
const ProjectMedia = ({
	video,
	poster,
	label,
	className = "",
}: ProjectMediaProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		const videoElement = videoRef.current;
		if (!videoElement || prefersReducedMotion) return;
		const visibilityObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) videoElement.play().catch(() => {});
				else videoElement.pause();
			},
			{ threshold: 0.25 },
		);
		visibilityObserver.observe(videoElement);
		return () => visibilityObserver.disconnect();
	}, [prefersReducedMotion]);

	return (
		<video
			ref={videoRef}
			className={className}
			poster={poster}
			muted
			loop
			playsInline
			preload="none"
			aria-label={label}
		>
			<source src={video} type="video/mp4" />
		</video>
	);
};

export default ProjectMedia;
