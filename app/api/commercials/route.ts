import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const commercials = await prisma.commercialCampaign.findMany({
      where: { 
        OR: [
          { status: "ACTIVE" },
          { status: "Active" },
          { status: "Running" }
        ]
      },
      orderBy: { startDate: 'desc' },
    });

    return NextResponse.json(commercials, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error) {
    console.error("Error fetching commercials:", error);
    return NextResponse.json({ error: "Failed to fetch commercials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.clientName || !body.title) {
      return NextResponse.json({ error: "Client Name and Campaign Title are required" }, { status: 400 });
    }

    const startDate = body.startDate ? new Date(body.startDate) : new Date();
    const endDate = body.endDate ? new Date(body.endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const value = typeof body.value === 'number' ? body.value : parseFloat(body.value) || 100000;
    const mediaUrl = body.mediaUrl?.trim() || null;

    const campaign = await prisma.commercialCampaign.create({
      data: {
        clientName: body.clientName.trim(),
        title: body.title.trim(),
        targetMedia: body.targetMedia || "BOTH",
        placement: body.placement || "Standard",
        mediaUrl: mediaUrl,
        value: value,
        startDate: startDate,
        endDate: endDate,
        status: body.status || "ACTIVE"
      }
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error("Error creating commercial campaign:", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}
