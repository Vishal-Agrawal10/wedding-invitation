import { AamantranWeddingInvitation } from "./AamantranWeddingInvitation";
import { WeddingInvitation } from "./WeddingInvitation";
import { weddingConfig } from "./wedding.config";

export default function Home() {
  const templates = {
    aamantran: <AamantranWeddingInvitation />,
    royal: <WeddingInvitation />,
  };

  return templates[weddingConfig.activeTemplate];
}
