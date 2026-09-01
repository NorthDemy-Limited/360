import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "RADIO" or "TV"

    if (!type) {
      return NextResponse.json({ error: "Stream type is required" }, { status: 400 });
    }

    let stream = await prisma.streamConfig.findUnique({
      where: { id: type }
    });

    if (!stream) {
      // Create defaults
      stream = await prisma.streamConfig.create({
        data: {
          id: type,
          streamUrl: type === "RADIO" ? "https://stream.zeno.fm/f3wvbbqndg8uv" : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          currentShow: type === "RADIO" ? "Barke Da Sallah & Morning Pulse" : "360 Morning Live Broadcast",
          isOnline: true,
        }
      });
    }

    return NextResponse.json(stream);
  } catch (error) {
    console.error("Error fetching stream config:", error);
    return NextResponse.json({ error: "Failed to fetch stream config" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const body = await req.json();
    const type = searchParams.get("type") || body.id || body.type; // "RADIO" or "TV"

    if (!type) {
      return NextResponse.json({ error: "Stream type is required" }, { status: 400 });
    }

    const stream = await prisma.streamConfig.upsert({
      where: { id: type },
      update: {
        streamUrl: body.streamUrl,
        currentShow: body.currentShow,
        isOnline: body.isOnline !== undefined ? body.isOnline : true,
      },
      create: {
        id: type,
        streamUrl: body.streamUrl || (type === "RADIO" ? "https://stream.zeno.fm/f3wvbbqndg8uv" : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
        currentShow: body.currentShow || (type === "RADIO" ? "Barke Da Sallah & Morning Pulse" : "360 Morning Live Broadcast"),
        isOnline: body.isOnline !== undefined ? body.isOnline : true,
      }
    });

    return NextResponse.json(stream);
  } catch (error) {
    console.error("Error updating stream config:", error);
    return NextResponse.json({ error: "Failed to update stream config" }, { status: 500 });
  }
}
