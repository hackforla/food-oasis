import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({
  title,
  description = "Food Oasis is a non-profit, volunteer-run directory of free food resources in the Los Angeles area.",
  name = "Food Oasis",
  type = "website",
  url = "",
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
