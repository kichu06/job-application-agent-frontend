"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadCardProps {
  resume: File | null;
  onUpload: (file: File) => void;
}

export default function UploadCard({ resume, onUpload }: UploadCardProps) {
  const t = useTranslations("analyze");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file: File) {
    if (file.type !== "application/pdf") return;
    onUpload(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    onUpload(null as unknown as File);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div
      onClick={() => !resume && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200",
        isDragging
          ? "border-foreground bg-accent/50 scale-[1.01]"
          : "border-border hover:border-foreground/40 hover:bg-accent/30",
        resume && "cursor-default border-border bg-muted/30"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />

      {resume ? (
        /* File uploaded state */
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/10">
            <FileText className="h-6 w-6 text-foreground" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground line-clamp-1 max-w-[180px]">
              {resume.name}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
          {(resume.size / 1024).toFixed(0)} KB · {t("upload.format")}
        </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            {t("upload.remove")}
          </button>
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50">
            <Upload className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {t("upload.title")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("upload.subtitle")}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("upload.hint")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}