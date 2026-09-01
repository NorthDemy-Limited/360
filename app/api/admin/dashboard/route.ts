import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 1. Fetch Today's Programs
    const programs = await prisma.program.findMany({
      where: {
        startTime: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        host: { select: { name: true } }
      },
      orderBy: { startTime: 'asc' }
    });

    // 2. Fetch Recent Notices
    const notices = await prisma.notice.findMany({
      take: 5,
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ],
      include: {
        author: { select: { name: true } }
      }
    });

    // 3. Fetch News Count for Today
    const newsCount = await prisma.news.count({
      where: {
        isPublished: true,
        publishedAt: {
          gte: today,
          lt: tomorrow,
        }
      }
    });

    // 4. Fetch Active Commercial Campaigns
    const commercialCount = await prisma.commercialCampaign.count({
      where: {
        status: "ACTIVE"
      }
    });

    const radioListeners = globalThis.activeRadioPresence?.size || 0;
    const tvViewers = globalThis.activeTVPresence?.size || 0;

    return NextResponse.json({
      programs,
      notices,
      metrics: {
        newsCount,
        commercialCount,
        radioListeners,
        tvViewers
      }
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
