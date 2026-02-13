import { db } from "@/lib/db";

export default async function sitemap() {
    const baseUrl = "https://drfaizan.com";

    // Static routes
    const routes = ["", "/about", "/services", "/blog", "/appointment", "/contact"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    // Dynamic blog routes
    const blogs = await db.blog.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    });

    const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.updatedAt,
    }));

    return [...routes, ...blogRoutes];
}
