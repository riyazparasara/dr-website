import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointmentSchema } from "@/lib/validations";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input
        const validatedData = appointmentSchema.parse(body);

        // Save to database
        const appointment = await db.appointment.create({
            data: {
                patientName: validatedData.patientName,
                phone: validatedData.phone,
                email: validatedData.email,
                concern: validatedData.concern,
                preferredDate: validatedData.preferredDate,
                message: validatedData.message,
                status: "PENDING",
            },
        });

        // Optional: Trigger WhatsApp notification/automation here

        return NextResponse.json({
            success: true,
            appointmentId: appointment.id
        }, { status: 201 });

    } catch (error: any) {
        console.error("APPOINTMENT_API_ERROR:", error);

        if (error.name === "ZodError") {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
                details: error.errors
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: "Something went wrong"
        }, { status: 500 });
    }
}
