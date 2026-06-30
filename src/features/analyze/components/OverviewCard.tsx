import { useTranslations } from "next-intl";
import { AnalyzeResult } from "@/features/analyze/types";
import { cn } from "@/lib/utils";

interface OverviewCardProps {
  result: AnalyzeResult;
}

export default function OverviewCard({ result }: OverviewCardProps) {
  const t = useTranslations("analyze");
  const score = parseInt(result.skill_gaps.match_score);
  const isGood = score >= 70;
  const isMid = score >= 40 && score < 70;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

      {/* Match score */}
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
          {t("results.overview.matchScore")}
        </p>
        <p
          className={cn(
            "text-5xl font-semibold tracking-tight",
            isGood
              ? "text-emerald-600 dark:text-emerald-400"
              : isMid
              ? "text-amber-500 dark:text-amber-400"
              : "text-destructive"
          )}
        >
          {score}%
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {isGood ? t("results.overview.strongMatch") : isMid ? t("results.overview.moderateMatch") : t("results.overview.weakMatch")}
        </p>
      </div>

      {/* Candidate info */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
          {t("results.overview.candidate")}
        </p>
        <p className="text-sm font-medium text-foreground">
          {result.parsed_resume.candidate_name}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {result.parsed_resume.recent_role}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {result.parsed_resume.experience_years} {t("results.overview.yearsExperience")}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {result.parsed_resume.education}
        </p>
      </div>

      {/* Role info */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
          {t("results.overview.role")}
        </p>
        <p className="text-sm font-medium text-foreground">
          {result.extracted_skills.job_title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {result.extracted_skills.company_name}
        </p>
        <p className="mt-1 text-xs text-muted-foreground capitalize">
          {result.extracted_skills.seniority}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {result.extracted_skills.role_type}
        </p>
      </div>

    </div>
  );
}