import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { social } from "@/data/social";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/30 py-12">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            {social.location}
            <span className="mx-2 text-border">•</span>
            <span className="font-mono text-xs">{social.domain}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={`mailto:${social.email}`} aria-label="Email" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jonh Wili. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
