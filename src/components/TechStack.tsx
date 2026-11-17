import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "./fx/Reveal";

const frontEndStack = [
	"React",
	"Next.js",
	"TypeScript",
	"Vue.js",
	"Nuxt",
	"Tailwind CSS",
	"GraphQL",
	"React Query",
	"Jest",
];
const backEndStack = [
	"NestJS",
	"Node.js",
	"Python",
	"SQL",
	"PHP",
	"WordPress",
	"REST APIs",
	"Salesforce",
	"ERP",
];

const MarqueeRow = ({
	technologies,
	reverse = false,
	duration = 40,
}: {
	technologies: string[];
	reverse?: boolean;
	duration?: number;
}) => {
	// the list is rendered twice so the loop is seamless; each copy gets its own key prefix
	const loopedTechnologies = ["first", "second"].flatMap((copy) =>
		technologies.map((technology) => ({
			id: `${copy}-${technology}`,
			technology,
		})),
	);

	return (
		<div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
			<div
				className="flex w-max shrink-0 items-center gap-10 pr-10"
				style={{
					animation: `marquee ${duration}s linear infinite${reverse ? " reverse" : ""}`,
				}}
			>
				{loopedTechnologies.map(({ id, technology }) => (
					<span
						key={id}
						className="flex items-center gap-10 whitespace-nowrap font-heading text-2xl font-medium tracking-tight text-foreground/70 sm:text-4xl"
					>
						{technology}
						<span className="text-base text-primary/70" aria-hidden="true">
							✦
						</span>
					</span>
				))}
			</div>
		</div>
	);
};

/** Stats band + dual marquee of the stack. */
const TechStack = () => {
	const { t } = useLanguage();

	return (
		<section aria-label="Stack" className="relative py-20 sm:py-24">
			<div className="container">
				<dl
					className="grid grid-cols-2 border-y lg:grid-cols-4"
					style={{ borderColor: "hsl(var(--foreground) / 0.1)" }}
				>
					{t.home.stats.map((stat, statPosition) => {
						const isRightColumnOnMobile = statPosition % 2 === 1;
						const isFirst = statPosition === 0;
						const isSecondRow = statPosition > 1;
						return (
							<Reveal
								key={stat.label}
								delay={statPosition * 0.08}
								className={`flex flex-col gap-2 py-8 ${isRightColumnOnMobile ? "pl-6" : "pr-6"} lg:px-6 ${isFirst ? "" : "lg:border-l"} ${isSecondRow ? "border-t lg:border-t-0" : ""}`}
							>
								<dt className="order-2 text-sm text-muted-foreground">
									{stat.label}
								</dt>
								<dd className="order-1 font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
									{stat.value}
								</dd>
							</Reveal>
						);
					})}
				</dl>
			</div>

			<div className="mt-16 flex flex-col gap-6" aria-hidden="true">
				<MarqueeRow technologies={frontEndStack} />
				<MarqueeRow technologies={backEndStack} reverse duration={46} />
			</div>
		</section>
	);
};

export default TechStack;
