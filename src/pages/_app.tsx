import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";

import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
