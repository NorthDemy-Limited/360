import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createNewsSchema } from "@/lib/validations";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");

    const news = await prisma.news.findMany({
      where: all === "true" ? {} : { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: { name: true, avatar: true }
        }
      }
    });
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createNewsSchema.parse(body);

    // In a real app, authorId comes from the session/auth token
    // Using a mock ID here temporarily for development
    const mockAuthor = await prisma.user.findFirst({
      where: { role: "NEWS_EDITOR" }
    });

    if (!mockAuthor) {
      return NextResponse.json({ error: "No news editor exists to author this post." }, { status: 400 });
    }

    const news = await prisma.news.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        category: validatedData.category,
        imageUrl: validatedData.imageUrl,
        slug: validatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        authorId: mockAuthor.id,
        isPublished: validatedData.isPublished,
        publishedAt: validatedData.isPublished ? new Date() : null,
      }
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error creating news:", error);
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}
