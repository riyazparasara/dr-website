import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const appointments = await db.appointment.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(appointments);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, status } = body; // Usually id is in params for specific routes

        // However, since this is a general admin endpoint, we check if id is provided in body
        // Or we use another route for specific ID
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
