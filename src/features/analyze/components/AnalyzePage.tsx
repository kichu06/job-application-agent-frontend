"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useAnalyze } from "@/features/analyze/hooks/useAnalyze";
import UploadCard from "@/features/analyze/components/UploadCard";
import JobDescriptionForm from "@/features/analyze/components/JobDescriptionForm";
import AnalyzeButton from "@/features/analyze/components/AnalyzeButton";
import ProgressTracker from "@/features/analyze/components/ProgressTracker";
import ResultsTabs from "@/features/analyze/components/ResultsTabs";
import Container from "@/components/layout/Container";

export default function AnalyzePage() {
  const t = useTranslations("analyze");
  const locale = useLocale();
  const { step, result, error, analyze, reset } = useAnalyze();
  const [resume, setResume] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");

  const isRunning = step !== "idle" && step !== "done" && step !== "error";
  const isDone = step === "done";

  async function handleAnalyze() {
    if (!resume || !jdText.trim()) return;
    await analyze(resume, jdText, locale);
  }

  return (
    <main className="flex-1 py-12">
      <Container>

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            {t("header.title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("header.subtitle")}
          </p>
        </div>

        {!isRunning && !isDone && (
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <UploadCard resume={resume} onUpload={setResume} />
              <JobDescriptionForm value={jdText} onChange={setJdText} />
            </div>
            <AnalyzeButton
              onClick={handleAnalyze}
              disabled={!resume || !jdText.trim()}
            />
          </div>
        )}

        {isRunning && (
          <div className="mx-auto max-w-md">
            <ProgressTracker step={step} />
          </div>
        )}

        {step === "error" && (
          <div className="mx-auto max-w-md text-center">
            <p className="text-sm text-destructive mb-4">{error}</p>
            <button
              onClick={reset}
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {t("error.tryAgain")}
            </button>
          </div>
        )}

        {isDone && result && (
          <div className="mx-auto max-w-4xl">
            <ResultsTabs result={result} onReset={reset} />
          </div>
        )}

      </Container>
    </main>
  );
}