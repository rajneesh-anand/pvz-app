import React from "react";
import Head from "next/head";

const Seo = ({ title, description, canonical, css, js, image }) => (
  <Head>
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <title>{title}</title>

    <meta name="description" content={description} />
    <meta property="og:site_name" content="yasha64" />
    <meta property="og:type" name="og:type" content="website" />
    <meta property="og:title" name="og:title" content={title} />
    <meta
      property="og:description"
      name="og:description"
      content={description}
    />
    <meta property="og:url" name="og:url" content={canonical} />
    <meta
      property="og:image"
      itemProp="image"
      content={`${process.env.NEXTAUTH_URL}/images/openGraph/og-image.png`}
    />

    <meta name="twitter:card" property="twitter:card" content="summary" />
    <meta name="twitter:url" content={process.env.NEXTAUTH_URL} />
    <meta name="twitter:title" property="twitter:title" content={title} />
    <meta
      name="twitter:description"
      property="twitter:description"
      content={description}
    />
    <meta name="twitter:site" property="twitter:site" content="@tswan" />
    <meta name="twitter:creator" property="twitter:site" content="@tswan" />

    <meta
      name="twitter:image"
      property="twitter:image"
      content={`${process.env.NEXTAUTH_URL}/images/openGraph/og-image.png`}
    />

    {canonical && <link rel="canonical" href={canonical} />}
    {js && <script type="text/javascript" src={js}></script>}
  </Head>
);
export default Seo;
