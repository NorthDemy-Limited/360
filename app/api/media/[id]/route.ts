import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { unlink } from "fs/promises";
import path from "path";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    const currentAsset = await prisma.mediaAsset.findUnique({
      where: { id }
    });

    if (!currentAsset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // 1. If making this asset the active on-air broadcast
    if (body.isActiveBroadcast === true) {
      await prisma.mediaAsset.updateMany({
        where: { type: currentAsset.type },
        data: { isActiveBroadcast: false }
      });

      // Dispatch to live stream encoder
      if (currentAsset.type === "Video") {
        await prisma.streamConfig.upsert({
          where: { id: "TV" },
          update: { streamUrl: currentAsset.url, currentShow: currentAsset.title, isOnline: true },
          create: { id: "TV", streamUrl: currentAsset.url, currentShow: currentAsset.title, isOnline: true }
        });
      } else if (currentAsset.type === "Audio") {
        await prisma.streamConfig.upsert({
          where: { id: "RADIO" },
          update: { streamUrl: currentAsset.url, currentShow: currentAsset.title, isOnline: true },
          create: { id: "RADIO", streamUrl: currentAsset.url, currentShow: currentAsset.title, isOnline: true }
        });
      }
    }

    // 2. Update MediaAsset record
    const updatedAsset = await prisma.mediaAsset.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        category: body.category !== undefined ? body.category : undefined,
        isAuthorized: body.isAuthorized !== undefined ? Boolean(body.isAuthorized) : undefined,
        isActiveBroadcast: body.isActiveBroadcast !== undefined ? Boolean(body.isActiveBroadcast) : undefined,
      }
    });

    return NextResponse.json(updatedAsset);
  } catch (error: any) {
    console.error("Error updating media asset:", error);
    return NextResponse.json({ error: error?.message || "Failed to update media asset" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    const existingAsset = await prisma.mediaAsset.findUnique({
      where: { id }
    });

    if (!existingAsset) {
      return NextResponse.json({ error: "Media asset not found" }, { status: 404 });
    }

    // If it's a physical uploaded file in public/uploads, delete the file from disk
    if (existingAsset.url && existingAsset.url.startsWith('/uploads/')) {
      const filename = existingAsset.url.replace('/uploads/', '');
      const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
      try {
        await unlink(filePath);
      } catch {
        // Ignore if file missing
      }
    }

    // Delete database record
    await prisma.mediaAsset.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Asset deleted successfully" });
  } catch (error) {
    console.error("Error deleting media asset:", error);
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
