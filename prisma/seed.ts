import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Supabase PostgreSQL test database...');

  // 1. Provision Station Staff Profiles
  const stationManager = await prisma.user.upsert({
    where: { email: 'hadiza.gumel@360radiotv.ng' },
    update: {},
    create: {
      email: 'hadiza.gumel@360radiotv.ng',
      name: 'Hadiza Ibrahim Gumel',
      role: 'STATION_MANAGER',
      phone: '+234 902 953 5000',
      password: 'pass360',
      mustChangePassword: false
    }
  });

  const newsEditor = await prisma.user.upsert({
    where: { email: 'aminu.kazaure@360radiotv.ng' },
    update: {},
    create: {
      email: 'aminu.kazaure@360radiotv.ng',
      name: 'Aminu Sani Kazaure',
      role: 'NEWS_EDITOR',
      phone: '+234 902 953 5000',
      password: 'pass360',
      mustChangePassword: false
    }
  });

  const programOfficer = await prisma.user.upsert({
    where: { email: 'fatima.garba@360radiotv.ng' },
    update: {},
    create: {
      email: 'fatima.garba@360radiotv.ng',
      name: 'Fatima Garba Dutse',
      role: 'PROGRAM_OFFICER',
      phone: '+234 902 953 5000',
      password: 'pass360',
      mustChangePassword: false
    }
  });

  const presenter = await prisma.user.upsert({
    where: { email: 'balarabe.hadejia@360radiotv.ng' },
    update: {},
    create: {
      email: 'balarabe.hadejia@360radiotv.ng',
      name: 'Balarabe Hadejia',
      role: 'PRESENTER',
      phone: '+234 902 953 5000',
      password: 'pass360',
      mustChangePassword: false
    }
  });

  // 2. Stream Configurations
  await prisma.streamConfig.upsert({
    where: { id: 'RADIO' },
    update: {},
    create: {
      id: 'RADIO',
      streamUrl: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
      currentShow: 'Morning Pulse (98.5 FM Live)',
      isOnline: true
    }
  });

  await prisma.streamConfig.upsert({
    where: { id: 'TV' },
    update: {},
    create: {
      id: 'TV',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      currentShow: '360 Digital Channel (Dutse Hub)',
      isOnline: true
    }
  });

  // 3. Station Settings
  await prisma.stationSettings.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: '360 Radio & Television',
      motto: 'Voice of the Horizon - Broadcasting Peace, Culture & Truth',
      phone: '+234 902 953 5000',
      email: 'info@360radiotv.ng',
      address: 'No. 1 Broad Street, Central Business District',
      city: 'Dutse',
      state: 'Jigawa State',
      facebookUrl: 'https://facebook.com/360radiotvdutse',
      twitterUrl: 'https://twitter.com/360radiotvdutse'
    }
  });

  // 4. Sample News Articles
  await prisma.news.upsert({
    where: { slug: 'jigawa-road-expansion-2026' },
    update: {},
    create: {
      title: 'Jigawa State Executive Council Approves N12B Road Expansion Project',
      slug: 'jigawa-road-expansion-2026',
      content: 'The infrastructure upgrade will connect major commercial hubs in Dutse, easing traffic and boosting agricultural productivity across the region.',
      category: 'LOCAL DUTSE',
      imageUrl: 'https://images.unsplash.com/photo-1541888059030-5807eb8e3a24?w=800&q=80',
      isPublished: true,
      publishedAt: new Date(),
      authorId: newsEditor.id
    }
  });

  // 5. Commercial Campaigns
  const existingCamp = await prisma.commercialCampaign.findFirst({
    where: { title: 'Jigawa Agro-Allied Fertilizer Campaign' }
  });

  if (!existingCamp) {
    await prisma.commercialCampaign.create({
      data: {
        clientName: 'Jigawa State Agricultural Development Authority',
        title: 'Jigawa Agro-Allied Fertilizer Campaign',
        targetMedia: 'BANNER',
        placement: 'Full Screen Popup',
        value: 500000,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'ACTIVE'
      }
    });

    await prisma.commercialCampaign.create({
      data: {
        clientName: 'Dutse Telecoms & 5G Hub',
        title: 'High-Speed Broadband Expansion in Dutse Central',
        targetMedia: 'BANNER',
        placement: 'Top Marquee',
        value: 300000,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'ACTIVE'
      }
    });
  }

  console.log('✅ Supabase PostgreSQL test database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
