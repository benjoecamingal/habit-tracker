# Habit Tracker

This is a simple habit tracker application built with Next.js and Supabase. It allows users to create, track, and manage their habits.

## Getting Started

To get started with the application, you need to have Node.js and npm installed on your machine. You also need to have a Supabase account.

1.  Clone the repository:

```bash
git clone https://github.com/your-username/habit-tracker.git
```

2.  Install the dependencies:

```bash
npm install
```

3.  Create a `.env.local` file in the root of the project and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4.  Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

*   [Next.js](https://nextjs.org/)
*   [Supabase](https://supabase.io/)
*   [Material-UI](https://mui.com/)
*   [Chart.js](https://www.chartjs.org/)
*   [TypeScript](https://www.typescriptlang.org/)

## Features

*   User authentication with Supabase
*   Create, read, update, and delete habits
*   Track habit progress
*   View habit statistics

## File Structure

```
.next.config.ts
├── middleware.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── .git/
├── .next/
├── app/
│   ├── global.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── callback/
│   │   │   └── route.ts
│   │   ├── confirm/
│   │   │   └── route.ts
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (pages)/
│   │   ├── layout.tsx
│   │   └── dashboard/
│   │       ├── drawerList.tsx
│   │       ├── layout.tsx
│   │       ├── logout.tsx
│   │       ├── (request)/
│   │       │   └── request.ts
│   │       ├── archives/
│   │       │   ├── listArchiveHabit.tsx
│   │       │   ├── page.tsx
│   │       │   └── (request)/
│   │       │       └── request.ts
│   │       ├── habits/
│   │       │   ├── countDown.tsx
│   │       │   ├── createHabit.tsx
│   │       │   ├── listHabit.tsx
│   │       │   ├── page.tsx
│   │       │   ├── (request)/
│   │       │   │   └── request.ts
│   │       │   └── [habitId]/
│   │       │       ├── habitInstance.tsx
│   │       │       └── page.tsx
│   │       ├── home/
│   │       │   ├── page.tsx
│   │       │   └── (request)/
│   │       │       └── request.ts
│   │       └── profile/
│   │           └── page.tsx
│   └── (supabase)/
│       ├── client.ts
│       ├── middleware.ts
│       └── server.ts
├── node_modules/
└── public/
```