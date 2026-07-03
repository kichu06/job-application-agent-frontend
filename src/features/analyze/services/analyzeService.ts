import { AnalyzeResult } from "@/features/analyze/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function analyzeApplication(
  resume: File,
  jdText: string,
  language: string
): Promise<AnalyzeResult> {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jd_text", jdText);
  formData.append("language", language);

  const response = await fetch(`${API_URL}/run-agent`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Something went wrong");
  }

  return response.json();
}
export interface RefineCoverLetterResponse {
  cover_letter: string;
}

export async function refineCoverLetter(
  coverLetter: string,
  instruction: string,
  context: {
    candidate_name: string;
    job_title: string;
    company_name: string;
  }
): Promise<RefineCoverLetterResponse> {
  const response = await fetch(`${API_URL}/refine-cover-letter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cover_letter: coverLetter,
      instruction,
      context,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Refinement failed");
  }

  return response.json();
}

export interface RefineInterviewQuestionsResponse {
  interview_questions: Array<{
    question: string;
    suggested_answer: string;
  }>;
}

export async function refineInterviewQuestions(
  questions: Array<{ question: string; suggested_answer: string }>,
  instruction: string,
  context: {
    job_title: string;
    company_name: string;
    candidate_skills?: string[];
    missing_skills?: string[];
  }
): Promise<RefineInterviewQuestionsResponse> {
  const response = await fetch(`${API_URL}/refine-interview-questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questions,
      instruction,
      context,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Refinement failed");
  }

  return response.json();
}