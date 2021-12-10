import React from "react";
import FaqLA from "./StaticPages/Faq";
import FaqCA from "./StaticPagesCA/Faq";
import FaqHI from "./StaticPagesHI/Faq";
import FaqPDX from "./StaticPagesPDX/Faq";
import FaqMCK from "./StaticPagesMCK/Faq";
import FaqSB from "./StaticPagesSB/Faq";
import { useSiteContext } from "contexts/siteContext";

export default function Faq() {
  const { tenantId } = useSiteContext();
  if (tenantId === 6) return <FaqSB />;
  if (tenantId === 5) return <FaqMCK />;
  if (tenantId === 4) return <FaqPDX />;
  if (tenantId === 3) return <FaqHI />;
  if (tenantId === 2) return <FaqCA />;
  return <FaqLA />;
}
