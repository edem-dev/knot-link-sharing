# Knot Link Sharing - Project Architecture & Analysis Guide

## 1. User Flow & System Architecture

### User Flow
Knot is designed as a personal link aggregator (similar to Linktree). The current user flow is as follows:
1.  **Entry (Landing Page)**: Users arrive at `app/page.tsx`, which serves as the landing page showcasing features, pricing, and a hero section.
2.  **Authentication**: Users can navigate to `/login` or `/signup`. Currently, these pages are UI-complete but lack functional backend integration.
3.  **Dashboard (`/dashboard`)**: After "logging in" (simulated), users land on the Dashboard.
    *   **Links Management**: Users can view and (intended to) manage their social links.
    *   **Analytics**: A placeholder for tracking link performance.
    *   **Settings**: A multi-tab interface for Profile, Links & Display, and Account settings.
4.  **Public Profile (`/[username]`)**: The end-goal is a public-facing page that displays a collection of links for a specific user.

### Architectural Structure
*   **Frontend**: Built with **Next.js 15+ (App Router)**, **React 19**, and **Tailwind CSS**.
*   **Component Design**: Follows **Atomic Design** principles, organized into `atomic`, `molecular`, and `sectional` directories.
*   **Data Flow**: Currently, data is unidirectional from static definitions or local component state (`useState`). There is no global state management (like Redux or Context) or server-side data fetching from a database.
*   **Integrations**: Uses **Lucide React** for iconography. No external API integrations are currently active.

### Assumptions & Missing Decisions
*   **Single User Assumption**: The system currently hardcodes "Jane Doe" as the primary user across several components (`UserDetails.tsx`, `ProfileDetails.tsx`).
*   **Missing Persistence**: There is no database layer (e.g., PostgreSQL, MongoDB) or ORM (e.g., Prisma).
*   **Missing Auth Provider**: While UI for Google/Apple login exists, no provider (e.g., NextAuth.js, Supabase Auth, Clerk) has been implemented.
*   **Client-Side Heavy**: Most interactivity is handled via `'use client'` components, missing out on Next.js Server Components' potential for performance and SEO in the public profile section.

---

## 2. Backend Design & Operation

### Current Operation
The "backend" is currently non-existent. The application operates as a static-heavy Single Page Application (SPA) within the Next.js framework. All data is co-located with the components.

### Ideal Operation (Proposed)
1.  **API Structure**: Implement **Next.js Server Actions** for handling form submissions (saving profile changes, adding links) and **Route Handlers** for public data fetching.
2.  **Data Models**:
    *   **User**: `id`, `email`, `password_hash`, `username`, `full_name`, `bio`, `avatar_url`.
    *   **Link**: `id`, `userId`, `title`, `url`, `iconType`, `order`, `isActive`, `clickCount`.
3.  **Authentication**: Integrate **NextAuth.js** to handle session management and OAuth providers.
4.  **State Management**: Use **React Server Components (RSC)** to fetch data on the server and pass it to client components. Use **URL-based state** for dashboard tabs to allow deep linking.
5.  **Persistence**: Connect to a relational database (like PostgreSQL) to store user and link data.

### Architectural Weaknesses
*   **Hardcoded Content**: Critical user data is hardcoded in the UI, making the app non-functional for multiple users.
*   **Security**: Authentication pages have no validation or secure transport logic yet.
*   **Scalability**: The lack of a database means no data persists across sessions.

---

## 3. System Map

```text
Root
│
├── Landing (app/page.tsx)
│   ├── HeroSection
│   ├── FeaturesSection
│   └── PricingSection
│
├── Auth (app/(auth)/...)
│   ├── Login
│   └── Signup
│
├── Dashboard (app/dashboard/...)
│   ├── Dashboard (Link Management)
│   │   ├── EditLinkCard (Molecular)
│   │   └── UserDetails (Molecular)
│   ├── Analytics (Placeholder)
│   └── Settings
│       ├── ProfileSettings
│       ├── LinkAndDisplaySettings
│       └── AccountSettings
│
└── Public Profile (app/(public)/[username]/page.tsx)
    └── UserProfile
        └── UserDetails
```

**Data Flow Map:**
`User Input (Client)` -> `Local State (useState)` -> `[MISSING: Server Action]` -> `[MISSING: Database]`

---

## 4. Code Quality Review

### Issues Identified

| Issue | Location | Problem | Proposed Fix |
| :--- | :--- | :--- | :--- |
| **Hardcoded Data** | `UserDetails.tsx`, `ProfileDetails.tsx` | "Jane Doe" and related links are hardcoded. | Pass user data as props from a parent Server Component. |
| **Missing Logic** | `EditLinkCard.tsx` | Pencil and Trash buttons have no functionality. | Implement CRUD Server Actions and connect them to these buttons. |
| **Incomplete Component** | `Dropdown.tsx` | Contains only a TODO comment. | Implement a reusable Dropdown using a headless UI library or custom logic. |
| **Auth Placeholders** | `login/page.tsx`, `signup/page.tsx` | Buttons don't trigger any auth flow. | Integrate an authentication library like NextAuth.js. |
| **Manual URL Routing** | `DashboardHeader.tsx` | "View Public Profile" redirects to `/login`. | Update the route to `/[username]` once auth is implemented. |
| **Static Analytics** | `Analytics.tsx` (and tabs) | Charts and stats are placeholders. | Integrate a tracking service or implement a simple click-tracking table in the DB. |

---

## 5. Conclusion
The "Knot" project has a solid UI foundation with a clean Atomic Design structure. However, it is currently a **"Frontend-Only Prototype"**. To move to a production-ready state, the primary focus must be on implementing the backend layer: Authentication, Database Persistence, and API communication.

The separation of components into atomic units will make this transition easier, as the UI is already decoupled from the (planned) data fetching logic.
