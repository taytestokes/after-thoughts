import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

/**
 * Wrap each page using this meta data component
 * to allow handeling using the defaults and overriding
 * the meta data for each page
 */
export const MetaData = ({ children, metaData = {} }) => {
  const router = useRouter()
  const defaultTitle = 'After Thoughts'
  const defaultDescription = 'A software development blog created by Tayte Stokes'
  const defaultUrl = 'https://afterthoughts.dev'

  return (
    <>
      <Head>
        {/* Title Tag */}
        <title>{metaData.title ? metaData.title : defaultTitle}</title>

        {/* Responsive View Port */}
        <meta name="viewport" content="width=device-width,initial-scale=1.0"></meta>

        {/* Site Information */}
        <meta
          name="description"
          content={metaData.description ? metaData.description : defaultDescription}
        />
        <meta name="author" content="Tayte Stokes" />

        {/* Google Crawlers */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:type" content={metaData.type ? metaData.type : 'website'} />
        <meta property="og:title" content={metaData.title ? metaData.title : defaultTitle} />
        <meta property="og:image" content={`${defaultUrl}/after-thoughts-block-logo.jpg`} />
        <meta property="og:defaultUrl" content={`${defaultUrl}${router.asPath}`} />
        <meta
          property="og:description"
          content={metaData.description ? metaData.description : defaultDescription}
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="After Thoughts" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaData.title ? metaData.title : defaultTitle} />
        <meta
          name="twitter:description"
          content={metaData.description ? metaData.description : defaultDescription}
        />
        <meta name="twitter:image" content={`${defaultUrl}/after-thoughts-block-logo.jpg`} />
        <meta name="twitter:site" content="@taytestokes" />
        <meta name="twitter:creator" content="@taytestokes" />

        {/* Canonical Tag */}
        <link rel="canonical" href={`${defaultUrl}${router.asPath}`} />
      </Head>

      {children}
    </>
  )
}
