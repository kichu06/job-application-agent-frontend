"use client";

import { useState } from "react";
import { analyzeApplication } from "@/features/analyze/services/analyzeService";
import { AnalyzeResult, AnalyzeStep } from "@/features/analyze/types";

export function useAnalyze() {
  const [step, setStep] = useState<AnalyzeStep>("idle");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analyze(resume: File, jdText: string, language: string) {
    try {
      setError(null);
      setResult(null);

      setStep("uploading");
      await delay(600);

      setStep("parsing");
      await delay(800);

      setStep("analyzing");
      await delay(600);

      setStep("cover_letter");
      await delay(400);

      setStep("interview");

      const data = await analyzeApplication(resume, jdText, language);

      setStep("done");
      setResult(data);
    } catch (err) {
      setStep("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  function reset() {
    setStep("idle");
    setResult(null);
    setError(null);
  }

  return { step, result, error, analyze, reset };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}