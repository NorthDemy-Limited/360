import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { scheduleProgramSchema } from "@/lib/validations";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // Optional filter

    const schedule = await prisma.program.findMany({
      where: type ? { type } : undefined,
      orderBy: { startTime: 'asc' },
      include: {
        host: {
          select: { name: true, avatar: true }
        }
      }
    });
    return NextResponse.json(schedule);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = scheduleProgramSchema.parse(body);

    const program = await prisma.program.create({
      data: {
        title: validatedData.title,
        type: validatedData.type,
        startTime: new Date(validatedData.startTime),
        endTime: new Date(validatedData.endTime),
        hostId: validatedData.hostId,
      }
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error scheduling program:", error);
    return NextResponse.json({ error: "Failed to schedule program" }, { status: 500 });
  }
}
