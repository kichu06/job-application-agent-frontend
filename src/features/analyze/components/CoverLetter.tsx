"use client";

import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";

interface CoverLetterProps {
  coverLetter: string;
}

export default function CoverLetter({ coverLetter }: CoverLetterProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownloadPDF() {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Cover Letter</title>
        <style>
          @page {
            margin: 60px 80px;
          }
          @media print {
            @page {
              margin: 60px 80px;
            }
          }
          * {
            -webkit-print-color-adjust: exact;
          }
          body {
            font-family: Georgia, serif;
            font-size: 14px;
            line-height: 1.8;
            max-width: 680px;
            margin: 0 auto;
            color: #1a1a1a;
          }
          p { margin-bottom: 16px; }
        </style>
      </head>
      <body>
        ${coverLetter
          .split("\n")
          .map((line) =>
            line.trim() === "" ? "<br/>" : `<p>${line}</p>`
          )
          .join("")}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <p className="text-sm font-medium text-foreground">Cover letter</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download PDF
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs text-background transition-opacity hover:opacity-80"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                Copy
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