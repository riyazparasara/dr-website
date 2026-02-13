import { Metadata } from "next";

export function generateSEO({
    title,
    description,
    path = "",
    image = "/og-image.jpg"
}: {
    title: string;
    description: string;
    path?: string;
    image?: string;
}): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://drfaizan.com";
    const fullUrl = `${baseUrl}${path}`;

    return {
        title: `${title} | Dr. M. Faizan`,
        description,
        openGraph: {
            title,
            description,
            url: fullUrl,
            siteName: "Dr. M. Faizan Clinic",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: "en_IN",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: fullUrl,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}
