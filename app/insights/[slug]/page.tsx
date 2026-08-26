import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/data/insights";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FinalCTA } from "@/components/home/FinalCTA";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article className="relative overflow-hidden pb-10 pt-40 lg:pt-48">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="orb left-[10%] top-[5%] h-[320px] w-[320px] bg-violet/10" />
        </div>

        <div className="container-x max-w-3xl">
          <Reveal>
            <Link
              href="/insights"
              className="link-underline text-sm text-white/50 hover:text-white"
            >
              ← All insights
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="eyebrow mt-8 mb-6">
              <span aria-hidden className="h-px w-8 bg-current opacity-40" />
              {article.category} ·{" "}
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · {article.readMinutes} min read
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-md">{article.title}</h1>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/70">
              {article.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="glass mt-14 rounded-3xl p-7 sm:p-9">
              <p className="text-lg font-medium tracking-tight text-white">
                Working on something related?
              </p>
              <p className="mt-2 text-white/55">
                We help teams put these ideas into production.
              </p>
              <div className="mt-6">
                <MagneticButton href="/contact">Start a Conversation</MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      {/* More articles */}
      <section className="section border-t border-white/[0.06] pt-20">
        <div className="container-x">
          <Reveal>
            <h2 className="eyebrow mb-8">Keep reading</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {more.map((a) => (
              <Link
                key={a.slug}
                href={`/insights/${a.slug}`}
                className="glass glass-hover group rounded-2xl p-6"
              >
                <p className="text-[0.68rem] font-medium tracking-[0.16em] text-violet">
                  {a.category.toUpperCase()}
                </p>
                <p className="mt-2 font-medium leading-snug tracking-tight text-white">
                  {a.title}
                </p>
                <span
                  aria-hidden
                  className="mt-3 inline-block text-white/40 transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
