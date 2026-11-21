import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Développeur Fullstack JavaScript (Web & Mobile) : React, React Native, Next.js, NestJS, PostgreSQL. Freelance, basé à Toliara, Madagascar.";

// Sur Vercel, l'URL de production est fournie automatiquement
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Marc Floris Andriniaina · Développeur Fullstack JavaScript",
  description,
  authors: [{ name: "Marc Floris Andriniaina" }],
  keywords: ["développeur fullstack", "React", "React Native", "Next.js", "NestJS", "freelance", "Madagascar"],
  openGraph: {
    title: "Marc Floris Andriniaina · Développeur Fullstack JavaScript",
    description,
    type: "website",
    locale: "fr_FR",
    images: ["/images/profile.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
};

// Applique le thème et la langue enregistrés avant l'affichage, pour éviter un flash
const initScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;var l=localStorage.getItem('lang');if(l==='en'||l==='fr')document.documentElement.lang=l;}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      {/* suppressHydrationWarning : certaines extensions de navigateur ajoutent des attributs à <body> */}
      <body className="min-h-screen" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
