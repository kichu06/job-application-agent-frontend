"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Loader2, Send, Undo2 } from "lucide-react";
import { InterviewQuestion } from "@/features/analyze/types";
import { refineInterviewQuestions } from "@/features/analyze/services/analyzeService";
import { cn } from "@/lib/utils";

interface InterviewKitProps {
  questions: InterviewQuestion[];
  jobTitle?: string;
  companyName?: string;
  candidateSkills?: string[];
  missingSkills?: string[];
}

const QUICK_SUGGESTIONS = [
  { label: "Generate React hook questions", value: "Generate 3 more questions about React hooks" },
  { label: "Make answers concise", value: "Make the answers more concise and to the point" },
  { label: "Focus on system design", value: "Focus on system design questions" },
  { label: "Add missing skills questions", value: "Add questions about missing skills" },
];

export default function InterviewKit({
  questions,
  jobTitle,
  companyName,
  candidateSkills,
  missingSkills,
}: InterviewKitProps) {
  const t = useTranslations("analyze");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [currentQuestions, setCurrentQuestions] = useState<InterviewQuestion[]>(questions);
  const [previousQuestions, setPreviousQuestions] = useState<InterviewQuestion[][]>([questions]);
  const [customInstruction, setCustomInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefine = async (instruction: string) => {
    if (!instruction.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await refineInterviewQuestions(
        currentQuestions,
        instruction,
        {
          job_title: jobTitle || "",
          company_name: companyName || "",
          candidate_skills: candidateSkills,
          missing_skills: missingSkills,
        }
      );

      setPreviousQuestions([...previousQuestions, currentQuestions]);
      setCurrentQuestions(response.interview_questions);
      setCustomInstruction("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refine questions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUndo = () => {
    if (previousQuestions.length > 1) {
      const newHistory = previousQuestions.slice(0, -1);
      setPreviousQuestions(newHistory);
      setCurrentQuestions(newHistory[newHistory.length - 1]);
    }
  };

  const canUndo = previousQuestions.length > 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Questions */}
      <div className="flex flex-col gap-3">
        {currentQuestions.map((q, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            {/* Question */}
            <button
              type="button"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="flex w-full items-start justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-accent/30"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  {index + 1}
                </span>
                <p className="text-sm font-medium text-foreground">
                  {q.question}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  openIndex === index && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div className="border-t border-border px-6 py-4">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
                  {t("results.interview.suggestedAnswer")}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {q.suggested_answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Suggestions */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-sm font-medium text-foreground mb-3">
          {t("results.interview.generateMore") || "Generate more questions"}
        </h3>

        {/* Quick suggestion chips */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {QUICK_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.value}
              type="button"
              disabled={isLoading}
              onClick={() => handleRefine(suggestion.value)}
              className="px-3 py-2 rounded-lg border border-border bg-muted/50 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:border-foreground/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion.label}
            </button>
          ))}
        </div>

        {/* Custom instruction input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customInstruction}
            onChange={(e) => setCustomInstruction(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleRefine(customInstruction);
              }
            }}
            placeholder={t("results.interview.typeInstruction") || "Type instruction..."}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => handleRefine(customInstruction)}
            disabled={isLoading || !customInstruction.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:border-foreground/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Undo button */}
        {canUndo && (
          <button
            type="button"
            onClick={handleUndo}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:border-foreground/30"
          >
            <Undo2 className="h-4 w-4" aria-hidden="true" />
            {t("results.interview.undoLastChange") || "Undo last change"}
          </button>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-3 text-xs text-destructive">{error}</p>
        )}
      </div>
    </div>
  );
}