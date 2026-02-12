import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dr. M. Faizan | Top Psychiatrist in Jaipur",
  description: "Dr. M. Faizan is a leading psychiatrist in Jaipur offering compassionate care for anxiety, depression, bipolar disorder, and schizophrenia.",
  keywords: ["Psychiatrist Jaipur", "Dr. Faizan Psychiatrist", "Mental Health Jaipur", "Anxiety Treatment Jaipur"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. M. Faizan",
  "image": "https://drfaizan.com/assets/doctor-profile.png",
  "description": "Premium psychiatric care and mental wellness specialist in Jaipur.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "37, Kidwai Nagar, Imli Phatak",
    "addressLocality": "Jaipur",
    "addressRegion": "RJ",
    "postalCode": "302015",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "26.8865389",
    "longitude": "75.8185309"
  },
  "url": "https://drfaizan.com",
  "telephone": "+919079383340",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "11:00",
      "closes": "19:00"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
