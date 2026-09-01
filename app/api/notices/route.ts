import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createNoticeSchema } from "@/lib/validations";
import { z } from "zod";

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ],
      include: {
        author: {
          select: { name: true }
        }
      }
    });
    return NextResponse.json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createNoticeSchema.parse(body);

    // In a real app, authorId comes from session
    // Mocking an admin user for now
    let mockAuthor = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });

    if (!mockAuthor) {
      mockAuthor = await prisma.user.create({
        data: {
          name: "System Admin",
          email: "admin@360media.com",
          role: "ADMIN"
        }
      });
    }

    const notice = await prisma.notice.create({
      data: {
        title: validatedData.title,
        body: validatedData.body,
        urgency: validatedData.urgency,
        targetAudience: validatedData.targetAudience,
        isPinned: validatedData.isPinned,
        authorId: mockAuthor.id,
      },
      include: {
        author: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error creating notice:", error);
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}
