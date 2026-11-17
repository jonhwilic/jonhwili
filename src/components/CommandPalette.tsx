import { Folder, Home, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";

type CommandPaletteProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

/** Loaded on demand (⌘K / Ctrl+K) by CommandPaletteLauncher, so it stays out of the initial bundle. */
const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
	const navigate = useNavigate();
	const { t, localizedPath } = useLanguage();

	const pages = [
		{ name: t.nav.home, path: "/", icon: Home },
		{ name: t.nav.about, path: "/about", icon: User },
		{ name: t.nav.projects, path: "/projects", icon: Folder },
		{ name: t.nav.contact, path: "/contact", icon: Mail },
	];

	const goTo = (path: string) => {
		navigate(localizedPath(path));
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="p-0 overflow-hidden border-border/50 bg-popover/95 backdrop-blur-xl max-w-lg">
				<Command className="bg-transparent">
					<CommandInput
						placeholder={t.command.searchPlaceholder}
						className="border-b border-border/50"
					/>
					<CommandList className="max-h-80">
						<CommandEmpty>{t.command.noResults}</CommandEmpty>
						<CommandGroup heading={t.command.pages}>
							{pages.map((page) => (
								<CommandItem
									key={page.path}
									onSelect={() => goTo(page.path)}
									className="gap-3 cursor-pointer"
								>
									<page.icon className="w-4 h-4 text-muted-foreground" />
									{page.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
};

export default CommandPalette;
