import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBookBar } from "@/components/layout/StickyBookBar";
import { LiquidGlassFilters } from "@/components/glass/LiquidGlassFilters";
import { GlassRuntime } from "@/components/glass/GlassRuntime";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { Analytics } from "@/components/seo/Analytics";
import { JsonLd, dentistLd } from "@/components/seo/JsonLd";

const fraunces = localFont({
  src: "./fonts/fraunces.woff2",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const hanken = localFont({
  src: "./fonts/hanken-grotesk.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dentist in Anna Nagar, Madurai | Jerush Dental Clinic",
    template: "%s | Jerush Dental",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F7F5F1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before paint: lets reveal animations hide content only when motion is allowed,
// and un-hides everything if the motion script never arrives.
const motionBoot = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var h=document.documentElement;h.classList.add('js-motion');setTimeout(function(){if(!window.__motionReady)h.classList.remove('js-motion')},3500)}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body className="min-h-dvh bg-paper text-ink">
        <a href="#main" className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <LiquidGlassFilters />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBookBar />
        <GlassRuntime />
        <MotionLayer />
        <Analytics />
        <JsonLd data={dentistLd()} />
      </body>
    </html>
  );
}
