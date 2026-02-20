import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Home, Clock, User, Mail, Folder } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const pages = [
    { name: t.nav.home, path: "/", icon: Home },
    { name: t.nav.about, path: "/about", icon: User },
    { name: t.nav.timeline, path: "/timeline", icon: Clock },
    { name: t.nav.projects, path: "/projects", icon: Folder },
    { name: t.nav.contact, path: "/contact", icon: Mail },
  ];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((o) => !o);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const go = (path: string) => { navigate(path); setOpen(false); };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden border-border/50 bg-popover/95 backdrop-blur-xl max-w-lg">
        <Command className="bg-transparent">
          <CommandInput placeholder={t.command.searchPlaceholder} className="border-b border-border/50" />
          <CommandList className="max-h-80">
            <CommandEmpty>{t.command.noResults}</CommandEmpty>
            <CommandGroup heading={t.command.pages}>
              {pages.map((page) => (
                <CommandItem key={page.path} onSelect={() => go(page.path)} className="gap-3 cursor-pointer">
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
