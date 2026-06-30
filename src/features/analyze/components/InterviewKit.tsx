"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { InterviewQuestion } from "@/features/analyze/types";
import { cn } from "@/lib/utils";

interface InterviewKitProps {
  questions: InterviewQuestion[];
}

export default function InterviewKit({ questions }: InterviewKitProps) {
  const t = useTranslations("analyze");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {questions.map((q, index) => (
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
  );
}