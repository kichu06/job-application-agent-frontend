"use client";

import { useTranslations } from "next-intl";
import { RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyzeResult } from "@/features/analyze/types";
import OverviewCard from "@/features/analyze/components/OverviewCard";
import SkillAnalysis from "@/features/analyze/components/SkillAnalysis";
import CoverLetter from "@/features/analyze/components/CoverLetter";
import InterviewKit from "@/features/analyze/components/InterviewKit";

interface ResultsTabsProps {
  result: AnalyzeResult;
  onReset: () => void;
}

export default function ResultsTabs({ result, onReset }: ResultsTabsProps) {
  const t = useTranslations("analyze");

  return (
    <div>
      {/* Results header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {t("results.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {result.extracted_skills.job_title} {t("results.jobAt")}{" "}
            {result.extracted_skills.company_name}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          {t("results.startOver")}
        </button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-6 w-full grid grid-cols-4">
          <TabsTrigger value="overview" className="text-xs">
            {t("results.tabs.overview")}
          </TabsTrigger>
          <TabsTrigger value="skills" className="text-xs">
            {t("results.tabs.skills")}
          </TabsTrigger>
          <TabsTrigger value="cover-letter" className="text-xs">
            {t("results.tabs.coverLetter")}
          </TabsTrigger>
          <TabsTrigger value="interview" className="text-xs">
            {t("results.tabs.interview")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewCard result={result} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillAnalysis skillGaps={result.skill_gaps} />
        </TabsContent>

        <TabsContent value="cover-letter">
          <CoverLetter
            coverLetter={result.cover_letter}
            context={{
              candidate_name: result.parsed_resume.candidate_name,
              job_title: result.extracted_skills.job_title,
              company_name: result.extracted_skills.company_name,
            }}
          />
        </TabsContent>

        <TabsContent value="interview">
          <InterviewKit
            questions={result.interview_questions}
            jobTitle={result.extracted_skills.job_title}
            companyName={result.extracted_skills.company_name}
            candidateSkills={result.parsed_resume.your_skills}
            missingSkills={result.skill_gaps.missing_skills}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}