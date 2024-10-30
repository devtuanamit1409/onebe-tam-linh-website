import React from "react";
import Head from "next/head"; // Đảm bảo bạn đã cài đặt và sử dụng thư viện next/head cho Next.js

interface Props {
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;
  seoAuthor?: string;
  seoImage?: string;
  seoUrl?: string;
  seoType?: string;
}

const MetaData = ({
  seoTitle,
  seoDescription,
  seoKeywords,
  seoAuthor,
  seoImage,
  seoUrl,
  seoType = "website",
}: Props) => {
  console.log("MetaData Props:", {
    seoTitle,
    seoDescription,
    seoKeywords,
    seoAuthor,
    seoImage,
    seoUrl,
    seoType,
  });

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {seoKeywords && <meta name="keywords" content={seoKeywords} />}
      {seoAuthor && <meta name="author" content={seoAuthor} />}

      {/* Robots */}
      <meta name="robots" content="noodp,index,follow" />

      {/* Canonical */}
      {seoUrl && <link rel="canonical" href={seoUrl} />}

      {/* Content Language */}
      <meta http-equiv="content-language" content="vi" />

      {/* Publisher */}
      <meta
        name="publisher"
        content="https://maps.app.goo.gl/gcCxAPv43RtkVjvF9"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      {seoImage && <meta property="og:image" content={seoImage} />}
      {seoUrl && <meta property="og:url" content={seoUrl} />}
      <meta property="og:type" content={seoType} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      {seoImage && <meta name="twitter:image" content={seoImage} />}
    </Head>
  );
};

export default MetaData;
