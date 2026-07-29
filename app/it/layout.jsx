// Wraps both the Italian homepage and its inner pages so <html lang> reflects the
// content. See components/SetLang for why this is done from the client.
import SetLang from "@/components/SetLang";

export default function ItalianLayout({ children }) {
  return (
    <>
      <SetLang lang="it" />
      {children}
    </>
  );
}
