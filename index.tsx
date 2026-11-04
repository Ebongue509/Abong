import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import portrait from "@/assets/ebongue_portrait.png.asset.json";
import budgetImg from "@/assets/project_budget.jpg";
import uiuxImg from "@/assets/project_uiux.jpg";
import graphicImg from "@/assets/project_graphic.jpg";
import webImg from "@/assets/project_web.jpg";
import { AskAssistant } from "@/components/AskAssistant";
import { EMAIL, PHONE, PHONE_DISPLAY, skills, education, projectInfo } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ebongue Abong Junior — Graphic & Web Designer" },
      {
        name: "description",
        content:
          "Portfolio of Ebongue Abong Junior, Computer Graphics and Web Design graduate crafting UI/UX, brand identities and web experiences.",
      },
      { property: "og:title", content: "Ebongue Abong Junior — Graphic & Web Designer" },
      {
        property: "og:description",
        content: "UI/UX, graphic design and web projects by Ebongue Abong Junior.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


const nav = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Education", "#education"],
  ["Contact", "#contact"],
] as const;

const images = [budgetImg, uiuxImg, graphicImg, webImg];
const projects = projectInfo.map((p, i) => ({ ...p, img: images[i], featured: i === 0 }));

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="reveal mb-12 md:mb-16">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-medium leading-tight md:text-6xl">{title}</h2>
      <div className="bg-gold mt-6 h-px w-20" />
    </div>
  );
}

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative overflow-x-hidden">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="font-display text-2xl font-semibold tracking-wide">
            <span className="text-gold">E</span>AJ<span className="text-primary">.</span>
          </a>
          <nav className="hidden gap-8 md:flex">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {l}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${EMAIL}`}
            className="hidden rounded-full border border-primary/50 px-5 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-block"
          >
            Hire me
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-6 bg-foreground transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-foreground transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-border px-5 pb-5 pt-2 md:hidden">
            {nav.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 font-display text-2xl">
                {l}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-screen items-center pt-24">
        <div className="pointer-events-none absolute -right-40 top-20 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-8">
          <div className="order-2 md:order-1">
            <p className="eyebrow reveal">Graphic & Web Designer</p>
            <h1 className="reveal mt-5 text-5xl font-medium leading-[0.95] sm:text-6xl lg:text-8xl">
              Ebongue
              <br />
              Abong <span className="text-gold italic">Junior</span>
            </h1>
            <p className="reveal mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              A Computer Graphics and Web Design graduate crafting thoughtful interfaces, memorable brands and
              digital experiences where creativity meets technical precision.
            </p>
            <div className="reveal mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-gold shadow-gold rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                View my projects →
              </a>
              <a
                href="#contact"
                className="rounded-full border border-border px-8 py-4 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <div className="float-slow relative aspect-square w-64 sm:w-80 lg:w-[26rem]">
              <div className="spin-slow absolute -inset-5 rounded-full border border-dashed border-primary/40" />
              <div className="bg-gold shadow-gold absolute -inset-1 rounded-full" />
              <div className="relative h-full w-full overflow-hidden rounded-full bg-background">
                <img
                  src={portrait.url}
                  alt="Portrait of Ebongue Abong Junior"
                  className="h-full w-full scale-[1.04] object-cover"
                  width={1254}
                  height={1254}
                />
              </div>
              <div className="absolute -bottom-2 -left-4 rounded-xl border border-border bg-card/90 px-4 py-3 backdrop-blur sm:-left-8">
                <p className="font-display text-2xl text-gold">HND</p>
                <p className="text-xs text-muted-foreground">Graphics & Web Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHead eyebrow="01 — About me" title="Design with purpose, built with care." />
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="reveal space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm <span className="text-foreground">Ebongue Abong Junior</span>, a designer who believes great design is
              both beautiful and useful. My training in Computer Graphics and Web Design gave me a strong foundation in
              visual communication, user experience and front-end development.
            </p>
            <p>
              From brand identities to complete web applications, I approach every project with attention to detail,
              a clear process and a commitment to professionalism — turning ideas into work that people remember.
            </p>
          </div>
          <div className="reveal grid grid-cols-2 gap-4 self-start">
            {[
              ["2.90", "HND GPA · B+"],
              ["3", "Creative disciplines"],
              ["2025", "Graduated"],
              ["100%", "Dedication"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-xl border border-border bg-card p-5">
                <p className="font-display text-4xl text-gold">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <SectionHead eyebrow="02 — Skills" title="Creative craft & technical skill." />
          <div className="grid gap-6 md:grid-cols-3">
            {skills.map((s, i) => (
              <div
                key={s.group}
                className="reveal group rounded-2xl border border-border bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="font-display text-sm text-primary">0{i + 1}</p>
                <h3 className="mt-2 text-3xl">{s.group}</h3>
                <ul className="mt-6 space-y-3">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHead eyebrow="03 — Selected work" title="Projects that tell a story." />
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className={`reveal group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50 ${
                p.featured ? "md:col-span-2 md:grid md:grid-cols-[1.3fr_1fr]" : ""
              }`}
            >
              <div className="overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="aspect-[10/7] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-9">
                <p className="eyebrow">{p.tag}</p>
                <h3 className={`mt-3 leading-tight ${p.featured ? "text-3xl md:text-4xl" : "text-3xl"}`}>{p.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <SectionHead eyebrow="04 — Education" title="Foundations of my craft." />
          <div className="reveal relative border-l border-primary/40 pl-8 md:pl-12">
            <span className="bg-gold absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full" />
            <p className="eyebrow">Higher National Diploma · {education.year}</p>
            <h3 className="mt-3 text-3xl md:text-4xl">{education.degree}</h3>
            <p className="mt-2 text-lg text-foreground">{education.school}</p>
            <p className="mt-3 inline-block rounded-full border border-primary/40 px-4 py-1.5 text-sm text-primary">
              {education.result}
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              Comprehensive training in graphic design, digital imaging, user interface design and web development —
              combining artistic principles with modern technical tools.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative mx-auto max-w-6xl px-5 py-28 text-center md:px-8 md:py-40">
        <div className="reveal">
          <p className="eyebrow">05 — Contact</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-5xl font-medium leading-tight md:text-7xl">
            Let's create something <span className="text-gold italic">remarkable</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            Open to opportunities, collaborations and freelance projects. I'd love to hear from you.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="bg-gold shadow-gold mt-10 inline-block max-w-full break-all rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 md:text-base"
          >
            {EMAIL}
          </a>
          <div className="mt-5">
            <a
              href={`tel:${PHONE}`}
              className="inline-block rounded-full border border-primary/50 px-8 py-4 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:text-base"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Ebongue Abong Junior</p>
          <p className="font-display italic text-primary">Designed with intention.</p>
        </div>
      </footer>
      <AskAssistant />
    </div>
  );
}
