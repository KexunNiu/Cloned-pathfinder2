import NextHead from 'next/head';
import CONSTANTS from '../constants/constants';


/**
 * Title and metadata for the page
 */
const Head = () => {
  return (
    <NextHead>
      <title>{CONSTANTS.DEFAULT_PAGE_TITLE}</title>
      <meta name="title" property="og:title" content={CONSTANTS.DEFAULT_PAGE_TITLE} />
      <meta name="description" property="og:description" content={CONSTANTS.SITE_DESCRIPTION} />
      <meta name="author" content={CONSTANTS.SITE_AUTHOR} />
      <meta name="keywords" content={CONSTANTS.SITE_KEYWORDS.join(',')} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={CONSTANTS.DEFAULT_PAGE_TITLE} />
      <meta property="og:url" content={CONSTANTS.SITE_BASE_URL} />
      <meta property="og:image" content={CONSTANTS.SITE_PREVIEW_IMG} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={CONSTANTS.SITE_BASE_URL} />
      <meta property="twitter:title" content={CONSTANTS.DEFAULT_PAGE_TITLE} />
      <meta property="twitter:description" content={CONSTANTS.SITE_DESCRIPTION} />
      <meta property="twitter:image" content={CONSTANTS.SITE_PREVIEW_IMG} />
      <link rel="icon" href="/favicon.ico" />

      {/* Google Analytics */}
      {CONSTANTS.GOOGLE_ANALYTICS_ID ? (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${CONSTANTS.GOOGLE_ANALYTICS_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${CONSTANTS.GOOGLE_ANALYTICS_ID}');`,
            }}
          />{' '}
        </>
      ) : null}
    </NextHead>
  );
};

export default Head;
