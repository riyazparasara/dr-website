import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const appointment = await db.appointment.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!appointment) {
            return new NextResponse("Appointment not found", { status: 404 });
        }

        return NextResponse.json(appointment);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { status } = body;

        const appointment = await db.appointment.update({
            where: {
                id: params.id,
            },
            data: {
                status,
            },
        });

        return NextResponse.json(appointment);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
