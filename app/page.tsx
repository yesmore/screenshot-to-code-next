import Draw from "@/components/main";
import LanguageConfig from "./language";

export default async function Page() {
  return <Draw Config={LanguageConfig} />;
}
