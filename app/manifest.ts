import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Codify",
    short_name: "Codify",
    description: "Codify - 网页截图生成代码",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}
