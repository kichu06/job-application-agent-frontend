"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check, Download, Send, Undo2, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import { refineCoverLetter } from "@/features/analyze/services/analyzeService";

interface CoverLetterProps {
  coverLetter: string;
  context: {
    candidate_name: string;
    job_title: string;
    company_name: string;
  };
}

const QUICK_SUGGESTIONS = [
  "Make it shorter",
  "Make it more formal",
  "Emphasize AI experience",
  "Focus on frontend skills",
  "Make it more confident",
  "Add specific achievements",
];

export default function CoverLetter({ coverLetter, context }: CoverLetterProps) {
  const t = useTranslations("analyze");
  const [currentLetter, setCurrentLetter] = useState(coverLetter);
  const [previousLetter, setPreviousLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [refineError, setRefineError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(currentLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownloadPDF() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 60;
    const maxWidth = pageWidth - margin * 2;

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const paragraphs = currentLetter.split("\n").filter((p) => p.trim() !== "");
    let y = 70;
    const lineHeight = 18;
    const paragraphGap = 12;

    paragraphs.forEach((paragraph) => {
      const lines = doc.splitTextToSize(paragraph, maxWidth);
      lines.forEach((line: string) => {
        if (y > 780) { doc.addPage(); y = 70; }
        doc.text(line, margin, y);
        y += lineHeight;
      });
      y += paragraphGap;
    });

    doc.save("cover-letter.pdf");
  }

  async function handleRefine(text?: string) {
    const finalInstruction = text ?? instruction;
    if (!finalInstruction.trim() || isRefining) return;

    setIsRefining(true);
    setRefineError(null);

    try {
      const result = await refineCoverLetter(
        currentLetter,
        finalInstruction,
        context
      );
      setPreviousLetter(currentLetter);
      setCurrentLetter(result.cover_letter);
      setInstruction("");
    } catch (err) {
      setRefineError(err instanceof Error ? err.message : "Refinement failed");
    } finally {
      setIsRefining(false);
    }
  }

  function handleUndo() {
    if (previousLetter) {
      setCurrentLetter(previousLetter);
      setPreviousLetter(null);
    }
  }

  function handleQuickSuggestion(suggestion: string) {
    setInstruction(suggestion);
    handleRefine(suggestion);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleRefine();
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-foreground">
            {t("results.coverLetter.title")}
          </p>
          {previousLetter && (
            <button
              type="button"
              onClick={handleUndo}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Undo2 className="h-3 w-3" aria-hidden="true" />
              Undo
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            {t("results.coverLetter.download")}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs text-background transition-opacity hover:opacity-80"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                {t("results.coverLetter.copied")}
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                {t("results.coverLetter.copy")}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cover letter content */}
      <div className="px-6 py-5">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentLetter}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="whitespace-pre-wrap text-sm leading-relaxed text-foreground"
          >
            {currentLetter}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Refine section */}
      <div className="border-t border-border px-6 py-4 bg-muted/20">

        {/* Section label */}
        <p className="text-xs font-medium text-muted-foreground mb-3">
          Refine with AI
        </p>

        {/* Quick suggestions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {QUICK_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleQuickSuggestion(suggestion)}
              disabled={isRefining}
              className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground disabled:opacity-40"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input + send */}
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isRefining}
            placeholder="Type an instruction, e.g. Make it more concise..."
            rows={2}
            className="flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 disabled:opacity-50 transition-colors"
          />
          <button
            type="button"
            onClick={() => handleRefine()}
            disabled={!instruction.trim() || isRefining}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground text-background transition-opacity hover:opacity-80 disabled:opacity-40"
          >
            {isRefining ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Error */}
        {refineError && (
          <p className="mt-2 text-xs text-destructive">{refineError}</p>
        )}

        {/* Enter hint */}
        {!isRefining && instruction.trim() && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            Press Enter to send
          </p>
        )}

      </div>
    </div>
  );
}