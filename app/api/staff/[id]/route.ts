import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Staff ID is required" }, { status: 400 });
    }

    const currentStaff = await prisma.user.findUnique({
      where: { id }
    });

    if (!currentStaff) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name.trim() : currentStaff.name,
        email: body.email !== undefined ? body.email.trim().toLowerCase() : currentStaff.email,
        role: body.role !== undefined ? body.role : currentStaff.role,
        phone: body.phone !== undefined ? (body.phone?.trim() || null) : currentStaff.phone,
        avatar: body.avatar !== undefined ? (body.avatar?.trim() || null) : currentStaff.avatar,
        password: body.password !== undefined ? body.password.trim() : currentStaff.password,
        mustChangePassword: body.mustChangePassword !== undefined ? Boolean(body.mustChangePassword) : currentStaff.mustChangePassword
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update staff member:", error);
    return NextResponse.json({ error: "Failed to update staff member" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Staff ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Staff account removed" });
  } catch (error) {
    console.error("Failed to delete staff member:", error);
    return NextResponse.json({ error: "Failed to delete staff member" }, { status: 500 });
  }
}
