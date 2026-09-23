import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const authorizedOnly = searchParams.get("authorized") === "true";

    const whereClause: any = {};
    if (type && type !== "All") {
      whereClause.type = type;
    }
    if (authorizedOnly) {
      whereClause.isAuthorized = true;
    }

    const media = await prisma.mediaAsset.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(media, { 
      headers: { 
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      } 
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    // Graceful fallback for local dev or DB unavailability
    return NextResponse.json([
      {
        id: "asset-1",
        title: "360 Broadcast Station ID Jingle",
        type: "Jingle",
        category: "Station ID",
        url: "https://stream.zeno.fm/f3wvbbqndg8uv",
        size: "3.2 MB",
        isAuthorized: true,
        isActiveBroadcast: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "asset-2",
        title: "Jigawa Documentary 2026",
        type: "Video",
        category: "Documentary",
        url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        size: "45 MB",
        isAuthorized: true,
        isActiveBroadcast: false,
        createdAt: new Date().toISOString()
      }
    ], { 
      headers: { 
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      } 
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Batch multi-asset imports
    if (Array.isArray(body)) {
      const createdAssets = [];
      for (const item of body) {
        const id = `asset_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const created = await prisma.mediaAsset.create({
          data: {
            id,
            title: item.title,
            type: item.type || "Video",
            category: item.category || null,
            url: item.url,
            size: item.size || "0 MB",
            isAuthorized: Boolean(item.isAuthorized),
            isActiveBroadcast: false
          }
        });
        createdAssets.push(created);
      }
      return NextResponse.json(createdAssets, { status: 201 });
    }

    // 2. Single asset creation
    const id = `asset_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const created = await prisma.mediaAsset.create({
      data: {
        id,
        title: body.title,
        type: body.type || "Video",
        category: body.category || null,
        url: body.url,
        size: body.size || "0 MB",
        isAuthorized: Boolean(body.isAuthorized),
        isActiveBroadcast: Boolean(body.isActiveBroadcast)
      }
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error saving media asset:", error);
    return NextResponse.json({ error: "Failed to save media asset" }, { status: 500 });
  }
}
