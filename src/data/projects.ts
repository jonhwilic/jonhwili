import balletGif from "@/assets/ballet-da-cidade.gif";
import totalpassBlogGif from "@/assets/blog-totalpass.gif";
import kardiahGif from "@/assets/kardiah.gif";
import totalpassMapGif from "@/assets/mapa-totalpass.gif";
import portelaGif from "@/assets/portela-filmes.gif";
import totalpassInstitutionalGif from "@/assets/totalpass-institucional.gif";

export type ProjectKey =
	| "institutionalTotalpass"
	| "mapTotalpass"
	| "blogTotalpass"
	| "balletDaCidade"
	| "kardiah"
	| "portelaFilmes";

export const projects: {
	id: string;
	gif: string;
	titleKey: ProjectKey;
	url: string | null;
	featured?: boolean;
}[] = [
	{
		id: "institutional-totalpass",
		gif: totalpassInstitutionalGif,
		titleKey: "institutionalTotalpass",
		url: "https://totalpass.com/br/",
		featured: true,
	},
	{
		id: "map-totalpass",
		gif: totalpassMapGif,
		titleKey: "mapTotalpass",
		url: "https://totalpass.com/br/mapa/",
		featured: true,
	},
	{
		id: "blog-totalpass",
		gif: totalpassBlogGif,
		titleKey: "blogTotalpass",
		url: "https://totalpass.com/br/blog/",
	},
	{
		id: "ballet-da-cidade",
		gif: balletGif,
		titleKey: "balletDaCidade",
		url: null,
		featured: true,
	},
	{ id: "kardiah", gif: kardiahGif, titleKey: "kardiah", url: null },
	{
		id: "portela-filmes",
		gif: portelaGif,
		titleKey: "portelaFilmes",
		url: null,
	},
];
