import { useTranslations } from "next-intl";
import { SkillGaps } from "@/features/analyze/types";
import { CheckCircle2, XCircle } from "lucide-react";

interface SkillAnalysisProps {
  skillGaps: SkillGaps;
}

export default function SkillAnalysis({ skillGaps }: SkillAnalysisProps) {
  const t = useTranslations("analyze");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

      {/* Matched */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2
            className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-foreground">
            {t("results.skills.matched")}
          </p>
          <span className="ml-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            {skillGaps.matched_skills.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillGaps.matched_skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-xs text-emerald-700 dark:text-emerald-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Not mentioned */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <XCircle
            className="h-4 w-4 text-destructive"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-foreground">
            {t("results.skills.notMentioned")}
          </p>
          <span className="ml-auto rounded-full bg-red-50 dark:bg-red-950/40 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-400">
            {skillGaps.missing_skills.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillGaps.missing_skills.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              {t("results.skills.noMissing")}
            </p>
          ) : (
            skillGaps.missing_skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 text-xs text-red-700 dark:text-red-400"
              >
                {skill}
              </span>
            ))
          )}
        </div>
        {skillGaps.missing_skills.length > 0 && (
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {t("results.skills.hint")}
          </p>
        )}
      </div>

    </div>
  );
}