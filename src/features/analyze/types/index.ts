export interface ExtractedSkills {
  required_skills: string[];
  optional_skills: string[];
  seniority: string;
  role_type: string;
  company_name: string;
  job_title: string;
}

export interface ParsedResume {
  candidate_name: string;
  your_skills: string[];
  experience_years: number;
  education: string;
  recent_role: string;
  projects: {
    project_name: string;
    description: string;
  }[];
}

export interface SkillGaps {
  matched_skills: string[];
  missing_skills: string[];
  match_score: string;
}

export interface AtsScore {
  score?: number | string;
  match_percentage?: number | string;
  matched_required_count?: number;
  required_count?: number;
  optional_matches?: string[];
  missing_skills?: string[];
}

export interface InterviewQuestion {
  question: string;
  suggested_answer: string;
}

export interface AnalyzeResult {
  extracted_skills: ExtractedSkills;
  parsed_resume: ParsedResume;
  skill_gaps: SkillGaps;
  ats_score?: AtsScore;
  cover_letter: string;
  interview_questions: InterviewQuestion[];
}

export type AnalyzeStep =
  | "idle"
  | "uploading"
  | "parsing"
  | "analyzing"
  | "cover_letter"
  | "interview"
  | "done"
  | "error";