import { useTranslations } from "next-intl";
import { AnalyzeResult } from "@/features/analyze/types";
import { cn } from "@/lib/utils";

interface OverviewCardProps {
  result: AnalyzeResult;
}

export default function OverviewCard({ result }: OverviewCardProps) {
  const t = useTranslations("analyze");
  const score = Number.parseInt(String(result.skill_gaps.match_score ?? ""), 10);
  const atsScoreValue = result.ats_score?.score ?? result.ats_score?.match_percentage;
  const atsScore = typeof atsScoreValue === "number"
    ? atsScoreValue
    : Number.parseInt(String(atsScoreValue ?? ""), 10);
  const matchPercentage = typeof result.ats_score?.match_percentage === "number"
    ? result.ats_score.match_percentage
    : Number.parseInt(String(result.ats_score?.match_percentage ?? ""), 10);
  const displayScore = Number.isFinite(matchPercentage) ? matchPercentage : Number.isFinite(atsScore) ? atsScore : score;
  const isGood = displayScore >= 70;
  const isMid = displayScore >= 40 && displayScore < 70;
  const atsSummary = result.ats_score?.required_count && result.ats_score?.matched_required_count
    ? t("results.overview.requiredSkillsMatched", {
        matched: result.ats_score.matched_required_count,
        required: result.ats_score.required_count,
      })
    : null;

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
          {Number.isFinite(displayScore) ? `${displayScore}%` : "--"}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {isGood ? t("results.overview.strongMatch") : isMid ? t("results.overview.moderateMatch") : t("results.overview.weakMatch")}
        </p>
        {Number.isFinite(atsScore) && (
          <div className="mt-3 rounded-xl border border-border/70 bg-background/60 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {t("results.overview.atsScore")}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {atsScore}%
            </p>
            {atsSummary && (
              <p className="mt-1 text-xs text-muted-foreground">
                {atsSummary}
              </p>
            )}
          </div>
        )}
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