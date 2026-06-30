"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check, Download } from "lucide-react";
import jsPDF from "jspdf";

interface CoverLetterProps {
  coverLetter: string;
}

export default function CoverLetter({ coverLetter }: CoverLetterProps) {
  const t = useTranslations("analyze");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownloadPDF() {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 60;
    const maxWidth = pageWidth - margin * 2;

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const paragraphs = coverLetter.split("\n").filter((p) => p.trim() !== "");

    let y = 70;
    const lineHeight = 18;
    const paragraphGap = 12;

    paragraphs.forEach((paragraph) => {
      const lines = doc.splitTextToSize(paragraph, maxWidth);

      lines.forEach((line: string) => {
        if (y > 780) {
          doc.addPage();
          y = 70;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });

      y += paragraphGap;
    });

    doc.save("cover-letter.pdf");
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <p className="text-sm font-medium text-foreground">{t("results.coverLetter.title")}</p>
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

      {/* Content */}
      <div className="px-6 py-5">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
          {coverLetter}
        </p>
      </div>

    </div>
  );
}