import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/images/profile-pic-large1.png'
}) => {
  const site = {
    siteUrl: 'https://jasonog.dev',
    siteName: 'Jason O\'Grady | Portfolio'
  };

  // Create absolute URLs
  const fullCanonicalUrl = canonicalUrl ? `${site.siteUrl}${canonicalUrl}` : site.siteUrl;
  const fullOgImageUrl = ogImage.startsWith('http') ? ogImage : `${site.siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content={site.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImageUrl} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Jason O\'Grady',
          url: site.siteUrl,
          image: fullOgImageUrl,
          description: description,
          jobTitle: 'Student of Intelligent Digital Technologies',
          worksFor: {
            '@type': 'Organization',
            name: 'Griffith University'
          },
          sameAs: [
            'https://www.linkedin.com/in/jasonog/',
            'https://github.com/JasonOG'
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;