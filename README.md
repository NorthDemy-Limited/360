# 360 Radio & Television Dutse (98.5 FM & 360 TV)

![360 Media Banner](https://via.placeholder.com/1200x400/0f172a/059669?text=360+Radio+%26+Television+Dutse)

Welcome to the **360 Radio & Television Dutse** operations and broadcasting portal. This is a state-of-the-art Next.js web application designed to handle the fast-paced environment of live radio and television broadcasting in Jigawa State, Nigeria.

## 🚀 Features & Architecture

This platform provides dedicated, isolated dashboards for various staff members, ensuring that everyone from the Station Manager to the On-Air Presenter has the exact tools they need to operate efficiently.

### 🎭 Role-Tailored Staff Portals
- **Station Manager Dashboard** (`/station-manager`): High-level analytics, broadcast stream health monitoring, and staff directory management.
- **News Editor Desk** (`/news-editor`): Editorial workflow, pending drafts queue, and live breaking news ticker management.
- **Program Officer Grid** (`/program-officer`): Master program scheduler, studio utilization metrics, and live show assignments.
- **Presenter Studio Console** (`/presenter`): A premium, dark-mode, high-efficiency "Slate Studio UI" featuring a live teleprompter, interactive soundboard jingles, and active broadcast clocks.
- **Commercial & Ads** (`/commercial-ads`): Manage client campaigns, track ad server slot fulfillments, and configure target broadcast slots.

### 🎨 Design System
The application utilizes a custom **"Slate Studio UI"** design system tailored for broadcasting environments:
- **Low-Eyestrain Dark Mode**: Built with deep slate colors (`slate-900` / `#0f172a`) to minimize fatigue during long studio hours.
- **Glassmorphism**: Beautiful translucent panels (`backdrop-blur-xl`) giving a futuristic and premium feel.
- **Framer Motion**: Smooth, staggered entrance animations and interactive physics (spring effects) across all dashboards.
- **Tailwind CSS**: Utility-first, fully responsive design ensuring the dashboards work flawlessly on everything from a studio control room monitor to a reporter's mobile device.
- **Lucide Icons**: Clean, sharp, and consistent iconography.

## 🛠 Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📦 Getting Started

First, install the dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗂 Project Structure
- `/app/(staff)`: Contains the isolated dashboards for internal employees (Station Manager, News Editor, Program Officer, Presenter).
- `/components`: Reusable UI components (Modals, Navbars, Layout Wrappers).

## 🔒 Session & Role Handling
Currently, the UI dynamically persists the active role state across shared routes (like `/internal-notices` and `/media-storage`) seamlessly on the client side using React State and `useRef`. In production, this will be wired to a backend authentication provider to enforce role-based access control.

---
*Built with precision for 360 Radio & Television Dutse - The Pulse of Jigawa State.*
