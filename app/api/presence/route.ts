import { NextResponse } from "next/server";

// Server-side in-memory active session stores
// Global augmentation ensures survival across hot-reloads in Next.js development
declare global {
  var activeTVPresence: Map<string, number> | undefined;
  var activeRadioPresence: Map<string, number> | undefined;
}

if (!globalThis.activeTVPresence) {
  globalThis.activeTVPresence = new Map<string, number>();
}
if (!globalThis.activeRadioPresence) {
  globalThis.activeRadioPresence = new Map<string, number>();
}

const tvSessions = globalThis.activeTVPresence;
const radioSessions = globalThis.activeRadioPresence;

// Cleanup sessions inactive for more than 35 seconds
const cleanInactiveSessions = () => {
  const now = Date.now();
  const threshold = 35 * 1000; // 35 seconds

  tvSessions.forEach((lastSeen, sessionId) => {
    if (now - lastSeen > threshold) {
      tvSessions.delete(sessionId);
    }
  });

  radioSessions.forEach((lastSeen, sessionId) => {
    if (now - lastSeen > threshold) {
      radioSessions.delete(sessionId);
    }
  });
};

export async function GET(req: Request) {
  cleanInactiveSessions();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "TV") {
    return NextResponse.json({ viewers: tvSessions.size }, { headers: { 'Cache-Control': 'no-store' } });
  }

  if (type === "RADIO") {
    return NextResponse.json({ listeners: radioSessions.size }, { headers: { 'Cache-Control': 'no-store' } });
  }

  return NextResponse.json({
    tvViewers: tvSessions.size,
    radioListeners: radioSessions.size
  }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, sessionId, action } = body;

    if (!type || !sessionId) {
      return NextResponse.json({ error: "type and sessionId are required" }, { status: 400 });
    }

    const now = Date.now();
    const targetMap = type === "TV" ? tvSessions : radioSessions;

    if (action === "leave") {
      targetMap.delete(sessionId);
    } else {
      // "join" or "heartbeat"
      targetMap.set(sessionId, now);
    }

    cleanInactiveSessions();

    const count = targetMap.size;

    return NextResponse.json({
      success: true,
      type,
      activeCount: count
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error("Error processing presence heartbeat:", error);
    return NextResponse.json({ error: "Failed to process presence" }, { status: 500 });
  }
}
