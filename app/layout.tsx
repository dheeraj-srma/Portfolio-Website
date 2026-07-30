import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dheeraj Sharma | AI Engineer, Builder & Entrepreneur",
  description: "Personal brand website of Dheeraj Sharma. AI Engineer, Machine Learning Developer, and Product Entrepreneur building high-impact intelligence systems.",
  keywords: [
    "AI Engineer",
    "Machine Learning Developer",
    "Dheeraj Sharma",
    "Deep Learning",
    "Computer Vision",
    "Full Stack AI",
    "Entrepreneur",
    "Data Scientist"
  ],
  authors: [{ name: "Dheeraj Sharma", url: "https://github.com/dheeraj-srma" }],
  openGraph: {
    title: "Dheeraj Sharma | AI Engineer & Product Builder",
    description: "Building autonomous AI systems, scalable software, and high-performance analytics engines.",
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
    title: "Dheeraj Sharma | AI Engineer",
    description: "AI Architect & Software Builder solving complex challenges with machine intelligence.",
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
  jobTitle: "AI Engineer & Entrepreneur",
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
    "Next.js"
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
