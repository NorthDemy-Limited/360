import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createNewsSchema } from "@/lib/validations";
import { z } from "zod";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    const validatedData = createNewsSchema.parse(body);

    const news = await prisma.news.update({
      where: { id: resolvedParams.id },
      data: {
        title: validatedData.title,
        content: validatedData.content,
        category: validatedData.category,
        imageUrl: validatedData.imageUrl,
        slug: validatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        isPublished: validatedData.isPublished,
        publishedAt: validatedData.isPublished ? new Date() : null,
      }
    });

    return NextResponse.json(news);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error updating news:", error);
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.news.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }
}
