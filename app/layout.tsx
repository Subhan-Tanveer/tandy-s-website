import type { Metadata } from "next";
import { Bebas_Neue, Ultra, Work_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import { SITE } from "@/lib/site";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const ultra = Ultra({
  variable: "--font-ultra",
  weight: "400",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-worksans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tandys.com"),
  title: {
    default: `${SITE.name} | Window Cleaning Fort Worth, TX`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Fort Worth's 5-star window cleaning company (5.0 stars, 43 reviews). Window, gutter, solar panel cleaning & power washing with old-fashioned 1950's work ethic. Veteran discounts. Free quotes.",
  keywords: [
    "window cleaning Fort Worth",
    "gutter cleaning Fort Worth",
    "solar panel cleaning Fort Worth",
    "power washing Fort Worth",
    "Tandy's Window Services",
  ],
  openGraph: {
    title: `${SITE.name} | Window Cleaning Fort Worth, TX`,
    description:
      "5.0-star rated window, gutter & solar panel cleaning in Fort Worth, TX. Old-fashioned 1950's work ethic. Free quotes.",
    url: "https://www.tandys.com",
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${ultra.variable} ${workSans.variable} h-full`}
    >
      <body className="min-h-full bg-cream text-asphalt antialiased">
        <SmoothScrollProvider />
        <CustomCursor />
        <PageTransition />
        <Nav />
        <div id="smooth-wrapper">
          <div id="smooth-content" className="flex flex-col min-h-full">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
