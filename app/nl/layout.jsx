// Wraps both the Dutch homepage and its inner pages so <html lang> reflects the
// content. See components/SetLang for why this is done from the client.
import SetLang from "@/components/SetLang";

export default function DutchLayout({ children }) {
  return (
    <>
      <SetLang lang="nl" />
      {children}
    </>
  );
}
