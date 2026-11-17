import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

/** Shown for unknown URLs (served with a real 404 status as 404.html on Vercel). */
const NotFound = () => {
	const { t, localizedPath } = useLanguage();

	return (
		<section className="container flex min-h-[80svh] flex-col items-start justify-center pb-24 pt-36">
			<span className="eyebrow">404</span>
			<h1 className="mt-6 max-w-2xl font-heading text-5xl font-semibold leading-[1] tracking-tight sm:text-7xl">
				{t.notFound.title}
			</h1>
			<p className="mt-6 max-w-md text-muted-foreground sm:text-lg">
				{t.notFound.text}
			</p>
			<div className="mt-10 flex flex-wrap gap-3">
				<Link to={localizedPath("/")} className="btn-signal">
					{t.notFound.home}
				</Link>
				<Link to={localizedPath("/projects")} className="btn-ghost group">
					{t.notFound.projects}
					<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</div>
		</section>
	);
};

export default NotFound;
