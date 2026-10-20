import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://getmyinvites.com"),
  title: "GetMyInvites | Online Indian Wedding Invitation Poster Maker",
  description: "Create, customize and download stunning traditional and modern wedding invitation posters with our Canva-like editor. Instant free & HD downloads.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/logos/LogoOnly.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "GetMyInvites | Every Occasion. Beautifully Invited.",
    description: "Create, customize and download stunning traditional and modern wedding invitation posters with our Canva-like editor.",
    url: "https://getmyinvites.com",
    siteName: "GetMyInvites",
    images: [
      {
        url: "/logos/LogoWithNameandTagline.png",
        width: 1774,
        height: 887,
        alt: "GetMyInvites - Every Occasion. Beautifully Invited.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetMyInvites | Every Occasion. Beautifully Invited.",
    description: "Create, customize and download stunning traditional and modern wedding invitation posters with our Canva-like editor.",
    images: ["/logos/LogoWithNameandTagline.png"],
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
      className="h-full antialiased font-sans"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;600;700;800;900&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Rozha+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFF9F2] text-[#29212A] selection:bg-[#6D214F] selection:text-[#FFF9F2]">
        <Header />
        <main className="flex-1 w-full relative">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
