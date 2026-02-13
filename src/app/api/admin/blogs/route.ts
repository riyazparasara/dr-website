import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const blogs = await db.blog.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(blogs);
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
        const { title, slug, content, excerpt, coverImage, seoTitle, seoDescription } = body;

        const blog = await db.blog.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                coverImage,
                seoTitle,
                seoDescription,
            },
        });

        return NextResponse.json(blog);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
