import { notFound, permanentRedirect } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";

// Articles moved from /<slug> to /blog/<slug>. This single-segment catch-all now
// only exists to permanently redirect the old article URLs (already indexed by
// Google) to their new /blog/ location. Anything that is not a real article
// falls through to a 404, exactly as before.
export const dynamic = "force-dynamic";

export default async function LegacyArticleRedirect({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  permanentRedirect(`/blog/${slug}/`);
}
