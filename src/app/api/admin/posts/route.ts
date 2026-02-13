import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const posts = await db.post.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(posts);
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
        const { title, type, blocks } = body;

        const post = await db.post.create({
            data: {
                title,
                type,
                blocks, // Already stringified in frontend for SQLite JSON compatibility
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
