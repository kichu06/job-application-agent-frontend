"use client";

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
  return (
    <div>
      {/* Results header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Your results
          </h2>
          <p className="text-sm text-muted-foreground">
            {result.extracted_skills.job_title} at{" "}
            {result.extracted_skills.company_name}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Start over
        </button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-6 w-full grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skill analysis</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover letter</TabsTrigger>
          <TabsTrigger value="interview">Interview kit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewCard result={result} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillAnalysis skillGaps={result.skill_gaps} />
        </TabsContent>

        <TabsContent value="cover-letter">
          <CoverLetter coverLetter={result.cover_letter} />
        </TabsContent>

        <TabsContent value="interview">
          <InterviewKit questions={result.interview_questions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}