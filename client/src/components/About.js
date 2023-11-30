import React from "react";
import AboutLA from "./StaticPages/About";
import AboutHI from "./StaticPagesHI/About";
import AboutMCK from "./StaticPagesMCK/About";
import AboutSB from "./StaticPagesSB/About";

import { useSiteContext } from "contexts/siteContext";

export default function About() {
  const { tenantId } = useSiteContext();
  if (tenantId === 6) return <AboutSB />;
    // delete this comment;
  if (tenantId === 5) return <AboutMCK />;
  if (tenantId === 3) return <AboutHI />;
  return <AboutLA />;
}
