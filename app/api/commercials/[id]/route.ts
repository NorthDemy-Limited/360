import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const dataToUpdate: any = {};
    if (body.clientName) dataToUpdate.clientName = body.clientName.trim();
    if (body.title) dataToUpdate.title = body.title.trim();
    if (body.targetMedia) dataToUpdate.targetMedia = body.targetMedia;
    if (body.placement) dataToUpdate.placement = body.placement;
    if (body.mediaUrl !== undefined) dataToUpdate.mediaUrl = body.mediaUrl?.trim() || null;
    if (body.value !== undefined) dataToUpdate.value = parseFloat(body.value) || 0;
    if (body.startDate) dataToUpdate.startDate = new Date(body.startDate);
    if (body.endDate) dataToUpdate.endDate = new Date(body.endDate);
    if (body.status) dataToUpdate.status = body.status;

    const updated = await prisma.commercialCampaign.update({
      where: { id },
      data: dataToUpdate
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating commercial campaign:", error);
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.commercialCampaign.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("Error deleting commercial campaign:", error);
    return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
  }
}
