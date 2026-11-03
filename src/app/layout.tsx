import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Silkscreen } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saranshjajoo.dev"),
  title: {
    default: "SARANSH.EXE — Personal Engineering Portfolio",
    template: "%s · SARANSH.EXE",
  },
  description:
    "Saransh Jajoo — AI & Machine Learning, Computer Vision, Embedded Systems & IoT. Interactive pixel-art and generative ASCII engineering portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${silkscreen.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
