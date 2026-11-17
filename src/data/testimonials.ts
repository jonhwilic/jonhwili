import brunoHenriquePhoto from "@/assets/testimonials/bruno-henrique.webp";
import brunoRodriguesPhoto from "@/assets/testimonials/bruno-rodrigues.webp";
import hiagoCoutoPhoto from "@/assets/testimonials/hiago-couto.webp";
import type { Locale } from "@/i18n/translations";

/**
 * LinkedIn recommendations, copied as written (Portuguese originals).
 * English versions are faithful translations and are labelled as such on the page.
 * To add one: append an entry — the section, list and card deck adapt automatically.
 */
export type Testimonial = {
	id: string;
	name: string;
	initials: string;
	/** Square photo, 160×160 WebP (~3 KB). Optional: without it the initials are shown. */
	photo?: string;
	headline: Record<Locale, string>;
	relationship: Record<Locale, string>;
	/** Date the recommendation was given (YYYY-MM-DD). */
	givenAt: string;
	linkedinUrl: string;
	originalLocale: Locale;
	quote: Record<Locale, string[]>;
};

export const testimonials: Testimonial[] = [
	{
		id: "bruno-rodrigues-dos-santos",
		name: "Bruno Rodrigues dos Santos",
		initials: "BR",
		photo: brunoRodriguesPhoto,
		headline: {
			en: "Frontend Engineer · Software Engineer",
			"pt-BR": "Frontend Engineer · Software Engineer",
		},
		relationship: {
			en: "Worked with Jonh on the same team",
			"pt-BR": "Trabalhou com Jonh no mesmo time",
		},
		givenAt: "2023-12-18",
		linkedinUrl: "https://www.linkedin.com/in/bruno-brds/",
		originalLocale: "pt-BR",
		quote: {
			"pt-BR": [
				"Jonh tem feito um trabalho incrível na TotalPass com a reformulação do website e outras iniciativas.",
				"Além de ser totalmente dedicado e com técnica boa, tem uma excelente relação social com todo o time.",
			],
			en: [
				"Jonh has been doing incredible work at TotalPass with the website redesign and other initiatives.",
				"Besides being fully dedicated and technically strong, he has an excellent rapport with the whole team.",
			],
		},
	},
	{
		id: "bruno-henrique",
		name: "Bruno Henrique",
		initials: "BH",
		photo: brunoHenriquePhoto,
		headline: {
			en: "Senior Frontend Developer · React · Next.js · TypeScript",
			"pt-BR": "Senior Frontend Developer · React · Next.js · TypeScript",
		},
		relationship: {
			en: "Was senior to Jonh",
			"pt-BR": "Era sênior em relação a Jonh",
		},
		givenAt: "2023-11-30",
		linkedinUrl: "https://www.linkedin.com/in/brunohenrique070994/",
		originalLocale: "pt-BR",
		quote: {
			"pt-BR": [
				"Desenvolvedor altamente dedicado e capacitado, destaca-se por uma evolução notável em curto/longo prazo. Possui excelente comunicação, habilidades de trabalho em equipe e capacidade de resolver problemas.",
			],
			en: [
				"A highly dedicated and capable developer who stands out for remarkable growth in the short and long term. He has excellent communication, teamwork skills and problem-solving ability.",
			],
		},
	},
	{
		id: "hiago-couto",
		name: "Hiago Couto",
		initials: "HC",
		photo: hiagoCoutoPhoto,
		headline: {
			en: "Professional & Technological Education · Diversity, Equity & Inclusion",
			"pt-BR":
				"Educação Profissional e Tecnológica · Diversidade, Equidade & Inclusão",
		},
		relationship: {
			en: "Managed Jonh directly",
			"pt-BR": "Foi gestor direto de Jonh",
		},
		givenAt: "2024-09-19",
		linkedinUrl: "https://www.linkedin.com/in/hiagocouto/",
		originalLocale: "pt-BR",
		quote: {
			"pt-BR": [
				"Jonh é altamente recomendado como um excepcional instrutor nos segmentos de Desenvolvimento em Tecnologia da Informação. Durante o tempo em que trabalhamos juntos, ele demonstrou uma capacidade incrível de transmitir conhecimentos complexos de forma clara e dinâmica, sempre se dedicando ao desenvolvimento de competências de seus alunos.",
				"Sua paixão e habilidade em ensinar os outros são verdadeiramente notáveis.",
			],
			en: [
				"Jonh comes highly recommended as an exceptional instructor in Information Technology Development. During the time we worked together, he showed an incredible ability to convey complex knowledge clearly and dynamically, always dedicated to developing his students' skills.",
				"His passion and skill for teaching others are truly remarkable.",
			],
		},
	},
];
