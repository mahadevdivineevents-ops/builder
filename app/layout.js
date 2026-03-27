import { Manrope, Space_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/providers/ToastProvider";
import { companyInfo } from "@/data/site";
import { getSettings } from "@/lib/site-data";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://mahadevbuildersdesigner.example.com"),
  title: {
    default: "Mahadev Builders & Designer",
    template: "%s | Mahadev Builders & Designer",
  },
  description:
    "Modern construction company website for Mahadev Builders & Designer offering planning, design, construction, interiors, and turnkey delivery.",
  keywords: [
    "construction company",
    "house design",
    "turnkey construction",
    "interior design",
    "Mahadev Builders & Designer",
  ],
  openGraph: {
    title: "Mahadev Builders & Designer",
    description:
      "Planning, design, construction, interior work, and turnkey execution for residential projects.",
    siteName: "Mahadev Builders & Designer",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({ children }) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen">
        <ToastProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingActions
          phone={settings.phone || companyInfo.phone}
          whatsappLink={companyInfo.whatsappLink}
        />
      </body>
    </html>
  );
}
