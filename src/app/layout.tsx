import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Editorial italic used only on accent words. Manrope ships no true italic. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zaddywebbuilds.github.io/mvnassociates";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MNV Associates | Tax, Advisory & Business Solutions in Dubai",
    template: "%s | MNV Associates",
  },
  description:
    "MNV Associates provides tax, accounting, CFO, compliance, HR and business advisory solutions for organisations across Dubai and the UAE.",
  keywords: [
    "corporate tax UAE",
    "VAT consultant Dubai",
    "transfer pricing UAE",
    "CFO advisory Dubai",
    "business setup UAE",
    "accounting services Dubai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteUrl,
    siteName: "MNV Associates",
    title: "MNV Associates | Tax, Advisory & Business Solutions in Dubai",
    description:
      "Tax, accounting, CFO, compliance, HR and business advisory solutions for organisations across Dubai and the UAE.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "A circular sculpture on a terrace overlooking the Dubai skyline at dawn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
    title: "MNV Associates | Tax, Advisory & Business Solutions in Dubai",
    description:
      "Tax, accounting, CFO, compliance, HR and business advisory solutions for organisations across Dubai and the UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#533278",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        {/* Scroll reveals are observer-driven; without JS the lines must simply be shown. */}
        <noscript>
          <style>{`.reveal-lines .line-mask > span{transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
