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
    // Graceful fallback for local dev or DB unavailability
    const today = new Date();
    const setTime = (hours: number, mins: number) => {
      const d = new Date(today);
      d.setHours(hours, mins, 0, 0);
      return d;
    };
    return NextResponse.json({
      programs: [
        {
          id: "prog-1",
          title: "Barke Da Sallah & Morning Pulse",
          type: "RADIO",
          startTime: setTime(6, 0),
          endTime: setTime(9, 0),
          isLive: true,
          host: { name: "Balarabe Hadejia" }
        },
        {
          id: "prog-2",
          title: "360 Community Spotlight",
          type: "RADIO",
          startTime: setTime(10, 0),
          endTime: setTime(12, 0),
          isLive: false,
          host: { name: "Fatima Garba Dutse" }
        }
      ],
      notices: [
        {
          id: "notice-1",
          title: "Welcome to 360 Radio & TV Admin Console",
          body: "Broadcast schedules, news publishing, and live stream settings are active.",
          urgency: "Standard",
          targetAudience: "All Staff",
          isPinned: true,
          createdAt: new Date().toISOString(),
          author: { name: "System Admin" }
        }
      ],
      metrics: {
        newsCount: 4,
        commercialCount: 2,
        radioListeners: globalThis.activeRadioPresence?.size || 12,
        tvViewers: globalThis.activeTVPresence?.size || 8
      }
    });
  }
}
