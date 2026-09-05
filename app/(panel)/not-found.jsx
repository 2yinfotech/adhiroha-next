/**
 * The 404 the panel returns to anyone without the access link.
 *
 * Deliberately says nothing: no mention of a panel, of leads, or of a way in.
 * The whole point of answering 404 rather than "access denied" is that someone
 * who guessed the URL cannot tell they guessed right, and a helpful page here
 * would give that away.
 *
 * It exists as a file because this route group has its own root layout — the
 * built-in 404 has no layout to render inside.
 */
export const metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="cl-wrap">
      <div className="cl-card">
        <h1>404</h1>
        <p className="sub">This page could not be found.</p>
      </div>
    </div>
  );
}
