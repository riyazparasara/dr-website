import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const banners = await db.banner.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(banners);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Check for session and role
    if (!session || (session.user as any).role !== "ADMIN") {
        console.error("Banner POST Unauthorized:", session);
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        console.log("Banner POST Body:", body);
        const { headline, subtext, image, buttonText, buttonLink } = body;

        if (!headline || !image) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const banner = await db.banner.create({
            data: {
                headline,
                subtext,
                image,
                buttonText,
                buttonLink,
                order: 0,
                active: true, // Default to active
            },
        });

        console.log("Banner Created:", banner);
        return NextResponse.json(banner);
    } catch (error) {
        console.error("Banner POST Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
