import { AnalyzeResult } from "@/features/analyze/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function analyzeApplication(
  resume: File,
  jdText: string
): Promise<AnalyzeResult> {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jd_text", jdText);

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