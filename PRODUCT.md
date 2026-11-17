# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Recruiters and contract clients in equal measure.** Recruiters evaluate whether Jonh is a strong hire for a full-time or CLT role; contract clients assess whether to bring him in for a web project. Both visit the site on desktop and mobile, arriving from LinkedIn, GitHub, or direct referral. Time-on-site is short; the site must establish credibility in the first scroll.

## Product Purpose

jonhwili.dev is Jonh Wili's personal portfolio — a professional presence that converts both job opportunities and contract work. It demonstrates competence across the full web stack with a specialization in MarTech and front-end systems, communicates availability, and makes it easy to review work and reach out.

## Positioning

**Full-stack engineer with deep MarTech and front-end expertise.** The differentiated claim is the combination: 7+ years of front-end delivery, an active specialization in MarTech (analytics, pixels, A/B testing, tracking-ready architectures), and enough back-end breadth (NestJS, Python, SQL, PHP, ERP systems) to own complete web solutions. A neighboring generalist cannot truthfully claim that specific track record.

## Operating Context

- Visitors arrive from professional networks and referrals; most will also check GitHub and LinkedIn in the same session.
- The CV is downloadable as a PDF and must stay current with the timeline on the site.
- The site is bilingual (EN / pt-BR); both locales must carry equal weight.
- Jonh works remotely and has done so since 2022 (TotalPass is São Paulo-based; Jonh is in Espírito Santo).

## Capabilities and Constraints

- **Stack:** Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion; deployed at jonhwili.dev.
- **Routes:** Home (Hero, TechStack, WhatIDo), About (bio + timeline), Projects, Contact, 404.
- **i18n:** EN and pt-BR translations in `src/i18n/translations.ts`; both must be updated for any copy change.
- **Assets:** Profile photo (`foto_rosto.jpg`) and logo (`logo.png`) exist; OG image referenced but may need generation.
- **CV:** PDF bundled at `src/assets/archieve/curriculum_jonh.pdf` and downloadable from the Hero CTA.
- **Analytics/tracking infrastructure:** not yet present on the portfolio itself (the site is a showcase; MarTech is a skill, not a dependency here).

## Brand Commitments

- **Name:** "Jonh Wili" — this spelling is canonical.
- **Domain:** jonhwili.dev
- **Visual identity ("Signal", Nov 2026):** ink-navy canvas `#070A17`, indigo→violet atmosphere for backgrounds, signal lime `#C5F23D` reserved for actions and live states. Type: Bricolage Grotesque (headings), Instrument Serif italic (accent words), Geist / Geist Mono (body, labels). Floating pill header. Still open to iteration.

## Evidence on Hand

- 7+ years of front-end experience, documented in the timeline.
- Production work at TotalPass (institutional site, gym map, blog — all named and described in the Projects section).
- Real Estate ERP at 4U Homes (Jan 2025 – Nov 2025, led front-end of full end-to-end system).
- Academic credentials: B.Sc. Information Systems (UCL, 2022), Postgraduate Web Application Development (FACPRISMA, 2024), Teaching Degree in Mathematics in progress (IFES, expected 2026).
- Military service (Marinha do Brasil, 2017–2018).
- No live testimonials, awards, or press quotes in the codebase; do not fabricate them.

## Product Principles

1. **Credibility before aesthetics.** Every design and copy decision must reinforce trust first. A recruiter or client should feel confident, not dazzled.
2. **MarTech readiness is the differentiator.** The portfolio must make the MarTech specialization legible, not just list it as a tag.
3. **Full-stack breadth, front-end depth.** Positioning must convey range (NestJS, Python, ERP, SQL) without diluting the front-end lead signal.
4. **Bilingual by default.** EN is primary for international reach; pt-BR is a first-class locale for Brazilian market opportunities.
5. **Conversion over decoration.** Every section earns its place by moving the visitor toward a project view, CV download, or contact.

## Accessibility & Inclusion

- `useReducedMotion` is already implemented site-wide; Framer Motion respects the OS preference.
- Semantic HTML and keyboard navigation are stated working values (confirmed in bio copy).
- No specific WCAG target is recorded; default to WCAG 2.1 AA.
