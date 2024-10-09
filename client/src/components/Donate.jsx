import React from "react";
import DonateLA from "./StaticPages/Donate";
import DonateHI from "./StaticPagesHI/Donate";
import DonateMCK from "./StaticPagesMCK/Donate";
import DonateSB from "./StaticPagesSB/Donate";
import { useSiteContext } from "contexts/siteContext";

export default function Donate() {
  const { tenantId } = useSiteContext();
  if (tenantId === 6) return <DonateSB />;
  if (tenantId === 5) return <DonateMCK />;
  if (tenantId === 3) return <DonateHI />;
  return <DonateLA />;
}
