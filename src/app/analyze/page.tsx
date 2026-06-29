import { Metadata } from "next";
import AnalyzePage from "@/features/analyze/components/AnalyzePage";

export const metadata: Metadata = {
  title: "Analyze | AI Job Agent",
  description: "Upload your resume and analyze your job application",
};

export default function Page() {
  return <AnalyzePage />;
}