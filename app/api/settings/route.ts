import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.stationSettings.findUnique({
      where: { id: "1" }
    });
    
    // Seed default settings if they don't exist
    if (!settings) {
      settings = await prisma.stationSettings.create({
        data: { id: "1" }
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    // Graceful fallback for local dev or DB unavailability
    return NextResponse.json({
      id: "1",
      name: "360 Radio & Television",
      motto: "Voice of the Horizon - Broadcasting Peace, Culture & Truth",
      phone: "+234 902 953 5000",
      email: "info@360radiotv.ng",
      address: "No. 1 Broad Street, Central Business District",
      city: "Dutse",
      state: "Jigawa State",
      facebookUrl: "https://facebook.com/360radiotvdutse",
      twitterUrl: "https://twitter.com/360radiotvdutse"
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const settings = await prisma.stationSettings.upsert({
      where: { id: "1" },
      update: {
        name: body.name,
        motto: body.motto,
        phone: body.phone,
        email: body.email,
        address: body.address,
        city: body.city,
        state: body.state,
        facebookUrl: body.facebookUrl,
        twitterUrl: body.twitterUrl,
      },
      create: {
        id: "1",
        name: body.name,
        motto: body.motto,
        phone: body.phone,
        email: body.email,
        address: body.address,
        city: body.city,
        state: body.state,
        facebookUrl: body.facebookUrl,
        twitterUrl: body.twitterUrl,
      }
    });
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
