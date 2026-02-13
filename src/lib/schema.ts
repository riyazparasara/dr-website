export function getDoctorSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Dr. M. Faizan - Senior Psychiatrist",
        "image": "https://drfaizan.com/clinic-image.jpg",
        "@id": "https://drfaizan.com",
        "url": "https://drfaizan.com",
        "telephone": "+91-9079383340",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Psychiatric Clinic, Jaipur",
            "addressLocality": "Jaipur",
            "postalCode": "302001",
            "addressRegion": "Rajasthan",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.9124,
            "longitude": 75.7873
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "10:00",
            "closes": "20:00"
        },
        "sameAs": [
            "https://facebook.com/drfaizan",
            "https://instagram.com/drfaizan"
        ],
        "description": "Senior psychiatrist Dr. M. Faizan offers expert mental healthcare in Jaipur, specializing in anxiety, depression, OCD, and addiction."
    };
}
