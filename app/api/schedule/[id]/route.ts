import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const { id } = params;
    await prisma.program.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await req.json();
    
    const presenterName = (body.presenter || body.presenterName || "").trim();
    let hostId = body.hostId;

    if (presenterName) {
      let matchingUser = await prisma.user.findFirst({
        where: { name: { equals: presenterName, mode: 'insensitive' } }
      });

      if (!matchingUser) {
        const cleanName = presenterName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const email = `${cleanName || 'presenter'}_${Date.now()}@360radiotv.ng`;
        matchingUser = await prisma.user.create({
          data: {
            name: presenterName,
            email: email,
            role: "PRESENTER",
            phone: "+234 902 953 5000",
            password: "pass360",
            mustChangePassword: false
          }
        });
      }
      hostId = matchingUser.id;
    }

    const updateData: any = {};
    if (body.title || body.name) updateData.title = (body.title || body.name).trim();
    if (body.desc || body.description) updateData.description = (body.desc || body.description).trim();
    if (body.type || body.medium) updateData.type = (body.type || body.medium).toUpperCase();
    if (body.startTime) updateData.startTime = new Date(body.startTime);
    if (body.endTime) updateData.endTime = new Date(body.endTime);
    if (hostId) updateData.hostId = hostId;

    const updatedProgram = await prisma.program.update({
      where: { id },
      data: updateData,
      include: {
        host: {
          select: { name: true, avatar: true }
        }
      }
    });

    return NextResponse.json(updatedProgram);
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
  }
}
