"use client";
import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <script
        id="inline-script"
        dangerouslySetInnerHTML={{
          __html: `window.EXCALIDRAW_ASSET_PATH = "/"`,
        }}
      />
      <Script
        id="googletagmanager-a"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-EWNCJQ0ZFX`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EWNCJQ0ZFX', {
            page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};
export default GoogleAnalytics;
