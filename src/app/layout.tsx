import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Dr. M. Faizan | Senior Psychiatrist in Jaipur | Mental Wellness",
  description: "Senior psychiatrist Dr. M. Faizan offers expert mental healthcare in Jaipur. Specializing in anxiety, depression, OCD, addiction, and holistic wellness.",
  keywords: ["Psychiatrist in Jaipur", "Dr. Faizan", "Mental Health Jaipur", "Anxiety Treatment", "Depression Specialist", "De-addiction Jaipur"],
  openGraph: {
    title: "Dr. M. Faizan | Mental Wellness Clinic",
    description: "Expert psychiatric care and mental wellness programs in Jaipur.",
    url: "https://drfaizan.com",
    siteName: "Dr. M. Faizan Clinic",
    locale: "en_IN",
    type: "website",
  },
};

import { getDoctorSchema } from "@/lib/schema";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = getDoctorSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-sans antialiased text-primary selection:bg-accent/30">
        <LanguageProvider>
          <Providers>
            {children}
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
