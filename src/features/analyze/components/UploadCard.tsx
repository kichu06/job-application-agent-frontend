"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Upload, FileText, X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadCardProps {
  resume: File | null;
  onUpload: (file: File | null) => void;
}

export default function UploadCard({ resume, onUpload }: UploadCardProps) {
  const t = useTranslations("analyze");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (!resume) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setIsPreviewOpen(false);
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(resume);
    setPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [resume]);

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
    onUpload(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handlePreview(e: React.MouseEvent) {
    e.stopPropagation();
    if (previewUrl) {
      setIsPreviewOpen(true);
    }
  }

  return (
    <>
      <div
        onClick={() => !resume && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
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
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/10">
              <FileText className="h-6 w-6 text-foreground" aria-hidden="true" />
            </div>
            <div>
              <p className="max-w-[180px] text-sm font-medium text-foreground line-clamp-1">
                {resume.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {(resume.size / 1024).toFixed(0)} KB · {t("upload.format")}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={handlePreview}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <Eye className="h-3 w-3" aria-hidden="true" />
                {t("upload.preview")}
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
              >
                <X className="h-3 w-3" aria-hidden="true" />
                {t("upload.remove")}
              </button>
            </div>
          </div>
        ) : (
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

      {isPreviewOpen && previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="flex h-full w-full max-w-5xl flex-col rounded-2xl bg-background p-3 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{resume?.name}</p>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("upload.close")}
              </button>
            </div>
            <iframe
              src={previewUrl}
              title={t("upload.previewTitle")}
              className="h-full min-h-[70vh] w-full rounded-xl border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}