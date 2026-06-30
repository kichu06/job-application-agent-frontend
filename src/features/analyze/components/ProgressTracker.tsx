import { useTranslations } from "next-intl";
import { Check, Loader2 } from "lucide-react";
import { AnalyzeStep } from "@/features/analyze/types";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  step: AnalyzeStep;
}

function getStepStatus(
  stepKey: AnalyzeStep,
  currentStep: AnalyzeStep,
  stepOrder: AnalyzeStep[]
): "done" | "active" | "pending" {
  const currentIndex = stepOrder.indexOf(currentStep);
  const stepIndex = stepOrder.indexOf(stepKey);
  if (stepIndex < currentIndex) return "done";
  if (stepIndex === currentIndex) return "active";
  return "pending";
}

export default function ProgressTracker({ step }: ProgressTrackerProps) {
  const t = useTranslations("analyze");
  const steps: { key: AnalyzeStep; label: string; description: string }[] = [
    {
      key: "uploading",
      label: t("progress.uploading.label"),
      description: t("progress.uploading.description"),
    },
    {
      key: "parsing",
      label: t("progress.parsing.label"),
      description: t("progress.parsing.description"),
    },
    {
      key: "analyzing",
      label: t("progress.analyzing.label"),
      description: t("progress.analyzing.description"),
    },
    {
      key: "cover_letter",
      label: t("progress.coverLetter.label"),
      description: t("progress.coverLetter.description"),
    },
    {
      key: "interview",
      label: t("progress.interview.label"),
      description: t("progress.interview.description"),
    },
  ];

  const stepOrder = steps.map((s) => s.key);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="mb-6 text-sm font-medium text-foreground text-center">
        {t("progress.title")}
      </p>
      <div className="flex flex-col gap-4">
        {steps.map((s) => {
          const status = getStepStatus(s.key, step, stepOrder);
          return (
            <div key={s.key} className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  status === "done"
                    ? "border-foreground bg-foreground"
                    : status === "active"
                    ? "border-foreground"
                    : "border-border"
                )}
              >
                {status === "done" ? (
                  <Check className="h-3 w-3 text-background" aria-hidden="true" />
                ) : status === "active" ? (
                  <Loader2 className="h-3 w-3 text-foreground animate-spin" aria-hidden="true" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-border" />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 pt-0.5">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    status === "pending"
                      ? "text-muted-foreground"
                      : "text-foreground"
                  )}
                >
                  {s.label}
                </p>
                {status === "active" && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {s.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}