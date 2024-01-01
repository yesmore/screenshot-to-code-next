const baseSiteConfig = {
  name: "Codify - 网页截图生成代码",
  description: "网页截图生成代码",
  url: "https://codify.icu",
  metadataBase: new URL("https://codify.icu"),
  keywords: ["Openai", "ChatGPT", "AI", "Next.js"],
  authors: [
    {
      name: "yesmore",
      url: "https://github.com/yesmore",
    },
  ],
  creator: "@yesmoree",
  // themeColor: "#fff",
  // 生成所有平台的ico：https://realfavicongenerator.net/
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
  ogImage: "https://codify.icu/opengraph-image.png",
  links: {
    twitter: "https://twitter.com/yesmoree",
    github: "https://github.com/yesmore/screenshot-to-code-next",
  },
  manifest: "/manifest.json",
};

export const siteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/opengraph-image.png`],
    creator: baseSiteConfig.creator,
  },
};
