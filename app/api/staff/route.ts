import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const staffList = await prisma.user.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(staffList, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });
  } catch (error) {
    console.error("Failed to fetch staff directory:", error);
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and work email are required" }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({
      where: { email: body.email.trim().toLowerCase() }
    });

    if (existing) {
      return NextResponse.json({ error: "A staff member with this work email already exists" }, { status: 409 });
    }

    const id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const pass = body.password?.trim() || `360-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const role = body.role || "PRESENTER";
    const avatar = body.avatar?.trim() ? body.avatar.trim() : null;
    const phone = body.phone?.trim() || null;

    const created = await prisma.user.create({
      data: {
        id,
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        role,
        avatar,
        phone,
        password: pass,
        mustChangePassword: true
      }
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Failed to provision staff account:", error);
    return NextResponse.json({ error: "Failed to provision staff account" }, { status: 500 });
  }
}
