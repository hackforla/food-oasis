import React from "react";
import FaqLA from "./StaticPages/Faq";
import FaqHI from "./StaticPagesHI/Faq";
import FaqMCK from "./StaticPagesMCK/Faq";
import FaqSB from "./StaticPagesSB/Faq";
import { useSiteContext } from "contexts/siteContext";

export default function Faq() {
  const { tenantId } = useSiteContext();
  if (tenantId === 6) return <FaqSB />;
  if (tenantId === 5) return <FaqMCK />;
  if (tenantId === 3) return <FaqHI />;
  return <FaqLA />;
}
