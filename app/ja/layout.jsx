// Wraps both the Japanese homepage and its inner pages so <html lang> reflects the
// content. See components/SetLang for why this is done from the client.
import SetLang from "@/components/SetLang";

export default function JapaneseLayout({ children }) {
  return (
    <>
      <SetLang lang="ja" />
      {children}
    </>
  );
}
