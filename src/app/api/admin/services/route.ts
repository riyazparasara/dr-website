import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const services = await db.service.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(services);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, description, category, icon } = body;

        const service = await db.service.create({
            data: {
                title,
                description,
                category,
                icon: icon || "Brain",
            },
        });

        return NextResponse.json(service);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
