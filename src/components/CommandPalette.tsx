import { Folder, Home, Mail, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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

const CommandPalette = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const { t } = useLanguage();

	const pages = [
		{ name: t.nav.home, path: "/", icon: Home },
		{ name: t.nav.about, path: "/about", icon: User },
		{ name: t.nav.projects, path: "/projects", icon: Folder },
		{ name: t.nav.contact, path: "/contact", icon: Mail },
	];

	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		if ((event.metaKey || event.ctrlKey) && event.key === "k") {
			event.preventDefault();
			setOpen((wasOpen) => !wasOpen);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	const goTo = (path: string) => {
		navigate(path);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
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
