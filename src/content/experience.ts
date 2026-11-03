// Work history, newest first. Wording follows the current CV (Job Hunt Dir, Sept 2026).

import type { ExperienceSeed } from './types.ts';

export const experience: ExperienceSeed[] = [
  {
    company: 'FMT Software Solutions',
    role: 'Founder & Software Engineer',
    period: 'Jan 2025 – Present',
    location: 'Accra',
    url: 'https://fmtsoftware.com',
    summary: 'Faithtower Media Technologies. Business software and client websites; freelance since 2020.',
    points: [
      'Build and ship desktop business software with React, TypeScript, Electron and Supabase: Print Suite Pro for print shops, StockFlow for retail inventory and ChurchHub 360 for churches.',
      'Built the Judey Phones hire-purchase platform: an Android device-controller app, a NestJS backend and a Next.js admin and storefront.',
      'Built the FMT marketplace and its NestJS backend, with Paystack payments verified by webhook.',
      'Build and maintain client websites, including iSMART and Africa Is Great, from requirements through ongoing updates.',
    ],
    skills: ['React', 'TypeScript', 'Electron', 'Supabase', 'NestJS', 'Kotlin', 'Next.js', 'PostgreSQL'],
  },
  {
    company: 'Ndel Technologies',
    role: 'Frontend Engineer · Contract',
    period: 'Jan – Feb 2026 · Apr – May 2026',
    location: 'Remote',
    url: 'https://bawahealth.com',
    summary: 'BawaHealth, an AI-assisted health management platform.',
    points: [
      'Built patient-facing BawaHealth interfaces for profiles, medical history, appointment booking and online payment.',
      'Integrated Daily.co video consultations with live transcription, screen sharing and a waiting room.',
      'Added speech-to-text input and AI-based doctor recommendations to the patient flow.',
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Daily.co', 'TanStack Query', 'Zustand', 'Tailwind CSS'],
  },
  {
    company: 'KreeoAI',
    role: 'Full-Stack Engineer',
    period: 'Nov 2025 – Mar 2026',
    location: 'Remote',
    url: null,
    summary: 'KreeoSync, a Figma plugin that turns design work into case studies.',
    points: [
      'Developed KreeoSync across its Figma plugin, web dashboard and NestJS backend on PostgreSQL (Supabase).',
      'Implemented Figma OAuth and the sync that pulls design data and assets from Figma into the platform.',
      'Built AI case-study generation from project notes and assets, with OpenAI speech-to-text.',
    ],
    skills: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Supabase', 'OpenAI', 'Figma API'],
  },
  {
    company: 'Voltbase',
    role: 'Frontend Engineer',
    period: 'Mar 2025 – Present',
    location: 'Remote',
    url: null,
    summary: 'Swiftbuild, a property-management application.',
    points: [
      'Developed the Swiftbuild frontend from initial setup with Next.js, React and TypeScript.',
      'Integrated authenticated workflows for property units and tenants, including invitations, profile updates and file uploads.',
      'Extended rental and inventory interfaces with dual listings, payment integration and document signing.',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'Firebase Auth', 'TanStack Query', 'Zustand', 'React Hook Form', 'Zod'],
  },
  {
    company: 'Turntabl · Morgan Stanley',
    role: 'Software Engineer',
    period: 'Oct 2019 – Dec 2024',
    location: 'Accra',
    url: null,
    summary: 'Turntabl Ghana; client assignment with Morgan Stanley from Feb 2020.',
    points: [
      'Built frontend features for an enterprise API marketplace and developer portal in React, TypeScript and Angular, supporting API discovery and integration.',
      'Implemented self-service API deployment tooling for Azure, with API policies, semantic versioning and OpenAPI validation.',
      'Developed an API usage dashboard with interactive charts and filters by client, application and response code, from Azure Application Insights.',
      'Improved responsiveness through request reduction and caching; contributed to shared Angular/TypeScript libraries and parallel build pipelines.',
      'Delivered React training, reviewed code and mentored frontend engineers.',
    ],
    skills: ['React', 'Angular', 'TypeScript', 'Java', 'Azure', 'AWS', 'Jest', 'CI/CD'],
  },
];
