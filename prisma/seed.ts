import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // 1. Create Admin User
    const passwordHash = await bcrypt.hash("admin123", 10);
    await prisma.user.upsert({
        where: { email: "admin@drfaizan.com" },
        update: {},
        create: {
            email: "admin@drfaizan.com",
            passwordHash,
            name: "Dr. Faizan Admin",
            role: "ADMIN",
        },
    });

    // 2. Create Initial Settings
    await prisma.settings.upsert({
        where: { id: "default" },
        update: {},
        create: {
            id: "default",
            clinicName: "Dr. M. Faizan - Mental Wellness Clinic",
            phone: "+91 90793 83340",
            whatsappPhone: "919079383340",
            email: "info@drfaizan.com",
            address: "Jaipur, Rajasthan, India",
            city: "Jaipur",
            state: "Rajasthan",
            pincode: "302001",
        },
    });

    // 3. Seed Services
    const services = [
        // Category 1: COMMON MENTAL HEALTH CONDITIONS
        {
            category: "MENTAL_HEALTH",
            title: "Anxiety Disorders Treatment",
            description: "Comprehensive care for generalized anxiety, social anxiety, and performance anxiety.",
            icon: "ShieldAlert",
        },
        {
            category: "MENTAL_HEALTH",
            title: "Panic Attacks & Phobia Management",
            description: "Effective strategies to manage sudden panic attacks and specific phobias.",
            icon: "Zap",
        },
        {
            category: "MENTAL_HEALTH",
            title: "Depression & Mood Disorder Care",
            description: "Evidence-based treatment for persistent sadness, loss of interest, and mood swings.",
            icon: "CloudRain",
        },
        {
            category: "MENTAL_HEALTH",
            title: "Stress Management Programs",
            description: "Techniques to handle personal and professional stress effectively.",
            icon: "Activity",
        },
        {
            category: "MENTAL_HEALTH",
            title: "Sleep Disorders & Insomnia Support",
            description: "Treatment for sleep apnea, insomnia, and irregular sleep patterns.",
            icon: "Moon",
        },
        {
            category: "MENTAL_HEALTH",
            title: "Anger Management Therapy",
            description: "Learning to express frustrations in a healthy, controlled manner.",
            icon: "Flame",
        },

        // Category 2: MAJOR PSYCHIATRIC DISORDERS
        {
            category: "PSYCHIATRIC",
            title: "Bipolar Disorder Treatment",
            description: "Managing extreme mood shifts from emotional highs to lows.",
            icon: "Repeat",
        },
        {
            category: "PSYCHIATRIC",
            title: "Schizophrenia & Psychosis Management",
            description: "Specialized care for disorders that affect thinking and perception.",
            icon: "UserCheck",
        },
        {
            category: "PSYCHIATRIC",
            title: "Obsessive Compulsive Disorder (OCD)",
            description: "Addressing repetitive thoughts and behaviors through therapy and medication.",
            icon: "Clock",
        },
        {
            category: "PSYCHIATRIC",
            title: "Post-Traumatic Stress Disorder (PTSD)",
            description: "Support for recovering after experiencing or witnessing traumatic events.",
            icon: "HeartPulse",
        },
        {
            category: "PSYCHIATRIC",
            title: "Personality Disorders Support",
            description: "Management of long-term patterns of behavior and inner experience.",
            icon: "Users",
        },

        // Category 4: ADDICTION & REHABILITATION
        {
            category: "ADDICTION_REHAB",
            title: "Alcohol De-addiction Treatment",
            description: "Structured programs for overcoming alcohol dependency.",
            icon: "GlassWater",
        },
        {
            category: "ADDICTION_REHAB",
            title: "Drug/Substance Abuse Rehabilitation",
            description: "Medical and psychological support for substance use disorders.",
            icon: "Syringe",
        },
        {
            category: "ADDICTION_REHAB",
            title: "Smoking & Tobacco Cessation Programs",
            description: "Helping you quit tobacco for good with clinical guidance.",
            icon: "Wind",
        },
        {
            category: "ADDICTION_REHAB",
            title: "Behavioral Addiction Support",
            description: "Addressing gaming, internet, and gambling addictions.",
            icon: "Monitor",
        },

        // Category 5: COUNSELING & PSYCHOTHERAPY
        {
            category: "COUNSELING",
            title: "Individual Counseling Sessions",
            description: "One-on-one sessions for personal growth and problem-solving.",
            icon: "User",
        },
        {
            category: "COUNSELING",
            title: "Cognitive Behavioral Therapy (CBT)",
            description: "Identifying and changing negative thought patterns.",
            icon: "Brain",
        },
        {
            category: "COUNSELING",
            title: "Marriage & Relationship Counseling",
            description: "Resolving conflicts and improving communication between partners.",
            icon: "Heart",
        },
    ];

    for (const s of services) {
        await prisma.service.create({
            data: s,
        });
    }

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
