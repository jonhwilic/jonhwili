import balletVideo from "@/assets/projects/ballet-da-cidade.mp4";
import balletPoster from "@/assets/projects/ballet-da-cidade.webp";
import totalpassBlogVideo from "@/assets/projects/blog-totalpass.mp4";
import totalpassBlogPoster from "@/assets/projects/blog-totalpass.webp";
import kardiahVideo from "@/assets/projects/kardiah.mp4";
import kardiahPoster from "@/assets/projects/kardiah.webp";
import totalpassMapVideo from "@/assets/projects/mapa-totalpass.mp4";
import totalpassMapPoster from "@/assets/projects/mapa-totalpass.webp";
import portelaVideo from "@/assets/projects/portela-filmes.mp4";
import portelaPoster from "@/assets/projects/portela-filmes.webp";
import totalpassInstitutionalVideo from "@/assets/projects/totalpass-institucional.mp4";
import totalpassInstitutionalPoster from "@/assets/projects/totalpass-institucional.webp";

export type ProjectKey =
	| "institutionalTotalpass"
	| "mapTotalpass"
	| "blogTotalpass"
	| "balletDaCidade"
	| "kardiah"
	| "portelaFilmes";

export type Project = {
	id: string;
	/** Screen recording (H.264 MP4, converted from the original GIFs: ~92 MB → ~4.4 MB). */
	video: string;
	/** First frame shown before the video plays (and instead of it with reduced motion). */
	poster: string;
	titleKey: ProjectKey;
	url: string | null;
	featured?: boolean;
};

export const projects: Project[] = [
	{
		id: "institutional-totalpass",
		video: totalpassInstitutionalVideo,
		poster: totalpassInstitutionalPoster,
		titleKey: "institutionalTotalpass",
		url: "https://totalpass.com/br/",
		featured: true,
	},
	{
		id: "map-totalpass",
		video: totalpassMapVideo,
		poster: totalpassMapPoster,
		titleKey: "mapTotalpass",
		url: "https://totalpass.com/br/mapa/",
		featured: true,
	},
	{
		id: "blog-totalpass",
		video: totalpassBlogVideo,
		poster: totalpassBlogPoster,
		titleKey: "blogTotalpass",
		url: "https://totalpass.com/br/blog/",
	},
	{
		id: "ballet-da-cidade",
		video: balletVideo,
		poster: balletPoster,
		titleKey: "balletDaCidade",
		url: null,
		featured: true,
	},
	{
		id: "kardiah",
		video: kardiahVideo,
		poster: kardiahPoster,
		titleKey: "kardiah",
		url: null,
	},
	{
		id: "portela-filmes",
		video: portelaVideo,
		poster: portelaPoster,
		titleKey: "portelaFilmes",
		url: null,
	},
];
