import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, t, toggleLocale } = useLanguage();

  const navItems = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.timeline, path: "/timeline" },
    { label: t.nav.projects, path: "/projects" },
    { label: t.nav.contact, path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div
        className="border-b border-border/30"
        style={{ background: "hsl(var(--background) / 0.8)", backdropFilter: "blur(16px)" }}
      >
        <nav className="container flex items-center justify-between h-16">
          <Link to="/" className="font-heading font-bold text-lg tracking-tight">
            <span className="neon-text">jonh</span>
            <span className="text-foreground">wili</span>
            <span className="text-muted-foreground text-sm">.dev</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 text-sm font-heading font-medium transition-colors hover:text-primary"
                  style={{ color: active ? "hsl(var(--primary))" : undefined }}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: "hsl(var(--primary))" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Language dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="ml-2 px-3 py-1.5 rounded-md border border-border/50 text-xs text-muted-foreground font-mono cursor-pointer hover:border-primary/30 hover:text-primary transition-colors flex items-center gap-1.5"
                  aria-label="Change language"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {locale === "en" ? "EN" : "PT-BR"}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px] bg-background border-border">
                <DropdownMenuItem
                  onClick={() => { if (locale !== "en") toggleLocale(); }}
                  className={cn("flex items-center gap-2 text-xs font-mono cursor-pointer", locale === "en" && "text-primary")}
                >
                  <span className="text-sm">🇺🇸</span> English
                  {locale === "en" && <Check className="w-3 h-3 ml-auto text-primary" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => { if (locale !== "pt-BR") toggleLocale(); }}
                  className={cn("flex items-center gap-2 text-xs font-mono cursor-pointer", locale === "pt-BR" && "text-primary")}
                >
                  <span className="text-sm">🇧🇷</span> Português (BR)
                  {locale === "pt-BR" && <Check className="w-3 h-3 ml-auto text-primary" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="ml-2 px-3 py-1 rounded-md border border-border/50 text-xs text-muted-foreground font-mono cursor-pointer hover:border-primary/30 transition-colors"
              onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            >
              ⌘K
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-b border-border/30"
            style={{ background: "hsl(var(--background) / 0.95)", backdropFilter: "blur(16px)" }}
          >
            <div className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-heading font-medium rounded-lg hover:bg-muted transition-colors"
                  style={{
                    color: location.pathname === item.path ? "hsl(var(--primary))" : undefined,
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => { toggleLocale(); setMobileOpen(false); }}
                className="px-4 py-3 text-sm font-heading font-medium rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-2 text-muted-foreground"
              >
                <Globe className="w-4 h-4" />
                {locale === "en" ? "Português (BR)" : "English"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
