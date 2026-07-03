# AI Job Application Agent — Frontend

Next.js 16 frontend for the AI Job Application Agent.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Theme | next-themes (light/dark/system) |
| i18n | next-intl (cookie-based, EN/DE) |
| Icons | Lucide React |
| PDF | jsPDF |
| Animation | Framer Motion |
| Font | Geist |
| Deployment | Vercel |

---

## Architecture

---

## Component Details

### `useAnalyze` hook

```typescript
// Returns:
{
  step: AnalyzeStep        // idle | uploading | parsing | analyzing | cover_letter | interview | done | error
  result: AnalyzeResult    // full API response
  error: string | null
  analyze: (resume, jdText, language) => Promise<void>
  reset: () => void
}
```

### `AnalyzeResult` type

```typescript
interface AnalyzeResult {
  extracted_skills: {
    required_skills: string[]
    optional_skills: string[]
    seniority: string
    role_type: string
    company_name: string
    job_title: string
  }
  parsed_resume: {
    candidate_name: string
    your_skills: string[]
    experience_years: number
    education: string
    recent_role: string
    projects: string[]
  }
  skill_gaps: {
    matched_skills: string[]
    missing_skills: string[]
    match_score: string
  }
  ats_score: {
    score: number
    match_percentage: number
    matched_required_count: number
    required_count: number
    optional_matches: string[]
    extra_skill_count: number
    missing_skills: string[]
    recommendations: string[]
  }
  cover_letter: string
  interview_questions: { question: string; suggested_answer: string }[]
}
```

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com
```

---

## Local Development

```bash
npm install
npm run dev
```

Frontend at: `http://localhost:3000`
Backend must be running at: `http://localhost:8000`

---

## Key Patterns

### i18n — Cookie-based locale

---

## Deployment (Vercel)

---

## Skills Demonstrated

- **Next.js 16 App Router** — server components, async layouts, metadata, file-based routing
- **TypeScript** — strict typing, interfaces, union types, generics
- **Tailwind CSS v4** — semantic color tokens, dark mode, responsive design
- **shadcn/ui** — Tabs, DropdownMenu, Button components
- **next-intl** — cookie-based i18n, server-side locale resolution, useTranslations
- **next-themes** — light/dark/system theme with hydration safety
- **React patterns** — custom hooks, useEffect, useRef, useState, useTransition
- **Framer Motion** — AnimatePresence for cover letter fade transitions
- **jsPDF** — client-side PDF generation with page overflow handling
- **API integration** — FormData for file uploads, JSON for refinement endpoints
- **Accessibility** — aria-label, semantic HTML, keyboard navigation, focus-visible
- **Feature-first architecture** — isolated feature folders with components/hooks/services/types