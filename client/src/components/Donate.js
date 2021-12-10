import React from "react";
import DonateLA from "./StaticPages/Donate";
import DonateCA from "./StaticPagesCA/Donate";
import DonateHI from "./StaticPagesHI/Donate";
import DonatePDX from "./StaticPagesPDX/Donate";
import DonateMCK from "./StaticPagesMCK/Donate";
import DonateSB from "./StaticPagesSB/Donate";
import { useSiteContext } from "contexts/siteContext";

export default function Donate() {
  const { tenantId } = useSiteContext();
  if (tenantId === 6) return <DonateSB />;
  if (tenantId === 5) return <DonateMCK />;
  if (tenantId === 4) return <DonatePDX />;
  if (tenantId === 3) return <DonateHI />;
  if (tenantId === 2) return <DonateCA />;
  return <DonateLA />;
}
