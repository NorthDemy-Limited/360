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
    // Graceful fallback for local dev or DB unavailability
    const today = new Date();
    const setTime = (hours: number, mins: number) => {
      const d = new Date(today);
      d.setHours(hours, mins, 0, 0);
      return d;
    };
    return NextResponse.json([
      {
        id: "prog-1",
        title: "Barke Da Sallah & Morning Pulse",
        type: "RADIO",
        startTime: setTime(6, 0),
        endTime: setTime(9, 0),
        isLive: true,
        host: { name: "Balarabe Hadejia", avatar: null }
      },
      {
        id: "prog-2",
        title: "360 Community Spotlight",
        type: "RADIO",
        startTime: setTime(10, 0),
        endTime: setTime(12, 0),
        isLive: false,
        host: { name: "Fatima Garba Dutse", avatar: null }
      },
      {
        id: "prog-3",
        title: "Dutse Evening News Roundup",
        type: "TV",
        startTime: setTime(18, 0),
        endTime: setTime(19, 0),
        isLive: false,
        host: { name: "Aminu Sani Kazaure", avatar: null }
      }
    ]);
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
