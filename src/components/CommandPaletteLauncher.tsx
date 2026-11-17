import { lazy, Suspense, useEffect, useState } from "react";

const CommandPalette = lazy(() => import("./CommandPalette"));

/** Listens for ⌘K / Ctrl+K and only then downloads the palette (cmdk + dialog). */
const CommandPaletteLauncher = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [hasBeenRequested, setHasBeenRequested] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setHasBeenRequested(true);
				setIsOpen((wasOpen) => !wasOpen);
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	if (!hasBeenRequested) return null;
	return (
		<Suspense fallback={null}>
			<CommandPalette open={isOpen} onOpenChange={setIsOpen} />
		</Suspense>
	);
};

export default CommandPaletteLauncher;
