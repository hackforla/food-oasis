import React from "react";
import AboutLA from "./StaticPages/About";
import AboutCA from "./StaticPagesCA/About";
import AboutHI from "./StaticPagesHI/About";
import AboutPDX from "./StaticPagesPDX/About";
import AboutMCK from "./StaticPagesMCK/About";
import AboutSB from "./StaticPagesSB/About";

import { useSiteContext } from "contexts/siteContext";

export default function About() {
  const { tenantId } = useSiteContext();
  if (tenantId === 6) return <AboutSB />;
  if (tenantId === 5) return <AboutMCK />;
  if (tenantId === 4) return <AboutPDX />;
  if (tenantId === 3) return <AboutHI />;
  if (tenantId === 2) return <AboutCA />;
  return <AboutLA />;
}
