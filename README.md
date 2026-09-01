# 📻 360 Radio & Television Dutse (98.5 FM & Digital TV)

> **Voice of the Horizon — Broadcasting Peace, Culture & Truth across Jigawa State, Nigeria & Worldwide.**

---

## 🌟 Executive Overview

**360 Radio & Television Dutse** is an enterprise-grade broadcasting platform, digital newsroom, and master control studio web application built with **Next.js 16 (Turbopack)**, **Supabase PostgreSQL**, **Prisma ORM**, and **Progressive Web App (PWA)** capabilities.

It powers continuous 24/7 radio and digital television streaming, high-speed breaking news distribution, an on-air soundboard & teleprompter for live presenters, intelligent 20-second sequential commercial ad rotations with rich media uploads, and an isolated studio intranet.

---

## 🚀 Key Modules & Capabilities

### 1. 🎙️ Public Broadcast Web Application & PWA
- **Live Radio Streaming (98.5 FM)**: Continuous ultra-low latency audio stream via ZenoFM CDN with audio spectrum visualizer.
- **Digital TV Player (360 TV)**: Adaptive HLS video streaming (`.m3u8`) with custom broadcast overlay and program sync.
- **Breaking Newsroom**: Categorized news feeds (Local Dutse, National, Sports, Politics, Culture) with rich editorial content.
- **Top Marquee Ticker**: Real-time broadcast news and priority announcements across the header.
- **Full PWA Support**: Installable on Android, iOS, Windows, and macOS with offline caching via service workers (`sw.js`).
- **Interactive Ad Display**: 10-second countdown popups, `[Skip ✕]` skip controls, and 20-second cooldown queue rotation.

---

### 2. 🎛️ Role-Based Staff Consoles (`/login`)
A unified authentication portal (`/login`) that automatically detects staff credentials from Supabase and securely routes each employee to their dedicated station environment:

| Console Route | Staff Role | Key Capabilities |
| :--- | :--- | :--- |
| **`/station-manager`** | **Station Manager** | Master station telemetry, transmitter health, staff provisioning, on-air authorizations, and operational logs. |
| **`/news-editor`** | **News Editor** | Multi-category journalism workbench, draft reviews, breaking news publishing, slug generation, and image curation. |
| **`/program-officer`** | **Program Officer** | 24/7 master schedule grid, live program allocations, presenter assignments, and studio availability tracking. |
| **`/presenter`** | **On-Air Presenter** | Studio console with live teleprompter, real-time clock, instant soundboard jingles, and active broadcast rundown. |
| **`/commercial-ads`** | **Commercial Desk** | Campaign booking, banner/video creative asset uploads, rate cards, and slot rotation scheduling. |
| **`/media-storage`** | **Media Vault** | Station asset repository with audio/video uploads, playout triggers, and on-air live authorizations. |
| **`/internal-notices`** | **Notice Board** | Station-wide circulars, management memos, shift rosters, and urgent broadcast announcements. |

---

