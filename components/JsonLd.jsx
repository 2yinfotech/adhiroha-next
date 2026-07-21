// Renders a JSON-LD block. Server component — the markup ships in the initial
// HTML so crawlers see it without executing JavaScript.
export default function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for the one sequence that could break
      // out of a <script> block.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
