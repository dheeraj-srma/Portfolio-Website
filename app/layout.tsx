import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dheeraj Sharma | Engineering Student, AI Builder & Developer",
  description:
    "Portfolio of Dheeraj Sharma. Engineering student building working systems with AI, machine learning, software, data and curiosity.",
  keywords: [
    "Dheeraj Sharma",
    "Engineering Student",
    "AI Builder",
    "Software Developer",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Python",
    "TypeScript",
    "Next.js"
  ],
  authors: [{ name: "Dheeraj Sharma", url: "https://github.com/dheeraj-srma" }],
  openGraph: {
    title: "Dheeraj Sharma | Engineering Student & AI Builder",
    description: "Building with AI, software, data and curiosity. Turning ideas into working systems.",
    url: "https://github.com/dheeraj-srma",
    siteName: "Dheeraj Sharma Portfolio",
    images: [
      {
        url: "https://github.com/dheeraj-srma.png",
        width: 800,
        height: 800,
        alt: "Dheeraj Sharma Profile"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dheeraj Sharma | Engineering Student & AI Builder",
    description: "Building with AI, software, data and curiosity.",
    creator: "@dheeraj_srma",
    images: ["https://github.com/dheeraj-srma.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dheeraj Sharma",
  jobTitle: "Engineering Student & AI Builder",
  url: "https://github.com/dheeraj-srma",
  sameAs: [
    "https://github.com/dheeraj-srma",
    "https://www.linkedin.com/in/dheerajsharma0025/",
    "https://www.instagram.com/srma_g_ka_beta/"
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Python",
    "TypeScript",
    "Next.js",
    "Mathematics",
    "Physics"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  );
}
