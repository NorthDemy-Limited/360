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
    
    const updatedProgram = await prisma.program.update({
      where: { id },
      data: {
        title: body.title,
        type: body.type,
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        hostId: body.hostId,
      }
    });

    return NextResponse.json(updatedProgram);
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
  }
}