### 3. 🛡️ Super Admin Management Portal (`/admin/login`)
Master studio terminal with ethereal analog sub-bass acoustic styling:
- **Telemetry & Logs**: Real-time transmitter uptime, listener analytics, and memory usage.
- **Staff Directory Management**: Provision, edit, reset passwords, and assign roles.
- **Station Settings**: Update official contact lines (`+234 902 953 5000`), studio addresses, and social handles.
- **Commercial Ad Server**: Launch full-screen popups, bottom-right widgets, top marquee tickers, and manage client rate cards.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19) |
| **Database** | [Supabase PostgreSQL](https://supabase.com/) |
| **ORM & Migrations** | [Prisma ORM 5](https://www.prisma.io/) |
| **Styling & Design** | Tailwind CSS 4 & Custom Slate Studio Glassmorphism |
| **Motion & Physics** | Framer Motion |
| **Audio Processing** | Web Audio API (Analog frequency generation & live soundboard) |
| **Icons** | Lucide React |
| **PWA & Offline** | Web App Manifest & Service Worker Cache |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) |
| **DNS & Edge Protection** | [Cloudflare](https://cloudflare.com/) |

---

## 📁 Repository Structure

```text
360-media/
├── app/
│   ├── (staff)/               # Role-isolated staff dashboards (Manager, Editor, Presenter, Officer)
│   ├── admin/                 # Super admin master control console and authentication
│   ├── api/                   # Serverless REST API routes (Streams, Schedule, News, Commercials, Media, Staff)
│   ├── contact/               # Studio contact portal and physical location map
│   ├── listen-live/           # Dedicated 98.5 FM live radio streaming suite
│   ├── newsroom/              # Public news feeds, article views, and categories
│   ├── watch-live/            # Dedicated 360 TV live digital broadcast player
│   └── login/                 # Unified staff authentication entry point
├── components/                # Reusable UI widgets (Navbar, Footer, AudioPlayer, VideoPlayer, CommercialPopup)
├── lib/                       # Prisma client singleton and Zod validation schemas
├── prisma/
│   ├── schema.prisma          # PostgreSQL database schema definitions
│   └── seed.ts                # Database seeder for station profiles & live streams
├── public/                    # Static assets, branding, PWA manifests, icons & uploads
├── .env                       # Environment credentials and database connection strings
├── next.config.ts             # Next.js configuration
└── package.json               # Node.js dependencies and operational scripts
```

---

## ⚡ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/NorthDemy-Limited/360.git
cd 360/360-media
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root of `360-media`:
```env
# Supabase PostgreSQL Database Connection
DATABASE_URL="postgresql://postgres.tbegrscpxzzshafphpjy:NorthdemyMedia2026@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
DIRECT_URL="postgresql://postgres.tbegrscpxzzshafphpjy:NorthdemyMedia2026@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require"

# Supabase API Credentials
NEXT_PUBLIC_SUPABASE_URL="https://tbegrscpxzzshafphpjy.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_dYYtqmYF929Dji7ACb-zjg_0H40DAmu"
SUPABASE_SERVICE_ROLE_KEY="sb_secret_CEcee3hO01D4GRozDNalDQ_l3nmh2B4"
```

### 4. Initialize Database & Generate Client
```bash
# Generate Prisma Client
npx prisma generate
```

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001`) in your browser.

---

## 🔐 Default Station Credentials (Test Mode)

### Super Admin Portal (`/admin/login`)
- **Identity**: `admin@360radiotv.ng`
- **Passkey**: `superadmin360`

### Staff Portal (`/login`)
- **Station Manager**: `hadiza.gumel@360radiotv.ng` | `pass360`
- **News Editor**: `aminu.kazaure@360radiotv.ng` | `pass360`
- **Program Officer**: `fatima.garba@360radiotv.ng` | `pass360`
- **Presenter**: `balarabe.hadejia@360radiotv.ng` | `pass360`

---

## ☁️ Deployment & Cloudflare DNS Configuration

### 1. Deploying on Vercel
1. Import repository `https://github.com/NorthDemy-Limited/360.git` on [Vercel](https://vercel.com).
2. Set Root Directory to `360-media`.
3. Add the 5 environment variables from your `.env`.
4. Click **Deploy**.

### 2. Linking Cloudflare Custom Domain
In your **Cloudflare Dashboard** $\to$ **DNS** $\to$ **Records**:

| Type | Name | Content / Target | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | **DNS only (Grey Cloud)** | Auto |
| **CNAME** | `www` | `cname.vercel-dns.com` | **DNS only (Grey Cloud)** | Auto |

> **Important**: Set **Proxy status** to **DNS only (Grey Cloud)** during the initial Vercel domain verification so Vercel can automatically issue your SSL certificate. Once verified, ensure Cloudflare SSL/TLS mode is set to **Full (Strict)**.

---

## 📞 Studio Contact & Telemetry
- **Studio Lines**: [+234 902 953 5000](tel:+2349029535000)
- **Official Email**: info@360radiotv.ng
- **Station Location**: No. 1 Broad Street, Central Business District, Dutse, Jigawa State, Nigeria
- **Broadcast Frequency**: 98.5 FM Dutse / Digital TV Channel 36

---

## 📄 License & Ownership
Copyright © 2026 **360 Radio & Television Dutse** / **NorthDemy Limited**. All Rights Reserved.
