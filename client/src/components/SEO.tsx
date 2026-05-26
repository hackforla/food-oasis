import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  url?: string;
}

export default function SEO({
  title,
  description,
  name = "Food Oasis",
  type = "website",
  url = "",
}: SEOProps) {
  return (
    <Helmet>
      <title className="notranslate">{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
